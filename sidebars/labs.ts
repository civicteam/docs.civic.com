import type { SidebarItemConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types';

const sidebar: SidebarItemConfig[] = [
  {
    type: 'category',
    label: 'Civic Labs',
    collapsed: false,
    items: ['labs', 'labs/flask-status', 'labs/feedback'],
  },
  {
    type: 'category',
    label: 'Flasks',
    items: [
      'labs/projects/x402-mcp',
      'labs/projects/guardrail-proxy',
      'labs/projects/bodyguard',
      'labs/projects/passthrough-proxy',
      'labs/projects/civic-knowledge',
    ],
  },
  {
    type: 'category',
    label: 'Concepts',
    items: [
      'labs/concepts/mcp',
      'labs/concepts/guardrails',
      'labs/concepts/auth-strategies',
      'labs/concepts/rag',
    ],
  },
  {
    // 🔓 Integration tab - preserve private labs behavior on docs-next preview.
    type: 'category',
    label: '🔓 Integration',
    items: [
      'labs/private/getting-started',
      'labs/private/x402-mcp',
      'labs/private/guardrail-proxy',
      'labs/private/bodyguard',
      'labs/private/passthrough-proxy',
      'labs/private/civic-knowledge',
    ],
  },
];

export default sidebar;
