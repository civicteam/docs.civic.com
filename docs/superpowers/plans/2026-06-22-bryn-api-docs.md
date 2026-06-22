# Bryn API Docs Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fourth docs section, **Bryn**, alongside Civic/Auth/Labs — an interactive REST reference for the Bryn Control Plane API plus a brief MCP-server connection page.

**Architecture:** A build-time Node script fetches Bryn's live public OpenAPI spec and patches in `servers` + `info.description`; `docusaurus-plugin-openapi-docs` generates per-endpoint MDX from it into `docs/bryn/api/`; a new `bryn` sidebar + navbar tab present those pages alongside two hand-written MDX pages (Overview, MCP Server). Fetched spec and generated MDX are git-ignored build artifacts.

**Tech Stack:** Docusaurus 3.10, React 18, `docusaurus-plugin-openapi-docs@^5`, `docusaurus-theme-openapi-docs@^5`, `docusaurus-plugin-sass`, `sass`, Node 18 `fetch`.

## Global Constraints

- Package manager: **pnpm** only (never edit `package.json` deps by hand — use `pnpm add`).
- Docusaurus version floor: **3.10.0** (plugin/theme peer-require `@docusaurus/*@^3.10.0`).
- Spec source of truth: the **live public** endpoint `https://bryn.civic.com/api/openapi.json` — fetched at build, never committed.
- Show **all** paths the live spec returns (no filtering). Try-it console **enabled**.
- TypeScript strict; no `any`; prefer arrow functions; let errors percolate (no swallow-and-return-null).
- Commit messages: **no author attribution** (a pre-commit hook rejects `Co-Authored-By`).
- Work happens on branch `feature/bryn-api-docs` (already created).
- Iteration check (per repo CLAUDE.md): `pnpm -r lint --fix && CI=1 pnpm test`. Full `pnpm build` is the integration check but kills any running dev server, so don't run it while `pnpm start` is up.

---

### Task 1: Install plugin, theme, and Sass dependencies

**Files:**
- Modify: `package.json` (via `pnpm add` — do not hand-edit)

**Interfaces:**
- Produces: the `docusaurus-plugin-openapi-docs`, `docusaurus-theme-openapi-docs`, `docusaurus-plugin-sass`, and `sass` packages available to later tasks.

- [ ] **Step 1: Install the packages**

```bash
pnpm add docusaurus-plugin-openapi-docs@^5 docusaurus-theme-openapi-docs@^5 docusaurus-plugin-sass sass
```

- [ ] **Step 2: Verify install resolved without peer conflicts**

Run: `pnpm ls docusaurus-plugin-openapi-docs docusaurus-theme-openapi-docs docusaurus-plugin-sass sass`
Expected: all four listed at concrete versions; no `UNMET PEER DEPENDENCY` lines. (`docusaurus-plugin-openapi-docs`/`-theme` should be `5.x`.)

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add OpenAPI docs plugin, theme, and sass deps"
```

---

### Task 2: Build-time spec fetch + patch script

**Files:**
- Create: `scripts/fetch-bryn-spec.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Produces: a runnable `node scripts/fetch-bryn-spec.mjs` that writes a patched spec to `static/bryn/openapi.json` (with `servers` + `info.description`), exiting non-zero on fetch failure.

- [ ] **Step 1: Write the fetch script**

Create `scripts/fetch-bryn-spec.mjs`:

```js
/**
 * Fetch Bryn's live Control Plane OpenAPI spec and patch in the two fields the
 * runtime `app.doc()` omits — `servers` (needed by the Try-it console) and
 * `info.description` — then write it where docusaurus-plugin-openapi-docs reads
 * it. Run at build time; the output is a git-ignored build artifact.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const SPEC_URL =
  process.env.BRYN_OPENAPI_URL ?? "https://bryn.civic.com/api/openapi.json";
const OUTPUT_PATH = "static/bryn/openapi.json";

const SERVERS = [
  { url: "https://bryn.civic.com/api", description: "Production" },
  { url: "https://bryn-preprod.civic.com/api", description: "Preprod" },
  { url: "https://bryn-dev.civic.com/api", description: "Development" },
];

const DESCRIPTION = [
  "Tenant-scoped REST API for the Bryn Control Plane, authenticated with Civic Auth bearer tokens.",
  "",
  "The JWT identifies the caller, not the tenant. The API resolves the active tenant from the caller's memberships: with a single membership the tenant is implicit; with more than one, send an `X-Bryn-Tenant: <tenantId>` header naming one of them.",
].join("\n");

const response = await fetch(SPEC_URL);
if (!response.ok) {
  throw new Error(
    `Failed to fetch Bryn OpenAPI spec from ${SPEC_URL}: ${response.status} ${response.statusText}`,
  );
}

const spec = await response.json();
spec.servers = SERVERS;
spec.info = { ...spec.info, description: DESCRIPTION };

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(spec, null, 2)}\n`);

const pathCount = Object.keys(spec.paths ?? {}).length;
const schemaCount = Object.keys(spec.components?.schemas ?? {}).length;
console.log(
  `Wrote ${OUTPUT_PATH} — ${pathCount} paths, ${schemaCount} schemas`,
);
```

- [ ] **Step 2: Git-ignore the build artifacts**

Append to `.gitignore`:

```
# Bryn OpenAPI: fetched spec + generated reference MDX (rebuilt every build)
/static/bryn/openapi.json
/docs/bryn/api/
```

- [ ] **Step 3: Run the script and verify output**

Run: `node scripts/fetch-bryn-spec.mjs`
Expected: console prints `Wrote static/bryn/openapi.json — 46 paths, 64 schemas` (counts may grow as the API evolves; must be > 0).

- [ ] **Step 4: Verify the patch landed**

Run: `node -e "const s=require('./static/bryn/openapi.json'); console.log(s.servers.length, !!s.info.description)"`
Expected: `3 true`

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch-bryn-spec.mjs .gitignore
git commit -m "build: add Bryn OpenAPI fetch-and-patch script"
```

---

### Task 3: Configure the OpenAPI plugin, theme, and build scripts

**Files:**
- Modify: `docusaurus.config.ts` (presets `docs`, `plugins`, add `themes`, navbar `items`)
- Modify: `package.json` (`scripts`)

**Interfaces:**
- Consumes: the four packages from Task 1; `static/bryn/openapi.json` from Task 2.
- Produces: an `openapi` plugin instance keyed `bryn` (outputDir `docs/bryn/api`, sidebar grouped by tag); a `Bryn` navbar tab bound to sidebar id `bryn`; `gen-api-docs`/`clean-api-docs`/`fetch-bryn-spec` npm scripts; `start`/`build`/`typecheck` that fetch+generate first.

- [ ] **Step 1: Add `docItemComponent` to the docs preset**

In `docusaurus.config.ts`, inside `presets[0][1].docs`, add the line (e.g. right after `sidebarPath`):

```ts
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
```

- [ ] **Step 2: Register the OpenAPI plugin**

In `docusaurus.config.ts`, add as a new entry in the `plugins` array (after the redirects plugin):

```ts
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          bryn: {
            specPath: "static/bryn/openapi.json",
            outputDir: "docs/bryn/api",
            sidebarOptions: { groupPathsBy: "tag" },
          },
        },
      },
    ],
```

> If `gen-api-docs` or `build` later errors that the docs plugin id can't be found, change `docsPluginId` to `"default"` (the preset-classic docs instance id) and re-run.

- [ ] **Step 3: Register the OpenAPI theme**

In `docusaurus.config.ts`, add a top-level `themes` key (e.g. just before `clientModules`):

```ts
  themes: ["docusaurus-theme-openapi-docs"],
```

- [ ] **Step 4: Add the Bryn navbar tab**

In `themeConfig.navbar.items`, add after the `labs` docSidebar item:

```ts
        {
          type: "docSidebar",
          sidebarId: "bryn",
          label: "Bryn",
          position: "left",
        },
```

- [ ] **Step 5: Add/modify npm scripts**

In `package.json` `scripts`, add the three generator scripts and prefix `start`/`build`/`typecheck` so the spec is fetched and generated first:

