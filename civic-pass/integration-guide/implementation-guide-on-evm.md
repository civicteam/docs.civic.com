---
description: Follow these steps for a turnkey implementation of Civic Pass on EVM chains
hidden: true
---

# Implementation Guide on EVM

## Overview

* **Frontend integration** using the React library to trigger pass issuance and check pass state in your app
* **Backend integration** using the Typescript library to check for a valid Civic Pass server-side
* **On-Chain integration** to check for a valid Civic Pass during smart contract program execution

## Frontend Integration

Civic provides two React libraries to manage the issuance and status of your users' Civic Passes directly from your front-end.

* The first one is a UI modal that overlays your existing UI, keeping your users within your experience. This modal will walk the user through the verification process.
* The second one is an Identity Button to display user's Pass Status, ie. active, expired, revoked, and then trigger the verification process through the UI modal.

### Install the React component <a href="#id-1.-install-the-react-component-for-your-chain" id="id-1.-install-the-react-component-for-your-chain"></a>

Install the Civic Gateway library for your chain.

```bash
npm i @civic/ethereum-gateway-react@latest
```

Next, import and configure the `GatewayProvider` component.

The **GatewayProvider** is a React component that enables your dApp frontend to:

* access all available information of your user's Civic Pass
* trigger the issuance and refresh of a new Civic Pass

The required configuration properties vary slightly depending on the chain.&#x20;

**Implementation**

```jsx
import { GatewayProvider } from "@civic/ethereum-gateway-react";

<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={networkKey}>
  {children}
</GatewayProvider>
```

Children wrapped by this `GatewayProvider` will have access to the connected wallet's Civic Pass. This is where you want to add the **Identity Button** and any of the gated features in your app.&#x20;

We suggest placing the `<GatewayProvider>` as high up in the component tree as possible, to ensure you have access to the Civic Pass state throughout your dApp.

The `networkKey` is provided to you by Civic once you complete onboarding.

#### Configuration Parameters

The configuration parameters of the Gateway Provider vary slightly depending on the blockchain.&#x20;

