import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const algoliaEnv = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME,
};
const algoliaEnabled =
  !!algoliaEnv.appId && !!algoliaEnv.apiKey && !!algoliaEnv.indexName;

const config: Config = {
  title: 'Civic Docs',
  tagline:
    'The agent integrator for mid-market businesses. Platform documentation for Civic Hub, Civic Auth, and Civic Labs.',
  favicon: '/favicon.svg',

  url: 'https://docs.civic.com',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'civicteam',
  projectName: 'docs.civic.com',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    mdx1Compat: { comments: false, admonitions: false, headingIds: false },
    // Allow .md and .mdx side by side; llms.txt stays in /static.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Exclude snippet partials; they're imported by other MDX files but
          // should not generate their own routes.
          exclude: ['_snippets/**'],
          editUrl:
            'https://github.com/civicteam/docs.civic.com/edit/main/',
          showLastUpdateTime: false,
          // Mintlify doesn't render breadcrumbs above the H1; mirror that.
          breadcrumbs: false,
          // Top-level groups are opt-in non-collapsible in each sidebar file
          // (Mintlify renders them as always-open section headers). Nested
          // groups stay collapsible so /civic/reference/servers/* etc. can
          // fold away — keep the global default collapsible: true.
        },
        blog: false,
        pages: { path: 'src/pages' },
        theme: { customCss: './src/css/custom.css' },
        // GTM-KRZHVRL is loaded from src/clientModules/gtm.ts because the
        // built-in gtag plugin loads gtag.js (GA4), not full GTM.
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/nexus/quickstart/nexus-chat',
            to: '/civic/quickstart/civic-chat',
          },
          {
            from: '/civic/quickstart/nexus-chat',
            to: '/civic/quickstart/civic-chat',
          },
          {
            from: '/civic/recipes/python-pydantic',
            to: '/civic/recipes/pydantic-ai',
          },
        ],
        // Wildcard /nexus/:path* -> /civic/:path* : enumerate at build time
        // by listing current civic/* docs.
        createRedirects(existingPath) {
          if (existingPath.startsWith('/civic/')) {
            return [existingPath.replace(/^\/civic\//, '/nexus/')];
          }
          return undefined;
        },
      },
    ],
  ],

  clientModules: [
    './src/clientModules/fontawesome.ts',
    './src/clientModules/gtm.ts',
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap',
      },
    },
  ],

  themeConfig: {
    image: 'logo/dark.png',
    // Mintlify's docs.civic.com is dark always; match that. Users can still
    // toggle via the navbar switch, but OS prefers-color-scheme: light no
    // longer auto-flips the site.
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    navbar: {
      title: 'Civic Docs',
      logo: {
        alt: 'Civic',
        src: 'logo/light.png',
        srcDark: 'logo/dark.png',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'civic',
          label: 'Civic',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'auth',
          label: 'Auth',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'labs',
          label: 'Labs',
          position: 'left',
        },
        {
          label: 'Contact Us',
          href: 'mailto:bd@civic.com',
          position: 'right',
        },
        {
          label: 'Book a Call',
          href: 'https://civic.com',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Civic',
          items: [
            { label: 'civic.com', href: 'https://civic.com' },
            { label: 'bd@civic.com', href: 'mailto:bd@civic.com' },
          ],
        },
        {
          title: 'Follow',
          items: [
            { label: 'X', href: 'https://twitter.com/civickey' },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/civic-technologies',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@CivicTechnologies',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Civic Technologies, Inc.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      // nightOwl's palette is closer to Mintlify's dark Monokai-ish scheme
      // than the default dracula (cooler blues, softer pink for keywords).
      darkTheme: prismThemes.nightOwl,
      additionalLanguages: [
        'bash',
        'diff',
        'json',
        'tsx',
        'typescript',
        'python',
        'rust',
        'toml',
        'yaml',
      ],
    },
    ...(algoliaEnabled
      ? {
          algolia: {
            appId: algoliaEnv.appId!,
            apiKey: algoliaEnv.apiKey!,
            indexName: algoliaEnv.indexName!,
            contextualSearch: true,
          },
        }
      : {}),
  } satisfies Preset.ThemeConfig,
};

export default config;
