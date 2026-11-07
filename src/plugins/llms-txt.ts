import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {
  LoadedContent,
  DocMetadata,
} from '@docusaurus/plugin-content-docs';

/**
 * Writes llms.txt (link index) and llms-full.txt (full page text) into the
 * build output, following one docs sidebar.
 *
 * - Order and labels come from the sidebar; titles of linked pages fall back
 *   to the doc title. Descriptions come from frontmatter.
 * - Unlisted and draft docs are skipped.
 * - Top-level categories become sections. Runs of top-level docs between them
 *   become "Start here" (the first run) and "Guides" (later runs).
 * - Nested categories (e.g. the generated API reference) collapse to one link
 *   to their landing doc and are left out of llms-full.txt.
 * - `optional` doc ids go in the llms.txt "Optional" section and are left out
 *   of llms-full.txt (the changelog).
 * - `descriptions` replaces a doc's frontmatter description in llms.txt, for
 *   generated pages whose text comes from elsewhere (the OpenAPI spec).
 */
export type LlmsTxtOptions = {
  sidebarId: string;
  title: string;
  summary: string;
  details?: string;
  optional?: string[];
  /** Per-doc description overrides, keyed by doc id. */
  descriptions?: Record<string, string>;
};

type SidebarItem = {
  type: string;
  id?: string;
  label?: string;
  items?: SidebarItem[];
  link?: {type: string; id?: string};
};

type Entry = {doc: DocMetadata; label: string; full: boolean};
type Section = {title: string; entries: Entry[]};

const CONTAINERS = new Set([
  'Steps', 'Step', 'Tabs', 'Tab', 'Card', 'CardGroup',
  'Note', 'Warning', 'Tip', 'Info', 'Accordion', 'AccordionGroup',
  'Callout', 'Check', 'Frame', 'CodeGroup',
]);

/** Flatten MDX to plain markdown: drop imports and images, turn component
 * titles into bold lines, dedent component bodies, absolutize site links,
 * and demote headings one level under the page's own `##` title. */
export function mdxToMarkdown(source: string, siteUrl: string): string {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const abs = (href: string) => (href.startsWith('/') ? siteUrl + href : href);
  const out: string[] = [];
  const stack: number[] = [];
  let fence = false;
  let fenceCut = 0;
  let skipping = false;

  for (const raw of body.split('\n')) {
    const s = raw.trim();
    const lead = raw.length - raw.trimStart().length;
    const cut = stack.at(-1) ?? 0;

    if (fence) {
      if (s.startsWith('```')) fence = false;
      out.push(raw.slice(Math.min(fenceCut, lead)));
      continue;
    }
    if (s.startsWith('```')) {
      fence = true;
      fenceCut = Math.min(cut, lead);
      out.push(raw.slice(fenceCut));
      continue;
    }
    if (skipping) {
      if (s.endsWith('/>')) skipping = false;
      continue;
    }
    if (/^(import|export) /.test(s)) continue;
    if (/^<(ThemedImage|img)\b/.test(s)) {
      skipping = !s.endsWith('/>');
      continue;
    }

    const open = s.match(/^<(\w+)\b([^>]*)>$/);
    if (open && CONTAINERS.has(open[1]) && !open[2].trim().endsWith('/')) {
      stack.push(lead + 2);
      const title = open[2].match(/title="([^"]+)"/)?.[1];
      const href = open[2].match(/href="([^"]+)"/)?.[1];
      if (title) {
        out.push(`**${href ? `[${title}](${abs(href)})` : title}**`);
        if (open[1] !== 'Card') out.push('');
      }
      continue;
    }
    const close = s.match(/^<\/(\w+)>$/);
    if (close && CONTAINERS.has(close[1])) {
      stack.pop();
      out.push('');
      continue;
    }

    let line = raw.slice(Math.min(cut, lead));
    if (line.startsWith('#')) line = `#${line}`;
    out.push(line.replace(/\]\((\/[^)]*)\)/g, (_, href) => `](${abs(href)})`));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function firstDocId(item: SidebarItem): string | undefined {
  if (item.type === 'doc' || item.type === 'ref') return item.id;
  if (item.link?.type === 'doc') return item.link.id;
  for (const child of item.items ?? []) {
    const id = firstDocId(child);
    if (id) return id;
  }
  return undefined;
}

