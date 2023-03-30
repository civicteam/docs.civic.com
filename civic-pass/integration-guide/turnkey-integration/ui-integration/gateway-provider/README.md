# Gateway Provider

The **GatewayProvider** is a React component that enables your dApp frontend to:

* access all available information of your user's Civic Pass
* trigger the issuance of a new Civic Pass&#x20;

These are the only differences in the way the GatewayProvider is configured for each <mark style="color:orange;"></mark> [<mark style="color:orange;">supported chain</mark>](../../../../overview/supported-blockchains.md). <mark style="color:orange;"></mark> Once configured, using it is chain-agnostic. In this section we will go through the steps required to integrate the GatewayProvider into your UI, regardless of which chain your dApp supports.&#x20;

### 1. Install the React component for your chain

First, install the Civic Gateway library for your chain.

{% tabs %}
{% tab title="Solana" %}
```bash
npm i @civic/solana-gateway-react@latest
```
{% endtab %}

{% tab title="Ethereum / Polygon" %}
```bash
npm i @civic/ethereum-gateway-react@latest
```
{% endtab %}
{% endtabs %}

### 2. Import and configure the Gateway Provider

Once the Gateway React library is installed, import and configure the `GatewayProvider` component.&#x20;

{% hint style="warning" %}
The required configuration properties vary slightly depending on the target chain. You can find the details on the configuration properties of each chain [here](configuration-parameters/).
{% endhint %}

{% tabs %}
{% tab title="Solana" %}
```jsx
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Connection, clusterApiUrl } from '@solana/web3.js';

<GatewayProvider
  connection={new Connection(clusterApiUrl("mainnet-beta"))}
  cluster="mainnet-beta"
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```
{% endtab %}

{% tab title="Ethereum / Polygon" %}
```jsx
import { GatewayProvider } from "@civic/ethereum-gateway-react";

<GatewayProvider
  signer={signer}
  provider={provider}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```
{% endtab %}
{% endtabs %}

Children wrapped by this `GatewayProvider` will have access to the connected wallet's Civic Pass.

It's suggested to place the `<GatewayProvider>` as high up in the component tree as possible, to ensure you have access to the Civic Pass state is available throughout your dApp.

### 3. Use the useGateway hook to interact with a Civic Pass

{% hint style="info" %}
You can also use the provided [<mark style="color:orange;">Identity Button</mark>](../identity-button.md) reference implementation to handle everything described in this section.
{% endhint %}

Now that you have initialized the GatewayProvider context, you can use the included `useGateway` hook to:

* trigger the issuance of a new Civic Pass modal
* access the state of the Civic Pass

{% tabs %}
{% tab title="Solana" %}
<pre class="language-jsx"><code class="lang-jsx"><strong>import { useGateway } from "@civic/solana-gateway-react";
</strong></code></pre>
{% endtab %}

{% tab title="Ethereum / Polygon" %}
```jsx
import { useGateway } from "@civic/ethereum-gateway-react";
```
{% endtab %}
{% endtabs %}

#### Trigger the issuance of a Civic Pass

Calling the function `requestGatewayToken` opens the modal dialog, which will then guide the user through the flow of collecting and verifying the users information. The information collected varies depending on the configured [<mark style="color:orange;">Gatekeeper Network</mark>](../../selecting-a-pass.md).&#x20;

```jsx
const { requestGatewayToken } = useGateway()

<button onclick={requestGatewayToken}>Civic Pass</button>
```

For example, this is the initial screen your users will see when issuing a Civic Pass Captcha:

![](<../../../../../.gitbook/assets/image (15).png>)

Even if the user already has a Civic Pass, you don't have to worry about enabling or disabling your button. The Civic Pass modal supports being triggered for any possible Civic Pass status and will always display the correct screen that corresponds with that Civic Pass status.&#x20;

For example, if the the user already has a Civic Pass, triggering the modal again via `requestGatewayToken` displays the following screen:

![](<../../../../../.gitbook/assets/image (4).png>)



#### Access the state of the Civic Pass&#x20;

All children of the **GatewayProvider** have access to the user's Civic Pass state via the **useGateway** function.&#x20;

```jsx
const { gatewayStatus, gatewayToken } = useGateway();
```

The [<mark style="color:orange;">**`gatewayStatus`**</mark>](gateway-status.md) indicates the overall status of the Civic Pass and should be displayed in your dApp. Either via custom UI or by simply integration the Civic [<mark style="color:orange;">Identity Button</mark>](../identity-button.md) included with the library. Of course you are free to update your UI depending on the status as you see fit.\


The [<mark style="color:orange;">**gatewayToken**</mark>](gateway-token/) represents the on-chain structure of the Civic Pass. This will is only defined if the Civic Pass is ACTIVE.

If the token does not exist or is in a non-active state (e.g. Frozen), this state variable will be `undefined`. The dApp should disable certain parts of the UI when gatewayToken is undefined to prevent dApp usage. This only complements the [<mark style="color:orange;">on-chain check</mark>](../../on-chain-integration/) and does not replace it.

#### 3. Add the Identity Button

To expose the status of the user's Civic Pass in your UI, simply add the Identity Button component (also included in the Gateway library) , by placing it inside the `<GatewayProvider>` context you created in the previous step.

{% tabs %}
{% tab title="Solana" %}
```tsx
import IdentityButton from '@civic/solana-gateway-react';
...
<IdentityButton />
```
{% endtab %}

{% tab title="Ethereum" %}
```tsx
import IdentityButton from '@civic/ethereum-gateway-react';
...
<IdentityButton />
```
{% endtab %}
{% endtabs %}

&#x20;Besides just displaying the Civic Pass status, users can also start the issuance of their Civic Pass, should they not already have one. The Identity Button is automatically updated to display the corresponding [<mark style="color:orange;">Civic Pass status.</mark>](gateway-status.md)<mark style="color:orange;"></mark>
