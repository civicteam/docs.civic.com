# Solana

{% hint style="info" %}
Try out Civic Pass on our [<mark style="color:orange;">Solana Demo</mark>](https://getpass.civic.com) <mark style="color:orange;">dApp!</mark>
{% endhint %}

The configuration parameters of the Solana implementation of the GatewayProvider. For a full integration guide on integrating the Gateway Provider the parent section, [<mark style="color:orange;">Gateway Provider</mark>](../).

```jsx
<GatewayProvider
  wallet={wallet}
  connection={new Connection(clusterApiUrl("mainnet-beta"))}
  cluster="mainnet-beta"
  gatekeeperNetwork={gatekeeperNetwork}
></GatewayProvider>
```

| **Property**               | **Description**                                                                                                                                            | **Type**                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **wallet**                 | An object representing the user's wallet. This may be `undefined` if a wallet hasn't been connected to the dApp yet.                                       | <p><code>{</code></p><p><code>publicKey, signTransaction</code></p><p><code>}</code> (see definitions below)</p>                                      |
| **wallet.publicKey**       | The user wallet's public key                                                                                                                               | `PublicKey` from `@solana/web3.js`                                                                                                                    |
| **wallet.signTransaction** | A function that asks the user's wallet to sign a transaction.                                                                                              | <p><code>(transaction: Transaction) => Promise<Transaction></code></p><p>where <code>Transaction</code> is from <code>@solana/web3.js</code></p> |
| **gatekeeperNetwork**      | <p>The address of the</p><p><a href="../../../selecting-a-pass.md">Gatekeeper Network</a> that your Civic Passes are issued for.</p>                       | `PublicKey` from `@solana/web3.js`                                                                                                                    |
| **connection**             | A Solana connection to any Solana network. The recommended commitment level is 'processed'                                                                 | `Connection` from `@solana/web3.js`                                                                                                                   |
| **cluster**                | The Solana network to use, i.e. `devnet`, `mainnet-beta`, `testnet`. This defaults to `mainnet-beta`, so should be set if a different connection endpoint. | `string`                                                                                                                                              |
| **logo**                   | Optional url of your logo that will be shown, if set, during verification.                                                                                 | `string`                                                                                                                                              |

### Advanced Configuration

#### Broadcasting Transactions via Civic

In the default mode of operation, the transaction required to issue or refresh the Civic Pass will not be broadcast by Civic, only signed by Civic. The user will responsible for broadcasting the transaction incl. any fees. This flow is handled transparently by the Gateway Provider, which also communicates any fees to the user via the Civic Pass modal.

Some [<mark style="color:orange;">Gatekeeper Networks</mark>](../../../selecting-a-pass.md) support an alternative mode, i.e. having the Civic backend (i.e. Gatekeeper) broadcast the transaction. If the gatekeeper network you are using supports this, you can set the `gatekeeperSendsTransaction` property to `true` to turn it on.

|                                |                                                                                               |               |
| ------------------------------ | --------------------------------------------------------------------------------------------- | ------------- |
| **Property**                   | **Description**                                                                               | **Type**      |
| **gatekeeperSendsTransaction** | Civic will send the transaction to the blockchain on behalf of the user. Defaults to `false`. | true \| false |

#### Taking responsibility for the broadcasting the transaction

If the custom `handleTransaction` function is provided it is the responsibility of the integrator to

- either sign and send the transaction or
- just send the transaction based on the signatures requirement of the transaction.

The integrator also has the option to extend the transaction before it is signed and sent, in order to minimise the number of separate transactions that the user is required to approve.

|                       |                                                                                                                                                                                                                                         |                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Property**          | **Description**                                                                                                                                                                                                                         | **Type**                                      |
| **handleTransaction** | <p>An optional callback function that will invoked with a partially signed transaction for the user to sign and send to the blockchain.<br>(not available when <code>gatekeeperSendsTransaction</code> is set to <code>true)</code></p> | `(transaction: Transaction) => Promise<void>` |
