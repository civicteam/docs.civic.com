# Ethereum

Integrating a Civic Pass check in your Ethereum smart-contract is trivial:

First, copy the `IGatewayTokenVerifier.sol`  interface ([<mark style="color:orange;">GitHub</mark>](https://github.com/identity-com/on-chain-identity-gateway/blob/develop/ethereum/smart-contract/contracts/interfaces/IGatewayTokenVerifier.sol) <mark style="color:orange;">link</mark>) into your smart contract deployment.

Then, in your smart-contract, import and then implement an instance of the `GatewayTokenVerifier` interface.&#x20;

```solidity
import "./IGatewayTokenVerifier.sol";

// Your contract
contract MyContract {
    IGatewayTokenVerifier verifier;

    constructor (address gatekeeperNetwork) {
        verifier = IGatewayTokenVerifier(gatekeeperNetwork);
    }
}
```

{% hint style="info" %}
You can find the correct `gatekeeperNetwork` key in the list of available <mark style="color:orange;"></mark> [<mark style="color:orange;">Gatekeeper Networks</mark>](../selecting-a-pass.md)<mark style="color:orange;">.</mark>
{% endhint %}

Finally, call the method `verifyToken` check that the user calling your smart contract has an active Civic Pass.

```
bool verificationResult = verifier.verifyToken(userAddress);
```
