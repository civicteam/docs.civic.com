/**
 * Bryn pixel injection for production docs.civic.com.
 *
 * Docusaurus static `scripts` run on every deployed origin, including preview
 * builds. The pixel should only collect docs.civic.com traffic, so this module
 * injects the production pixel after confirming the canonical hostname.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const DOCS_HOSTNAME = 'docs.civic.com';
const BRYN_PIXEL_SRC = 'https://bryn.civic.com/pixel/pixel.js';
const BRYN_PIXEL_REF = 'c03f1a34-5ecf-4071-aea6-3cde827e50a9';

/** True only for the canonical production docs host. */
const isCanonicalDocsHost = (): boolean =>
  window.location.hostname === DOCS_HOSTNAME && process.env.NODE_ENV === 'production';

/** Prevent duplicate pixel tags during hot reloads or client-side re-entry. */
const hasBrynPixel = (): boolean =>
  document.querySelector(`script[src="${BRYN_PIXEL_SRC}"][data-bryn-pixel-ref="${BRYN_PIXEL_REF}"]`) !== null;

/** Append the Bryn pixel tag in the same shape the Control Plane onboarding snippet emits. */
const appendBrynPixel = (): void => {
  const script = document.createElement('script');
  script.async = true;
  script.src = BRYN_PIXEL_SRC;
  script.setAttribute('data-bryn-pixel-ref', BRYN_PIXEL_REF);
  document.head.appendChild(script);
};

if (ExecutionEnvironment.canUseDOM && isCanonicalDocsHost() && !hasBrynPixel()) {
  appendBrynPixel();
}

export {};