export default function llmsTxtPlugin(
  context: LoadContext,
  options: LlmsTxtOptions,
): Plugin {
  const siteUrl = context.siteConfig.url.replace(/\/$/, '');
  let sections: Section[] = [];
  let optional: Entry[] = [];

  return {
    name: 'llms-txt',

    async allContentLoaded({allContent}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']
        ?.default as LoadedContent | undefined;
      const version = docsContent?.loadedVersions[0];
      if (!version) throw new Error('llms-txt: docs content not loaded');

      const docsById = new Map(version.docs.map((d) => [d.id, d]));
      const sidebar = version.sidebars[options.sidebarId] as
        | SidebarItem[]
        | undefined;
      if (!sidebar) {
        throw new Error(`llms-txt: sidebar "${options.sidebarId}" not found`);
      }
      const optionalIds = new Set(options.optional ?? []);

      const entry = (id: string | undefined, label: string | undefined, full: boolean) => {
        const doc = id ? docsById.get(id) : undefined;
        if (!doc || doc.unlisted) return undefined;
        return {doc, label: label ?? doc.title, full};
      };

      sections = [];
      optional = [];
      let loose: Section | undefined;
      let looseRuns = 0;

      for (const item of sidebar) {
        if (item.type === 'category') {
          loose = undefined;
          const section: Section = {title: item.label ?? '', entries: []};
          if (item.link?.type === 'doc') {
            const e = entry(item.link.id, item.label, true);
            if (e) section.entries.push(e);
          }
          for (const child of item.items ?? []) {
            const e =
              child.type === 'category'
                ? entry(firstDocId(child), child.label, false)
                : entry(child.id, child.label, true);
            if (e) section.entries.push(e);
          }
          if (section.entries.length) sections.push(section);
          continue;
        }
        if (item.type !== 'doc' && item.type !== 'ref') continue;
        const e = entry(item.id, item.label, true);
        if (!e) continue;
        if (optionalIds.has(e.doc.id)) {
          optional.push({...e, full: false});
          continue;
        }
        if (!loose) {
          loose = {title: looseRuns++ === 0 ? 'Start here' : 'Guides', entries: []};
          sections.push(loose);
        }
        loose.entries.push(e);
      }
    },

    async postBuild({outDir}) {
      const url = (doc: DocMetadata) =>
        siteUrl + doc.permalink.replace(/(.)\/$/, '$1');
      const link = (e: Entry) => {
        const description = options.descriptions?.[e.doc.id] ?? e.doc.description;
        return `- [${e.label}](${url(e.doc)})` + (description ? `: ${description}` : '');
      };

      const index = [`# ${options.title}`, '', `> ${options.summary}`, ''];
      if (options.details) index.push(options.details, '');
      for (const section of sections) {
        index.push(`## ${section.title}`, '', ...section.entries.map(link), '');
      }
      index.push('## Optional', '', ...optional.map(link));
      index.push(`- [Full content](${siteUrl}/llms-full.txt): Every page above in one file`, '');

      const full = [
        `# ${options.title}: full documentation`,
        '',
        `> ${options.summary} This file holds the full text of these docs. ` +
          `For a short index, see ${siteUrl}/llms.txt.`,
        '',
      ];
      for (const section of sections) {
        const pages = section.entries.filter((e) => e.full);
        if (!pages.length) continue;
        full.push('---', '', `# ${section.title}`, '');
        for (const {doc} of pages) {
          const file = path.join(context.siteDir, doc.source.replace(/^@site\//, ''));
          const body = mdxToMarkdown(await fs.readFile(file, 'utf8'), siteUrl);
          full.push(`## ${doc.title}`, '', `Source: ${url(doc)}`, '', body, '');
        }
      }

      await fs.writeFile(path.join(outDir, 'llms.txt'), index.join('\n'));
      await fs.writeFile(path.join(outDir, 'llms-full.txt'), full.join('\n'));
    },
  };
}
