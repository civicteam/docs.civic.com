# ⚙️ Using the API

## Overview

The Civic Pass API is a RESTful API that allows [Custom Pass](issue-your-own-custom-pass.md) holders to manage their passes programmatically from their backends.

{% hint style="info" %}
See [here](https://github.com/civicteam/civic-pass-demos/blob/main/packages/evm/exampleScripts/getPassStatusUsingAPI.ts) for a full working example.
{% endhint %}

## Authentication

The Civic Pass API uses the [OAuth Client Credentials Grant](https://oauth.net/2/grant-types/client-credentials/) for authentication.

To authenticate, you will need your client ID and secret provided to you by Civic.

#### Sandbox environment

You can also try out our shared sandbox environment. Passes you issue can be seen and managed by everyone else using the sandbox.

* clientId: `dtVTGsKUlkPQ8UXKqSskS1HqNI3hERHT`
* clientSecret: `7DT722BjNlXUp8HVaV_ZjHzopq2Tr12doGB8sBYC-vhPo3Eh0HoidLVATFbxmwZ1`
* Wherever the API requires a gatekeeperNetwork, use our demo pass network: `tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf`

Note this sandbox environment is only available on testnets. These values should be passed where the API requires a `chain` (e.g. "ethereum") and a `chainNetwork` (e.g. "polygonAmoy").

* `solana:devnet`
* `ethereum:polygonAmoy`
* `ethereum:sepolia`
* `ethereum:baseSepolia`
* `ethereum:arbitrumSepolia`
* `ethereum:optimismSepolia`
* `ethereum:bscTestnet`
* `ethereum:xdcApothem`
* `ethereum:xlayerTestnet`
* `ethereum:avalancheCChainFuji`
* `ethereum:unichainSepolia`
* `ethereum:sonicTestnet`

#### Getting a JWT for the Civic API

```typescript
const authUrl = "https://auth0.civic.com/oauth/token";
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
const lookupResponse = await fetch(`${apiUrl}/pass/${chain}/${chainNetwork}/${wallet}`, {
    headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
    },
});
return lookupResponse.json();
```

For full API documentation, see the [OpenAPI Docs](https://civicteam.github.io/openapi-docs/).
