# Civic MCP Client Docs Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update recipe docs to use `@civic/mcp-client` (JS) and `civic-mcp-client` (Python) adapter libraries, and add a new LangChain.js page.

**Architecture:** Each recipe page gets a simpler code example that uses the civic client library's adapter pattern instead of raw `@modelcontextprotocol/sdk` setup. The Python `langchain.mdx` is rewritten to use `civic-mcp-client[langchain]`; a new `langchain-js.mdx` page is added for the JS counterpart. The sidebar and compatibility table are updated to reflect the new page.

**Tech Stack:** MDX (Docusaurus), `@civic/mcp-client` v1.0.1, `civic-mcp-client` v0.1.0, LangGraph (JS + Python), Vercel AI SDK, Pydantic AI, OpenAI SDK, DeepAgents

---

## File Map

| Action | File |
|--------|------|
| Create | `docs/civic/recipes/langchain-js.mdx` |
| Rewrite | `docs/civic/recipes/langchain.mdx` |
| Modify | `docs/civic/recipes/vercel-ai-sdk.mdx` |
| Modify | `docs/civic/recipes/pydantic-ai.mdx` |
| Modify | `docs/civic/recipes/openai-sdk.mdx` |
| Modify | `docs/civic/recipes/deepagents.mdx` |
| Modify | `sidebars/civic.ts` |
| Modify | `docs/civic/reference/client-compatibility.mdx` |

---

### Task 1: Create `langchain-js.mdx` (new LangChain.js page)

**Files:**
- Create: `docs/civic/recipes/langchain-js.mdx`

- [ ] **Step 1: Create the file**

Write `docs/civic/recipes/langchain-js.mdx` with this exact content:

```mdx
---
title: LangChain.js / LangGraph
description: Connect a LangGraph agent to Civic's MCP Hub using @civic/mcp-client
sidebar_custom_props:
  icon: "square-js"
---

Connect a [LangGraph](https://langchain-ai.github.io/langgraphjs/) agent to Civic using `@civic/mcp-client` with the built-in LangChain adapter. The adapter returns `DynamicStructuredTool` instances ready to drop into `createReactAgent`, the legacy `AgentExecutor`, or any custom LangGraph graph.

## Prerequisites

- Node.js 18+
- A Civic account at [app.civic.com](https://app.civic.com) with a configured toolkit
- A Civic token and an LLM API key (e.g. Anthropic or OpenAI)

## Installation

\`\`\`bash
pnpm add @civic/mcp-client @langchain/core @langchain/anthropic @langchain/langgraph
\`\`\`

<Card title="Get Your Credentials" icon="key" href="/civic/quickstart/credentials">
  How to generate a Civic token and configure toolkit URL parameters
</Card>

## Environment Variables

\`\`\`bash
CIVIC_TOKEN=your-civic-token
ANTHROPIC_API_KEY=your-anthropic-key
\`\`\`

## Connecting to Civic

Use `CivicMcpClient` with `langchainAdapter()` to get tools, then pass them to `createReactAgent`:

\`\`\`typescript
import { CivicMcpClient } from "@civic/mcp-client";
import { langchainAdapter } from "@civic/mcp-client/adapters/langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const client = new CivicMcpClient({
  auth: { token: process.env.CIVIC_TOKEN! },
});

const tools = await client.getTools(langchainAdapter());

const agent = createReactAgent({
  llm: new ChatAnthropic({ model: "claude-sonnet-4-6" }),
  tools,
});
\`\`\`

## Running the Agent

\`\`\`typescript
async function main() {
  const result = await agent.invoke({
    messages: [{ role: "user", content: "What events do I have today?" }],
  });

  console.log(result.messages.at(-1)?.content);
  await client.close();
}

main().catch(console.error);
\`\`\`

## Production Configuration

### Lock to a Toolkit

For production agents, scope to a specific profile:

\`\`\`typescript
const client = new CivicMcpClient({
  auth: { token: process.env.CIVIC_TOKEN! },
  civicProfile: process.env.CIVIC_PROFILE_ID,
});
\`\`\`

When a profile is specified, the session is locked by default — the agent cannot switch toolkits or modify its own guardrails. This prevents prompt injection attacks from escaping the defined tool scope.

### Multi-Turn Conversations

Pass a `checkpointer` to `createReactAgent` to retain conversation history across invocations:

\`\`\`typescript
import { MemorySaver } from "@langchain/langgraph";

const agent = createReactAgent({
  llm: new ChatAnthropic({ model: "claude-sonnet-4-6" }),
  tools,
  checkpointer: new MemorySaver(),
});

const config = { configurable: { thread_id: "session-1" } };

const result = await agent.invoke(
  { messages: [{ role: "user", content: "What events do I have today?" }] },
  config
);
\`\`\`

## Next Steps

<CardGroup cols={2}>
  <Card title="LangChain (Python)" icon="python" href="/civic/recipes/langchain">
    Python LangGraph integration using civic-mcp-client
  </Card>
  <Card title="Agent Deployment" icon="robot" href="/civic/quickstart/clients/agents">
    Production deployment guide: profile locking, URL params, authentication
  </Card>
  <Card title="Guardrails" icon="shield" href="/civic/concepts/guardrails">
    Constrain what tools your LangGraph agent can use
  </Card>
  <Card title="Get Credentials" icon="key" href="/civic/quickstart/credentials">
    Token generation and URL parameter reference
  </Card>
</CardGroup>
```

