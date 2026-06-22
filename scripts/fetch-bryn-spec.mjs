/**
 * Fetch Bryn's live Control Plane OpenAPI spec and patch in the fields the
 * runtime `app.doc()` omits — `servers` (needed by the Try-it console),
 * `info.description`, and per-operation `tags` (the spec ships untagged, so we
 * derive a tag from each path's first segment to give the generated reference a
 * grouped sidebar). Run at build time; the output is a git-ignored build
 * artifact.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const SPEC_URL =
  process.env.BRYN_OPENAPI_URL ?? "https://bryn.civic.com/api/openapi.json";
const OUTPUT_PATH = "static/bryn/openapi.json";

const SERVERS = [
  { url: "https://bryn.civic.com/api", description: "Production" },
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

/** HTTP methods an OpenAPI path item can hold operations under. */
const HTTP_METHODS = ["get", "put", "post", "delete", "patch", "options", "head"];

/** Derive a Title Case tag from a path's first non-parameter segment. */
const tagForPath = (path) => {
  const segment = path.split("/").find((part) => part && !part.startsWith("{"));
  if (!segment) return "General";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// The live spec ships no tags, so the generated reference would collapse into a
// single "UNTAGGED" group. Tag each operation by its resource for a grouped sidebar.
for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
  const tag = tagForPath(path);
  for (const method of HTTP_METHODS) {
    const operation = pathItem[method];
    if (operation && !operation.tags?.length) operation.tags = [tag];
  }
}

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(spec, null, 2)}\n`);

const pathCount = Object.keys(spec.paths ?? {}).length;
const schemaCount = Object.keys(spec.components?.schemas ?? {}).length;
console.log(`Wrote ${OUTPUT_PATH} — ${pathCount} paths, ${schemaCount} schemas`);
