# Client-Sent Transactions

In the default mode of the React Component the transaction required to issue the Gateway Token will not be sent by the gatekeeper. Civic will not broadcast the transaction and instead the user will be required to sign the transaction for a new token that will be sent to the network. The user will also be responsible for paying the transaction fees, and these fees will be communicated to the user during the issuance process.

The client sent transaction can be changed by specifying the `gatekeeperSendsTransaction` property to true, as follows:
```typescript
<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}
  clusterUrl={clusterUrl}
  gatekeeperSendsTransaction={true}
>
</GatewayProvider>
```
This changes the behavior so that the gatekeeper signs and sends the transaction to create the token. Please note that this configuration is not supported for all networks.

Please refer to the example project on [Github](https://github.com/civicteam/civic-pass-template) for more information.
