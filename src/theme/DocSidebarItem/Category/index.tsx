/**
 * Sidebar category override: prefixes the category label with a FontAwesome
 * icon when the sidebar entry sets customProps.icon = "rocket" (etc).
 */
import React from 'react';
import Category from '@theme-original/DocSidebarItem/Category';
import type CategoryType from '@theme/DocSidebarItem/Category';
import type { WrapperProps } from '@docusaurus/types';
import { SidebarIcon } from '@site/src/theme/sidebarIcon';

type Props = WrapperProps<typeof CategoryType>;

export default function CategoryWrapper(props: Props): JSX.Element {
  const icon = (props.item as any)?.customProps?.icon as string | undefined;
  if (!icon) return <Category {...props} />;
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
  return <Category {...patched} />;
}