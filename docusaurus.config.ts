import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

// Reads ALGOLIA_APP_ID / ALGOLIA_API_KEY / ALGOLIA_INDEX_NAME at build time.
// Until DocSearch approval lands, search stays disabled and Kapa widget is the
// only search UI.
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
    'The security layer for AI agents. Connect to 95+ MCP servers with guardrails, audit logs, and instant revocation.',
  favicon: '/favicon.svg',

  url: 'https://docs.civic.com',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'civicteam',
  projectName: 'docs.civic.com',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    mdx1Compat: { comments: false, admonitions: false, headingIds: false },
    // Allow .md and .mdx side by side; llms.txt stays in /static.
    format: 'detect',
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
          breadcrumbs: true,
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
    // Geist via Google Fonts as a bridge until self-hosted CalSans/Aeonik land.
    // Mintlify used family name "Geist" with Aeonik/CalSans woff2 files behind
    // it — this keeps the body face close until legal review clears.
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
    // Self-hosted fonts (see static/fonts/README.md for legal review notes).
    // @font-face lives in static/css/fonts.css so css-loader doesn't try to
    // resolve the woff2 path during the webpack build.
    {
      tagName: 'link',
      attributes: { rel: 'stylesheet', href: '/css/fonts.css' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/CalSans-SemiBold.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/Aeonik-Regular.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
  ],

  themeConfig: {
    image: 'logo/dark.png',
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
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
          href: 'https://join.slack.com/t/civic-developers/shared_invite/zt-37tv9fyo7-aDT43mUjOFQwdQFmfZLTRw',
          position: 'right',
        },
        {
          label: 'Try Civic',
          href: 'https://app.civic.com?utm_source=docs&utm_medium=hero-nav',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
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
