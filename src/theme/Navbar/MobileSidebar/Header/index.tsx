import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {contactUrl, bookCallUrl} = siteConfig.customFields as {
    contactUrl: string;
    bookCallUrl: string;
  };
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      <a
        href={contactUrl}
        className="navbar-sidebar__icon navbar-sidebar__icon--contact"
        aria-label="Contact Us"
      />
      <a
        href={bookCallUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-sidebar__icon navbar-sidebar__icon--book"
        aria-label="Book a Call"
      />
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  );
}
