# On-chain Integration

Checking for a valid Civic Pass during on-chain program execution is very straight-forward.&#x20;

Import the `solana_gateway` Rust crate from [crates.io](https://crates.io/crates/solana-gateway) and call it when a presence of valid token is required. For example, before minting an NFT, adding a new order to an order-book or granting access to a gated section.&#x20;

For your program to be able to call the integration library, the following parameters must be passed as inputs to your dApp's transaction:

* `userWallet` : The wallet account for the dApp user (e.g. the trader in a defi application) . A Civic Pass must have been already issued to this wallet.
* `gateway_token` : The address of the Civic Pass (token). This address can be accessed in the dApp through the `useGateway` hook on the [Civic React Component](../#ui-integration-civics-react-component)  once the user has passed Gatekeeper verification.
* `gatekeeper_network` The gatekeeper network on which the Civic Pass has been issued. For more information about Gatekeeper Networks, see [[#the-gatekeeper-network](how-it-works.md#the-gatekeeper-network "mention")](https://app.gitbook.com/@civic-1/s/gateway/\~/drafts/-MkIXrKS63CteWYs62ME/civic-gateway-dapp-integration-guide/@comments/4423b1d5ed6d47a5b47d93a6998dbe86#the-gatekeeper-network).

{% hint style="info" %}
Get the `gatekeeper_network` address in the [**Getting Access**](selecting-a-pass.md) section
{% endhint %}

```rust
use solana_gateway::Gateway;

// This check happens before the dApp transaction is processed
fn process() -> ProgramResult {
    // The owner of the gateway token
    let user_wallet: AccountInfo;
    // The gateway token presented by the owner
    let gateway_token: AccountInfo;
    // The gatekeeper network key
    let gatekeeper_network: Pubkey;
    
    // Check the token is valid. An error here means the token 
    // is not valid for the user's wallet on the gateway network.
    Gateway::verify_gateway_token_account_info(
        &gateway_token_account_info, &userWallet.key, &gatekeeper
    )?;
    
    Ok(())
}
```

#### Error handling

The Gateway call will return a `GatewayError` if something goes wrong or the token is invalid. The possible values can be seen in [error.rs](https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/integration-lib/src/error.rs) . For error cases, the dApp smart contract should reject the transaction.

