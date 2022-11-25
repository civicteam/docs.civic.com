# How it works

### The On-Chain Civic Pass

A Civic Pass (also referred to as a "token") is an on-chain structure representing the compliance of a wallet owner to a specific set of rules. The rules to be checked can range from simple bot-detection (e.g. for minting NFTs) to end-to-end identity verification (e.g. for decentralized exchanges). As a dApp developer you can select the rules that users must adhere to for access to your platform.

The presence of an active Civic Pass proves that a user's wallet was verified according your dApp's requirements. Now, your dApp can verify the state of a wallet's Civic Pass before allowing transactions through, thus blocking non-compliant users.

{% hint style="info" %}
**Your dApp doesn't have to handle or store any user PII (Personal Identifiable Information).**
{% endhint %}

Civic provides you with the libraries needed to quickly integrate Civic Pass into your dApp; both UI and on-chain program.

#### Gatekeeper Networks

A Civic Pass is always issued for a specific _Gatekeeper Network._ For the purposes of this documentation, it is sufficient to think of a Gatekeeper Network as a set of constraints that a user must meet. A Civic Pass always contains a reference to the Gatekeeper Network it was issued for.

In general, your user's wallet can be associated with multiple Civic Passes (1:N), however, a Civic Pass is only ever issued for a single specific Gatekeeper Network (1:1).

![](<../.gitbook/assets/image (1) (1) (1).png>)

When integrating Civic Pass in your dApp, you define which particular Gatekeeper Network you "trust". Should the user already have a valid Civic Pass for this trusted network, they can already proceed. If a Civic Pass for the network is not present, then your dApp can trigger the process for the user to request a new Civic Pass.

You can find more details on the available networks and their rulesets here: [selecting-a-pass.md](selecting-a-pass.md "mention").

### New User Journey

To get a holistic understanding of Civic Pass, let's break down the journey a new user of your dApp will take.

![Sequence diagram of a user connecting and issuing a Civic Pass.](<../.gitbook/assets/image (4).png>)

#### 1. Check for a valid Civic Pass

As soon as a user connects their wallet to your dApp, the [<mark style="color:orange;">Civic Pass react component</mark>](https://www.npmjs.com/package/@civic/solana-gateway-react) queries the blockchain for a valid associated Civic Pass (for the configured Gatekeeper Network). If no such Civic Pass is found, your dApp UI should update its UI accordingly. If you choose to use the reference 'Identity Button' component provided in the [<mark style="color:orange;">library</mark>](https://www.npmjs.com/package/@civic/solana-gateway-react), these UI updates will happen automatically. For example, good practice would be to disable any controls that would fail on-chain should they be used prematurely, i.e. a user should not be allowed to press the "Mint NFT" button if a "bot-protection" Civic Pass isn't issued, as that action would fail on-chain.

Additionally, we strongly recommend that your dApp always display the current status of a user's Civic Pass (again, this happens automatically with the Identity Button component). See [ui-integration-react-component](ui-integration-react-component/ "mention") for more details.

#### 2. Request a new Civic Pass

Users without a valid Civic Pass associated with their connected wallet can request one at any time. The information that needs to be gathered depends on the gatekeeper network requirements for the network you choose to use with your dApp. For example, a decentralized exchange might use a network that requires the user to go thorough full identity verification and AML checks, while an NFT mint might use a network that only requires the user go through a bot-detection routine before issuing the Civic Pass. Regardless of the concrete use-case, the collection and verification of the information is encapsulated by the Civic Pass react component. Your dApp only needs to keep informed of the current status, i.e. `collecting, in_review, active` . (For an exhaustive list of status refer to the [<mark style="color:orange;">React component documentation</mark>](ui-integration-react-component/the-gateway-provider.md).)

Once a pass has been successfully requested, the user is required to sign the transaction that submits the pass on chain. For more information please refer to the [<mark style="color:orange;">client sent transactions</mark>](ui-integration-react-component/client-sent-transactions.md) section.

#### 3. Use the dApp

Once the user has an associated valid Civic Pass for their wallet, your dApp UI can re-enable all controls. Your on-chain program, making use of identity.com's [<mark style="color:orange;">integration libraries</mark>](https://github.com/identity-com/on-chain-identity-gateway) (or learn more on [<mark style="color:orange;">The Gateway Protocol whitepaper</mark>](https://github.com/identity-com/gateway-whitepaper/blob/main/gateway-whitepaper.pdf)), can check for a valid Civic Pass during program execution and reject non-compliant users' requested transactions.

See [on-chain-integration.md](on-chain-integration.md "mention") for more details.
