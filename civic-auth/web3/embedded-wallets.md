# Embedded Wallets

The **Civic Auth Web3 SDK** ([@civic/auth-web3](https://www.npmjs.com/package/@civic/auth-web3)) extends the functionality of the base **Civic Auth SDK** by including the ability to provision a Web3 wallet for users. This allows Civic Auth apps to provide their users with access to the world of Cryptocurrencies and Web3 without any hassle or prior knowledge.

## Quick Start

Sign up for Civic Auth at [auth.civic.com](https://auth.civic.com) and make sure to select the "Web3 wallet" option.

{% hint style="success" %}
If you already have an account, just log in and select the Web3 wallet option in the configuration to enable Web3 wallets.
{% endhint %}

## Installation

Install the Civic Auth Web3 SDK:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @civic/auth-web3
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @civic/auth-web3
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @civic/auth-web3
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @civic/auth-web3
```
{% endtab %}
{% endtabs %}

## Integration

Choose your framework for instructions on how to integrate Civic Auth Web3 into your application.

{% hint style="info" %}
NOTE - Web3 wallets are available for React and Next.js environments.

If you are interested in using Civic's Web3 wallet feature in other environments, please [contact us](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord).
{% endhint %}

<table data-view="cards"><thead><tr><th align="center"></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center">React   </td><td></td><td></td><td><a href=".gitbook/assets/cropped-react.png">cropped-react.png</a></td><td><a href="integration/react.md">react.md</a></td></tr><tr><td align="center">Next.JS</td><td></td><td></td><td><a href=".gitbook/assets/cropped-nextjs.svg">cropped-nextjs.svg</a></td><td><a href="integration/next.js.md">next.js.md</a></td></tr></tbody></table>

## Using the Wallet

Follow these guides to set up Web3 wallets for your users:

[Ethereum & EVMs](/web3/ethereum-evm.md)
[Solana](/web3/solana.md)

## About Embedded Wallets

### **What are Embedded Wallets?**

Embedded wallets are cryptocurrency wallets provided directly by an app or website, rather than requiring the user to supply their own.

This approach is a powerful tool for onboarding non-crypto users into Web3, enabling apps to cater to both crypto-native users and newcomers alike.

By removing the need for complicated wallet setup, remembering seed phrases etc., embedded wallets are a vital tool for bridging the gap between Web2 and Web3.

### **Civic's Embedded Wallets**

The Civic Embedded Wallet Service is non-custodial, meaning neither Civic nor Civic's customers have control over users’ wallets or assets.

Each wallet is linked to a user’s SSO (Single Sign-On) provider, such as Google, ensuring that only authenticated users can sign transactions.

Civic's wallets are EOA (Externally Owned Account) wallets, rather than smart contract (AKA account abstraction) wallets. This has benefits in terms of simplicity and lower gas costs.  However, they can be upgraded to support account abstraction, for example to support gas sponsorship. [Contact us](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord) if you're interested in this feature.

### **Recovery**

Our wallet provider includes a recovery feature, ensuring that funds are not lost in case of a service interruption with Civic.

For more details on the security and recovery features of Civic wallets, please refer to the documentation provided by our service provider.







