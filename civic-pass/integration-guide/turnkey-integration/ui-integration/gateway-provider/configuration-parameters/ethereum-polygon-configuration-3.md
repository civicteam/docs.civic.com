# Arbitrum

{% hint style="info" %}
&#x20;[Click here](https://demopass.civic.com/#arbitrum%20one) for a demo of Civic Pass on Arbitrum!
{% endhint %}

The configuration parameters of the Arbitrum implementation of the GatewayProvider. For a full integration guide on integrating the Gateway Provider the parent section, [<mark style="color:orange;">Gateway Provider</mark>](../).

{% hint style="info" %}
The React component uses [ethers.js](https://www.npmjs.com/package/ethers)
{% endhint %}

```jsx
<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}>
  {children}
</GatewayProvider>
```

| **Property**          | **Description**                                                                             | **Type**               |
| --------------------- | ------------------------------------------------------------------------------------------- | ---------------------- |
| **wallet**            | An [ethers.js](https://www.npmjs.com/package/ethers) object representing the user's wallet. | `Wallet` from `ethers` |
| **gatekeeperNetwork** | The address of the [Gatekeeper Network](../../../selecting-a-pass.md) are issued for.       | `string`               |