- [ ] **Step 2: Verify file exists and looks correct**

```bash
head -10 docs/civic/recipes/langchain-js.mdx
```

Expected: frontmatter with `title: LangChain.js / LangGraph`

- [ ] **Step 3: Commit**

```bash
git add docs/civic/recipes/langchain-js.mdx
git commit -m "docs: add LangChain.js recipe using @civic/mcp-client langchainAdapter"
```

---

### Task 2: Rewrite `langchain.mdx` (Python, using civic-mcp-client)

**Files:**
- Rewrite: `docs/civic/recipes/langchain.mdx`

- [ ] **Step 1: Replace the entire file**

Write `docs/civic/recipes/langchain.mdx` with this exact content:

```mdx
---
title: LangChain (Python)
description: Connect a LangGraph agent to Civic's MCP Hub using civic-mcp-client
sidebar_custom_props:
  icon: "python"
---

Connect a [LangGraph](https://langchain-ai.github.io/langgraph/) agent to Civic using `civic-mcp-client` with the built-in LangChain adapter. The adapter returns `DynamicStructuredTool` instances ready to use with `create_react_agent`.

## Prerequisites

- Python 3.11+
- A Civic account at [app.civic.com](https://app.civic.com) with a configured toolkit
- A Civic token and an LLM API key (e.g. Anthropic)

## Installation

\`\`\`bash
pip install "civic-mcp-client[langchain]" langchain-anthropic langgraph python-dotenv
\`\`\`

## Environment Variables

\`\`\`bash
CIVIC_TOKEN=your-civic-token
ANTHROPIC_API_KEY=your-anthropic-key
\`\`\`

<Card title="Get Your Credentials" icon="key" href="/civic/quickstart/credentials">
  How to generate a Civic token and configure toolkit URL parameters
</Card>

## Connecting to Civic

Use `CivicMCPClient` with the `langchain()` adapter to get `DynamicStructuredTool` instances, then pass them to `create_react_agent`:

\`\`\`python
import asyncio
import os
from dotenv import load_dotenv
from civic_mcp_client import CivicMCPClient
from civic_mcp_client.adapters.langchain import langchain
from langchain_anthropic import ChatAnthropic
from langgraph.prebuilt import create_react_agent

load_dotenv()

async def main():
    client = CivicMCPClient(auth={"token": os.environ["CIVIC_TOKEN"]})
    tools = await client.adapt_for(langchain())

    agent = create_react_agent(
        model=ChatAnthropic(model="claude-sonnet-4-6"),
        tools=tools,
    )

    result = await agent.ainvoke(
        {"messages": [{"role": "user", "content": "What events do I have today?"}]}
    )
    print(result["messages"][-1].content)

    await client.close()

asyncio.run(main())
\`\`\`

## Production Configuration

### Lock to a Toolkit

For production agents, scope to a specific toolkit:

\`\`\`python
client = CivicMCPClient(
    auth={"token": os.environ["CIVIC_TOKEN"]},
    civic_profile="your-production-profile-id",
)
\`\`\`

When a profile is specified, the session is locked by default — the agent cannot switch toolkits or modify its own guardrails. This prevents prompt injection attacks from escaping the defined tool scope.

### Multi-Turn Conversations

Pass a `checkpointer` to `create_react_agent` to retain conversation history across invocations:

\`\`\`python
from langgraph.checkpoint.memory import MemorySaver

agent = create_react_agent(
    model=ChatAnthropic(model="claude-sonnet-4-6"),
    tools=tools,
    checkpointer=MemorySaver(),
)

config = {"configurable": {"thread_id": "session-1"}}

result = await agent.ainvoke(
    {"messages": [{"role": "user", "content": "What events do I have today?"}]},
    config,
)
\`\`\`

## Reference Implementation

A complete reference implementation including a FastAPI chat UI, streaming responses, and production patterns is available at:

[github.com/civicteam/langchain-nexus-reference-implementation](https://github.com/civicteam/langchain-nexus-reference-implementation)

## Next Steps

<CardGroup cols={2}>
  <Card title="LangChain.js" icon="square-js" href="/civic/recipes/langchain-js">
    JavaScript LangGraph integration using @civic/mcp-client
  </Card>
  <Card title="Agent Deployment" icon="robot" href="/civic/quickstart/clients/agents">
    Production deployment guide: profile locking, URL params, authentication
  </Card>
  <Card title="Guardrails" icon="shield" href="/civic/concepts/guardrails">
    Constrain what tools your LangGraph agent can use
  </Card>
  <Card title="Get Credentials" icon="key" href="/civic/quickstart/credentials">
    Token generation and URL parameter reference
  </Card>
</CardGroup>
```

