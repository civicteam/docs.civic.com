# Client-Sent Transactions

In the default mode of the React Component the transaction required to issue the Gateway Token will not be sent by the gatekeeper. Civic will not broadcast the transaction and instead the user will be required to sign the transaction for a new token that will be sent to the network. The user will also be responsible for paying the transaction fees, and these fees will be communicated to the user during the issuance process. When refreshing a Gateway token, the token will not need to be signed by the client.

By default the React Component will orchestrate the logic for signing and sending the transaction at the end of the process. This behavior can be customized by passing a custom function called `handleTransaction` to the `GatewayProvider`, for example:

```typescript
<GatewayProvider
  wallet={wallet}
  gatekeeperNetwork={gatekeeperNetwork}
  clusterUrl={clusterUrl}
  handleTransaction={handleTransaction={async (transaction) => {...}}
>
</GatewayProvider>
```
If the custom `handleTransaction` function is provided it is the responsibility of the integrator to either sign and send the transaction or just send the transaction based on the signatures requirement of the Transaction. The integrator also has the option to extend the transaction before it is signed and sent, in order to minimize the number of separate transactions that the user is required to approve.

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
