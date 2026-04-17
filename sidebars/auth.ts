import type { SidebarItemConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types';

const icon = (name: string) => ({ icon: name });

const sidebar: SidebarItemConfig[] = [
  {
    type: 'category',
    label: 'Getting Started',
    collapsed: false,
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
    items: ['libraries/auth-verify'],
  },
  {
    type: 'category',
    label: 'Guides',
    items: ['guides/add-auth-to-mcp'],
  },
  {
    type: 'category',
    label: 'Support',
    items: ['auth/troubleshooting'],
  },
];

export default sidebar;
