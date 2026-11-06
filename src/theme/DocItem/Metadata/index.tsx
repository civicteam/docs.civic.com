import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof MetadataType>;

// Bryn is the only indexed product. Every other doc (Civic, Auth, Labs and
// their shared pages) is served but kept out of search engines and the
// sitemap, which skips routes carrying a robots noindex tag.
const INDEXED_PREFIX = '/bryn';

export default function MetadataWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  const indexed =
    metadata.permalink === INDEXED_PREFIX ||
    metadata.permalink.startsWith(`${INDEXED_PREFIX}/`);
  return (
    <>
      <Metadata {...props} />
      {!indexed && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
    </>
  );
}
