# Documentation Plan for Labs

🧪 Civic Labs Documentation Page – Assistant Build Spec

🎯 Purpose

Civic Labs is the experimental playground for Civic’s identity and AI tools. The goal of this page is to:
•	Introduce Civic Labs as a home for exploratory, non-product tools
•	Present each experiment as a “flask”—a metaphor for early-stage work
•	Indicate how mature each tool is via Flask Statuses
•	Encourage feedback, collaboration, and early access signups

⸻

🏗️ Structure

/civic-labs
├── index.mdx or index.md         → Overview / landing page
├── projects/
│     ├── mcp-hub.md
│     ├── guardrail-proxy.md
│     ├── bodyguard.md
│     └── passthrough-proxy.md
├── concepts/
│     ├── mcp.md
│     ├── guardrails.md
│     ├── prompt-injection.md
│     └── auth-strategies.md
├── getting-started.md
└── feedback.md


⸻

🧾 Overview Page (/civic-labs/index.md)

Title

Civic Labs 🧪

Intro Copy

Civic Labs is where Civic explores bold ideas in digital identity, agentic AI, and authorization. It's not a product showcase—it's a living bench of experiments, some just getting started, some ready to test, all open to feedback and community input.

Each project is presented as a **flask**: bubbling, distilling, or crystallizing.

- **Bubbling** – just an idea, nothing public yet
- **Distilling** – in active development, early versions exist
- **Crystallizing** – functionally complete, available for testing

Explore the flasks below or get in touch if you want to contribute, try things early, or shape what comes next.

Sections
•	🔬 Projects – Short intro + project list (see below)
•	📚 Concepts & Architecture – List + “Coming Soon” note
•	🚀 Getting Started – Placeholder for devs / demos
•	💬 Feedback & Contribution – How to reach out, request access, or suggest ideas

⸻

🔬 Project Pages (/projects/*.md)

Each project page should follow this structure:

# [Project Name] 🧪
**Flask Status: Distilling**

## Overview
[1–2 paragraph description of what this tool does and why it matters.]

## Key Features
- Feature A
- Feature B
- Feature C

## Usage
[If applicable: how it’s used, who it’s for, and how to connect (e.g., UI, LLM, middleware)]

## Integration Notes
[Optional: how it connects to other Civic Labs tools]

## Status
This flask is currently **distilling**: early versions exist. Contact us if you'd like to try it out or provide feedback.

Project Assignments

Project	File	Flask Status	Notes
MCP Hub	mcp-hub.md	Distilling	UI/LLM interface for creating/managing MCP servers and auth
Guardrail Proxy	guardrail-proxy.md	Distilling	Enforces request/response constraints on any MCP server
BodyGuard	bodyguard.md	Distilling	LLM-based threat scoring layer for prompts or responses
Pass-through Proxy	passthrough-proxy.md	Distilling	Middleware hook system for MCP servers, powers guardrails


⸻

📚 Concepts & Architecture

Use concepts/ folder to hold general explanations that support understanding of the projects:
•	mcp.md – What is the Model Context Protocol and why it matters
•	guardrails.md – Guardrails as granular authorization tools
•	prompt-injection.md – Prompt injection attacks & LLM safety
•	auth-strategies.md – OAuth, RAR, pre-consent, reusable auth

Start each with a short, plain-language intro and one diagram or use case example if available.

⸻

🚀 Getting Started

Page should provide:
•	How to request access to current flasks
•	Any temporary hosted demo links (or placeholder)
•	A note that dev setup instructions are coming soon

⸻

💬 Feedback & Contribution

Short page with:
•	Links to Discord, GitHub Discussions, or email
•	Invitation to suggest new flask ideas
•	Invitation to contribute docs or usage examples

⸻

📐 Style & Tone
•	Friendly, open, and technically precise
•	Short paragraphs, bullet points preferred
•	Use the Flask metaphor consistently: flasks are projects, their status is bubbling/distilling/crystallizing
•	Avoid product-speak—this is about experimentation

⸻

✅ Deliverables Checklist for Assistant
•	Create /civic-labs/index.md landing page with overview + project links
•	Create 4 markdown files in /projects/ for MCP Hub, Guardrail Proxy, BodyGuard, Pass-through Proxy
•	Add frontmatter for each file if using Docusaurus or MDX
•	Add placeholders in /concepts/ folder
•	Add getting-started.md with temporary notes
•	Add feedback.md with contact info
•	Ensure internal links between pages work correctly

Note - for each project, you can look up details in existing readmes:

mcp hub: Github: civicteam/civic-mcp
passthrough proxy: Github: civicteam/mcp-tools
guardrail proxy: Github: civicteam/mcp-tools (guardrail hook) and civicteam/civic-mcp (packages/guardrail-lib)
bodyguard: see this repo - bodyguard-spec-tmp.md

⸻

🔬 New Project: Civic Knowledge

Add to /projects/civic-knowledge.md
github docs: civicteam/civic-kb-chatbot subfolder apps/civic-knowledge-web-app

# Civic Knowledge 🧪
**Flask Status: Distilling**

## Overview
Civic Knowledge is an integrated AI assistant designed for internal teams—such as operations, engineering, support, and compliance—to query and understand organizational systems in real time. It bridges the gap between raw systems data and conversational insights.

This flask pulls together multiple Civic Labs components (like MCP, guardrails, and pass-through proxy) to provide a unified, secure chatbot interface that connects to:

- Logs
- BI dashboards
- Ticketing systems
- Internal wikis and docs
- Source code & deployment pipelines

## Key Features
- Conversational access to internal systems via MCP
- Integration with existing enterprise auth (OAuth, SSO, etc.)
- Built-in support for guardrails and policy controls
- Extendable using the pass-through proxy architecture
- Ideal for security-aware, compliance-sensitive environments

## Usage
Civic Knowledge can be deployed internally as a private assistant, or embedded in developer workflows. Early versions require MCP integration and access token setup.

## Integration Notes
- Works best when paired with Guardrail Proxy for fine-grained access
- Uses Pass-through Proxy for audit logging and authorization hooks
- Supports organization-wide or per-user authorization policies

## Status
This flask is currently **distilling**: early versions exist and integrations are being piloted. Contact us if you'd like to help test it or shape its roadmap.


⸻

Update /civic-labs/index.md (Overview page)

Add to Projects list:

### 🧪 Civic Knowledge
**Flask Status: Distilling**  
An internal-facing LLM assistant for querying logs, tickets, dashboards, and more. Ties together all the Civic Labs flasks—guardrails, auth, and MCP—for a secure and powerful AI interface.  
→ *Alpha versions available—contact us for early access.*


⸻

Update Project File Structure

/projects/
├── mcp-hub.md
├── guardrail-proxy.md
├── bodyguard.md
├── passthrough-proxy.md
└── civic-knowledge.md   <-- Add this

# NOTES

Two titles on each page. Remove the one in text, keep the one in the frontmatter.
Too many test tube emojis. Let's remove them from Civic Labs. Keep them in the sidebar view, which I think is populated by docs.json, but put them on the left as opposed to the right of each project.
The sidebar should call the projects FASCs rather than projects.
Replace any em dashes with commas in general.
Let's move the Getting Started and Feedback and Contributions sections above the Projects / Flasks.
Check Civic.com for the correct Discord URL.