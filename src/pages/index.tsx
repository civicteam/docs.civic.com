import React from 'react';
import { Redirect } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Bryn is the default tab: the site root forwards to /bryn. When the Bryn tab
 * is hidden for an environment (HIDE_BRYN=true), fall back to the Civic
 * welcome page instead so the root never lands on a hidden product.
 */
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const hideBryn = siteConfig.customFields?.hideBryn === true;
  return <Redirect to={hideBryn ? '/welcome' : '/bryn'} />;
}
