/**
 * PostHog product analytics for docs.civic.com.
 *
 * Loaded directly (not via the GTM container, which fires GA4 / Ads / Reddit / …)
 * because we need the PostHog SDK on the page to (a) capture docs pageviews for the
 * "reading deep in the docs" roll-up and (b) stitch the Bryn pixel's resolved
 * identity onto the PostHog person/group so a server-side derived event resolves
 * back to the same Bryn Entity. The public project key ships in the browser bundle
 * (like the GTM id in gtm.ts); it is provided via `customFields.posthog` so it is
 * env-driven rather than hard-coded — see docusaurus.config.ts and .env.example.
 *
 * Consent: PostHog sets tracking cookies, so it is gated on CookieYes. It initializes
 * opted-out (capturing nothing, no tracking cookies) and only opts in once the visitor
 * accepts the "analytics" category in the CookieYes banner — read from CookieYes's own
 * consent cookie and kept in sync via its `cookieyes_consent_update` event. If consent
 * cannot be determined, PostHog stays off (fail-closed).
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';
import { posthog } from 'posthog-js';

import { BRYN_COMPANY_GROUP, computeBrynStitch } from '../lib/analytics/bryn-stitch';

type PostHogClientConfig = { key?: string; host?: string };

const DEFAULT_API_HOST = 'https://us.i.posthog.com';

// CookieYes consent category that governs PostHog. PostHog is product analytics and sets
// tracking cookies, so it runs only once the visitor accepts the "analytics" category.
const CONSENT_CATEGORY = 'analytics';

const readConfig = (): PostHogClientConfig => {
  const custom = (siteConfig.customFields ?? {}) as { posthog?: PostHogClientConfig };
  return custom.posthog ?? {};
};

// Skip in dev + on localhost, mirroring gtm.ts: no product analytics during local dev.
const isDev = process.env.NODE_ENV !== 'production';
const isLocalhost =
  typeof window !== 'undefined' &&
  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
const canRun = ExecutionEnvironment.canUseDOM && !isDev && !isLocalhost;

/**
 * Read CookieYes consent for a category from its `cookieyes-consent` cookie, whose value is
 * comma-separated `key:value` pairs (e.g. "...,analytics:yes,advertisement:no,..."). We read
 * the cookie rather than the consent-event detail because the cookie is the stable,
 * version-independent source of truth and also covers the returning-visitor case where the
 * event fired before this module loaded. Absent/unparseable ⇒ false (fail-closed).
 */
const hasConsent = (category: string): boolean => {
  const match = document.cookie.match(/(?:^|;\s*)cookieyes-consent=([^;]+)/);
  if (!match) return false;
  return decodeURIComponent(match[1])
    .split(',')
    .some((pair) => pair.trim() === `${category}:yes`);
};

let started = false;
// Latest Bryn resolution seen before consent was granted; applied once the visitor opts in.
let pendingStitch: unknown;

const applyBrynStitch = (detail: unknown): void => {
  const stitch = computeBrynStitch(detail);
  if (!stitch) return;
  try {
    // Super properties ride every event (incl. the server-side "reading deep" roll-up),
    // so the derived event resolves back to this Bryn Entity by bryn_entity_id.
    posthog.register(stitch.superProps);
    posthog.group(BRYN_COMPANY_GROUP, stitch.entityId, stitch.groupProps);
    if (stitch.identify) posthog.identify(stitch.identify.distinctId, stitch.identify.props);
  } catch {
    // Analytics must never break the docs page.
  }
};

// A Bryn resolution stitches identity — which writes PostHog cookies — so it only applies
// once the visitor has consented; otherwise the latest is stashed and applied on opt-in.
const onBrynResolution = (detail: unknown): void => {
  if (posthog.has_opted_in_capturing()) applyBrynStitch(detail);
  else pendingStitch = detail;
};

// Bring PostHog's capture state in line with the current CookieYes decision. Called at
// startup (honoring a returning visitor's prior choice) and on every consent change.
const syncConsent = (): void => {
  if (!started) return;
  const consented = hasConsent(CONSENT_CATEGORY);
  const optedIn = posthog.has_opted_in_capturing();
  if (consented && !optedIn) {
    posthog.opt_in_capturing(); // enables capture + persistence
    posthog.capture('$pageview'); // count the page the visitor consented on
    if (pendingStitch !== undefined) {
      applyBrynStitch(pendingStitch);
      pendingStitch = undefined;
    }
  } else if (!consented && optedIn) {
    posthog.opt_out_capturing(); // stops capture + clears PostHog storage
  }
};

if (canRun) {
  const { key, host } = readConfig();
  if (key) {
    posthog.init(key, {
      api_host: host || DEFAULT_API_HOST,
      // Captured manually so SPA client-side navigations count (see onRouteDidUpdate).
      capture_pageview: false,
      // Page-leave events give PostHog the session-duration / dwell signal the docs-depth
      // roll-up gates on.
      capture_pageleave: true,
      respect_dnt: true,
      // Capture nothing and set no tracking cookies until CookieYes analytics consent.
      opt_out_capturing_by_default: true,
    });
    started = true;

    // Stitch the Bryn pixel identity (docs.civic.com/bryn/frontend-recipes). The pixel may
    // already have resolved before this ran (window.bryn set), and it re-announces on every
    // later resolution; either way the stitch waits for consent (see onBrynResolution).
    const resolved = (window as unknown as { bryn?: unknown }).bryn;
    if (resolved) onBrynResolution(resolved);
    window.addEventListener('bryn:personalize', (event) => {
      onBrynResolution((event as CustomEvent).detail);
    });

    // Honor the current CookieYes decision now, then react to changes.
    syncConsent();
    document.addEventListener('cookieyes_consent_update', syncConsent);
  }
}

// Docusaurus is a SPA: capture a $pageview on each client-side navigation after the first
// (the consented-on page is captured in syncConsent). Guarding on previousLocation keeps a
// hash- or query-only change from double-counting a page in the session-depth roll-up, and
// the opt-in guard means navigations before consent are never captured.
export function onRouteDidUpdate({
  location,
  previousLocation,
}: {
  location: { pathname: string };
  previousLocation: { pathname: string } | null;
}): void {
  if (!started || !previousLocation) return;
  if (previousLocation.pathname === location.pathname) return;
  if (!posthog.has_opted_in_capturing()) return;
  posthog.capture('$pageview');
}
