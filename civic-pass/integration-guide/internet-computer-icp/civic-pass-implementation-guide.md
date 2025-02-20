# Civic Pass Implementation Guide

### Required Libraries

```bash
bashCopy# Install authentication client for Internet Identity integration
npm install @dfinity/auth-client

# Install principal handling
npm install @dfinity/principal

# Install verifiable credentials SDK
npm install @dfinity/verifiable-credentials
```

### Overview

This implementation uses three main components:

1. **Auth Client (`@dfinity/auth-client`)**
   * Handles Internet Identity authentication
   * Manages user sessions
   * Provides access to user's principal
2. **Principal Library (`@dfinity/principal`)**
   * Manages ICP principal identifiers
   * Required for identity verification
   * Used in both authentication and credential verification
3. **Verifiable Credentials (`@dfinity/verifiable-credentials`)**
   * Handles credential requests and verification
   * Communicates with Civic Pass canister
   * Manages credential presentation flow

### Service Structure

The implementation is split into two main services:

#### PrincipalService

* Manages Internet Identity authentication
* Handles principal acquisition and storage
* Provides authenticated principal for credential requests

#### CredentialService

* Manages Civic Pass credential requests
* Handles communication with Civic Pass canister
* Processes credential verification results

### Authentication and Credential Flow

#### 1. Principal Service Implementation

```typescript
// services/PrincipalService.ts
import { AuthClient } from "@dfinity/auth-client";
import type { Principal } from "@dfinity/principal";

export type PrincipalConfig = {
  identityProvider: string;
}

export class PrincipalService {
  authClient: AuthClient | null = null;
  principal: Principal | null = null;

  constructor(public readonly config: PrincipalConfig) {}

  async requestPrincipal(): Promise<Principal | null> {
    if (!this.authClient) {
      this.authClient = await AuthClient.create();
    }

    if (this.principal) {
      return this.principal;
    }

    const loginResult = new Promise((resolve, reject) => {
      const { identityProvider } = this.config;
      this.authClient?.login({
        identityProvider,
        onSuccess: resolve,
        onError: reject
      });
    });

    return loginResult.then(() => {
      this.principal = this.authClient!.getIdentity().getPrincipal();
      return this.principal;
    });
  }
}
```

#### 2. Credential Service Implementation

```typescript
// services/CredentialService.ts
import { Principal } from '@dfinity/principal';
import { requestVerifiablePresentation } from '@dfinity/verifiable-credentials/request-verifiable-presentation';

export type CredentialConfig = {
  credentialCanisterUrl: string;
  internetIdentityUrl: string;
  credentialCanisterId: string;
  gatekeeperNetwork: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
};

export class CredentialService {
  constructor(private config: CredentialConfig) {}

  async getCredentials(principal: Principal): Promise<void> {
    const {
      onSuccess,
      onError,
      credentialCanisterUrl,
      credentialCanisterId,
      internetIdentityUrl,
      gatekeeperNetwork
    } = this.config;

    const issuerData = {
      origin: credentialCanisterUrl,
      canisterId: Principal.fromText(credentialCanisterId),
    };

    const credentialData = {
      credentialSpec: {
        credentialType: 'CivicPass',
        arguments: {
          passType: gatekeeperNetwork,
        },
      },
      credentialSubject: principal,
    };

    const identityProvider = new URL(internetIdentityUrl);

    requestVerifiablePresentation({
      onSuccess,
      onError,
      credentialData,
      issuerData,
      identityProvider,
      derivationOrigin: undefined,
    });
  }
}
```

#### 3. Usage Example

```typescript
// Example implementation
const initializeServices = async () => {
  // Initialize Principal Service
  const principalService = new PrincipalService({
    identityProvider: 'https://identity.ic0.app'
  });

  // Initialize Credential Service
  const credentialService = new CredentialService({
    credentialCanisterUrl: 'https://73ncn-4qaaa-aaaag-alddq-cai.icp0.io',
    internetIdentityUrl: 'https://identity.ic0.app',
    credentialCanisterId: '73ncn-4qaaa-aaaag-alddq-cai',
    gatekeeperNetwork: 'captcha',
    onSuccess: (response) => {
      console.log('Credential verification successful:', response);
    },
    onError: (error) => {
      console.error('Credential verification failed:', error);
    }
  });

  try {
    // Get principal through authentication
    const principal = await principalService.requestPrincipal();
    if (principal) {
      // Request credentials with authenticated principal
      await credentialService.getCredentials(principal);
    }
  } catch (error) {
    console.error('Authentication or verification failed:', error);
  }
};
```

### Flow Description

1. User initiates authentication flow
2. Internet Identity authentication completes
3. Principal is obtained from authenticated identity
4. Credential verification is requested using the principal
5. User completes verification in new window
6. Callback handles verification result

### Important Notes

* Always ensure authentication is completed before requesting credentials
* Handle both authentication and verification errors appropriately
* Store principal for reuse when needed
* Consider implementing refresh/retry logic for failed verifications
