# Embedded Wallets

The **Civic Auth Web3 SDK** ([@civic/auth-web3](https://www.npmjs.com/package/@civic/auth-web3)) extends the functionality of the base **Civic Auth SDK** by including the ability to provision a Web3 wallet for users. This allows Civic Auth apps to provide their users with access to the world of Cryptocurrencies and Web3 without any hassle or prior knowledge.

## Quick Start

Sign up for Civic Auth at [auth.civic.com](https://auth.civic.com) and make sure to select the "web3 wallet" option.

{% hint style="success" %}
If you already have an account, just log in and select the web3 wallet option in the configuration to enable web3 wallets.
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

## **Integration**

You need to set up a CivicAuthProvider in your application with the integration for the web3 library being identical to the [setup for @civic/auth](../), except that you import from @civic/auth-web3  instead of @civic/auth i.e:

```typescript
import { CivicAuthProvider, UserButton } from "@civic/auth-web3/react";
```

Once the basic setup is done, you can access Web3 features by following the Embedded Wallet Web3 integration instructions [here](ethereum-evm.md).



