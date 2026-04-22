/**
 * Sidebar leaf-link override: prefixes the link label with a FontAwesome
 * icon when the doc's frontmatter sets `sidebar_custom_props.icon: "terminal"`.
 * Reproduces Mintlify's per-page `icon:` frontmatter behavior.
 */
import React from 'react';
import Link from '@theme-original/DocSidebarItem/Link';
import type LinkType from '@theme/DocSidebarItem/Link';
import type { WrapperProps } from '@docusaurus/types';
import { SidebarIcon } from '@site/src/theme/sidebarIcon';

type Props = WrapperProps<typeof LinkType>;

export default function LinkWrapper(props: Props): JSX.Element {
  const icon = (props.item as any)?.customProps?.icon as string | undefined;
  if (!icon) return <Link {...props} />;
  const patched = {
    ...props,
    item: {
      ...props.item,
      label: (
        <>
          <SidebarIcon name={icon} />
          {props.item.label}
        </>
      ) as unknown as string,
    },
  } as Props;
  return <Link {...patched} />;
}