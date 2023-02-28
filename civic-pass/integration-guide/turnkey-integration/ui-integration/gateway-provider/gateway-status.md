# Gateway Status

The **`gatewayStatus`** indicates the overall status of the Civic Pass. For information on how to retrieve the status see the parent section <mark style="color:orange;"></mark> [<mark style="color:orange;">Gateway Provider</mark>](./)<mark style="color:orange;">.</mark>

#### Status before a Civic Pass has been issued&#x20;

Even before a Civic Pass has been issued on-chain, the Gateway Provider gives you a set of status values that you can display in our UI to keep your users informed.

| **Status**                    | **Description**                                                                                                                                                                                                                                                                                                   | **Behaviour when `requestGatewayToken` is triggered**                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `UNKNOWN`                     | No user wallet is connected or no gatekeeper network set                                                                                                                                                                                                                                                          | _None_                                                                                                          |
| `CHECKING`                    | Checking whether a Pass exists for the connected wallet.                                                                                                                                                                                                                                                          | _None_                                                                                                          |
| `NOT_REQUESTED`               | The wallet is connected but no Pass has been requested yet.                                                                                                                                                                                                                                                       | Opens the Civic Pass modal dialog and initiates the token request flow                                          |
| `COLLECTING_USER_INFORMATION` | The required user information is being collected. Depending on the Network configured, this ranges from a simple CAPTCHA to full KYC.                                                                                                                                                                             | Opens the Civic Pass modal dialog and resumes the collection of the required information.                       |
| `VALIDATING_USER_INFORMATION` | <p>The user's identity information has been collected successfully and is being verified.<br></p><p><em>This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2.</em></p> | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |
| `USER_INFORMATION_VALIDATED`  | <p>The user's identity has been validated.<br><br><em>This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2.</em></p>                                                   | Opens the Civic Pass modal dialog and asks the user to re-authenticate so that the request process can proceed. |
| `USER_INFORMATION_REJECTED`   | <p>The user's identity verification request has been rejected.<br><br><em>This status is only available when KYC is in progress and only when the user has chosen to do KYC via on their browser. I.e. not relevant for the Ignite Pass that is used with CandyMachine v2.</em></p>                               | Opens the Civic Pass modal displaying the reasons for the rejection ( for example blurry document scan).        |
| `CONFIRM_WALLET_TRANSACTION`  | The user needs to confirm wallet ownership on their wallet                                                                                                                                                                                                                                                        | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |
| `IN_REVIEW`                   | The Civic Pass has been requested and the Gatekeeper is reviewing the request                                                                                                                                                                                                                                     | Opens the Civic Pass modal dialog with a user-friendly explanation of the status.                               |

#### Status after a Civic Pass has been issued

After a Civic has been issued on-chain, the following status values apply

| **Status** | **Description**                                                                                  | **Behaviour when `requestGatewayToken` is triggered**                             |
| ---------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `ACTIVE`   | The Civic Pass is Active. The user can trade.                                                    | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `EXPIRED`  | The Civic Pass has expired An IP check and proof of wallet ownership are required to refresh it. | Proof of wallet ownership is automatically initiated                              |
| `FROZEN`   | The Pass has been frozen, for example because the user connected from a blocked IP               | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `REVOKED`  | The Pass has been revoked, for example because the user connected from a banned IP               | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |

#### Status when something goes wrong

Issuing a Civic Pass to a user might fail. Either because they don't fulfil the constraints of the configured [<mark style="color:orange;">Gatekeeper Network</mark>](../../selecting-a-pass.md) or, in very seldom cases, because an unexpected technical error occurred.

| **Status**               | **Description**                                        | **Behaviour when `requestGatewayToken` is triggered**                             |
| ------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `LOCATION_NOT_SUPPORTED` | The user's location is not currently supported         | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `ERROR`                  | There was an unexpected error requesting a Civic Pass. | Opens the Civic Pass modal dialog and the user can restart the process.           |
| `REJECTED`               | The token requests has been rejected by the Gatekeeper | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |

