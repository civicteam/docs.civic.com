# On-Chain Integration

Your on-chain smart contract has to check for a valid Civic Pass during program execution and reject transactions from non-compliant users (i.e. those without an active Civic Pass).

For each blockchain supported by Civic Pass, we provide you with a library that is tailored to the programming model of that chain.

{% tabs %}
{% tab title="Solana" %}
{% embed url="https://vimeo.com/841371445?share=copy" %}
How to: Gate a Solana program with Civic Pass
{% endembed %}

Import the `solana_gateway` Rust crate from [<mark style="color:orange;">crates.io</mark>](https://crates.io/crates/solana-gateway) as follows:

```
[dependencies]
solana-gateway = { version = "0.4.0", features = ["no-entrypoint"] }
```

In your instruction code, call: `Gateway::verify_gateway_token_account_info`&#x20;

For your program to be able to call the integration library, the following parameters must be passed as inputs to your dApp's transaction:

* `userWallet` : The wallet account for the dApp user. A Civic Pass must have already been issued to this wallet.
* `gateway_token` : The address of the Civic Pass. This address can be accessed in the dApp through the `useGateway` hook on the [<mark style="color:orange;">Civic React Component</mark>](ui-integration/) once the user has passed verification.
* `gatekeeper_network` : The Gatekeeper Network on which the Civic Pass has been issued.&#x20;

{% hint style="info" %}
See [<mark style="color:orange;">Gatekeeper Networks</mark>](../available-networks.md) for the list of available networks.
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

If something goes wrong or the token it invalid, the Gateway call will return a `GatewayError`. The possible values can be seen in [<mark style="color:orange;">error.rs</mark>](https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/integration-lib/src/error.rs). For error cases, the dApp smart contract should reject the transaction.
{% endtab %}

{% tab title="Ethereum + EVMs" %}
{% embed url="https://vimeo.com/841370774?share=copy" %}
How to: Gate a smart contract with Civic Pass
{% endembed %}

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

    constructor(address gatewayTokenContract, uint256 gatekeeperNetwork) 
        Gated(gatewayTokenContract, gatekeeperNetwork) {
    }
    
    function myFunction() external gated {
    }
}
```

The gateway token contract address is `0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E`

{% hint style="info" %}
You can find the correct `gatekeeperNetwork`  in the list of available [<mark style="color:orange;">Gatekeeper Networks</mark>](../available-networks.md)<mark style="color:orange;">.</mark>
{% endhint %}

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
