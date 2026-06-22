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
console.log(`Wrote ${OUTPUT_PATH} — ${pathCount} paths, ${schemaCount} schemas`);
