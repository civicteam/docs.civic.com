# bodyguard

A security analysis service that detects malicious prompts and potential attacks in LLM inputs with tool-calling capabilities.

## Features

- Detects prompt injection attacks
- Identifies attempts to extract sensitive information
- Recognizes malicious function calls
- Detects social engineering tactics
- Provides threat scores (0-1, where 1 is extremely dangerous)
- Available as CLI tool, HTTP server, and client library

## Setup

1. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the project:
   ```bash
   pnpm build
   ```

## Usage

### CLI Tool
```bash
# Run directly with tsx
pnpm dev "Your prompt to analyze"

# Or after building
pnpm start "Your prompt to analyze"
```

### HTTP Server
```bash
# Start the server (default port 3000)
pnpm start:server

# Or with custom port
PORT=3200 pnpm start:server

# Development mode with watch
pnpm dev:server
```

#### API Endpoints

**GET /**
```bash
curl "http://localhost:3000/?prompt=What%20is%20the%20weather"
```

**POST /** (text body)
```bash
curl -X POST http://localhost:3000/ -d "Your prompt here"
```

**POST /** (JSON body)
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Your prompt here"}'
```

### Client Library
```typescript
import { check } from 'bodyguard';

const result = await check('Your prompt here', {
  url: 'http://localhost:3000',
  threshold: 0.5 // Fail if threat score > 0.5
});

console.log(result);
// { result: 'pass' | 'fail', threatScore: 0.1, findings: [] }
```

## Configuration

Edit `config.json` to customize the system prompt:
```json
{
  "systemPrompt": "Your custom system prompt..."
}
```

## Docker

Build the Docker image from the monorepo root:
```bash
# From monorepo root
docker build -t bodyguard -f packages/bodyguard/Dockerfile .
```

Run the container:
```bash
docker run -p 3000:3000 -e OPENAI_API_KEY="your-api-key-here" bodyguard
```

## Scripts

### Build Docker Image
Build the Docker image locally:
```bash
./scripts/build.sh
```

### Push to ECR
Build and push to AWS ECR (requires AWS credentials):
```bash
# Push to dev environment (default)
./scripts/push-to-ecr.sh

# Push to prod environment
./scripts/push-to-ecr.sh prod
```

The image will be pushed to:
- Dev: `249634870252.dkr.ecr.us-east-1.amazonaws.com/civic-mcp/bodyguard:latest`
- Prod: `883607224354.dkr.ecr.us-east-1.amazonaws.com/civic-mcp/bodyguard:latest`

## Response Format

```typescript
{
  threat_score: number;  // 0-1, where 1 is extremely dangerous
  findings: string[];    // Array of detected security issues
}
```