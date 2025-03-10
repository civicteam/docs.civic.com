# 🤔 Choosing How to Implement Gating

Civic Pass offers robust and flexible integration options for both frontend and backend applications, as well as on-chain smart contracts. This guide provides a high-level overview of the available integration methods, focusing on the key concepts and benefits of each approach.

## Comparison of Integration Methods

| **Integration Method**             | **Key Benefits**                                                | **Use Cases**                                                                                      |
| ---------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Frontend and Backend (Recommended) | Secure token verification, customizable UI, end-to-end security | Secure server-side token validation, customizable gating process, end-to-end security solutions    |
| Smart Contract                     | Compliance, security, flexibility                               | Solana-based applications, EVM-based applications, regulatory compliance, secure user environments |

## Choosing the Right Integration Method

When deciding between frontend, backend, and smart contract integrations, consider:

* **Security requirements**: If your application requires robust server-side token validation, frontend and backend integration may be the best choice.
* **Customization needs**: If you need a customizable user interface for the gating process, frontend and backend integration is suitable.
* **Blockchain platform**: If your application is built on Solana or EVM, smart contract integration using the respective libraries (e.g., \`solana\_gateway\` or \`@identity.com/gateway-protocol-eth\`) is necessary.
* **Regulatory compliance**: If your application must comply with specific regulations, smart contract integration can ensure that only authorized users can interact with your dApp.

## Frontend and Backend Gating (Recommended)

App Permissioning is a powerful gating option that combines a user-friendly frontend interface with robust backend verification. This method is ideal for applications that require secure, server-side token validation while maintaining a seamless user experience.

**Frontend and Backend Libraries**&#x20;

This integration option provides a comprehensive solution for implementing Civic Pass in your application. It combines a React component for the frontend with a Node.js library for backend verification.

### **When to Use This Method**

Consider using the Frontend and Backend Library approach when:

* You need to ensure the integrity of token verification on the server side
* Your application requires a customizable user interface for the gating process
* You want to implement a secure, end-to-end solution for user-permissioning

### **Frontend Integration**

The frontend integration uses the Civic Pass React component, which provides a pre-built UI for managing the user's Civic Pass status. This component handles the user flow, from requesting a new pass to displaying the current status.

To integrate the React component, go to the appropriate Integration Guide for your chain of choice.&#x20;

### **Backend Integration**

The backend integration uses a Node.js library to verify the Civic Pass token on the server-side. This ensures that users cannot bypass the gating mechanism by manipulating the frontend. Builders can also verify pass state via an API call. For more details on this method, go to the appropriate Integration Guide for your chain of choice.&#x20;

We recommend you use both frontend and backend for verification before granting access to gated content or features, so that bad actors cannot circumvent your frontend restrictions.

## Frontend and Smart Contract Gating

For a detailed view of the Frontend integration, go to the appropriate Integration Guide for your chain of choice.&#x20;

The smart contract integration process involves verifying the presence of a valid Civic Pass for users attempting to interact with your dApp. This verification ensures that only compliant users, those with an active Civic Pass, can execute transactions.

### **On-Chain Civic Pass Structure**

The gatewayToken represents the on-chain structure of the Civic Pass. This will only be defined if the Civic Pass is active.&#x20;

| Property          | Description                                                       | Type                                    |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- |
| gatekeeperNetwork | The key of the Gatekeeper Network for which the token was issued. | PublicKey                               |
| issuingGatekeeper | The key of the issuing Gatekeeper.                                | PublicKey                               |
| state             | The on-chain token status.                                        | State { "ACTIVE", "REVOKED", "FROZEN" } |
| expiryTime        | The timestamp at which the on-chain token expires.                | number                                  |





\
