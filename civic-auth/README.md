# 🔏 Civic Auth

### What is Civic Auth?

{% hint style="info" %}
**Note:** Civic Auth is currently in **beta**. Please expect occasional changes or updates as we continue to refine the experience.
{% endhint %}

Civic Auth offers a simple, flexible, and fast way to integrate authentication into your applications. Enable familiar sign-in options while offering optional embedded wallets and unlocking blockchain benefits for your users.

<figure><img src=".gitbook/assets/current.png" alt="" width="360"><figcaption><p>Civic Auth: User-Facing View</p></figcaption></figure>

**Integrated login.** Users sign in using their email, Google account, passkeys, or wallet—no complex setup required.

**Adaptable onboarding.** Auth is a familiar sign-in experience for all users. Supports existing wallets or integrated embedded wallets.

**Embedded wallets.** Automatically create [Web3 wallets](web3/embedded-wallets.md) for your users.

**Multichain support.** Supported on Solana, as well as Base, Binance Smart Chain (BSC), Polygon, Arbitrum, Ethereum, and other EVM-compatible chains.&#x20;

### Quick Start

Sign up for Civic Auth in less than a minute at [auth.civic.com](https://auth.civic.com) to get your Client ID.

<figure><img src=".gitbook/assets/Integration Setup.png" alt=""><figcaption><p>Civic Auth: Admin Dashboard - Integration Steps</p></figcaption></figure>

Install the library in your app.

{% tabs %}
{% tab title="npm" %}
```bash
npm install @civic/auth
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @civic/auth
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @civic/auth
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @civic/auth
```
{% endtab %}
{% endtabs %}

## Web3 Wallets

If you plan to offer your users [Web3 wallets](./#web3-wallets), you can use the Civic Auth Web3 SDK.

<figure><img src=".gitbook/assets/Toggle ON.png" alt=""><figcaption><p>Civic Auth: Admin Dashboard - Web3 Wallets Support</p></figcaption></figure>

This SDK extends the functionality of the base Civic Auth SDK to add Web3 features.

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

### Usage

Choose your framework for instructions on how to integrate Civic Auth into your application.

<table data-view="cards"><thead><tr><th align="center"></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center">React</td><td></td><td></td><td><a href=".gitbook/assets/cropped-react.png">cropped-react.png</a></td><td><a href="integration/react.md">react.md</a></td></tr><tr><td align="center">Next.JS</td><td></td><td></td><td><a href=".gitbook/assets/cropped-nextjs.svg">cropped-nextjs.svg</a></td><td><a href="integration/next.js.md">next.js.md</a></td></tr><tr><td align="center">Node.JS</td><td></td><td></td><td><a href=".gitbook/assets/cropped-node.png">cropped-node.png</a></td><td><a href="integration/node.js/">node.js</a></td></tr></tbody></table>

For integrating in other environments using any OIDC or OAuth 2.0-compliant client libraries, see [here](integration/other.md).

### Civic Auth Demo

Don't take our word for it. See Civic Auth in action:&#x20;

{% embed url="https://www.youtube.com/watch?v=vk01H9cB7fQ" %}
