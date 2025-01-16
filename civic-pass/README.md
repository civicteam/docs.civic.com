---
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🚀 Quickstart

## Getting Started

1. **Supported Blockchains:** Arbitrum, Avalanche, Base, BNB Smart Chain (BSC), Ethereum, Fantom, Optimism, Polygon, Polygon zkEVM, Solana, XDC, X Layer. Other chains can be added [on request](integration-guide/unsupported-evm.md).
2. **Civic Pass Overview**: The Civic Pass is the easiest way to integrate Civic's verification services. Civic handles the verification, issuance, and lifecycle management of the user's pass, including checks for identity documents, location, and humanness.&#x20;
3. **See How It Works**: [Get a Civic Pass to see how it works](https://getpass.civic.com/?scope=liveness,uniqueness,captcha). We recommend using testnet/devnet and starting with CAPTCHA Pass or Liveness Pass. You’ll need to have some testnet/devnet funds in your wallet to complete the process.&#x20;
4. **Integration Guide**: refer to the Integration Guide for your chosen blockchain to get started.

## Find Your Use Case

Civic Pass is a versatile solution for verifying user authenticity across industries. Whether you're building a gaming platform, ensuring fairness in airdrops, fostering safer online communities, verifying identities for real-world assets and more, Civic Pass ensures trust and security.

Find your use cases at [Overview of Use Cases](https://docs.civic.com/pass/use-cases/overview-of-use-cases/) to see how Civic can help.

## Integration Options

Civic offers three integration components for maximum composability:

1. **Frontend Libraries:** This is first step towards integrating the Civic Pass verification flow into your app.
2. **Backend Libraries:** This is for accessing pass state through your backend infrastructure to complement the Frontend integration.
3. **On-chain Smart Contracts:** For blockchain-based applications requiring decentralized verification at blockchain level. This can replace the Backend libraries integration, but does still require a Frontend integration.

## Deploy in Minutes

Navigate to your blockchain of choice in the index for tailored instructions on how to integrate Civic on different chains.

### EVMs

Install the Civic Gateway library for your chain.

```bash
npm i @civic/ethereum-gateway-react@latest
```

Next, import and configure the GatewayProvider component.

```jsx
import { GatewayProvider } from "@civic/ethereum-gateway-react";

<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```

{% hint style="info" %}
Children wrapped by the `GatewayProvider` will have access to the connected wallet's Civic Pass. We recommend using the **Identity Button** to retrieve pass state and we suggest placing the `<GatewayProvider>` as high up in the component tree as possible to ensure you have access to the Civic Pass state throughout your dApp.
{% endhint %}

### Solana

Install the Civic Gateway library for your chain.

```bash
npm i @civic/solana-gateway-react@latest
```

Next, import and configure the GatewayProvider component.

```jsx
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Connection } from '@solana/web3.js';

<GatewayProvider
  connection={new Connection( /*your RPC endpoint*/, "confirmed")}
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```

{% hint style="info" %}
Children wrapped by the`GatewayProvider` will have access to the connected wallet's Civic Pass.&#x20;
{% endhint %}

We recommend using the provided **Identity Button** to retrieve pass state and we suggest placing the `<GatewayProvider>` as high up in the component tree as possible to ensure you have access to the Civic Pass state throughout your dApp. Find out more in the integration guide for your chain.
