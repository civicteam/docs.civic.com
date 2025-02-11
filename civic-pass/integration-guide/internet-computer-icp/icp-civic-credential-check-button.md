# ICP Civic Credential Check Button

### Overview

The ICP Civic Credential Check Button is a React component that provides a streamlined interface for checking and obtaining Civic Pass credentials on the Internet Computer Protocol (ICP) network.

### Features

* Check for existing Civic Pass credentials
* Obtain new Civic Pass credentials if none exist
* Configurable for different environments (development/production)
* Customizable appearance using Emotion CSS

### Installation

```bash
npm install @civic/icp-gateway-react-ui
# or
yarn add @civic/icp-gateway-react-ui
```

### Basic Usage

```typescript
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
    console.log('Credential check response:', response);
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

### Component Props

| Prop                | Type                                                          | Description                               |
| ------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| `principal`         | `Principal`                                                   | The user's ICP principal                  |
| `gatekeeperNetwork` | `string`                                                      | The Gatekeeper network for the Civic Pass |
| `config`            | `Partial<Config>`                                             | (Optional) Configuration options          |
| `onCredentialCheck` | `(response?: CredentialCheckResponse, error?: Error) => void` | Callback for credential check results     |

### Full Integration Example

```typescript
import React, { useEffect, useState } from 'react';
import { Principal } from '@dfinity/principal';
import { AuthClient } from "@dfinity/auth-client";
import ICPCredentialCheckButton from '@civic/icp-gateway-react-ui';

const CivicPassIntegration = () => {
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        setPrincipal(client.getIdentity().getPrincipal());
      }
    };

    initAuth();
  }, []);

  const handleLogin = async () => {
    await authClient?.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: () => {
        setPrincipal(authClient.getIdentity().getPrincipal());
      },
    });
  };

  const handleCredentialCheck = (response: any, error?: Error) => {
    if (error) {
      console.error('Credential check failed:', error);
      return;
    }

    // Handle the credential response
    console.log('Credential details:', response);
  };

  if (!principal) {
    return (
      <button onClick={handleLogin}>
        Login with Internet Identity
      </button>
    );
  }

  return (
    <div>
      <h2>Civic Pass Verification</h2>
      <ICPCredentialCheckButton
        principal={principal}
        gatekeeperNetwork="captcha"
        onCredentialCheck={handleCredentialCheck}
      />
    </div>
  );
};

export default CivicPassIntegration;
```

### Credential Structure

The credentials issued by the Civic Canister follow the W3C Verifiable Credentials specification:

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
    "id": "did:icp:user-principal",
    "passType": "gatekeeperNetwork",
    "status": "ACTIVE",
    "expirationDate": "2024-12-31T23:59:59Z"
  }
}
```

### Best Practices

#### Error Handling

```typescript
const handleCredentialCheck = (response: any, error?: Error) => {
  if (error) {
    // handle errors
  }

  // Process successful response
  const { status, expirationDate } = response.credentialSubject;
  
  if (status !== 'ACTIVE') {
    // Handle inactive credential
    return;
  }

  if (new Date(expirationDate) < new Date()) {
    // Handle expired credential
    return;
  }

  // Proceed with valid credential
};
```

#### Principal Management

```typescript
// Check if principal is valid before rendering button
const renderCredentialButton = (principal: Principal | null) => {
  if (!principal) {
    return <div>Please log in first</div>;
  }

  return (
    <ICPCredentialCheckButton
      principal={principal}
      gatekeeperNetwork="gatekeepernetwork"
      onCredentialCheck={handleCredentialCheck}
    />
  );
};
```

