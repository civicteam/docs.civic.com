# Public Labs Documentation Strategy

## Overview
Keep the Labs tab public, but make specific groups and pages within it private. This creates a seamless experience where users can see what's available but need access for implementation details.

## Structure Changes in docs.json

```json
{
  "tab": "Labs",
  "groups": [
    {
      "group": " ",
      "pages": [
        "labs",
        "labs/flask-status",
        "labs/architecture",
        "labs/feedback"
      ]
    },
    {
      "group": "Flasks",
      "pages": [
        "labs/projects/mcp-hub",
        "labs/projects/guardrail-proxy",
        "labs/projects/bodyguard",
        "labs/projects/passthrough-proxy",
        "labs/projects/civic-knowledge"
      ]
    },
    {
      "group": "Concepts",
      "pages": [
        "labs/concepts/mcp",
        "labs/concepts/guardrails",
        "labs/concepts/prompt-injection",
        "labs/concepts/auth-strategies"
      ]
    },
    {
      "group": "Integration Guides",
      "pages": [
        "labs/getting-started",
        "labs/integration/authentication",
        "labs/integration/api-reference",
        "labs/integration/claude-desktop",
        "labs/integration/n8n-workflows",
        "labs/integration/vercel-ai"
      ]
    },
    {
      "group": "Developer Resources",
      "pages": [
        "labs/dev/endpoints",
        "labs/dev/sdk-reference",
        "labs/dev/deployment",
        "labs/dev/troubleshooting"
      ]
    }
  ]
}
```

### Making Pages Private

To make any page private, simply omit the `public: true` from the frontmatter (or set it to `false`). For example:

**Public page:**
```mdx
---
title: MCP Hub
public: true
---
```

**Private page:**
```mdx
---
title: MCP Hub Integration Guide
# No public: true means this page is private
---
```

## Content Strategy

### Public Content (Always Visible)

#### 1. Flask Pages - Transform into technical overviews:
- What the tool does (technical capabilities)
- Architecture diagrams (high-level)
- Use cases with technical context
- Integration patterns (conceptual)
- "Request Access" CTAs for implementation

#### 2. Concept Pages - Keep as educational resources:
- Technical explanations
- Industry context
- Security considerations
- Best practices

#### 3. Main Pages:
- labs.mdx - Overview with technical vision
- architecture.mdx - System design philosophy
- flask-status.mdx - Development stages
- feedback.mdx - Community engagement

### Private Content (Requires Access)

#### 1. Integration Guides group:
- Step-by-step setup instructions
- Authentication details and API keys
- Code snippets and examples
- Configuration templates

#### 2. Developer Resources group:
- API endpoints and parameters
- SDK method documentation
- Deployment commands
- Debug guides

## Page Transformation Examples

### MCP Hub (Public Flask Page)

```mdx
---
title: MCP Hub
description: Unified MCP server orchestration with enterprise auth
---

## Technical Overview
A hosted platform that manages multiple MCP servers with centralized authentication, container orchestration, and granular permissions.

## Architecture
- **Directory Service**: Dynamic server discovery and registration
- **Container Orchestrator**: Isolated execution environments
- **AuthZ Layer**: OAuth2 + JWT token management

## Integration Patterns
### Desktop AI Assistants
Connect Claude Desktop or other local agents to cloud MCP servers through our bridge protocol.

### Backend Services  
RESTful API supporting standard MCP operations with added security layers.

### Workflow Platforms
Pre-built integrations for n8n, Make, and Zapier (coming soon).

## Key Features
- Multi-tenant server isolation
- Token lifecycle management  
- Audit logging and monitoring
- Rate limiting and quotas

<Card title="Get Implementation Access" icon="key" href="/labs/feedback">
  Request access to integration guides, API docs, and code examples
</Card>
```

### Getting Started (Private Integration Guide)

```mdx
---
title: Getting Started with MCP Hub
# Note: This page is private because it doesn't have public: true
---

## Installation

\`\`\`bash
npm install @civic/mcp-hub-client
\`\`\`

## Authentication

\`\`\`javascript
const client = new MCPHubClient({
  apiKey: process.env.MCP_HUB_API_KEY,
  endpoint: 'https://hub.civic-labs.com/v1'
});
\`\`\`

## Quick Start Example
[Full code examples...]
```

## Implementation Details

### 1. Visual Indicators
- Lock icons next to private groups in sidebar
- "Private" badges on restricted pages
- Disabled state for locked content

### 2. Access Flow
- Public pages have "Request Access" cards
- Clicking leads to developer questionnaire
- Approved users see private groups appear
- Seamless navigation between public/private

### 3. Progressive Enhancement
- Public pages show what's possible
- Private pages show how to do it
- Same URL structure, different visibility

### 4. Benefits
- Single coherent Labs section
- Clear value proposition before access
- Natural progression from learning to doing
- Maintains developer focus throughout

This approach keeps everything under one Labs tab while clearly separating public technical overviews from private implementation details.