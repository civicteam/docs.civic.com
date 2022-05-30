# Client Sent Transactions

The React Component also supports a mode where the transaction required to issue the Gateway Token will not be broadcast. Civic will not broadcast the transaction and instead it is the responsibility of the integrator to either sign and send the transaction or just send the transaction based on the signatures requirement of the Transaction.

When refreshing a Gateway token, the token will not need to be signed by the client. The client is only responsible for sending the transaction to the blockchain so the token can be refreshed. Please refer to our `@civic/solana-gateway-react` example project on [Github](https://github.com/civicteam/civic-pass-template).
