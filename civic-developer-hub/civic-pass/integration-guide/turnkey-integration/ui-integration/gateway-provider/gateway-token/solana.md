# Solana

The **gatewayToken** represents the on-chain structure of the Civic Pass. This will only be defined if the Civic Pass is ACTIVE. For information on how to retrieve the status see the parent section [<mark style="color:orange;">Gateway Provider</mark>](../).

| Property              | Description                                                                                                                            | Type                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **gatekeeperNetwork** | The key of the [Gatekeeper Network](../../../../../overview/how-it-works.md#the-on-chain-gatekeeper-network) the token was issued for. | PublicKey                               |
| **issuingGatekeeper** | The key of the issuing [Gatekeeper](../../../../../overview/how-it-works.md#the-on-chain-gatekeeper-network).                          | PublicKey                               |
| **state**             | The on-chain token status                                                                                                              | State { "ACTIVE", "REVOKED", "FROZEN" } |
| **expiryTime**        | The timestamp at which the on-chain token expires.                                                                                     | number                                  |

