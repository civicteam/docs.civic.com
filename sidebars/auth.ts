import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

type SidebarItemConfig = Extract<SidebarsConfig[string], readonly unknown[]>[number];

const icon = (name: string) => ({ icon: name });

// See sidebars/civic.ts: top-level groups are always-open section headers.
const TOP_GROUP = { collapsible: false as const, collapsed: false as const };

const sidebar: SidebarItemConfig[] = [
  {
    type: 'category',
    label: 'Getting Started',
    ...TOP_GROUP,
    items: [
      'auth/index',
      'overview/pricing',
      'overview/bring-your-app-to-production',
      {
        type: 'category',
        label: 'Login Options',
        customProps: icon('arrow-right-to-bracket'),
        items: ['overview/login-options', 'overview/passkeys'],
      },
      'overview/faqs',
      'overview/authentication-flows',
      'overview/token-exchange',
      'overview/changelog',
    ],
  },
  {
    type: 'category',
    label: 'AI Prompts',
    customProps: icon('robot'),
    ...TOP_GROUP,
    items: [
      'ai-prompts/overview',
      'ai-prompts/nextjs',
      'ai-prompts/react',
      {
        type: 'category',
        label: 'Python',
        customProps: icon('python'),
        items: [
          'ai-prompts/python/fastapi',
          'ai-prompts/python/flask',
          'ai-prompts/python/django',
        ],
      },
      {
        type: 'category',
        label: 'Web3',
        customProps: icon('wallet'),
        items: ['ai-prompts/web3/solana', 'ai-prompts/web3/ethereum'],
      },
      {
        type: 'category',
        label: 'No-code Platforms',
        customProps: icon('wand-magic-sparkles'),
        items: [
          'ai-prompts/no-code/lovable',
          'ai-prompts/no-code/v0',
          'ai-prompts/no-code/replit',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Integration',
    ...TOP_GROUP,
    items: [
      'integration/react',
      'integration/nextjs',
      'integration/vanillajs',
      {
        type: 'category',
        label: 'Node.JS',
        customProps: icon('node-js'),
        items: [
          'integration/nodejs',
          'integration/nodejs/express',
          'integration/nodejs/hono',
          'integration/nodejs/fastify',
        ],
      },
      {
        type: 'category',
        label: 'Python',
        customProps: icon('python'),
        items: [
          'integration/python',
          'integration/python/fastapi',
          'integration/python/flask',
          'integration/python/django',
        ],
      },
      {
        type: 'category',
        label: 'Mobile',
        customProps: icon('mobile-screen-button'),
        items: ['integration/mobile/react-native'],
      },
      'integration/other',
      'integration/error-codes',
    ],
  },
  {
    type: 'category',
    label: 'Web3',
    ...TOP_GROUP,
    items: [
      'web3/embedded-wallets',
      'web3/ethereum-evm',
      'web3/solana',
    ],
  },
  {
    type: 'category',
    label: 'Libraries and Tools',
    customProps: icon('code'),
    ...TOP_GROUP,
    items: ['libraries/auth-verify'],
  },
  {
    type: 'category',
    label: 'Guides',
    ...TOP_GROUP,
    items: ['guides/add-auth-to-mcp'],
  },
  {
    type: 'category',
    label: 'Support',
    ...TOP_GROUP,
    items: ['auth/troubleshooting'],
  },
];

export default sidebar;
