#!/usr/bin/env node
/**
 * Mintlify -> Docusaurus MDX codemod.
 *
 * Strategy: most Mintlify components (Note, Tip, Warning, Info, Check, Card,
 * CardGroup, Steps, Step, Accordion, AccordionGroup, Frame, CodeGroup, Tabs,
 * Tab) are re-implemented as React components in src/components and
 * globally injected via src/theme/MDXComponents.tsx. Authored MDX therefore
 * does not need to be rewritten for those tags.
 *
 * This codemod handles the changes that *must* be made at the file level:
 *   1. Rewrite snippet imports `from '/snippets/...'` to relative paths under
 *      the new `docs/_snippets/` location.
 *   2. Drop `icon:` frontmatter (Mintlify-specific; icons live in the sidebar
 *      config now).
 *   3. Drop `public:` frontmatter (Mintlify-specific flag; we don't use it).
 *   4. Rewrite `<Tab title="...">` -> `<Tab label="...">` so our Tab wrapper
 *      has a consistent prop (our wrapper accepts either but normalize for
 *      readability).
 *   5. Normalize `<img ... className=` attributes that Mintlify allowed but
 *      MDX v3 is stricter about -- leave as is, img is raw HTML.
 *   6. Leave all body content untouched otherwise -- the component wrappers
 *      take care of rendering.
 *
 * Run: `node scripts/mintlify-to-docusaurus.mjs`
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { globby } from 'globby';
import matter from 'gray-matter';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');

function rewriteSnippetImports(source, filePath) {
  // e.g. import Foo from '/snippets/_foo.mdx';
  //   -> import Foo from '@site/docs/_snippets/_foo.mdx';
  return source.replace(
    /from\s+['"]\/snippets\/([^'"]+)['"]/g,
    (_m, rest) => `from '@site/docs/_snippets/${rest}'`,
  );
}

function stripMintlifyFrontmatter(source) {
  const parsed = matter(source);
  const data = { ...parsed.data };
  let changed = false;
  for (const key of ['icon', 'public', 'sidebarTitle']) {
    if (key in data) {
      // Preserve sidebarTitle under Docusaurus's sidebar_label key.
      if (key === 'sidebarTitle') {
        data.sidebar_label = data.sidebarTitle;
      }
      delete data[key];
      changed = true;
    }
  }
  if (!changed) return source;
  return matter.stringify(parsed.content, data);
}

function normalizeTabTitleProp(source) {
  // `<Tab title="X">` -> `<Tab label="X">`
  return source.replace(/<Tab\b([^>]*?)\stitle=/g, '<Tab$1 label=');
}

// Restrict to the rest of the opening fence line: `[ \t]+` (never \n), and
// `[^\n]+` must not contain backticks or newlines -- this was a bug that
// swallowed the second line of empty-info code fences.
const RAW_LANG_HINT_RE = /^```([A-Za-z0-9]+)[ \t]+([^\n`]+)$/gm;
function stripCodeBlockFilenameHints(source) {
  // Mintlify allows ``` ts App.ts  (filename after the language). Docusaurus
  // expects  ```ts title="App.ts". Convert to title= when a hint is a
  // single word.ext or path-like token (contains /, . or -) and not an
  // existing key=value.
  return source.replace(RAW_LANG_HINT_RE, (line, lang, rest) => {
    const trimmed = rest.trim();
    if (!trimmed) return line;
    if (/=/.test(trimmed)) return line; // already key=value form
    if (/^\{/.test(trimmed)) return line; // highlight spec like {1,3-5}
    // Must look like a filename (has a dot or slash) to be safe.
    if (!/[./]/.test(trimmed)) return line;
    return '```' + lang + ' title="' + trimmed + '"';
  });
}

async function processFile(abs) {
  let src = await fs.readFile(abs, 'utf8');
  const before = src;
  src = stripMintlifyFrontmatter(src);
  src = rewriteSnippetImports(src, abs);
  src = normalizeTabTitleProp(src);
  src = stripCodeBlockFilenameHints(src);
  if (src !== before) {
    await fs.writeFile(abs, src);
    return true;
  }
  return false;
}

async function main() {
  const patterns = ['docs/**/*.mdx', 'docs/**/*.md'];
  const files = await globby(patterns, { cwd: REPO_ROOT, absolute: true });
  let changed = 0;
  for (const f of files) {
    if (await processFile(f)) changed += 1;
  }
  console.log(`Codemod done: processed ${files.length} files, rewrote ${changed}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