- [ ] **Step 2: Verify key change**

```bash
grep -n "civic_mcp_client\|MultiServerMCPClient" docs/civic/recipes/langchain.mdx
```

Expected: lines with `civic_mcp_client`, no lines with `MultiServerMCPClient`

- [ ] **Step 3: Commit**

```bash
git add docs/civic/recipes/langchain.mdx
git commit -m "docs: rewrite langchain.mdx to use civic-mcp-client[langchain] adapter"
```

---

### Task 3: Update `vercel-ai-sdk.mdx` to use `@civic/mcp-client`

**Files:**
- Modify: `docs/civic/recipes/vercel-ai-sdk.mdx`

The key changes are:
1. Installation: replace `@modelcontextprotocol/sdk` with `@civic/mcp-client`
2. Remove the note about `experimental_createMCPClient` SDK version differences
3. Rewrite `getCivicTools` helper to use `CivicMcpClient` + `vercelAIAdapter()`

- [ ] **Step 1: Update the installation section**

Find:
```
pnpm install ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/react @modelcontextprotocol/sdk @civic/auth
```

Replace with:
```
pnpm install ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/react @civic/mcp-client @civic/auth
```

- [ ] **Step 2: Remove the `experimental_createMCPClient` version note**

Remove this entire `<Note>` block from the file:

```
<Note>
**Vercel AI SDK version**: `experimental_createMCPClient` ships in the `ai` package for **AI SDK v5**. If you're on **v6+**, install `@ai-sdk/mcp` and import from there instead:
```bash
pnpm install @ai-sdk/mcp
```
```typescript
// v6+
import { experimental_createMCPClient } from '@ai-sdk/mcp';
// v5
import { experimental_createMCPClient } from 'ai';
```
</Note>
```

- [ ] **Step 3: Replace the `getCivicTools` helper section**

Find (the entire `## Create Civic Tools Helper` section and its code block):

