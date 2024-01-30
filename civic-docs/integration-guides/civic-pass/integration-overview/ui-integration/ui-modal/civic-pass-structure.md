# Civic Pass Structure

The **gatewayToken** represents the on-chain structure of the Civic Pass. This will only be defined if the Civic Pass is active. For information on how to retrieve the status see [<mark style="color:orange;">Gateway Provider</mark>](../).

|                       |                                                                   |                                         |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| **Property**          | **Description**                                                   | **Type**                                |
| **gatekeeperNetwork** | The key of the Gatekeeper Network for which the token was issued. | PublicKey                               |
| **issuingGatekeeper** | The key of the issuing Gatekeeper.                                | PublicKey                               |
| **state**             | The on-chain token status.                                        | State { "ACTIVE", "REVOKED", "FROZEN" } |
| **expiryTime**        | The timestamp at which the on-chain token expires.                | number                                  |

