# Configuration Parameters

## Gateway Provider

The configuration parameters of the Gateway Provider vary slightly depending on the blockchain. For a full integration guide on integrating the Gateway Provider, please see [<mark style="color:purple;">UI Modal</mark>](./).

{% tabs %}
{% tab title="Solana" %}
```jsx
<GatewayProvider
  wallet={wallet}
  connection={new Connection(clusterApiUrl("mainnet-beta"), "confirmed")}
  cluster="mainnet-beta"
  gatekeeperNetwork={gatekeeperNetwork}>
</GatewayProvider>
```

| **Property**               | **Description**                                                                                                                                                                                                                                                                                                                                                                                  | **Type**                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **wallet**                 | An object representing the user's wallet. This may be `undefined` if a wallet hasn't been connected to the dApp yet.                                                                                                                                                                                                                                                                             | <p><code>{</code></p><p><code>publicKey, signTransaction</code></p><p><code>}</code> (see definitions below)</p>                                      |
| **wallet.publicKey**       | The user wallet's public key.                                                                                                                                                                                                                                                                                                                                                                    | `PublicKey` from `@solana/web3.js`                                                                                                                    |
| **wallet.signTransaction** | A function that asks the user's wallet to sign a transaction.                                                                                                                                                                                                                                                                                                                                    | <p><code>(transaction: Transaction) => Promise&#x3C;Transaction></code></p><p>where <code>Transaction</code> is from <code>@solana/web3.js</code></p> |
| **gatekeeperNetwork**      | <p>The address of the Gatekeeper Network for which your Civic Passes are issued. <br>To get started you can use the address of the CAPTCHA Verification: <code>ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6</code> .<br> In the <a href="../../../available-networks.md"><mark style="color:purple;">Available Networks</mark></a> page you can request access to the more advanced networks.</p> | `PublicKey` from `@solana/web3.js`                                                                                                                    |
| **connection**             | A Solana connection to any Solana network. The recommended commitment level is `confirmed`.                                                                                                                                                                                                                                                                                                      | `Connection` from `@solana/web3.js`                                                                                                                   |
| **cluster**                | The Solana network to use (i.e. `devnet`, `mainnet-beta`, `testnet)`. This defaults to `mainnet-beta`, so should be set if a different connection endpoint.                                                                                                                                                                                                                                      | `string`                                                                                                                                              |
{% endtab %}

{% tab title="Ethereum + EVMs" %}
{% hint style="info" %}
The React component uses [ethers.js](https://www.npmjs.com/package/ethers) v6
{% endhint %}

```jsx
<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```

| **Property**          | **Description**                                                                                                                | **Type**                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **wallet**            | A object containing a wallet address & an instance of an [ethers v6 signer ](https://docs.ethers.org/v6/api/providers/#Signer) | <pre><code><strong>type EthereumGatewayWallet = {
</strong>  address: string | undefined;
  signer: Signer | undefined;
};
</code></pre> |
| **gatekeeperNetwork** | The address of the [Gatekeeper Network](broken-reference) are issued for.                                                      | `string`                                                                                                                                 |

#### Converting a viem/wagmi walletClient to an ethers v6 signer

You can convert a viem/wagmi walletClient to an ethers v6 interface by following the [README](https://github.com/civicteam/ociv-gatekeeper/blob/ef3e73f0701abd4125839bf83a7ebb3ca3e2f130/packages/gatekeeper-api/etc/scripts/data/util.ts#L89). An example of this pattern in action is available in the [example repository](https://github.com/civicteam/civic-pass-eth-template).
{% endtab %}
{% endtabs %}



### Advanced Configuration

#### Paying for your customers' transactions

If your users do not have crypto wallets, you can subsidize the cost of their passes, including the transaction cost, by signing and sending the transactions yourself.

To do this:

* Set the `payer` field on the front-end
* Create a back-end service to sign and send the transaction (**warning**: ensure you verify the source of the transaction before signing! Signing arbitrary transactions from an unsecured front-end can lead to loss of funds)
* Call that back-end service from the front-end via the `handleTransaction` callback.

For more details, see here:

{% tabs %}
{% tab title="Solana" %}
[<mark style="color:purple;">Docs & Sample Code</mark>](https://www.npmjs.com/package/@civic/solana-gateway-react/v/1.0.0-beta.0#paying-for-your-customers-passes)

[<mark style="color:purple;">Sample Project (Next.js)</mark>](https://github.com/civicteam/civic-pass-next-app-router-demo/tree/feature/solana-payer)
{% endtab %}

{% tab title="Ethereum + EVMs" %}
[<mark style="color:purple;">Docs & Sample Code</mark>](https://www.npmjs.com/package/@civic/ethereum-gateway-react/v/1.2.0-beta.0#paying-for-your-customers-passes)

Sample Project (Next.js) Coming soon...
{% endtab %}
{% endtabs %}

#### Broadcasting transactions via Civic

In the default mode of operation, the transaction required to issue or refresh the Civic Pass will be signed, but not broadcasted, by Civic. The user is responsible for broadcasting the transaction, including any fees. This flow is handled transparently by the Gateway Provider, which also communicates any fees to the user via the Civic Pass modal.

Some [<mark style="color:purple;">Gatekeeper Networks</mark>](../../../available-networks.md) support an alternative mode such as having the Civic backend broadcast the transaction. If the Gatekeeper Network you are using supports this, you can set the `gatekeeperSendsTransaction` property to `true` to turn it on.

|                                |                                                                                                                                                     |               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Property**                   | **Description**                                                                                                                                     | **Type**      |
| **gatekeeperSendsTransaction** | Civic will send the transaction to the blockchain on behalf of the user. Defaults to `false`.                                                       | true \| false |
| **forceRequireRefresh**        | <p>Setting this flag forces the user to refresh their active pass when set, even if the pass is not expired.<br>Defaults to <code>false</code>.</p> | true \| false |

