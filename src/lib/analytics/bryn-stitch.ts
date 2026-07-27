// Bryn pixel -> PostHog identity stitching for docs.civic.com.
//
// The Bryn pixel (loaded via docusaurus.config.ts `scripts`) deanonymizes the
// visitor and announces the resolution two ways — a `bryn:personalize` CustomEvent
// and the `window.bryn` global — as documented at
// https://docs.civic.com/bryn/frontend-recipes.
//
// This module turns that (untrusted, over-the-wire) payload into the PostHog
// group / identify / register calls that stitch the anonymous PostHog session to
// the Bryn-resolved company and person. Crucially it stamps `bryn_entity_id` as a
// super property so it rides EVERY event (including autocaptured `$pageview`s):
// that is the key a server-side PostHog event — the "reading deep in the docs"
// roll-up — carries back to Bryn so the ingest pipeline resolves it to the same
// Entity (frontend-recipes: "echo them back on your server-side events so both
// sources stitch to the same records").
//
// Kept framework-free and side-effect-free (no `posthog-js` import) so it is
// unit-testable in isolation and the SDK dependency stays contained to the client
// module that applies the result.

/** PostHog group type used for company-level (account) analytics. */
export const BRYN_COMPANY_GROUP = "company";

/** Company section of the serve payload (allowlisted display attributes). */
type BrynEntity = {
  entityId?: unknown;
  companyName?: unknown;
  domain?: unknown;
  industry?: unknown;
  country?: unknown;
  employees?: unknown;
  stage?: unknown;
};

/** Person section of the serve payload; `null` on a company-only resolution. */
type BrynIndividual = { individualId?: unknown };

/**
 * The stitch actions derived from a resolved Bryn payload — a plain data
 * description the caller applies to the PostHog SDK. `null` when the payload is
 * not a resolved visit or carries no usable company id (nothing to stitch).
 */
export type BrynStitch = {
  /** entity.entityId — the stable company key echoed onto events for end-to-end resolution. */
  readonly entityId: string;
  /** Company-level group properties (PostHog group analytics). */
  readonly groupProps: Record<string, string>;
  /** Super properties registered on every event, so server-side events carry them. */
  readonly superProps: Record<string, string>;
  /**
   * Person identity, present only when Bryn resolved the individual. `props` carries the
   * full resolved payload under a single `bryn` key (see {@link computeBrynStitch}).
   */
  readonly identify: { readonly distinctId: string; readonly props: Record<string, unknown> } | null;
};

/** Coerce a render-safe scalar to a non-empty string, or `undefined`. */
const str = (value: unknown): string | undefined => {
  if (typeof value === "string") return value.length > 0 ? value : undefined;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
};

/** Set `key` on `target` only when `value` coerces to a non-empty string. */
const put = (target: Record<string, string>, key: string, value: unknown): void => {
  const s = str(value);
  if (s !== undefined) target[key] = s;
};

/** Narrow an unknown value to a plain object, or `null`. */
const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;

/**
 * Compute the PostHog stitch for a `bryn:personalize` detail (equivalently
 * `window.bryn`). Returns `null` for cold / pending / suppressed / malformed
 * payloads and for a resolution with no company id — in every such case there is
 * nothing to stitch and the caller leaves PostHog untouched.
 *
 * A company-only resolution (no `individual`) still stitches: it sets
 * `bryn_entity_id` + the company group, so "reading deep" sessions from an
 * un-personified account still resolve back to their Bryn Entity. `identify` is
 * populated only when a person resolved, keyed by the opaque `individualId` (never
 * the email) so no PII lands in the PostHog distinct id.
 */
export const computeBrynStitch = (detail: unknown): BrynStitch | null => {
  const payload = asRecord(detail);
  if (!payload || payload.status !== "resolved") return null;

  const entity = asRecord(payload.entity) as BrynEntity | null;
  const entityId = entity ? str(entity.entityId) : undefined;
  if (!entityId) return null;

  const groupProps: Record<string, string> = {};
  if (entity) {
    put(groupProps, "name", entity.companyName); // PostHog group display-name convention
    put(groupProps, "domain", entity.domain);
    put(groupProps, "industry", entity.industry);
    put(groupProps, "country", entity.country);
    put(groupProps, "employees", entity.employees);
    put(groupProps, "stage", entity.stage);
  }

  const superProps: Record<string, string> = { bryn_entity_id: entityId };

  const individual = asRecord(payload.individual) as BrynIndividual | null;
  const individualId = individual ? str(individual.individualId) : undefined;
  if (individualId) superProps.bryn_individual_id = individualId;

  let identify: BrynStitch["identify"] = null;
  if (individual && individualId) {
    // Store the full resolved payload under a single `bryn` person property (matching the
    // control-plane-ui dogfood). A PostHog Action/webhook resolves the docs-depth event back
    // to this Bryn Entity via person.properties.bryn.entity.entityId. Nesting under one key
    // keeps Bryn's inferred data clear of PostHog's real person fields (email / name).
    identify = { distinctId: individualId, props: { bryn: payload } };
  }

  return { entityId, groupProps, superProps, identify };
};
