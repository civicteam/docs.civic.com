# ⚙️ Using the API

## Overview

The Civic Pass API is a RESTful API that allows [Custom Pass](https://civic-1.gitbook.io/civic-docs-v2/76NqppOMISHaxk958Rod/custom-passes/issue-your-own-custom-pass) holders to manage their passes programmatically from their backends.

{% hint style="info" %}
See [here](https://github.com/civicteam/civic-pass-demos/blob/feature/backend-examples/packages/evm/exampleScripts/getPassStatusUsingAPI.ts) for a full working example.
{% endhint %}

## Authentication

The Civic Pass API uses the [OAuth Client Credentials Grant](https://oauth.net/2/grant-types/client-credentials/) for authentication.

To authenticate, you will need your client ID and secret provided to you by Civic.

```typescript
const authUrl = "https://auth.civic.com/oauth/token";
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const loginResponse = await fetch(authUrl, {
    headers: {
        authorization: `Basic ${basicAuth}`,
        "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    method: "POST"
});
return (await loginResponse.json()).access_token;
```

## Calling the API

Once you have an access token, you can use it to call the Civic Pass API.

Example: Lookup a pass by wallet address

```typescript
const apiUrl = "https://api.civic.com/partner";
// See the OpenAPI docs for a full list of available chains and networks
const lookupResponse = await fetch(`${apiUrl}/${chain}/${chainNetwork}/${wallet}`, {
    headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
    },
});
return lookupResponse.json();
```

For full API documentation, see the [OpenAPI Docs](https://civicteam.github.io/openapi-docs/).