```
## Create Civic Tools Helper

\`\`\`typescript
// lib/ai/tools/civic.ts
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { getTokens } from "@civic/auth/nextjs";
import { experimental_createMCPClient as createMCPClient } from "ai"; // use @ai-sdk/mcp for v6+

export const getCivicTools = async () => {
  const { accessToken } = (await getTokens()) ?? {};
  // getTokens() exchanges the user's Civic Auth session for a hub access token
  if (!accessToken) {
    return {}; // Return empty tools if user isn't authenticated
  }

  try {
    const transport = new StreamableHTTPClientTransport(
      new URL('https://app.civic.com/hub/mcp'), {
        requestInit: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );

    const mcpClient = await createMCPClient({ transport });
    return mcpClient.tools();
  } catch (error) {
    console.warn('Failed to load Civic tools, continuing without them:', error);
    return {};
  }
}
\`\`\`
```

Replace with:

```
## Create Civic Tools Helper

\`\`\`typescript
// lib/ai/tools/civic.ts
import { CivicMcpClient } from "@civic/mcp-client";
import { vercelAIAdapter } from "@civic/mcp-client/adapters/vercel-ai";
import { getTokens } from "@civic/auth/nextjs";

export const getCivicTools = async () => {
  const { accessToken } = (await getTokens()) ?? {};
  // getTokens() exchanges the user's Civic Auth session for a hub access token
  if (!accessToken) return {};

  const client = new CivicMcpClient({
    auth: { token: accessToken },
  });
  return client.getTools(vercelAIAdapter());
};
\`\`\`
```

- [ ] **Step 4: Verify the changes**

```bash
grep -n "modelcontextprotocol\|experimental_createMCPClient\|CivicMcpClient\|vercelAIAdapter" docs/civic/recipes/vercel-ai-sdk.mdx
```

Expected: lines with `CivicMcpClient` and `vercelAIAdapter`, no lines with `modelcontextprotocol` or `experimental_createMCPClient`

- [ ] **Step 5: Commit**

```bash
git add docs/civic/recipes/vercel-ai-sdk.mdx
git commit -m "docs: update vercel-ai-sdk recipe to use @civic/mcp-client vercelAIAdapter"
```

---

### Task 4: Update `pydantic-ai.mdx` standalone tab to use `civic-mcp-client`

**Files:**
- Modify: `docs/civic/recipes/pydantic-ai.mdx`

Only the `Script / Agent (Civic Token)` tab changes. The web app tabs (FastAPI, Flask, Django) keep their existing `MCPServerStreamableHTTP` + civic-auth approach unchanged.

- [ ] **Step 1: Update the installation line in the Script tab**

Find:
```
pip install pydantic-ai python-dotenv
```

Replace with:
```
pip install "civic-mcp-client[pydanticai]" python-dotenv
```

- [ ] **Step 2: Update the env vars in the Script tab**

Find (the `.env` block in the Script tab):
```
    ```bash
    # .env
    CIVIC_TOKEN=your-civic-token-here
    CIVIC_URL=https://app.civic.com/hub/mcp
    ```
```

Replace with:
```
    ```bash
    # .env
    CIVIC_TOKEN=your-civic-token-here
    ANTHROPIC_API_KEY=your-anthropic-key
    ```
```

- [ ] **Step 3: Replace the Script tab code example**

Find (the entire python code block in the Script tab):
```python
    import os
    import asyncio
    from dotenv import load_dotenv
    from pydantic_ai import Agent
    from pydantic_ai.mcp import MCPServerStreamableHTTP

    load_dotenv()

    server = MCPServerStreamableHTTP(
        os.environ["CIVIC_URL"],
        headers={"Authorization": f"Bearer {os.environ['CIVIC_TOKEN']}"},
    )

    agent = Agent("anthropic:claude-sonnet-4-6", mcp_servers=[server])

    async def main():
        async with agent.run_mcp_servers():
            result = await agent.run("List open PRs in civicteam/ai-chatbot")
        print(result.output)

    asyncio.run(main())
```

