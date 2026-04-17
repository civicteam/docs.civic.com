/**
 * Google Tag Manager injection.
 * Mintlify previously loaded GTM-KRZHVRL via `integrations.gtm.tagId`.
 * Docusaurus' built-in gtag plugin only supports gtag.js (GA4), not full GTM,
 * so we load the GTM loader snippet directly.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const GTM_ID = 'GTM-KRZHVRL';

if (ExecutionEnvironment.canUseDOM) {
  // dataLayer + loader (the "head" half of the official GTM snippet).
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);

  // noscript iframe (the "body" half of the snippet) for users with JS
  // disabled. We still inject it from JS; worst case it's a no-op.
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

export {};
