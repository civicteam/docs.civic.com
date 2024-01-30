---
description: An overview of how Civic Pass with Civic IDV Services works
---

# Civic Pass

#### 1. Check for a valid Civic Pass

As soon as a user connects their wallet to your dApp, the Civic Gateway react component queries the blockchain for a valid Civic Pass associated with the configured Gatekeeper Network. If no pass is found, your dApp UI should update accordingly.&#x20;

If you choose to use the reference Identity Button component provided in the same library, these UI updates will happen automatically. A good practice would be to disable any controls that would fail on-chain should they be used prematurely. For example, a user should not be allowed to press the Mint NFT Button if Civic CAPTCHA Pass isn't issued, as that action would fail on-chain.

{% hint style="info" %}
We strongly recommend that your dApp always displays the current status of a user's Civic Pass. This happens automatically with the Identity Button component.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (18).png" alt=""><figcaption><p>Retrieve Civic Pass status</p></figcaption></figure>

#### 2. Request a new Civic Pass

Users without a valid Civic Pass associated with their connected wallet can request one at any time. The information that needs to be gathered depends on the requirements of the Gatekeeper Network you have selected. A decentralized exchange might use a network requiring full identity verification, while an NFT mint might use a network requiring only CAPTCHA verification.

Collection and verification of the information is encapsulated by the Civic Pass React component. Your dApp only needs to keep the user informed of the current status, i.e. `collecting, in_review, active`.

Once a pass has been successfully requested, the user is required to sign the transaction that submits the Civic Pass on-chain.

<figure><img src="../../.gitbook/assets/image (16).png" alt=""><figcaption><p>Requesting a Civic Pass</p></figcaption></figure>

#### 3. Use the dApp

Once the user has the required Civic Pass for their wallet, your dApp UI can re-enable all controls. Your on-chain smart contract then has to check for a valid Civic Pass during program execution and reject transactions from non-compliant users (i.e. those without an active Civic Pass).

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption><p>On-chain integration</p></figcaption></figure>