Replace with:
```python
    import os
    import asyncio
    from dotenv import load_dotenv
    from civic_mcp_client import CivicMCPClient
    from civic_mcp_client.adapters.pydanticai import pydanticai
    from pydantic_ai import Agent

    load_dotenv()

    async def main():
        client = CivicMCPClient(auth={"token": os.environ["CIVIC_TOKEN"]})
        tools = await client.adapt_for(pydanticai())

        agent = Agent("anthropic:claude-sonnet-4-6", tools=tools)
        result = await agent.run("List open PRs in civicteam/ai-chatbot")
        print(result.output)

        await client.close()

    asyncio.run(main())
```

- [ ] **Step 4: Remove the Tip callout about tool customization** (it referenced Pydantic AI MCP client docs, which is no longer the approach for this tab)

Find and remove:
```
    <Tip>
      You can customize tool names, arguments, and filtering. See [Pydantic AI MCP client docs](https://ai.pydantic.dev/mcp/client/#tool-call-customization).
    </Tip>
```

- [ ] **Step 5: Verify**

```bash
grep -n "MCPServerStreamableHTTP\|CivicMCPClient\|pydanticai" docs/civic/recipes/pydantic-ai.mdx
```

Expected: `CivicMCPClient` and `pydanticai` appear in the Script tab; `MCPServerStreamableHTTP` still appears in the web app tabs (FastAPI/Flask/Django).

- [ ] **Step 6: Commit**

```bash
git add docs/civic/recipes/pydantic-ai.mdx
git commit -m "docs: update pydantic-ai standalone script to use civic-mcp-client[pydanticai] adapter"
```

---

### Task 5: Update `openai-sdk.mdx` to use `@civic/mcp-client`

**Files:**
- Modify: `docs/civic/recipes/openai-sdk.mdx`

Changes:
1. Installation: replace `@modelcontextprotocol/sdk` with `@civic/mcp-client`
2. Replace `createMCP()` helper with `CivicMcpClient` + `openAIAdapter()`
3. Update tool calling in the loop to use `client.callTool()`

- [ ] **Step 1: Update the installation line**

Find:
```
npm install openai @modelcontextprotocol/sdk
```

Replace with:
```
npm install openai @civic/mcp-client
```

- [ ] **Step 2: Replace the `## Create an MCP Client` section**

Find (entire section including the code block):
```
## Create an MCP Client

\`\`\`ts
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

async function createMCP(token: string) {
  const transport = new StreamableHTTPClientTransport(
    new URL(process.env.CIVIC_URL!),
    {
      requestInit: {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    }
  );
  const client = new Client(
    { name: 'my-app', version: '1.0.0' },
    { capabilities: {} }
  );
  await client.connect(transport);
  return client;
}
\`\`\`
```

Replace with:
```
## Create a Civic Client

\`\`\`ts
import { CivicMcpClient } from '@civic/mcp-client';
import { openAIAdapter } from '@civic/mcp-client/adapters/openai';

function createCivicClient(token: string) {
  return new CivicMcpClient({
    auth: { token },
  });
}
\`\`\`
```

- [ ] **Step 3: Replace the `## Call with Tool Functions` code block**

Find (the full `chatWithTools` function):
```ts
import OpenAI from 'openai';

export async function chatWithTools(messages: any[], civicToken: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const mcp = await createMCP(civicToken);
  const { tools } = await mcp.listTools();

  const toolDefs = tools.map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.inputSchema,
    },
  }));

  // Multi-turn tool loop — runs until the model stops requesting tools
  let response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    tools: toolDefs,
    tool_choice: 'auto',
  });

  while (response.choices[0]?.finish_reason === 'tool_calls') {
    const toolCalls = response.choices[0].message.tool_calls ?? [];
    const toolResults = await Promise.all(
      toolCalls.map(async (call) => {
        const args = JSON.parse(call.function.arguments || '{}');
        const result = await mcp.callTool({ name: call.function.name, arguments: args });
        return {
          role: 'tool' as const,
          tool_call_id: call.id,
          content: JSON.stringify(result.content),
        };
      })
    );

    messages = [
      ...messages,
      response.choices[0].message,
      ...toolResults,
    ];

    response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools: toolDefs,
    });
  }

  await mcp.close();
  return response;
}
```

