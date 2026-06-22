---
title: Bryn API docs section — design
date: 2026-06-22
status: approved-pending-review
---

# Bryn API docs section

## Context

`docs.civic.com` is a Docusaurus 3.10 site with three navbar tabs — **Civic**,
**Auth**, **Labs** — each backed by a sidebar file (`sidebars/{civic,auth,labs}.ts`)
wired through `sidebars.ts`. Bryn is a Civic product whose **Control Plane API** is
already live and public at `https://bryn.civic.com/api`. We want a fourth section,
**Bryn**, that hosts a browsable, interactive reference for that API alongside the
existing three.

Bryn's `control-plane-api` (an `@hono/zod-openapi` app) serves a generated spec at
`https://bryn.civic.com/api/openapi.json`. That endpoint is **public (HTTP 200, no
auth)** and **richer than the curated `etc/docs/Bryn-Control-Plane-OpenAPI-v0.1.yaml`
snapshot in the private `civicteam/bryn` repo**: 46 paths, 64 component schemas vs.
~30 paths. Hosting the live spec therefore needs no GitHub token and no private-repo
access. Bryn's second spec — the **Agent Engine API** — is explicitly *"Not exposed
outside the cluster"* (internal mTLS / service token) and is **out of scope**.

Bryn also exposes an **MCP server** at `https://bryn.civic.com/mcp` (streamable-HTTP
transport, OAuth via `@civic/auth-mcp` / RFC 9728 protected-resource discovery,
tenant derived from membership — the MCP equivalent of the REST `X-Bryn-Tenant`
selector). The section needs a short "how to connect" page for it, modelled on
<https://plus.excalidraw.com/docs/mcp> — connection details and per-client config,
**not** a catalogue of the tools it provides.

Intended outcome: a `Bryn` tab with (a) an interactive REST reference rendering every
Control Plane endpoint, always in sync with the live API, and (b) a brief MCP-server
connection page.

## Decisions

| Decision | Choice |
|----------|--------|
| Which spec | Control Plane API only (Agent Engine is internal-only) |
| Renderer | `docusaurus-plugin-openapi-docs` + `docusaurus-theme-openapi-docs` (per-endpoint MDX pages, sidebar-integrated, interactive — matches the site's multi-page UX) |
| Spec source | Fetched at build time from the live public URL `https://bryn.civic.com/api/openapi.json` |
| Endpoint scope | Show all paths the live spec returns (no filtering) |
| Try-it console | Enabled |
| MCP page | Brief connection guide for `bryn.civic.com/mcp` (no tool catalogue) |

## Architecture

### 1. Dependencies

Add (via `pnpm add`, matching the installed Docusaurus 3.10 / React 18):

- `docusaurus-plugin-openapi-docs` — generates MDX from the spec
- `docusaurus-theme-openapi-docs` — renders API pages + the "Try it" console

Peer-dependency compatibility with Docusaurus 3.10 must be confirmed at install
time (this is the main external risk; the plugin sometimes pins a Docusaurus
minor).

### 2. Build-time fetch + patch — `scripts/fetch-bryn-spec.mjs`

A small Node script (no new runtime deps) that:

1. Fetches `https://bryn.civic.com/api/openapi.json`.
2. Patches the two gaps the live `app.doc()` leaves out:
   - **`servers`** — inject prod / preprod / dev base URLs
     (`https://bryn.civic.com/api`, `https://bryn-preprod.civic.com/api`,
     `https://bryn-dev.civic.com/api`, taken from the documented servers in the
     v0.1 YAML). The "Try it" console needs at least one server to call.
   - **`info.description`** — inject a short intro plus the tenant-selection note
     (single Membership ⇒ implicit tenant; multi-Membership ⇒ `X-Bryn-Tenant`
     header required).
3. Writes the patched spec to a **gitignored** local path
   (e.g. `static/bryn/openapi.json`) that the plugin reads as its `specPath`.

A direct-URL `specPath` was rejected because it would leave the console with no
server and no description; fetching to a patched local file is the robust form of
"fetch at build time" and keeps the spec fresh on every build.

### 3. Generation wired into the build

`package.json` scripts:

- `gen-api-docs`: `docusaurus gen-api-docs bryn`
- `clean-api-docs`: `docusaurus clean-api-docs bryn`
- `fetch-bryn-spec`: `node scripts/fetch-bryn-spec.mjs`
- `build`: run `fetch-bryn-spec` → `gen-api-docs` → existing `docusaurus build`
- `start`: same prefix before `docusaurus start`
- `typecheck`: must run after generation (the `bryn` sidebar imports the generated
  `sidebar.js`), so it is sequenced after `gen-api-docs` too.

Generated output `docs/bryn/api/**` and the fetched `static/bryn/openapi.json` are
**gitignored** — both are build artifacts regenerated each run, so the repo never
holds a stale copy of the API surface.

### 4. Plugin / theme config — `docusaurus.config.ts`

- Add `docusaurus-plugin-openapi-docs` to `plugins`:
  ```ts
  ["docusaurus-plugin-openapi-docs", {
    id: "openapi",
    docsPluginId: "classic",            // must match the preset docs instance id — verify ("classic" vs "default") against the installed plugin version
    config: {
      bryn: {
        specPath: "static/bryn/openapi.json",
        outputDir: "docs/bryn/api",
        sidebarOptions: { groupPathsBy: "tag" },
      },
    },
  }]
  ```
- Add `themes: ["docusaurus-theme-openapi-docs"]`.
- Set `docItemComponent: "@theme/ApiItem"` on the preset `docs` config. This is the
  plugin's standard integration; `ApiItem` renders ordinary doc pages unchanged, so
  existing Civic/Auth/Labs pages are unaffected (to be verified).
- Add a navbar item: `{ type: "docSidebar", sidebarId: "bryn", label: "Bryn", position: "left" }`, after `Labs`.

### 5. Section content & sidebar

- **`sidebars/bryn.ts`** — imports the generated API sidebar slice and composes it
  with a hand-written overview, following the `TOP_GROUP` (non-collapsible header)
  convention used by the other sidebars:
  ```ts
  import brynApiItems from "../docs/bryn/api/sidebar"; // generated
  const sidebar = [
    { type: "doc", id: "bryn/index", label: "Overview" },
    { type: "doc", id: "bryn/mcp", label: "MCP Server" },
    { type: "category", label: "Control Plane API", ...TOP_GROUP, items: brynApiItems },
  ];
  ```
- Wire `bryn` into `sidebars.ts` (`{ civic, auth, labs, bryn }`).
- **`docs/bryn/index.mdx`** — hand-written Overview landing page modelled on
  `docs/labs.mdx`: what Bryn's Control Plane API is, base URLs, Civic Auth bearer +
  tenant-selection (`X-Bryn-Tenant`) explanation, and `<Card>`/`<CardGroup>` links
  into the generated reference and the MCP page. Uses the existing global MDX
  components.

### 5b. MCP server connection page — `docs/bryn/mcp.mdx`

A short hand-written page, modelled on the Excalidraw MCP doc and matching the
site's house style (`<Note>`, `<Tabs>`/`<Tab>`, `mcpServers` JSON blocks — see
`docs/civic/quickstart/hub-bridge.mdx`). Contents:

- **What it is** — one paragraph: Bryn's MCP server, streamable-HTTP, OAuth-secured.
- **Endpoint** — `https://bryn.civic.com/mcp` (plus preprod/dev hosts).
- **Authentication** — Civic Auth via OAuth. MCP clients with native remote-OAuth
  support connect to the URL directly and complete the browser sign-in (the server
  publishes RFC 9728 protected-resource metadata at
  `/.well-known/oauth-protected-resource/mcp`). Tenant is resolved from the
  caller's membership automatically.
- **Connecting** — `<Tabs>` with config for common clients (Claude Desktop, Cursor,
  VS Code), using `mcp-remote` for clients without native remote-OAuth, e.g.:
  ```json
  { "mcpServers": { "bryn": { "command": "npx",
      "args": ["-y", "mcp-remote", "https://bryn.civic.com/mcp"] } } }
  ```
- Explicitly **not** a tool reference — one line pointing readers to discover tools
  in their client after connecting.

### 6. Theme CSS reconciliation

The site is dark-by-default with a custom theme (`src/css/custom.css`, FontAwesome
sidebar icons, custom `DocSidebarItem`). The OpenAPI theme ships its own CSS
(method badges, schema tables, the demo panel). Reconcile colours/spacing in
`custom.css` so the API pages match the brand in both light and dark modes.

## Data flow

```
pnpm build
  └─ fetch-bryn-spec.mjs ── GET bryn.civic.com/api/openapi.json ─▶ static/bryn/openapi.json (patched: servers + description)
       └─ docusaurus gen-api-docs bryn ── reads specPath ─▶ docs/bryn/api/**.mdx + sidebar.js
            └─ docusaurus build ── ApiItem + theme ─▶ /bryn/** pages with Try-it console
```

## Error handling

- **Fetch failure** (network / non-200): the fetch script fails loudly and aborts
  the build — a stale or missing spec must not silently ship. (No fallback to a
  vendored copy; per the build-time-fetch decision the live API is the source of
  truth.)
- **Generation failure**: surfaced by `gen-api-docs`; build stops.
- **Broken links**: site uses `onBrokenLinks: "warn"`; the Overview's hand-written
  links into generated pages should be checked against generated slugs.

## Testing / verification

1. `pnpm install` succeeds with the new plugin/theme (no peer-dep conflict).
2. `pnpm start` (after fetch+gen) serves a working **Bryn** tab; Overview renders;
   the API category lists all 46 paths grouped by tag.
3. An endpoint page (e.g. `GET /me`) shows request/response schemas and a "Try it"
   console populated with the prod/preprod/dev servers.
4. `pnpm build` completes; `onBrokenLinks` warnings reviewed.
5. `pnpm typecheck` passes (generated sidebar import resolves).
6. Existing Civic/Auth/Labs pages render unchanged under `@theme/ApiItem`.
7. Confirm CI/Vercel build can reach `bryn.civic.com`.
8. The **MCP Server** page renders, links resolve, and the `mcp-remote` snippet is
   copy-pasteable.

## Out of scope

- Agent Engine API (internal-only).
- Filtering / curating which endpoints appear (show all).
- Committing the spec or generated MDX to git (build artifacts only).
- A catalogue / reference of the MCP server's individual tools.