```json
    "fetch-bryn-spec": "node scripts/fetch-bryn-spec.mjs",
    "gen-api-docs": "docusaurus gen-api-docs bryn",
    "clean-api-docs": "docusaurus clean-api-docs bryn",
    "prepare-bryn": "pnpm fetch-bryn-spec && pnpm gen-api-docs",
    "start": "pnpm prepare-bryn && dotenv -- docusaurus start --port 3217",
    "build": "pnpm prepare-bryn && dotenv -- docusaurus build",
    "typecheck": "pnpm prepare-bryn && tsc --noEmit",
```

(Leave `docusaurus`, `swizzle`, `deploy`, `clear`, `serve` unchanged.)

- [ ] **Step 6: Verify generation produces pages + a sidebar slice**

Run: `pnpm gen-api-docs && ls docs/bryn/api`
Expected: many `*.api.mdx` files plus a `sidebar.ts` (or `sidebar.js`) and an `info`/intro doc. Note the **exact sidebar filename + extension** — Task 4 imports it.

- [ ] **Step 7: Commit**

```bash
git add docusaurus.config.ts package.json
git commit -m "feat: wire OpenAPI plugin, theme, Bryn navbar tab and build scripts"
```

---

### Task 4: Bryn sidebar wiring

**Files:**
- Create: `sidebars/bryn.ts`
- Modify: `sidebars.ts`

**Interfaces:**
- Consumes: the generated sidebar slice from `docs/bryn/api/sidebar` (Task 3 Step 6); the hand-written docs `bryn/index` and `bryn/mcp` (Tasks 5–6).
- Produces: a `bryn` sidebar exported from `sidebars.ts` so the navbar tab from Task 3 resolves.

- [ ] **Step 1: Create `sidebars/bryn.ts`**

```ts
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
// Generated by `pnpm gen-api-docs` into docs/bryn/api/ (git-ignored build
// artifact). Adjust the extension if Task 3 Step 6 produced sidebar.js.
import brynApiSidebar from '../docs/bryn/api/sidebar';

type SidebarItemConfig = Extract<SidebarsConfig[string], readonly unknown[]>[number];

// See sidebars/civic.ts: top-level groups are always-open section headers.
const TOP_GROUP = { collapsible: false as const, collapsed: false as const };

const sidebar: SidebarItemConfig[] = [
  { type: 'doc', id: 'bryn/index', label: 'Overview' },
  { type: 'doc', id: 'bryn/mcp', label: 'MCP Server' },
  {
    type: 'category',
    label: 'Control Plane API',
    ...TOP_GROUP,
    items: brynApiSidebar as SidebarItemConfig[],
  },
];

export default sidebar;
```

- [ ] **Step 2: Wire `bryn` into `sidebars.ts`**

Replace the body of `sidebars.ts` with:

```ts
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import civic from './sidebars/civic';
import auth from './sidebars/auth';
import labs from './sidebars/labs';
import bryn from './sidebars/bryn';

// Four-tab navigation: each navbar tab (docSidebar) selects one of these.
const sidebars: SidebarsConfig = { civic, auth, labs, bryn };

export default sidebars;
```

- [ ] **Step 3: Verify (deferred to Task 7 build)**

The `bryn/index` and `bryn/mcp` docs don't exist yet, so a build now would warn about missing docs. That's expected — full verification happens in Task 7 after Tasks 5–6. Do a typecheck only of the import resolution:

Run: `pnpm fetch-bryn-spec && pnpm gen-api-docs && pnpm exec tsc --noEmit`
Expected: no error about `../docs/bryn/api/sidebar` (if it errors on `.ts` vs `.js`, fix the import extension in Step 1). Errors about missing `bryn/index`/`bryn/mcp` doc ids are fine for now.

- [ ] **Step 4: Commit**

```bash
git add sidebars.ts sidebars/bryn.ts
git commit -m "feat: add Bryn sidebar composing generated API pages"
```

---

### Task 5: Bryn Overview page

**Files:**
- Create: `docs/bryn/index.mdx`

