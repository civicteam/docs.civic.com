---
description: >-
  Follow these steps for a turnkey implementation of Civic Pass on Solana and
  SVM chains
---

# ⛓️ Solana

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
npm i @civic/solana-gateway-react@latest
```

Next, import and configure the `GatewayProvider` component.

The **GatewayProvider** is a React component that enables your dApp frontend to:

* access all available information of your user's Civic Pass
* trigger the issuance and refresh of a new Civic Pass

The required configuration properties vary slightly depending on the chain.

**Implementation**

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

Children wrapped by this `GatewayProvider` will have access to the connected wallet's Civic Pass. This is where you want to add the **Identity Button** and any of the gated features in your app.

We suggest placing the `<GatewayProvider>` as high up in the component tree as possible, to ensure you have access to the Civic Pass state throughout your dApp.

#### Configuration Parameters

The configuration parameters of the Gateway Provider vary slightly depending on the blockchain. \\

| **Property**               | **Description**                                                                                                                                                                                                                                                                                                                                                   | **Type**                                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **wallet**                 | An object representing the user's wallet. This may be `undefined` if a wallet hasn't been connected to the dApp yet.                                                                                                                                                                                                                                              | <p><code>{</code></p><p><code>publicKey, signTransaction</code></p><p><code>}</code> (see definitions below)</p>                    |
| **wallet.publicKey**       | The user wallet's public key.                                                                                                                                                                                                                                                                                                                                     | `PublicKey` from `@solana/web3.js`                                                                                                  |
| **wallet.signTransaction** | A function that asks the user's wallet to sign a transaction.                                                                                                                                                                                                                                                                                                     | <p><code>(transaction: Transaction) => Promise</code></p><p>where <code>Transaction</code> is from <code>@solana/web3.js</code></p> |
| **gatekeeperNetwork**      | The address of the Gatekeeper Network for which your Civic Passes are issued. To get started you can use the address of the CAPTCHA Verification: `ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6` . In the [Available Networks](https://docs.civic.com/integration-guides/civic-pass/available-networks) page you can request access to the more advanced networks. | `PublicKey` from `@solana/web3.js`                                                                                                  |
| **connection**             | A Solana connection to any Solana network. The recommended commitment level is `confirmed`.                                                                                                                                                                                                                                                                       | `Connection` from `@solana/web3.js`                                                                                                 |
| **cluster**                | The Solana network to use (i.e. `devnet`, `mainnet-beta`, `testnet)`. This defaults to `mainnet-beta`, so should be set if a different connection endpoint.                                                                                                                                                                                                       | `string`                                                                                                                            |

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
  connection={new Connection(clusterApiUrl("mainnet-beta"), "confirmed")}
  cluster="mainnet-beta"
  gatekeeperNetwork={gatekeeperNetwork}
  options={{ autoShowModal: true, logLevel: "debug" }}>
</GatewayProvider>
```

**Paying for your customers' transactions**

If your users do not have crypto wallets, you can subsidize the cost of their passes, including the transaction cost, by signing and sending the transactions yourself.

To do this:

* Set the `payer` field on the front-end
* Create a back-end service to sign and send the transaction
* Call that back-end service from the front-end via the `handleTransaction` callback.

{% hint style="warning" %}
Ensure you verify the source of the transaction before signing! Signing arbitrary transactions from an unsecured front-end can lead to loss of funds
{% endhint %}

