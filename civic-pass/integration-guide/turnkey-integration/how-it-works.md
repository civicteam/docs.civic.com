# How it works

To get a holistic understanding of a Turnkey Pass Integration, let's break down the journey a new user of your dApp will take.

![Sequence diagram of a user connecting and issuing a Civic Pass.](<../../../.gitbook/assets/image (4) (2).png>)

#### 1. Check for a valid Civic Pass

As soon as a user connects their wallet to your dApp, the Civic Gateway react component queries the blockchain for a valid associated Civic Pass (for the configured Gatekeeper Network). If no such Civic Pass is found, your dApp UI should update its UI accordingly.&#x20;

If you choose to use the reference Identity button component provided in the same library, these UI updates will happen automatically. For example, a good practice would be to disable any controls that would fail on-chain should they be used prematurely. In other words, a user should not be allowed to press the Mint NFT button if Civic Pass Captcha isn't issued, as that action would fail on-chain.

Additionally, we strongly recommend that your dApp always displays the current status of a user's Civic Pass (again, this happens automatically with the Identity button component).&#x20;

#### 2. Request a new Civic Pass

Users without a valid Civic Pass associated with their connected wallet can request one at any time. The information that needs to be gathered depends on the Gatekeeper Network requirements for the network you choose to use with your dApp. For example, a decentralized exchange might use a network that requires the user to go through full identity verification and AML checks, while an NFT mint might use a network that only requires the user to go through a bot-detection routine before issuing the Civic Pass. Regardless of the concrete use-case, the collection and verification of the information is encapsulated by the Civic Pass React component. Your dApp only needs to keep the user informed of the current status, i.e. `collecting, in_review, active`. For an exhaustive list of statuses, refer to the [<mark style="color:orange;">React component documentation</mark>](ui-integration/).

Once a Civic Pass has been successfully requested, the user is required to sign the transaction that submits the Civic Pass on-chain.

#### 3. Use the dApp

Once the user has an associated valid Civic Pass for their wallet, your dApp UI can re-enable all controls. Your on-chain program, making use of identity.com's [<mark style="color:orange;">integration libraries</mark>](https://github.com/identity-com/on-chain-identity-gateway) (or learn more on [<mark style="color:orange;">The Gateway Protocol whitepaper</mark>](https://github.com/identity-com/gateway-whitepaper/blob/main/gateway-whitepaper.pdf)), can check for a valid Civic Pass during program execution and reject non-compliant users' requested transactions.
