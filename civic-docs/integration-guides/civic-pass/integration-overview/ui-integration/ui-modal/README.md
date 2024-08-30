# UI Modal

## Gateway Provider UI Modal

The **GatewayProvider** is a React component that enables your dApp frontend to:

* access all available information of your user's Civic Pass
* trigger the issuance and refresh of a new Civic Pass&#x20;

{% embed url="https://vimeo.com/841371471?share=copy" fullWidth="false" %}
How to: Add Civic Pass to your Solana program UI
{% endembed %}

{% embed url="https://vimeo.com/841371411?share=copy" %}
How to: Add Civic Pass to your EVM smart contract UI
{% endembed %}

### 1. Install the React component for your chain

Install the Civic Gateway library for your chain.

{% tabs %}
{% tab title="Solana" %}
```bash
npm i @civic/solana-gateway-react@latest        
```
{% endtab %}

{% tab title="Ethereum + EVMs" %}
<pre class="language-bash"><code class="lang-bash"><strong>npm i @civic/ethereum-gateway-react@latest
</strong></code></pre>
{% endtab %}
{% endtabs %}

Next, import and configure the `GatewayProvider` component.&#x20;

{% hint style="warning" %}
The required configuration properties vary slightly depending on the chain. You can find the configuration properties of each chain [<mark style="color:purple;">here</mark>](configuration-parameters.md).
{% endhint %}

{% tabs %}
{% tab title="Solana" %}
```jsx
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Connection, clusterApiUrl } from '@solana/web3.js';

<GatewayProvider
  connection={new Connection(clusterApiUrl("mainnet-beta"), "confirmed")}
  cluster="mainnet-beta"
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```
{% endtab %}

{% tab title="Ethereum + EVMs" %}
```jsx
import { GatewayProvider } from "@civic/ethereum-gateway-react";

<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```
{% endtab %}
{% endtabs %}

Children wrapped by this `GatewayProvider` will have access to the connected wallet's Civic Pass.

We suggest placing the `<GatewayProvider>` as high up in the component tree as possible, to ensure you have access to the Civic Pass state throughout your dApp.

### 2. Use the useGateway hook to interact with a Civic Pass

{% hint style="info" %}
You can also use the provided [<mark style="color:purple;">Identity Button</mark>](configuration-parameters.md#identity-button) reference implementation to handle everything described in this section.
{% endhint %}

Now that you have initialized the GatewayProvider context, you can use the included `useGateway` hook to:

* trigger the issuance of a new Civic Pass modal
* access the state of the Civic Pass

{% tabs %}
{% tab title="Solana" %}
<pre class="language-jsx"><code class="lang-jsx"><strong>import { useGateway } from "@civic/solana-gateway-react";
</strong></code></pre>
{% endtab %}

{% tab title="Ethereum + EVMs" %}
```jsx
import { useGateway } from "@civic/ethereum-gateway-react";
```
{% endtab %}
{% endtabs %}

#### Trigger the issuance of a Civic Pass

Calling the function `requestGatewayToken` opens the modal dialog, which guides the user through the flow of collecting and verifying their information. The information collected varies depending on the configured [<mark style="color:purple;">Gatekeeper Network</mark>](../../../available-networks.md).&#x20;

```jsx
const { requestGatewayToken } = useGateway()

<button onclick={requestGatewayToken}>Civic Pass</button>
```

For example, this is the initial screen your users will see when issuing a Civic Liveness Pass:

<div align="center" data-full-width="false">

<figure><img src="../../../../../.gitbook/assets/image (13).png" alt="" width="375"><figcaption></figcaption></figure>

</div>

Even if the user already has a Civic Pass, the modal supports being triggered for any possible pass status and will always display the correct screen that corresponds with that Civic Pass status.&#x20;

If the the user already has a Civic Pass, triggering the modal again via `requestGatewayToken` displays the following screen:

<figure><img src="../../../../../.gitbook/assets/image (6).png" alt="" width="375"><figcaption></figcaption></figure>



#### Access the status of the Civic Pass&#x20;

All children of the **GatewayProvider** have access to the user's Civic Pass status via the **useGateway** function.&#x20;

```jsx
const { gatewayStatus, gatewayToken } = useGateway();
```

The [<mark style="color:purple;">**`gatewayStatus`**</mark>](civic-pass-status.md) indicates the overall status of the Civic Pass and should be displayed in your dApp either via custom UI or by integrating the Civic [<mark style="color:purple;">Identity Button</mark>](../#3.-add-the-identity-button) included with the library.&#x20;

The [<mark style="color:purple;">**gatewayToken**</mark>](civic-pass-structure.md) represents the on-chain structure of the Civic Pass. This will is only defined if the Civic Pass is ACTIVE.

If the token does not exist or is in a inactive state (e.g. frozen), this variable will be `undefined`. The dApp should disable certain parts of the UI when gatewayToken is `undefined` to prevent dApp usage. This only complements the [<mark style="color:purple;">on-chain check</mark>](../../on-chain-integration.md) and does not replace it.

### 3. Edit the Pass Status UI (optional)

To expose the status of the user's Civic Pass in your UI, add the Identity Button component (also included in the Gateway library), by placing it inside the `<GatewayProvider>` context you created in the previous step.

{% tabs %}
{% tab title="Solana" %}
```tsx
import IdentityButton from '@civic/solana-gateway-react';
...
<IdentityButton />
```
{% endtab %}

{% tab title="Ethereum + EVMs" %}
```tsx
import IdentityButton from '@civic/ethereum-gateway-react';
...
<IdentityButton />
```
{% endtab %}
{% endtabs %}

Beyond just displaying the Civic Pass status, users can also start the issuance of their Pass if they do not already have one. The Pass Status UI will update to display the correct Civic Pass status.

{% hint style="info" %}
You can find more details on the [<mark style="color:purple;">Pass Status UI here</mark>](../pass-status-ui.md).
{% endhint %}

