---
description: >-
  This guide explains how to integrate Civic Pass verification into your
  Internet Computer Protocol (ICP) application using the Civic Pass canister and
  React component.
hidden: true
---

# Internet Computer (ICP)

## Prerequisites

* Access to an Internet Computer application. Guide can be found [here](https://internetcomputer.org/docs/current/developer-docs/getting-started/install).
* Node.js and npm/yarn installed
* Understanding of ICP canisters and React

## Civic Pass Canister

The Civic Pass ICP canister is accessible at:

```
Canister ID: 73ncn-4qaaa-aaaag-alddq-cai
URL: https://73ncn-4qaaa-aaaag-alddq-cai.icp0.io
```

## Available Gatekeeper Networks

Civic Pass offers the following verification networks:

#### **CAPTCHA Pass** <a href="#captcha-pass" id="captcha-pass"></a>

A challenge-response test to determine human or bot. [**Try it out ->**](https://icp-getpass.civic.com/)

[**Get CAPTCHA key ->**](https://civickey.typeform.com/req-captcha)

#### **Uniqueness Pass** <a href="#uniqueness-pass" id="uniqueness-pass"></a>

A video selfie to determine 1-user-1-wallet. [**Try it out ->**](https://icp-getpass.civic.com/)

[**Get Uniqueness key ->**](https://civickey.typeform.com/req-uniqueness)

#### **Age 13 Pass** <a href="#captcha-pass" id="captcha-pass"></a>

A challenge-response test to determine human or bot. [**Try it out ->**](https://icp-getpass.civic.com/)

[**Get Age 13 key ->**](https://civickey.typeform.com/req-icp-age)



## Integration Flow

1. **Pass Acquisition**
   * Direct users to https://icp-getpass.civic.com
   * Users select their desired pass type
   * Users complete the verification flowr
2. **Pass Storage**
   * Upon successful verification, the pass is stored as a credential in the Civic Pass canister
   * The credential can be verified using our component below the or by using the official [DFX Verifiable Credentials SDK](https://github.com/dfinity/verifiable-credentials-sdk)

### Install the React Component

Install the React component package:

```bash
npm install @civic/icp-gateway-react-ui
# or
yarn add @civic/icp-gateway-react-ui
```

#### Basic Usage

```jsx
import React from 'react';
import { Principal } from '@dfinity/principal';
import ICPCredentialCheckButton from './ICPCredentialCheckButton';

const App = () => {
  const principal = Principal.fromText('your-principal-id');
  const gatekeeperNetwork = 'your-gatekeeper-network';

  const handleCredentialCheck = (response, error) => {
    if (error) {
      console.error('Error checking credential:', error);
    } else {
      console.log('Credential check response:', response);
    }
  };

  return (
    <ICPCredentialCheckButton
      principal={principal}
      gatekeeperNetwork={gatekeeperNetwork}
      onCredentialCheck={handleCredentialCheck}
    />
  );
};

export default App;
```

#### Component Props

| Prop                | Description                                               | Type                                                          |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| `principal`         | The user's ICP principal                                  | `Principal`                                                   |
| `gatekeeperNetwork` | The Gatekeeper network for the Civic Pass                 | `string`                                                      |
| `config`            | (Optional) Configuration options                          | `Partial<Config>`                                             |
| `onCredentialCheck` | (Optional) Callback function for credential check results | `(response?: CredentialCheckResponse, error?: Error) => void` |

### Credential Structure

Credentials issued by the Civic Canister follow the W3C Verifiable Credentials specification:

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://www.w3.org/ns/credentials/examples/v2"
  ],
  "id": "urn:uuid:6a9c92a9-2530-4e2b-9776-530467e9bbe0",
  "type": ["VerifiableCredential", "CivicPass"],
  "issuer": "did:icp:v0:tglqb-kbqlj-to66e-3w5sg-kkz32-c6ffi-nsnta-vj2gf-vdcc5-5rzjk-jae",
  "expiry": "2024-04-04T00:00:00Z",
  "credentialSubject": {
    "id": "did:icp:v0:user-principal",
    "passType": "gatekeeperNetwork",
    "status": "ACTIVE",
    "expirationDate": "2024-12-31T23:59:59Z"
  }
}
```

### Demo & Testing

#### Portal Access

* Production Portal URL: [https://icp-getpass.civic.com/](https://icp-getpass.civic.com/)
* Live Demo Flow: [https://icp-sign.civic.me/](https://icp-sign.civic.me/)

#### Testing the Integration

1. Visit the demo site to experience the complete flow
2. Use the portal to test credential issuance
3. Verify credential validation in your application

### User Journey

<figure><img src="../.gitbook/assets/Screenshot 2025-02-03 at 2.22.54 PM.png" alt=""><figcaption></figcaption></figure>



