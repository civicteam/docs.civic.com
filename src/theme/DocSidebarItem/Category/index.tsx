/**
 * Sidebar category override: prefixes the category label with a FontAwesome
 * icon when the sidebar entry sets customProps.icon = "rocket" (etc). This
 * reproduces the Mintlify docs.json `"icon": "rocket"` behavior.
 */
import React from 'react';
import Category from '@theme-original/DocSidebarItem/Category';
import type CategoryType from '@theme/DocSidebarItem/Category';
import type { WrapperProps } from '@docusaurus/types';

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
          <i
            className={`fa-solid fa-${icon}`}
            style={{ width: 16, marginRight: 8, opacity: 0.8 }}
            aria-hidden
          />
          {props.item.label}
        </>
      ) as unknown as string,
    },
  } as Props;
  return <Category {...patched} />;
}
