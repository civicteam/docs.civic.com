import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

type SidebarItemConfig = Extract<SidebarsConfig[string], readonly unknown[]>[number];

// See sidebars/civic.ts — top-level groups are always-open Mintlify-style
// section headers.
const TOP_GROUP = { collapsible: false as const, collapsed: false as const };

const sidebar: SidebarItemConfig[] = [
  {
    type: 'category',
    label: 'Civic Labs',
    ...TOP_GROUP,
    items: ['labs', 'labs/flask-status', 'labs/feedback'],
  },
  {
    type: 'category',
    label: 'Flasks',
    ...TOP_GROUP,
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
    ...TOP_GROUP,
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
    ...TOP_GROUP,
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
