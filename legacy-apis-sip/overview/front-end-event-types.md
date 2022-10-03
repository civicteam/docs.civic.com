# Front-End Event Types

### auth-code-received <a href="#auth-code-received" id="auth-code-received"></a>

The `auth-code-received` event is emitted as soon as the requested verified information has been shared by the user. It contains the following fields:

| Field    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| event    | The event name: `scoperequest:data-received`                     |
| response | JWT Token in base64 encoded format containing authorization code |

### user-cancelled <a href="#user-cancelled" id="user-cancelled"></a>

The `user-cancelled` event is emitted when the user cancels the process on their Civic Wallet app.

| Field | Description                                   |
| ----- | --------------------------------------------- |
| event | The event name: `scoperequest:user-cancelled` |

### civic-sip-error <a href="#civic-sip-error" id="civic-sip-error"></a>

The `civic-sip-error` event is emitted in the unlikely case a technical error caused the verification process to terminate.

| Field | Description                                    |
| ----- | ---------------------------------------------- |
| event | The event name: `scoperequest:civic-sip-error` |