Replace with:
```ts
import OpenAI from 'openai';

export async function chatWithTools(messages: any[], civicToken: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const client = createCivicClient(civicToken);
  const tools = await client.getTools(openAIAdapter());

  // Multi-turn tool loop — runs until the model stops requesting tools
  let response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    tools,
    tool_choice: 'auto',
  });

  while (response.choices[0]?.finish_reason === 'tool_calls') {
    const toolCalls = response.choices[0].message.tool_calls ?? [];
    const toolResults = await Promise.all(
      toolCalls.map(async (call) => {
        const args = JSON.parse(call.function.arguments || '{}');
        const result = await client.callTool(call.function.name, args);
        return {
          role: 'tool' as const,
          tool_call_id: call.id,
          content: JSON.stringify(result.content),
        };
      })
    );

    messages = [
      ...messages,
      response.choices[0].message,
      ...toolResults,
    ];

    response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools,
    });
  }

  await client.close();
  return response;
}
```

- [ ] **Step 4: Verify**

```bash
grep -n "modelcontextprotocol\|CivicMcpClient\|openAIAdapter\|createMCP" docs/civic/recipes/openai-sdk.mdx
```

Expected: `CivicMcpClient` and `openAIAdapter` present; `modelcontextprotocol` and `createMCP` absent.

- [ ] **Step 5: Commit**

```bash
git add docs/civic/recipes/openai-sdk.mdx
git commit -m "docs: update openai-sdk recipe to use @civic/mcp-client openAIAdapter"
```

---

### Task 6: Update `deepagents.mdx` to use `civic-mcp-client[langchain]`

**Files:**
- Modify: `docs/civic/recipes/deepagents.mdx`

- [ ] **Step 1: Read the full current file**

```bash
cat docs/civic/recipes/deepagents.mdx
```

