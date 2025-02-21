# ⛓️ Internet Computer (ICP)

This guide explains how to integrate Civic Pass verification into your Internet Computer Protocol (ICP) application using the Civic Pass canister and React component.

### Why Use Civic Pass?

Civic Pass provides essential security and verification features for Web3 applications. Here are the key reasons to implement Civic Pass:

#### Bot Protection and DDoS Prevention

* Protect your dApp from automated attacks and bot farming
* Prevent system abuse through automated scripts
* Ensure fair distribution of limited resources or NFT drops
* Protect against DDoS attacks by verifying human users

#### Sybil Attack Prevention

* Stop users from creating multiple accounts with different wallets
* Ensure fair participation in governance voting
* Maintain integrity in reward systems and airdrops
* Prevent manipulation of decentralized systems

#### Age Verification

* Comply with age-restricted content regulations
* Protect minors from accessing inappropriate content
* Meet legal requirements for specific jurisdictions
* Implement age-gated features without collecting personal data

#### Common Use Cases

1. **NFT Launches**: Prevent bot manipulation during minting
2. **DeFi Applications**: Ensure genuine user participation in yield farming
3. **Gaming**: Prevent cheating through multiple accounts
4. **DAOs**: Maintain voting integrity
5. **Airdrops**: Ensure fair distribution to genuine users
6. **Social Platforms**: Verify unique human users
7. **Compliance**: Meet regulatory requirements for age verification

### Prerequisites

* Access to an Internet Computer application ([Guide to creating an IC application](https://internetcomputer.org/docs/current/developer-docs/getting-started))
* Node.js and npm/yarn installed
* Understanding of ICP canisters and React
* Basic familiarity with Principal IDs in the Internet Computer ecosystem

### Civic Pass Canister

The Civic Pass ICP canister is the backbone of the verification system:

```
Canister ID: 73ncn-4qaaa-aaaag-alddq-cai
URL: https://73ncn-4qaaa-aaaag-alddq-cai.icp0.io
```

### Available Gatekeeper Networks

Civic Pass offers the following verification networks:

#### CAPTCHA Pass

A challenge-response test to determine human or bot behavior. Ideal for basic bot prevention.

* [Try it out ->](https://icp-getpass.civic.com/captcha)
* [Get CAPTCHA key ->](https://civic.me/integration/captcha)

#### Uniqueness Pass

A video selfie verification system ensuring one user has one wallet, preventing Sybil attacks.

* [Try it out ->](https://icp-getpass.civic.com/uniqueness)
* [Get Uniqueness key ->](https://civic.me/integration/uniqueness)

#### Age 13 Pass

Age verification system to ensure users are 13 or older.

* [Try it out ->](https://icp-getpass.civic.com/age13)
* [Get Age 13 key ->](https://civic.me/integration/age13)

### Integration Flow

#### 1. Pass Acquisition Flow

1. Direct users to https://icp-getpass.civic.com
2. Users select their desired pass type (CAPTCHA, Uniqueness, or Age 13)
3. Users complete the verification flow specific to their chosen pass
4. Upon successful verification, the system generates a credential

#### 2. Pass Storage and Verification

1. The credential is automatically stored in the Civic Pass canister
2. Backend Verification:
   * Use the DFX Verifiable Credentials SDK to verify credentials on your canister
   * This is the most important verification step
   * Code examples provided in the next section

#### 3. Frontend Display (Optional)

* The React component provides visual feedback about credential status
* Note: This is primarily for UI/UX purposes and should not be relied upon for security

### Using the DFX Verifiable Credentials SDK

#### Installation

```bash
npm install @dfinity/verifiable-credentials
# or
yarn add @dfinity/verifiable-credentials
```

#### Backend Verification Example

```javascript
import { CredentialVerifier } from '@dfinity/verifiable-credentials';

async function verifyCredential(credential, principalId) {
  const verifier = new CredentialVerifier({
    gatekeeperNetwork: 'your-gatekeeper-network'
  });
  
  try {
    const result = await verifier.verify({
      credential,
      principalId,
      canisterId: '73ncn-4qaaa-aaaag-alddq-cai'
    });
    
    return result.isValid;
  } catch (error) {
    console.error('Credential verification failed:', error);
    return false;
  }
}
```

### React Component Integration

#### Installation

```bash
npm install @civic/icp-gateway-react-ui
# or
yarn add @civic/icp-gateway-react-ui
```

#### Basic Usage

```jsx
import React from 'react';
import { Principal } from '@dfinity/principal';
import ICPCredentialCheckButton from '@civic/icp-gateway-react-ui';

const App = () => {
  const principal = Principal.fromText('your-principal-id');
  const gatekeeperNetwork = 'your-gatekeeper-network';

  const handleCredentialCheck = (response, error) => {
    if (error) {
      console.error('Error checking credential:', error);
      return;
    }
    
    // Note: This is for UI purposes only. Always verify on the backend.
    console.log('Frontend credential check response:', response);
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

| Prop                | Description                               | Type                                                          | Required |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------- | -------- |
| `principal`         | The user's ICP principal                  | `Principal`                                                   | Yes      |
| `gatekeeperNetwork` | The Gatekeeper network for the Civic Pass | `string`                                                      | Yes      |
| `config`            | Configuration options                     | `Partial<Config>`                                             | No       |
| `onCredentialCheck` | Callback for credential check results     | `(response?: CredentialCheckResponse, error?: Error) => void` | No       |

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

### Testing & Development

#### Environments

* Production Portal: https://icp-getpass.civic.com/
* Demo Flow: https://icp-sign.civic.me/

#### Testing Steps

1. Create a test application using the provided code
2. Visit the demo site to test the complete verification flow
3. Implement backend verification using the DFX SDK
4. Test credential validation in both frontend and backend
5. Verify error handling and edge cases

#### Common Issues and Solutions

1. **Credential Not Received**
   * Verify the user completed the full verification flow
   * Check that the correct principal ID is being used
   * Ensure the canister ID is correctly configured
2. **Verification Failures**
   * Double-check the gatekeeper network configuration
   * Verify the credential hasn't expired
   * Ensure backend verification is properly implemented

### Security Considerations

1. **Always verify credentials on the backend**
   * Frontend verification is for UI purposes only
   * The React component should not be used as the sole verification method
2. **Principal ID Verification**
   * Always verify that the credential belongs to the correct principal
   * Never accept credentials from unverified sources
3. **Expiration Handling**
   * Implement proper handling of expired credentials
   * Consider implementing automatic renewal flows if needed



