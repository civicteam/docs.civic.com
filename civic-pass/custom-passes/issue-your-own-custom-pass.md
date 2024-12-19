---
description: >-
  A Custom Pass is designed for dApps that wish to restrict access but do not
  want to use Civic IDV Services and UI components.
---

# 📝 Issue Your Own Custom Pass

With Custom Pass, builders can write their own rules, bring in other verification services or customize/bundle several of the Civic Pass functions into a single pass that lives on-chain.&#x20;

## Custom Pass Architecture

<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption><p>API integration</p></figcaption></figure>

Once a user has been successfully vetted according to your logic, you can then call the Civic API to issue a Custom Pass to your user's wallet. The API also enables you to manage the complete lifecycle of any Custom Pass you issued (refresh, revocation, expiry, burning).

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption><p>On-chain integration</p></figcaption></figure>

As you are integrating, remember that your on-chain smart contract or app still has to check for a valid Custom Pass during program execution.

To enable gating logic using a Custom Pass, you will need:

* Civic Pass API integration to enable issuing and managing the Custom Pass for your dApp

{% hint style="info" %}
**See here for the full** [<mark style="color:purple;">**OpenAPI specification**</mark>](https://civicteam.github.io/openapi-docs/)**.**
{% endhint %}

* On-Chain library to enable your smart contract to check for valid Civic Pass during program execution. See the On-Chain section in the integration guide for your chain.&#x20;

Please [reach out](https://civickey.typeform.com/req-custom) to discuss your use case and obtain the key to enable your pass network.&#x20;

## Supported Custom Pass Chains

The Civic Pass API supports the following chains and chain networks:

* `solana/mainnet-beta`
* `solana/devnet`
* `ethereum/homestead`
* `ethereum/arbitrumGoerli`
* `ethereum/arbitrumMainnet`
* `ethereum/arbitrumSepolia`
* `ethereum/goerli`
* `ethereum/avalancheCChain`
* `ethereum/avalancheCChainFuji`
* `ethereum/baseSepolia`
* `ethereum/baseMainnet`
* `ethereum/fantomMainnet`
* `ethereum/fantomTestnet`
* `ethereum/mainnet`
* `ethereum/optimismGoerli`
* `ethereum/optimismMainnet`
* `ethereum/polygonMainnet`
* `ethereum/polygonMumbai`
* `ethereum/polygonZKEVM`
* `ethereum/polygonZKEVMTestnet`
* `ethereum/xdcMainnet`
* `ethereum/xdcApothem`

## Testing

### API Functionality

You can try out the Civic Pass API by using the following demo credentials to generate an OAuth token:

* `client_id: j5kwZ68j4bM8fdPAYKu7DlGQGr37eNPs`
* `client_secret: S1qSiacDUDPRVfxiSvwsRASxE0fH47U60eYeNYIt4JKSVSsgo2yy0n6V-Uz1IYBK`

Keep in mind that since these are _shared credentials_, others have access to the same Civic Passes and can, for example, freeze them.

_The demo credentials only work for these development networks:_

* `solana/devnet`
* `ethereum/goerli`
* `ethereum/polygonMumbai`
* `ethereum/xdcApothem`
* `ethereum/arbitrumGoerli`
* `ethereum/fantomTestnet`

### On-Chain Integration

To test your integration on **testnet**, use this Gatekeeper network address:

`gatekeeperNetwork=tgnuXXNMDLK8dy7Xm1TdeGyc95MDym4bvAQCwcW21Bf`
