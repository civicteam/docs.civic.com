# Fundamental Concepts

Before getting into the details, it is important to understand two fundamental concepts:

* The on-chain Civic Pass
* The on-chain Gatekeeper Network

### The On-Chain Civic Pass

A Civic Pass (also referred to as a "token") is an on-chain structure representing the compliance of a wallet owner to a specific set of rules.&#x20;

The presence of an active Civic Pass proves that a user's wallet was verified according your dApp's requirements. Now, your dApp can verify the state of a wallet's Civic Pass before allowing transactions through, thus blocking non-compliant users.

Civic provides you with all the tools needed to issue Civic Passes to your users. Fundamentally there are two integration flavours.

### The On-Chain Gatekeeper Network

A Civic Pass is always issued for a specific _Gatekeeper Network._ For the purposes of this documentation, it is sufficient to think of a Gatekeeper Network as a set of constraints that a user must meet.&#x20;

A Civic Pass always contains a reference to the Gatekeeper Network it was issued for.

In general, your user's wallet can be associated with multiple Civic Passes (1:N), however, a Civic Pass is only ever issued for a single specific Gatekeeper Network (1:1).

![](<../../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1).png>)

When integrating Civic Pass in your dApp, you define which particular Gatekeeper Network you "trust". Should the user already have a valid Civic Pass for this trusted network, they can already proceed. If a Civic Pass for the network is not present, then your dApp can trigger the process for the user to request a new Civic Pass.

You can find more details on the available pre-configured available networks and their rulesets here: [selecting-a-pass.md](../integration-guide/turnkey-integration/selecting-a-pass.md "mention").

Additionally, it is also possible to create your own private Gatekeeper Network.