**Interfaces:**
- Consumes: global MDX components `Note`, `Card`, `CardGroup` (registered in `src/theme/MDXComponents.tsx`).
- Produces: doc id `bryn/index` referenced by the sidebar.

- [ ] **Step 1: Write the Overview page**

Create `docs/bryn/index.mdx`:

```mdx
---
title: Bryn
description: 'The Bryn Control Plane API and MCP server'
---

Bryn is Civic's agent platform. Its **Control Plane API** is a tenant-scoped REST
API for managing onboarding, plays, signals, entities, prompts, and more — and an
**MCP server** exposes the same capabilities to AI clients.

## Base URLs

| Environment | REST base URL | MCP endpoint |
|---|---|---|
| Production | `https://bryn.civic.com/api` | `https://bryn.civic.com/mcp` |
| Preprod | `https://bryn-preprod.civic.com/api` | `https://bryn-preprod.civic.com/mcp` |
| Development | `https://bryn-dev.civic.com/api` | `https://bryn-dev.civic.com/mcp` |

## Authentication

The API is authenticated with **Civic Auth** bearer tokens (`Authorization: Bearer <jwt>`).

The JWT identifies the caller, not the tenant. Bryn resolves the active tenant from
the caller's memberships on every request:

- One membership → that tenant is selected implicitly; no header needed.
- More than one → send `X-Bryn-Tenant: <tenantId>` naming one of your tenants.
- Multi-membership with the header missing → `403 ambiguous_tenant`.
- A tenant you don't belong to → `403 tenant_forbidden`.

<Note>
The `X-Bryn-Tenant` header is a selector, not the source of truth: the tenant bound
at the data layer is always taken from the matched membership.
</Note>

## Explore

<CardGroup cols={2}>
  <Card title="Control Plane API" icon="code" href="/bryn/api">
    Browse every REST endpoint with request/response schemas and an interactive
    "Try it" console.
  </Card>
  <Card title="MCP Server" icon="plug" href="/bryn/mcp">
    Connect an MCP client to Bryn over OAuth-secured streamable HTTP.
  </Card>
</CardGroup>
```

- [ ] **Step 2: Verify the doc id resolves**

Run: `pnpm fetch-bryn-spec && pnpm gen-api-docs && pnpm exec tsc --noEmit`
Expected: no errors mentioning `bryn/index`.

- [ ] **Step 3: Commit**

```bash
git add docs/bryn/index.mdx
git commit -m "docs: add Bryn section overview page"
```

---

### Task 6: Bryn MCP Server connection page

**Files:**
- Create: `docs/bryn/mcp.mdx`

**Interfaces:**
- Consumes: global MDX components `Note`, `Tabs`, `Tab` (`<Tab title="...">`).
- Produces: doc id `bryn/mcp` referenced by the sidebar and the Overview card.

- [ ] **Step 1: Write the MCP page**

Create `docs/bryn/mcp.mdx`:

```mdx
---
title: MCP Server
description: 'Connect an MCP client to the Bryn MCP server'
---

Bryn exposes a [Model Context Protocol](https://modelcontextprotocol.io) server so
AI clients can use the Control Plane's capabilities as tools. It speaks
**streamable HTTP** and is secured with **Civic Auth** over OAuth.

## Endpoint

```
https://bryn.civic.com/mcp
```

Preprod and development hosts follow the same pattern:
`https://bryn-preprod.civic.com/mcp` and `https://bryn-dev.civic.com/mcp`.

## Authentication

The server is OAuth-protected. Clients with native remote-MCP OAuth support connect
to the URL directly and complete a browser sign-in — the server publishes
[RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) protected-resource
metadata at `/.well-known/oauth-protected-resource/mcp`, which the client uses to
discover the Civic Auth authorization server. Your tenant is resolved automatically
from your Civic Auth membership, the same way the [REST API](/bryn/api) resolves it.

## Connecting

Clients that don't yet support remote MCP servers with OAuth can bridge through
[`mcp-remote`](https://www.npmjs.com/package/mcp-remote), which handles the OAuth
flow locally.

<Tabs>
  <Tab title="Claude Desktop">
Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bryn": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://bryn.civic.com/mcp"]
    }
  }
}
```

Restart Claude Desktop, then complete the Civic Auth sign-in when prompted.
  </Tab>
  <Tab title="Cursor">
Add to `~/.cursor/mcp.json` (or a project `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "bryn": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://bryn.civic.com/mcp"]
    }
  }
}
```

**Alternative:** Cursor Settings → Features → MCP → Add New MCP Server.
  </Tab>
  <Tab title="VS Code">
Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "bryn": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://bryn.civic.com/mcp"]
    }
  }
}
```
  </Tab>