Note the full file content before making changes (there's a FastAPI lifespan pattern).

- [ ] **Step 2: Update the installation section**

Find the `uv add` line:
```
uv add deepagents langchain-mcp-adapters langchain-anthropic fastapi uvicorn python-dotenv
```

Replace with:
```
uv add deepagents "civic-mcp-client[langchain]" langchain-anthropic fastapi uvicorn python-dotenv
```

Find the `pip install` line:
```
pip install deepagents langchain-mcp-adapters langchain-anthropic fastapi uvicorn python-dotenv
```

Replace with:
```
pip install deepagents "civic-mcp-client[langchain]" langchain-anthropic fastapi uvicorn python-dotenv
```

- [ ] **Step 3: Update the env vars**

Find:
```bash
CIVIC_URL=https://app.civic.com/hub/mcp?profile=your-toolkit&lock=true
```

The `CIVIC_URL` env var is no longer needed for client setup (the library uses the default URL). Remove this line, keeping only:
```bash
CIVIC_TOKEN=your-civic-token
ANTHROPIC_API_KEY=your-anthropic-key   # or OPENAI_API_KEY, etc.
```

- [ ] **Step 4: Replace the MCP client import and setup in the Connecting section**

Find the import block:
```python
from langchain_mcp_adapters.client import MultiServerMCPClient
```

Replace with:
```python
from civic_mcp_client import CivicMCPClient
from civic_mcp_client.adapters.langchain import langchain
```

- [ ] **Step 5: Replace the `MultiServerMCPClient` initialization**

Find:
```python
    mcp_client = MultiServerMCPClient({
        "civic-nexus": {
            "transport": "streamable_http",
            "url": os.environ["CIVIC_URL"],
            "headers": {"Authorization": f"Bearer {os.environ['CIVIC_TOKEN']}"},
        }
    })

    tools = await mcp_client.get_tools()
```

Replace with:
```python
    mcp_client = CivicMCPClient(auth={"token": os.environ["CIVIC_TOKEN"]})
    tools = await mcp_client.adapt_for(langchain())
```

- [ ] **Step 6: Find and update the shutdown/cleanup call** (if present — check with `grep -n "aclose\|disconnect\|close" docs/civic/recipes/deepagents.mdx`)

If the file has a lifespan shutdown that calls `mcp_client.aclose()` or similar, update it to `await mcp_client.close()`.

- [ ] **Step 7: Verify**

```bash
grep -n "langchain_mcp_adapters\|MultiServerMCPClient\|CivicMCPClient\|civic_mcp_client" docs/civic/recipes/deepagents.mdx
```

Expected: `CivicMCPClient` and `civic_mcp_client` present; `langchain_mcp_adapters` and `MultiServerMCPClient` absent.

- [ ] **Step 8: Commit**

```bash
git add docs/civic/recipes/deepagents.mdx
git commit -m "docs: update deepagents recipe to use civic-mcp-client[langchain] adapter"
```

---

### Task 7: Add `langchain-js` to sidebar

**Files:**
- Modify: `sidebars/civic.ts`

- [ ] **Step 1: Add the new page entry**

In `sidebars/civic.ts`, find the line:
```
'civic/recipes/langchain',
```

Add the new entry directly after it:
```
'civic/recipes/langchain',
'civic/recipes/langchain-js',
```

- [ ] **Step 2: Verify**

```bash
grep -n "langchain" sidebars/civic.ts
```

Expected: both `civic/recipes/langchain` and `civic/recipes/langchain-js` are present, in that order.

- [ ] **Step 3: Commit**

```bash
git add sidebars/civic.ts
git commit -m "docs: add langchain-js to sidebar navigation"
```

---

### Task 8: Update `client-compatibility.mdx`

**Files:**
- Modify: `docs/civic/reference/client-compatibility.mdx`

- [ ] **Step 1: Add LangChain.js row and update LangChain Python row**

Find this row in the Frameworks & SDKs table:
```
| **LangChain / LangGraph** | `streamable_http` via `MultiServerMCPClient` | [Setup](/civic/recipes/langchain) |
```

Replace with two rows:
```
| **LangChain (Python)** | `civic-mcp-client[langchain]` adapter | [Setup](/civic/recipes/langchain) |
| **LangChain.js / LangGraph** | `@civic/mcp-client` langchainAdapter | [Setup](/civic/recipes/langchain-js) |
```

- [ ] **Step 2: Verify**

```bash
grep -n "LangChain\|langchain" docs/civic/reference/client-compatibility.mdx
```

Expected: two rows — one for Python, one for JS.

- [ ] **Step 3: Commit**

```bash
git add docs/civic/reference/client-compatibility.mdx
git commit -m "docs: update client-compatibility table for langchain-js and civic-mcp-client"
```

---

## Self-Review

**Spec coverage check:**
- ✅ `langchain.mdx` rewritten to Python civic-mcp-client
- ✅ New `langchain-js.mdx` created for LangChain.js
- ✅ `vercel-ai-sdk.mdx` updated to use vercelAIAdapter
- ✅ `pydantic-ai.mdx` standalone tab updated to use pydanticai adapter
- ✅ `openai-sdk.mdx` updated to use openAIAdapter
- ✅ `deepagents.mdx` updated to use civic-mcp-client[langchain]
- ✅ Sidebar updated with new langchain-js entry
- ✅ client-compatibility.mdx updated with two langchain rows

**Type consistency:**
- `CivicMcpClient` (JS camelCase) — used consistently across Task 1, 3, 5
- `CivicMCPClient` (Python ALL_CAPS) — used consistently across Task 2, 4, 6
- `adapt_for()` (Python method) — Tasks 2, 4, 6
- `getTools()` (JS method) — Tasks 1, 3, 5
- `client.close()` — consistently used for cleanup in all tasks

**No placeholders:** All code blocks contain complete, runnable examples.
