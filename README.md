# Civic Documentation

Source for [docs.civic.com](https://docs.civic.com/) — built with
[Docusaurus](https://docusaurus.io).

## Local development

```bash
pnpm install
pnpm start           # dev server on http://localhost:3217
pnpm build           # production build into ./build
pnpm serve           # preview the production build
pnpm typecheck       # tsc --noEmit
```

Requires Node 18+ and pnpm 9+. The pinned pnpm version lives in
`package.json#packageManager`; run `corepack enable` once to have Node pick
it up automatically.

## Repo layout

```
docs/                      all authored MDX (routeBasePath: '/')
  index.mdx                -> /
  civic/**/*.mdx           -> /civic/**
  auth/**/*.mdx            -> /auth/**
  overview/**/*.mdx        -> /overview/**
  ai-prompts/**/*.mdx      -> /ai-prompts/**
  integration/**/*.mdx     -> /integration/**
  web3/**/*.mdx            -> /web3/**
  libraries/**/*.mdx       -> /libraries/**
  guides/**/*.mdx          -> /guides/**
  prompts/**/*.mdx         -> /prompts/**
  labs.mdx, labs/**/*.mdx  -> /labs, /labs/**
  _snippets/**/*.mdx       shared partials, imported by other MDX

sidebars.ts                three sidebars (civic/auth/labs) wired to navbar tabs
sidebars/{civic,auth,labs}.ts
docusaurus.config.ts       site config (redirects, clientModules, fonts, etc.)
src/
  components/MintlifyCompat.tsx   Docusaurus-native <Note>, <Card>, <Steps>, etc.
  theme/MDXComponents.tsx         injects those globally into every MDX file
  theme/DocSidebarItem/Category/  renders FontAwesome icon from customProps.icon
  css/custom.css                  brand colors + utility classes
  clientModules/{fontawesome,gtm}.ts
static/
  images/, logo/, favicon.svg
  llms.txt, llms-full.txt    hand-maintained, copied as-is
```

## Editing content

Authoring is GitHub PR only (no Mintlify web editor replacement). Add or edit
MDX under `docs/`, push a branch, open a PR. The site deploys from `main` only
— there are no per-branch previews.

### Components available in MDX

All Mintlify-style tags render through native Docusaurus components —
`<Note>`, `<Tip>`, `<Warning>`, `<Info>`, `<Check>`, `<Callout>`, `<Card>`,
`<CardGroup>`, `<Steps>`/`<Step>`, `<Accordion>`/`<AccordionGroup>`,
`<Tabs>`/`<Tab>`, `<CodeGroup>`, `<Frame>`, `<Update>`. Implementations live in
`src/components/MintlifyCompat.tsx`.

### Images

Served from `static/images/…`; in MDX reference them as `/images/…`. Utility
classes for width and rounding are ported from the old `custom.css`:

```mdx
<img src="/images/example.png" className="image-70 image-rounded" alt="..." />
```

## Search

**Algolia DocSearch** is the only search surface — disabled until the
free-program application clears. When approved, set the `ALGOLIA_APP_ID`,
`ALGOLIA_API_KEY`, and `ALGOLIA_INDEX_NAME` secrets on the deploy
environment; the config in `docusaurus.config.ts` auto-enables the search
bar once all three are set.

## Redirects

Declared in `docusaurus.config.ts` under
`@docusaurus/plugin-client-redirects`:

- `/nexus/*` -> `/civic/*` (wildcard, generated from the existing civic pages)
- `/nexus/quickstart/nexus-chat` -> `/civic/quickstart/civic-chat`
- `/civic/quickstart/nexus-chat` -> `/civic/quickstart/civic-chat`
- `/civic/recipes/python-pydantic` -> `/civic/recipes/pydantic-ai`

Each renders a small HTML redirect file at the source path.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes to
GitHub Pages. The CNAME in the artifact is currently `docs-next.civic.com` for
side-by-side QA with the Mintlify production site — flip to `docs.civic.com`
at DNS cutover.

## Link checking

`.github/workflows/link-check-branch.yml` builds the site and runs
[`lychee`](https://github.com/lycheeverse/lychee) against `build/**/*.html` on
every PR. The production variant runs against
`https://docs-next.civic.com` daily.

## Fonts

Geist and Geist Mono are loaded from Google Fonts via a `<link>` tag declared
in `docusaurus.config.ts#headTags`. No self-hosted font binaries are shipped.

## AI prompts

Three-tier structure under `docs/`: `_snippets/` shared partials →
`prompts/` full prompts → `ai-prompts/` per-framework pages. Snippets are
imported as `@site/docs/_snippets/...`.