{% hint style="info" %}
For more details, see here: [Docs & Sample Code](https://www.npmjs.com/package/@civic/solana-gateway-react/v/1.2.0-beta.0#paying-for-your-customers-passes)
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
import { useGateway } from "@civic/solana-gateway-react";
```

#### **Trigger the issuance of a Civic Pass**

Calling the function `requestGatewayToken` opens the modal dialog, which guides the user through the flow of collecting and verifying their information. The information collected varies depending on the configured Gatekeeper Network.

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

The **`gatewayStatus`** indicates the overall status of the Civic Pass and should be displayed in your dApp either via custom UI or by integrating the Civic Identity Button included with the library.

The **gatewayToken** represents the on-chain structure of the Civic Pass. This will is only defined if the Civic Pass is ACTIVE.

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
} from '@civic/solana-gateway-react';

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
import IdentityButton from '@civic/solana-gateway-react';
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

The **gatewayToken** represents the on-chain structure of the Civic Pass. This will only be defined if the Civic Pass is active.

| **Property**          | **Description**                                                   | **Type**                                |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| **gatekeeperNetwork** | The key of the Gatekeeper Network for which the token was issued. | PublicKey                               |
| **issuingGatekeeper** | The key of the issuing Gatekeeper.                                | PublicKey                               |
| **state**             | The on-chain token status.                                        | State { "ACTIVE", "REVOKED", "FROZEN" } |
| **expiryTime**        | The timestamp at which the on-chain token expires.                | number                                  |

## Backend Integration

While the [react library](solana.md#id-1.-install-the-react-component-for-your-chain) is the easiest way to integrate Civic Pass on a frontend, there are many reasons why you may need to check the pass state on your backend. Here are a few ways to do this.

### Using the API <a href="#using-the-api" id="using-the-api"></a>

[Custom Pass](https://civic-1.gitbook.io/civic-docs-v2/76NqppOMISHaxk958Rod/custom-passes/issue-your-own-custom-pass) holders can use the API to manage their passes. See [here](https://civic-1.gitbook.io/civic-docs-v2/76NqppOMISHaxk958Rod/custom-passes/using-the-api) for details.

### Using the Backend Library

The [@civic/solana-gateway-ts](https://www.npmjs.com/package/@civic/solana-gateway-ts) library provides a TypeScript interface for checking pass statuses directly against the blockchain

#### **Installation**

Install the civic library and the solana web3 dependency:

```bash
npm install @civic/solana-gateway-ts @solana/web3.js
```

#### Usage

You will need the following things to get started:

```typescript
const networkKey = new PublicKey("...")    // The pass network key in Base58 - provided by Civic
const walletAddress = new PublicKey("...") // The wallet address of the pass holder
const connection = new Connection(...)     // your Solana RPC
```

Check the status of your user's pass using `findGatewayToken`.

```typescript
import { findGatewayToken } from "@civic/solana-gateway-ts";

const token = await findGatewayToken(connection, walletAddress, networkKey);

if (token) {
  console.log(`Pass status: ${token.state}`);
  console.log(`Expiration: ${token.expiryTime}`);
}
```

Optionally, a 'revoked' flag can be passed to allow retrieval of all, even revoked, tokens.

```typescript
findGatewayToken(connection, walletAddress, networkKey, true);
```

#### Subscribing to Events

The library also supports subscribing to events:

```typescript
onGatewayTokenChange(connection, token.publicKey, (token) => {
    console.log(`Pass status: ${token.state}`);
    console.log(`Expiration: ${token.expiryTime}`);
});
```

## On-Chain Integration

Civic's on-chain integration allows developers to leverage smart contracts to verify user identities and ensure compliance with specific criteria. This section provides an overview of deploying and managing smart contracts on various chains and example use cases.

The general idea here is: You have an instruction that should only be callable by someone with a particular type of Civic Pass. For example, a uniqueness pass check on an airdrop, or an over-18 pass check on a purchase.

Your Solana program requires two pieces of information:

* The network key - provided by Civic on sign-up to Civic Pass. Typically stored inside a State account that represents an instance of your program.
* The user's pass - provided as one of the accounts in the instruction you wish to gate

### **Anchor Integration**

When using the widely-used Anchor library, you can use a Civic anchor template to achieve this gating behavior.

First, import the dependencies

```rust
// cargo.toml
[dependencies]
solana-gateway-anchor = "0.1.3"
```

Then gate your instructions like below:

```rust
use solana_gateway_anchor::Pass;

/// Instruction to be gated by Civic Pass
#[derive(Accounts)]
pub struct MyInstruction<'info> {
    /// An account struct containing the network key
    pub my_account: Account<'info, MyAccount>,

    /// The user's pass
    #[account(constraint = pass.valid(&recipient.key, &my_account.network_key))]
    pub pass: Account<'info, Pass>,
}
```

For more details on implementation best practices, check out this [gated airdrop example](https://github.com/civicteam/civic-pass-demos/tree/main/packages/solana/programs/gated-airdrop).

### Non-Anchor Integration

You can use Civic's provided libraries tailored to each blockchain's programming model for a straightforward integration. Import the `solana_gateway` Rust crate from [crates.io](https://crates.io/crates/solana-gateway) as follows:

```rust
[dependencies]
solana-gateway = { version = "0.6.0", features = ["no-entrypoint"] }
```

In your instruction code, call: `Gateway::verify_gateway_token_account_info`

For your program to be able to call the integration library, the following parameters must be passed as inputs to your dApp's transaction:

* `user_wallet` : The wallet account for the dApp user. A Civic Pass must have already been issued to this wallet.
* `pass` : The address of the Civic Pass. This address can be accessed in the dApp through the `useGateway` hook on the Civic UI Component once the user has passed verification.
* `network_key` : The network key on which the Civic Pass has been issued.

<pre class="language-rust"><code class="lang-rust">use solana_gateway::Gateway;

// This check happens before the dApp transaction is processed
<strong>fn process() -> ProgramResult {
</strong><strong>    // extract the following values from the instruction accounts
</strong>    let user_wallet: AccountInfo = ...;
    // The pass presented by the user
    let pass: AccountInfo = ...;
    // The Civic Pass network key - usually stored in a state account
    // not passed in directly as an instruction account.
    let network_key: Pubkey = ...;
    
    // Check the token is valid. An error here means the token 
    // is not valid for the user's wallet on the gateway network.
    Gateway::verify_gateway_token_account_info(
        &#x26;pass, &#x26;user_wallet.key, &#x26;network_key
    )?;
    
    Ok(())
}
</code></pre>

### **Solana Attestation Service (SAS)**

Civic is part of the Solana Attestation Service (SAS), an open-source protocol on Solana that enables developers to issue and verify attestations. If you're interested in integrating SAS into your project, please [get in touch](https://civickey.typeform.com/solana-sas).

### **Error handling**

If something goes wrong or the token it invalid, the Gateway call will return a `GatewayError`. The possible values can be seen in [error.rs](https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/integration-lib/src/error.rs). For error cases, the dApp smart contract should reject the transaction.

## User PII Retrieval

For certain Civic Pass types where the user has to supply a document or email address, such evidence items will be made available to you for approval or rejection prior to pass issuance.

As the user reaches the end of the Civic Pass data collection flow, including authorizing the collection of their PII, they will land on a screen informing them that their request is in "partner review". This serves as the interjection point where you will be able to view, inspect and decide on the outcome of the pass issuance request.

### Retrieving PII Evidence <a href="#retrieving-pii-evidence" id="retrieving-pii-evidence"></a>

The Gatekeeper Context will communicate a new presentation request ID when the user reaches the end of the data collection flow. See [here](solana.md#id-1.-install-the-react-component-for-your-chain) for more detail on the use of `GatewayProvider` and `useGateway` .

```jsx
const { pendingRequests } = useGateway();
```

`pendingRequests?.presentationRequestId` will be the identifier referred to by REQUEST\_ID in the snippets below.

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

## 3rd Party Integrations

### Solana Token Extensions

**Permissioned Tokens On the Solana Blockchain**

[Solana Token Extensions](https://solana.com/solutions/token-extensions) is a feature-rich platform for building permissioned tokens on Solana. Token Extensions can be used with Civic Pass to provide a powerful, flexible, and simple mechanism for adding identity verification to a Token Extensions token using the [Civic Transfer Hook](https://github.com/civicteam/token-extensions-transfer-hook). Example use-cases are real-world assets and Sybil-resistance.

For details on setting up your token, see the details in the [transfer hook repository](https://github.com/civicteam/token-extensions-transfer-hook) or [contact us](mailto:bd@civic.com).

### Realms DAO Governance Plugin

[Realms](https://realms.today/) is the DAO governance platform on Solana, using the [spl-governance](https://github.com/solana-labs/solana-program-library/tree/master/governance) program. Civic Pass can be added to a DAO on Realms using the "[plugin](https://github.com/solana-labs/governance-program-library)" system.

When using the Realms UI, no coding is required to integrate Civic Pass into your DAO. Simply follow the steps in the [Realms docs page](https://docs.realms.today/Extra%20Guides/civic).

See section below for Civic Pass verifications available via the Realms UI. To add a pass not included in the UI dropdown, choose "Other" and enter the address manually.

Quick Reference: If you are looking for the "Community Voter Weight Add-in" to enter into the DAO Parameters, it is `GgathUhdrCWRHowoRKACjgWhYHfxCEdBi5ViqYN6HVxk`

#### Step-by-Step Tutorial: Setting up a DAO on Realms and protecting it with Civic Pass

{% embed url="https://www.youtube.com/watch?v=vNqeCZ7YBIE" %}

### Metaplex Candy Machine v3

We are fully integrated into MetaPlex's Candy Machine v3 protocol to enable mint protection using [Candy Guard](https://developers.metaplex.com/core-candy-machine/guards). Permissioning with Civic Pass & Candy Guard allows you to verify minters in real-time, evaluating every request to mint by your criteria, including:

* conducting a bot check using CAPTCHA
* checking for liveness and uniqueness
* checking for a minimum age
* checking buyers from locations you want to allow
* checking ID documents

You can use our [reference implementation UI template using Candy Machine V3 with integrated Civic Pass ->](https://github.com/MarkSackerberg/umi-cmv3-ui-inofficial)

We recommend using the [latest sugar command line tool](https://developers.metaplex.com/candy-machine/sugar) to create your mint.

**Creating a protected mint using Sugar CLI**

In Candy Machine v3 creation of the token guard is separate from the mint.

1. install sugar: currently sugar support for Candy Machine needs to be downloaded [here](https://github.com/metaplex-foundation/sugar/releases)
2.  Create your mint (with Candy Machine v3 the mint and the token guard are created separately). Follow the prompts on the CLI:

    Copy

    ```bash
    sugar launch
    ```
3.  A config.json should have been created. Edit this file and add a 'guards' section (see the section below for alternative networks):

    Copy

    ```json
    "guards": {
        "default": {
          "gatekeeper": {
            "gatekeeperNetwork": "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
            "expireOnUse": false
          }
        },
        "groups": null
      }
    ```
4.  Create the guard for your mint:

    Copy

    ```bash
    sugar guard add
    ```
5.  The script should run successfully and you should see output like below:

    Copy

    ```bash
    %  sugar guard add
    [1/3] 🔍 Looking up candy machine

    Candy machine ID: Hjyvm2VpAMfFQDNKJaQUoQqr3HPXDSGokRGD9hpSBZay

    [2/3] 🛡  Initializing a candy guard
    Signature: 4AMsoW9n9j6gWbgqHwTK9haSHwFSDSJX18YYZrYDzYTepXgBpoGh2QgQ3wnYticfTgw5P92GY8P7rTebK6g6WMWj

    Candy guard ID: EYajALMJFqdFSYJj6KVFzYDjbRGFL61WTUECKiS4wGBC

    [3/3] 📦 Wrapping
    Signature: 2oyYp8Jd3copk7bkB69kk7hSEpHLJKnWxZAZTwyT1mEmpjC5faKaDLwoRNHZxgjRDK2fmvPs4gqKdd83QFUXeiyD

    The candy guard is now the mint authority of the candy machine.

    ✅ Command successful.
     
    ```

For detailed configuration instructions on how to configure and deploy your mint, please refer to MetaPlex's [Sugar repository](https://github.com/metaplex-foundation/sugar).

## Code Examples and Demos

For practical implementation, refer to the code examples below, which demonstrate how to use Civic's libraries for Solana and SVM chains. These examples can be extended to incorporate composability with passes:

| Vite & React | [Code](https://github.com/civicteam/civic-pass-demos/tree/main/packages/solana/vite) | [Demo](https://airdrop-demo.civic.me/solana)      |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------- |
| Next.js      | [Code](https://github.com/civicteam/civic-pass-demos/tree/main/packages/solana/next) | [Demo](https://airdrop-demo.civic.me/next/solana) |

\
\\