{% hint style="info" %}
The React component uses [ethers.js](https://www.npmjs.com/package/ethers) v6
{% endhint %}

| **Property**          | **Description**                                                                                                               | **Type**                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **wallet**            | A object containing a wallet address & an instance of an [ethers v6 signer](https://docs.ethers.org/v6/api/providers/#Signer) | <p>Copy</p><pre><code>type EthereumGatewayWallet = {
  address: string | undefined;
  signer: Signer | undefined;
};
</code></pre> |
| **gatekeeperNetwork** | The network key provided by Civic.                                                                                            | `string`                                                                                                                           |

{% hint style="info" %}
**Converting a viem/wagmi walletClient to an ethers v6 signer**

You can convert a viem/wagmi walletClient to an ethers v6 interface by following the example of this pattern in action is available in the [example repository](https://github.com/civicteam/civic-pass-eth-template).
{% endhint %}

**Advanced Configuration**

**Client options**

You can specify some options that affect the display behavior of the Civic modal that the user interacts with:

| **Property**                              | **Description**                                                                                                                                       | **Type**                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **autoShowModal**                         | Whether the Civic modal should appear automatically if the Civic Pass token state changes.                                                            | true \| false                  |
| **logLevel**                              | The log level.                                                                                                                                        | debug \| info \| warn \| error |
| **disableAutoRestartOnValidationFailure** | \[Optional] When set to true, prevents the flow to automatically restart on user validation failure (USER\_INFORMATION\_REJECTED). Defaults to false. | true \| false                  |

Usage example:

```jsx
<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={networkKey}
  options={{ autoShowModal: true, logLevel: "debug" }}>
  {children}
</GatewayProvider>
```

**Paying for your customers' transactions**

If your users do not have crypto wallets, you can subsidize the cost of their passes, including the transaction cost, by signing and sending the transactions yourself.

To do this:

* Set the `payer` field on the front-end
* Create a back-end service to sign and send the transaction&#x20;
* Call that back-end service from the front-end via the `handleTransaction` callback.

{% hint style="warning" %}
Ensure you verify the source of the transaction before signing! Signing arbitrary transactions from an unsecured front-end can lead to loss of funds
{% endhint %}

{% hint style="info" %}
For more details, see here: [Docs & Sample Code](https://www.npmjs.com/package/@civic/ethereum-gateway-react/v/1.2.0-beta.0#paying-for-your-customers-passes)
{% endhint %}

**Broadcasting transactions via Civic**

In the default mode of operation, the transaction required to issue or refresh the Civic Pass will be signed, but not broadcasted, by Civic. The user is responsible for broadcasting the transaction, including any fees. This flow is handled transparently by the Gateway Provider, which also communicates any fees to the user via the Civic Pass modal.

Some **Passes** support an alternative mode such as having the Civic backend broadcast the transaction. If the Pass Network you are using supports this, you can set the `gatekeeperSendsTransaction` property to `true` to turn it on.

| **Property**                   | **Description**                                                                                                                | **Type**      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| **gatekeeperSendsTransaction** | Civic will send the transaction to the blockchain on behalf of the user. Defaults to `false`.                                  | true \| false |
| **forceRequireRefresh**        | Setting this flag forces the user to refresh their active pass when set, even if the pass is not expired. Defaults to `false`. | true \| false |

### Interact with a Civic Pass <a href="#id-2.-use-the-usegateway-hook-to-interact-with-a-civic-pass" id="id-2.-use-the-usegateway-hook-to-interact-with-a-civic-pass"></a>

You can also use the provided Identity Button reference implementation to handle everything described in this section.

Now that you have initialized the GatewayProvider context, you can use the included `useGateway` hook to:

* trigger the issuance of a new Civic Pass modal
* access the state of the Civic Pass

```jsx
import { useGateway } from "@civic/ethereum-gateway-react";
```

#### **Trigger the issuance of a Civic Pass**

Calling the function `requestGatewayToken` opens the modal dialog, which guides the user through the flow of collecting and verifying their information. The information collected varies depending on the configured [Gatekeeper Network](../introduction/get-network-keys.md).

```jsx
const { requestGatewayToken } = useGateway()

<button onclick={requestGatewayToken}>Civic Pass</button>
```

For example, this is the initial screen your users will see when issuing a Civic Liveness Pass:

![](https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252F3iGNz1VDsFWxLj6napAb%252Fimage.png%3Falt%3Dmedia%26token%3D1dffcca8-17ff-4d4f-848d-4ad4d12b9289\&width=768\&dpr=4\&quality=100\&sign=e99470bf\&sv=1)

Even if the user already has a Civic Pass, the modal supports being triggered for any possible pass status and will always display the correct screen that corresponds with that Civic Pass status.

If the the user already has a Civic Pass, triggering the modal again via `requestGatewayToken` displays the following screen:

![](https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252FjMPguhAednOvXGlxsVID%252Fimage.png%3Falt%3Dmedia%26token%3D90f693ce-4a32-4fc9-9177-fcc8276bf120\&width=768\&dpr=4\&quality=100\&sign=bfe1705\&sv=1)

#### **Access the status of the Civic Pass**

All children of the **GatewayProvider** have access to the user's Civic Pass status via the **useGateway** function.

```jsx
const { gatewayStatus, gatewayToken } = useGateway();
```

The [**`gatewayStatus`**](https://docs.civic.com/pass/integration-guide/implementation-guide-on-evm#civic-pass-status) indicates the overall status of the Civic Pass and should be displayed in your dApp either via custom UI or by integrating the Civic Identity Button included with the library.

The [**gatewayToken**](https://docs.civic.com/pass/integration-guide/implementation-guide-on-evm#civic-pass-structure) represents the on-chain structure of the Civic Pass. This will is only defined if the Civic Pass is ACTIVE.

If the token does not exist or is in a inactive state (e.g. frozen), this variable will be `undefined`. The dApp should disable certain parts of the UI when gatewayToken is `undefined` to prevent dApp usage. This only complements the on-chain check and does not replace it.

### Add the Identity Button

For convenience and less code, simply drop the **Identity Button** widget into your UI.

It will handle both displaying the user's Civic Pass status and triggering the issuance flow for new users, all without them ever leaving your dApp.

\
<img src="https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252FRxc1QigvXOJdjGWvfWry%252Fbutton-get-pass%2520%282%29.png%3Falt%3Dmedia%26token%3D09c0ef36-e2f9-4a96-a3c9-03bab26684ef&#x26;width=768&#x26;dpr=4&#x26;quality=100&#x26;sign=1ffa85d2&#x26;sv=1" alt="" data-size="line"><img src="https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252F9Ub98DcUmKl5SJ6GM8gO%252Fbutton-active%2520%281%29.png%3Falt%3Dmedia%26token%3Dee122af9-7cd6-470f-9aec-385995196890&#x26;width=768&#x26;dpr=4&#x26;quality=100&#x26;sign=107d4869&#x26;sv=1" alt="" data-size="line"><img src="https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252FUTaoSGd9Yk40lEy8xiUV%252Fbutton-inactive%2520%281%29.png%3Falt%3Dmedia%26token%3D76bcaa82-e28e-4ef6-ac4a-357fccba99e7&#x26;width=768&#x26;dpr=4&#x26;quality=100&#x26;sign=66df8aaf&#x26;sv=1" alt="" data-size="line"><img src="https://docs.civic.com/~gitbook/image?url=https%3A%2F%2F3195005067-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FDpqMXquEKUvr1Me1kPpW%252Fuploads%252FOchk2MepwiKc9XZXoWay%252Fbutton-expired%2520%281%29.png%3Falt%3Dmedia%26token%3D6955da76-e702-435f-8219-3c55454f1f41&#x26;width=768&#x26;dpr=4&#x26;quality=100&#x26;sign=5eaf029d&#x26;sv=1" alt="" data-size="line">

#### Identity Button Specifications

The Identity button changes appearance with text and icons to indicate when the user needs to take action. It can be clicked by the user at any point in the process.

**Simple Implementation**

```jsx
import {
  IdentityButton,
  ButtonMode,
} from '@civic/ethereum-gateway-react';

<IdentityButton mode={ButtonMode.LIGHT} animation={true} />
```

The initial click on the button by a user initiates the Civic Pass modal which will guide the user through the process of issuing their Civic Pass. If a Civic Pass already exists for the connected wallet, the UI will update to show the 'Active' status.

Once the user has gone through the issuance flow via the Civic Pass modal, any subsequent click will launch the Civic Pass iframe with a screen describing the current status of the process.

| **Property** | **Description**                                                                 | **Values**    |
| ------------ | ------------------------------------------------------------------------------- | ------------- |
| mode         | The default setting of the button is dark. We also provide a `light mode`.      | DARK \| LIGHT |
| animation    | The button provides a neat animation on hover. The default value is `dark mode` | true \| false |

### Edit Pass Status UI <a href="#id-3.-edit-the-pass-status-ui-optional" id="id-3.-edit-the-pass-status-ui-optional"></a>

To expose the status of the user's Civic Pass in your UI, add the Identity Button component (also included in the Gateway library), by placing it inside the `<GatewayProvider>` context you created in the previous step.

```jsx
import IdentityButton from '@civic/ethereum-gateway-react';
...
<IdentityButton />
```

Beyond just displaying the Civic Pass status, users can also start the issuance of their Pass if they do not already have one. The Pass Status UI will update to display the correct Civic Pass status.

## Civic Pass Status

**Gateway Status**

The **`gatewayStatus`** indicates the overall status of the Civic Pass.

### **Before Issuance**

Even before a Civic Pass has been issued on-chain, the Gateway Provider gives you a set of status values that you can display in our UI to keep your users informed.

| **Status**                    | **Description**                                                                                                                                                                                                                                                                                               | **Behavior when `requestGatewayToken` is triggered**                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `UNKNOWN`                     | No user wallet is connected or no gatekeeper network set.                                                                                                                                                                                                                                                     | _None_                                                                                                          |
| `CHECKING`                    | Checking whether a Pass exists for the connected wallet.                                                                                                                                                                                                                                                      | _None_                                                                                                          |
| `NOT_REQUESTED`               | The wallet is connected but no Pass has been requested yet.                                                                                                                                                                                                                                                   | Opens the Civic Pass modal dialog and initiates the token request flow.                                         |
| `COLLECTING_USER_INFORMATION` | The required user information is being collected. Depending on the Network configured, this ranges from a simple CAPTCHA to full KYC.                                                                                                                                                                         | Opens the Civic Pass modal dialog and resumes the collection of the required information.                       |
| `VALIDATING_USER_INFORMATION` | <p>The user's identity information has been collected successfully and is being verified.</p><p><em>This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2.</em></p> | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |
| `USER_INFORMATION_VALIDATED`  | The user's identity has been validated. _This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2._                                                                    | Opens the Civic Pass modal dialog and asks the user to re-authenticate so that the request process can proceed. |
| `USER_INFORMATION_REJECTED`   | The user's identity verification request has been rejected. _This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2._                                                | Opens the Civic Pass modal displaying the reasons for the rejection.                                            |
| `CONFIRM_WALLET_TRANSACTION`  | The user needs to confirm wallet ownership on their wallet.                                                                                                                                                                                                                                                   | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |
| `IN_REVIEW`                   | The Civic Pass has been requested and the Gatekeeper is reviewing the request.                                                                                                                                                                                                                                | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |

### **After Issuance**

After a Civic has been issued on-chain, the following status values may apply.

| **Status** | **Description**                                                                                                                                      | **Behavior when `requestGatewayToken` is triggered**                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `ACTIVE`   | The Civic Pass is Active. The user can trade.                                                                                                        | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `EXPIRED`  | The Civic Pass has expired. Depending on the Gatekeeper Network configured, an IP check and/or proof of wallet ownership are required to refresh it. | Proof of wallet ownership is automatically initiated.                             |
| `FROZEN`   | The Pass has been frozen, for example because the user connected from a blocked IP.                                                                  | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `REVOKED`  | The Pass has been revoked, for example because the user connected from a banned IP.                                                                  | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |

### **Error Handling**

Issuing a Civic Pass might fail because the user did not fulfill the constraints of the configured Gatekeeper Network or, seldomly, because of an unexpected technical error.

| **Status**               | **Description**                                         | **Behavior when `requestGatewayToken` is triggered**                              |
| ------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `LOCATION_NOT_SUPPORTED` | The user's location is not currently supported.         | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `ERROR`                  | There was an unexpected error requesting a Civic Pass.  | Opens the Civic Pass modal dialog and the user can restart the process.           |
| `REJECTED`               | The token requests has been rejected by the Gatekeeper. | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |

## Civic Pass Structure

The **gatewayToken** represents the on-chain structure of the Civic Pass. This will only be defined if the Civic Pass is active.&#x20;

| **Property**          | **Description**                                     | **Type**                                |
| --------------------- | --------------------------------------------------- | --------------------------------------- |
| **gatekeeperNetwork** | The network key against which the token was issued. | PublicKey                               |
| **issuingGatekeeper** | The key of the issuing Gatekeeper.                  | PublicKey                               |
| **state**             | The on-chain token status.                          | State { "ACTIVE", "REVOKED", "FROZEN" } |
| **expiryTime**        | The timestamp at which the on-chain token expires.  | number                                  |

## Backend Integration

While the [React library](implementation-guide-on-evm.md#id-1.-install-the-react-component-for-your-chain) is the easiest way to integrate Civic Pass on a frontend, there are many reasons why you may need to check the pass state on your backend. Here are a few ways to do this.

### Using the API

[Custom Pass](broken-reference) holders can use the API to manage their passes. See [here](../custom-passes/using-the-api.md) for details.

### Using the Contract ABI

#### Overview

If you are familiar with using Ethereum libraries such as [Ethers.js](https://docs.ethers.org/v6/) or [Viem](https://viem.sh/), you can call the blockchain directly to check the status of your pass.

The full Contract ABI is available [here](https://github.com/civicteam/on-chain-identity-gateway/blob/main/ethereum/gateway-eth-ts/src/contracts/abi/GatewayToken.sol/GatewayToken.json).

Issuing, revoking and otherwise manipulating the status of the pass is still done through the Civic Pass API and user interfaces.

This feature is available to _all pass types_, including both Custom and Global passes.

{% hint style="info" %}
See [here](https://github.com/civicteam/civic-pass-demos/blob/feature/backend-examples/packages/evm/exampleScripts/getPassStatusUsingContractABI.ts) for a full working example.
{% endhint %}

#### Ethers.js Example

Below is an example of how to use [Ethers.js](https://docs.ethers.org/v6/) to get the status of a pass.

**1. Getting set up**

You will need the following information to get started:

```typescript
const GATEWAY_CONTRACT_ADDRESS = "0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E"; // The address of the Civic Pass contract
const networkKey = "..." // The pass network key in Base58 - provided by Civic
const walletAddress = "..." // The wallet address of the pass holder
const rpcUrl = "..." // Your blockchain RPC
```

Include also whatever parts of the contract ABI you need (or import the [entire file](https://github.com/civicteam/on-chain-identity-gateway/blob/main/ethereum/gateway-eth-ts/src/contracts/abi/GatewayToken.sol/GatewayToken.json))

We are going to look up the status of a pass by wallet address, so we need the following functions:

```typescript
const abi = [
  'function getToken(uint256) view returns (address,uint8,string,uint256,uint256)',
  'function getTokenIdsByOwnerAndNetwork(address,uint256,bool) view returns (uint[])',
];
```

**2. Set up your Ethers provider**

```typescript
import {ethers} from "ethers";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
```

**3. Convert the network key to a hey**

The network key is a Base58-encoded string, but the contract needs it as a hex.

We can use the [bs58](https://www.npmjs.com/package/bs58) library to decode it.

```typescript
import { decode } from 'bs58';
const slotId = "0x" + decode(networkKey).toString('hex');
```

{% hint style="warning" %}
Pass types created before July 2024 have a different mapping to slot ID - these are not supported here. If you are using a pass type created before July 2024, contact Civic support to get the associated slot ID.
{% endhint %}

**4. Call the contract**

Now you are ready to go - call the contract to get the status of the pass

```typescript
const contract = new ethers.Contract(GATEWAY_CONTRACT_ADDRESS, abi, provider);
contract.getTokenIdsByOwnerAndNetwork(walletAddress, slotId, true).then((tokenIds: bigint[]) => {
    tokenIds.forEach(async tokenId => {
        const [owner, state, identity, expiration, bitmask] = await contract.getToken(tokenId);
        console.log(`Token ID: ${tokenId}, Status: ${state}, Expiration: ${expiration}`);
    })
});
```

### Using the Backend Library

You can also use the [NPM library](https://www.npmjs.com/package/@civic/gateway-eth-ts) to avoid having to use contract ABIs directly:

Install:

```shell
npm install @civic/gateway-eth-ts ethers
```

{% hint style="info" %}
See [here](https://github.com/civicteam/civic-pass-demos/blob/feature/backend-examples/packages/evm/exampleScripts/getPassStatusUsingLibrary.ts) for a full working example
{% endhint %}

You will need the following information to get started:

```typescript
const GATEWAY_CONTRACT_ADDRESS = "0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E"; // The address of the Civic Pass contract
const networkKey = "..." // The pass network key in Base58 - provided by Civic
const walletAddress = "..." // The wallet address of the pass holder
const rpcUrl = "..." // Your blockchain RPC
```

The library uses Ethers for RPC calls and signing - set it up here.

```typescript
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
```

Initialise the client:

```typescript
const gatewayTs = new GatewayTs(provider, GATEWAY_CONTRACT_ADDRESS)
```

The network key is a Base58-encoded string, but the contract needs it as a hex. We can use the [bs58](https://www.npmjs.com/package/bs58) library to decode it.

```typescript
import { decode } from 'bs58';
const slotId = "0x" + decode(networkKey).toString('hex');
```

Now you are ready to make the call:

```typescript
const token = await gatewayTs.getToken(walletAddress, slotId)

if (token) {
    console.log(`Token ID: ${token.tokenId}`);
    console.log(`Pass status: ${TokenState[token.state]}`);
    console.log(`Expiration: ${token.expiration}`);
}
```

#### Subscribing to Events

The library also supports subscribing to events:

```typescript
gatewayTs.onGatewayTokenChange(walletAddress, slotId, (token) => {
    console.log(`Pass status: ${TokenState[token.state]}`);
    console.log(`Expiration: ${token.expiration}`);
});
```

## On-Chain Integration

Civic's on-chain integration allows developers to leverage smart contracts to verify user identities and ensure compliance with specific criteria. This section provides an overview of deploying and managing smart contracts on various chains and example use cases.

You can use Civic's provided libraries tailored to each blockchain's programming model for a straightforward integration. First, import the contract dependencies:

```bash
npm install @identity.com/gateway-protocol-eth
```

{% hint style="info" %}
This tutorial assumes Hardhat. If you are using foundry, please see tips [here](https://sooryak.hashnode.dev/adding-dependencies-to-your-contracts-in-foundry). The steps below can also be followed by copying the contract code directly [here](https://github.com/identity-com/on-chain-identity-gateway/tree/main/ethereum/smart-contract/contracts).
{% endhint %}

### Inherited Smart Contract

The easiest way to integrate Civic Pass on chain is to inherit the `Gated` contract, giving you access to the `gated` modifier. Functions with the `gated` modifier  can only be called by a msg.sender that has a valid Civic Pass.

```jsx
import "@civic/gateway-protocol-eth/contracts/Gated.sol";

contract MyContract is Gated {
    address public constant GATEWAY_TOKEN_CONTRACT = 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E;

    constructor(uint256 networkKey) Gated(GATEWAY_TOKEN_CONTRACT, networkKey) {
    }
    
    function myFunction() external gated {
        // only users with a valid pass can call this
    }
}
```

The [networkKey](../introduction/get-network-keys.md) is provided by Civic on registering for Civic Pass

### Direct On-Chain Integration

If you want more control over the verification process on-chain, you can use the following code instead of the Gated contract:

```jsx
import "@civic/gateway-protocol-eth/contracts/interfaces/IGatewayTokenVerifier.sol";

address public constant GATEWAY_TOKEN_CONTRACT = 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E;

...
IGatewayTokenVerifier verifier = IGatewayTokenVerifier(GATEWAY_TOKEN_CONTRACT);
if (!verifier.verifyToken(addressToVerify, networkKey)) {
        // handle a missing or invalid pass
}
```

## User PII Retrieval

For certain Civic Pass types where the user has to supply a document or email address, such evidence items will be made available to you for approval or rejection prior to pass issuance.

As the user reaches the end of the Civic Pass data collection flow, including authorizing the collection of their PII, they will land on a screen informing them that their request is in "partner review". This serves as the interjection point where you will be able to view, inspect and decide on the outcome of the pass issuance request.

### Retrieving PII Evidence <a href="#retrieving-pii-evidence" id="retrieving-pii-evidence"></a>

The Gatekeeper Context will communicate a new presentation request ID when the user reaches the end of the data collection flow. See [here](implementation-guide-on-evm.md#id-1.-install-the-react-component-for-your-chain) for more detail on the use of `GatewayProvider` and `useGateway`.

```jsx
const { pendingRequests } = useGateway();
```

`pendingRequests?.presentationRequestId` will be the identifier referred to by `REQUEST_ID` in the snippets below.

#### High-level overview <a href="#high-level-overview" id="high-level-overview"></a>

1. Retrieve an access token from the Civic auth endpoint
2. Retrieve PII for a specific request ID from the Civic Pass Partner API
3. Inspect the user-provided evidence and decide it it meets the requirements
4. Mark the request ID as pass or fail

#### 1. Retrieve an access token <a href="#id-1.-retrieve-an-access-token" id="id-1.-retrieve-an-access-token"></a>

During onboarding you will be supplied a token URL, client ID and client secret. Use these to retrieve an access token.

**Request**

```bash
POST TOKEN_URL 
Body:
{
  "client_id": "{{ _.clientId }}",
  "client_secret": "{{ _.clientSecret }}",
  "audience": "https://api.civic.com/pass",
  "grant_type": "client_credentials"
}
```

**Response**

```bash
{
  "access_token": "ey...",
  "scope": "partner:admin update:pass issue:pass search:pass create:gkn update:gkn createWithId:gkn get:pii put:piirequest",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

#### 2. Retrieve PII <a href="#id-2.-retrieve-pii" id="id-2.-retrieve-pii"></a>

Use the access token from step 1 to retrieve the evidence items for a specific request.

**Request**

```bash
GET https://api.civic.com/partner/piirequest/REQUEST_ID
Headers:
{
  "Authorization": "Bearer AUTH_TOKEN"
}
```

**Response**

```bash
{
  "id": "abc123",
  "type": "gatekeeperProofOfIdentityWithIdDocument-v3",
  "status": "verification-success",
  "links": [
      {
        "rel": "self",
        "href": "https://api.civic.com/partner/piirequest/abc123"
      },
      {
        "rel": "idDocumentFront",
        "href": "https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentFront"
      },
      {
        "rel": "idDocumentBack",
        "href": "https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentBack"
      },
      {
    ],
  "verifiedInformation": {
    "issueCountry": "GBR",
    "name": "John Smith",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01",
    "dateOfExpiry": "2031-05-28",
    "documentType": "passport",
    "documentNumber": "999999999",
    "address": "CoaMuXCeNuiFNZIWQoHL32ojbJNmU19Nu6P4z9T1EFAa",
    "accountId": "did:sol:CoaMuXCeNuiFNZIWQoHL32ojbJNmU19Nu6P4z9T1EFAa"
  }
}
```

#### 3. Inspect PII evidence and decide on an outcome (only for client-owned pass networks) <a href="#id-3.-inspect-pii-evidence-and-decide-on-an-outcome" id="id-3.-inspect-pii-evidence-and-decide-on-an-outcome"></a>

In the response from 2 will be an email, data items extracted from the scanned document, as well as an array containing urls for images of the captured document front and, optionally, back. Use the URL from the array to retrieve the specific image.

**Request**

```bash
GET https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentFront
Headers:
{
  "Authorization": "Bearer AUTH_TOKEN"
}
```

#### 4. Mark the request as pass or fail (only for client-owned pass networks) <a href="#id-4.-mark-the-request-as-pass-or-fail" id="id-4.-mark-the-request-as-pass-or-fail"></a>

After inspecting the user-provided data and images in step 3, inform Civic that the pass should issued or rejected. Civic expects a status of either `partner-pass` or `partner-fail`

**Request**

```bash
PUT https://api.civic.com/partner/piirequest/REQUEST_ID/status
Headers:
{
  "Content-Type": "application/json"
  "Authorization": "Bearer AUTH_TOKEN"
}
Body:
{
  "status": "partner-pass"
}
```

## Code Examples and Demos

For practical implementation, refer to the code examples below, which demonstrate how to use Civic's libraries for EVM chains. These examples can be extended to incorporate composability with passes:

| Vite & React | [Code](https://github.com/civicteam/civic-pass-demos/tree/main/packages/evm/vite) | [Demo](https://airdrop-demo.civic.me/evm)      |
| ------------ | --------------------------------------------------------------------------------- | ---------------------------------------------- |
| NextJs       | [Code](https://github.com/civicteam/civic-pass-demos/tree/main/packages/evm/next) | [Demo](https://airdrop-demo.civic.me/next/evm) |

\
\