</Tabs>

<Note>
Once connected, your client lists the tools Bryn provides — this page intentionally
doesn't catalogue them. Discover the current set directly in your MCP client.
</Note>
```

- [ ] **Step 2: Verify the doc id resolves**

Run: `pnpm fetch-bryn-spec && pnpm gen-api-docs && pnpm exec tsc --noEmit`
Expected: no errors mentioning `bryn/mcp` or `bryn/index`.

- [ ] **Step 3: Commit**

```bash
git add docs/bryn/mcp.mdx
git commit -m "docs: add Bryn MCP server connection page"
```

---

### Task 7: Full build, render verification, and CSS reconciliation

**Files:**
- Possibly modify: `src/css/custom.css` (only if the API pages clash with the dark theme)

**Interfaces:**
- Consumes: everything from Tasks 1–6.

- [ ] **Step 1: Clean build from scratch**

Run: `pnpm clear && pnpm build`
Expected: build completes. Review `onBrokenLinks`/`onBrokenAnchors` warnings — Bryn pages should not introduce new broken links. (`docItemComponent` swap must not break Civic/Auth/Labs builds.)

- [ ] **Step 2: Serve and visually verify**

Run: `pnpm serve` (preview the production build) — or `pnpm start` for live dev.
Check in the browser:
- A **Bryn** tab appears in the navbar after Labs.
- `/bryn` (Overview) renders: base-URL table, auth section, two cards.
- `/bryn/mcp` renders: endpoint, auth, and three client tabs with copy-pasteable `mcp-remote` config.
- The **Control Plane API** sidebar group lists all paths grouped by tag.
- An endpoint page (e.g. `GET /me`) shows request/response schemas and a **Try it** panel with the prod/preprod/dev servers in its dropdown.

- [ ] **Step 3: Reconcile theme CSS if needed**

If method badges, schema tables, or the Try-it panel look wrong in dark mode (the site default), add scoped overrides to `src/css/custom.css`. Keep changes minimal and brand-aligned. Skip this step entirely if the default theme already looks correct.

- [ ] **Step 4: Lint and test**

Run: `pnpm -r lint --fix && CI=1 pnpm test`
Expected: lint clean; tests pass (or report "no tests" — this repo has none, so the test step is a no-op).

- [ ] **Step 5: Commit any CSS changes**

```bash
git add src/css/custom.css
git commit -m "style: reconcile OpenAPI theme with dark default theme"
```

(Skip if Step 3 made no changes.)

---

## Verification (end-to-end)

1. `pnpm install` clean (Task 1).
2. `node scripts/fetch-bryn-spec.mjs` writes a patched spec with 3 servers + description (Task 2).
3. `pnpm build` from clean completes with no new broken-link warnings (Task 7).
4. Browser: Bryn tab → Overview, MCP Server, and the full Control Plane API reference all render; Try-it shows the server list (Task 7).
5. Existing Civic/Auth/Labs pages still render under `@theme/ApiItem` (Task 7).
6. Generated `docs/bryn/api/` and `static/bryn/openapi.json` are git-ignored (Task 2) — `git status` stays clean after a build.
7. Confirm the CI/Vercel build environment can reach `bryn.civic.com` (network egress).

## Notes / risks

- **`docsPluginId`**: defaults to `"classic"` per the plugin's quickstart; if generation/build can't find the docs plugin, switch to `"default"`.
- **Generated sidebar extension**: import path in `sidebars/bryn.ts` assumes `docs/bryn/api/sidebar(.ts)`; adjust if the plugin emits `.js`.
- **Network at build**: a non-200 from the spec URL fails the build by design (no stale fallback).
