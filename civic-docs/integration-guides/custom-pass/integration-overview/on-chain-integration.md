# On-Chain Integration

Your on-chain smart contract has to check for a valid Civic Pass during program execution and reject transactions from non-compliant users (users without an active Civic Pass).

For each blockchain supported by Civic Pass, we provide you with a library that is tailor-made to the programming model of the chain.

{% tabs %}
{% tab title="Solana" %}
{% embed url="https://vimeo.com/841371445?share=copy" %}

Integrating a Civic Pass check in your Solana on-chain program is very easy.

Import the `solana_gateway` Rust crate from [<mark style="color:orange;">crates.io</mark>](https://crates.io/crates/solana-gateway) and call     `Gateway::verify_gateway_token_account_info`

For your program to be able to call the integration library, the following parameters must be passed as inputs to your dApp's transaction:

* `userWallet` : The wallet account for the dApp user (e.g. the trader in a defi application). A Civic Pass must have been already issued to this wallet.
* `gateway_token` : The address of the Civic Pass (token). This address can be accessed in the dApp through the `useGateway` hook on the [<mark style="color:orange;">Civic React Component</mark>](../../civic-pass/integration-overview/ui-integration/) once the user has passed Gatekeeper verification.
* `gatekeeper_network` The gatekeeper network on which the Civic Pass has been issued. See [<mark style="color:orange;">here</mark>](../testing.md#on-chain) for test keys or [<mark style="color:orange;">contact us</mark>](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a) to discuss.

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
        &gateway_token_account_info, &userWallet.key, &gatekeeper_network
    )?;
    
    Ok(())
}
```

#### Error handling

If something goes wrong or the token is invalid the Gateway call will return a `GatewayError`. The possible values can be seen in [<mark style="color:orange;">error.rs</mark>](https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/integration-lib/src/error.rs). For error cases, the dApp smart contract should reject the transaction.
{% endtab %}

{% tab title="Ethereum + EVMs" %}
{% embed url="https://vimeo.com/841370774?share=copy" %}

Integrating a Civic Pass check in your EVM smart contract is simple:

First, import the contract dependencies:

```sh
npm install @identity.com/gateway-protocol-eth
```

{% hint style="info" %}
This tutorial assumes Hardhat. If you are using foundry, please see tips [here](https://sooryak.hashnode.dev/adding-dependencies-to-your-contracts-in-foundry) (external link). The steps below can also be followed by copying the contract code directly [here](https://github.com/identity-com/on-chain-identity-gateway/tree/main/ethereum/smart-contract/contracts). Contact us on our [Discord](https://discord.com/invite/8H5Kdtr5Wn) if you have difficulty.
{% endhint %}

Then, in your smart contract, inherit the Gated contract, and add the 'gated' modifier to any function. The function can only be called by a msg.sender that has a valid gateway token.

```solidity
import "@identity.com/gateway-protocol-eth/contracts/Gated.sol";

// Your contract
contract MyContract is Gated {

    constructor(address gatewayTokenContract, uint256 gatekeeperNetworkSlotId) 
        Gated(gatewayTokenContract, gatekeeperNetworkSlotId) {
    }
    
    function myFunction() external gated {
    }
}
```

* The `gatewayTokenContract` address is `0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E`
* You will receive the `gatekeeperNetworkSlotId` when you complete your onboarding with Civic (see [here](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a)).

## Advanced

If you want more control over the verification process on-chain, you can use the following code instead of the Gated contract:

```solidity
import "@identity.com/gateway-protocol-eth/contracts/interfaces/IGatewayTokenVerifier.sol";

...
IGatewayTokenVerifier verifier = IGatewayTokenVerifier(gatewayTokenContract);
if (!verifier.verifyToken(addressToVerify, gatekeeperNetwork)) {
        // some logic
}
```
{% endtab %}
{% endtabs %}
