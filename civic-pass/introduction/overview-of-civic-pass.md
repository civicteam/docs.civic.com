# 👋 Overview of Civic Pass

Civic Pass is a powerful identity verification solution designed to enhance trust, control, and safety in digital interactions. It provides developers with a robust toolkit to implement user verification and access control in decentralized applications (dApps) and smart contracts.

## Key Features

* **On-chain attestation**: Civic Pass issues non-transferable tokens (soulbound or SBT) on the blockchain, serving as verifiable proof of a user's identity or attributes.
* **Flexible verification options**: Developers can configure Civic Pass to require various checks, including live video selfies, age verification, location confirmation, and ID document validation.
* **Multichain support**: Civic Pass is available on Solana and over 10 EVM-compatible chains, ensuring broad compatibility across blockchain ecosystems.
* **Privacy-focused**: Civic employs advanced security measures, including blockchain technology and encryption, to protect user information.

## Standard Civic Passes

Builders can use standard Civic Passes off-the-shelf and benefit from the reusability of a verified address.&#x20;

### CAPTCHA Pass&#x20;

{% embed url="https://youtu.be/B-81DhxhP2U?si=oUCUBXLlROC4jlwE" %}

This pass requires a user to pass a challenge-response test to determine whether they are a human or bot.&#x20;

Expiration and refresh required after 30 days.&#x20;

#### [Get CAPTCHA Key](https://civickey.typeform.com/req-captcha)

### Liveness Pass

{% embed url="https://youtu.be/zxTAlvwz-BM?si=yeqitamg_EuutC4s" %}

This pass requires a video selfie from a user to determine whether they are a human or bot. The pass will not be issued if VPN software is detected.

Expiration and refresh required after 30 days.

#### [Get Liveness Key](https://civickey.typeform.com/req-liveness)

### Uniqueness Pass

{% embed url="https://youtu.be/LudqHoCEdXM?si=cLGgPPs81scuMKEx" %}

This pass requires a user to take a video selfie that also compares the face map resulting from the process with existing encrypted maps from the known universe of existing users. The pass will not be issued if VPN software is detected.

The known universe is confined to the network being used. A builder can request a private Uniqueness network by issuing a Custom Pass instead of the global one, when users are being offered embedded wallets where they don’t control the private key.&#x20;

Expiration and refresh required after 90 days.

#### [Get Uniqueness Key](https://civickey.typeform.com/req-uniqueness)

### ID Verification Pass

{% embed url="https://youtu.be/2WXt7FtmAsk?si=-6D_P97sAv94Pz37" %}

This pass requires a user to pass a government-issued ID check. This check is combined with a liveness check, face comparison with the document, and a point-in-time sanctions check. A Uniqueness check can be added on-demand. The pass will not be issued if VPN software is detected.

This pass is privacy-preserving and does not contain user PII by default. Users can opt to store their data encrypted with a symmetric key for reusability, making the PII inaccessible without their consent. Builders **can** opt to retrieve underlying PII via a Civic-provided API endpoint. This is optional but recommended for projects that need to ensure adherence to KYC regulations.

**Reusable Credentials Demo**

{% embed url="https://youtu.be/YRmQ0g7lkCA?si=aIoqlE-oBo3xPBcd" %}

These credentials are reusable until the earlier of the document expiration or the requirement for a refresh after 30 days.

#### [Get in touch](https://civickey.typeform.com/req-id) to discuss any ID verification requirements. 

## Custom Civic Passes

This pass allows businesses to tokenize their compliance on-chain via API. You can use your own ID verification provider. You can use Civic to tokenize the attestations of your verifications on-chain.

Custom Pass configurations include:

* Issue, freeze, revoke, and manage passes via API on a dedicated endpoint
* Use your own identity verification provider to issue passes
* Option to issue verifications to your users in abstracted wallets
* Option to issue passes on a private network with only your users
* Full lifecycle pass management and real-time analytics in your dashboard

Expiration and refresh cycle will depend on your business requirements.

Learn more about the functionality of the Custom Pass by accessing this section documenting the full[ OpenAPI specification](https://civicteam.github.io/openapi-docs/).

#### [Get in touch](https://civickey.typeform.com/req-custom) to discuss any custom business requirements.&#x20;

## Permissioned Web and Smart Contracts

Civic Pass enables the creation of permissioned environments in web applications and smart contracts:

* **Web applications**: Developers can gate access to specific pages or features, ensuring only verified users can interact with sensitive parts of the application.
* **Smart contracts**: By integrating Civic Pass checks, smart contracts can enforce rules based on user attributes, creating more secure and compliant on-chain interactions.

## Implementation Considerations

* **User experience**: Always display the current status of a user's Civic Pass to maintain transparency.
* **VPN detection**: Civic Passes cannot be issued if a VPN is detected, ensuring the integrity of location-based verifications.
* **OFAC and other country restrictions**: See [Supported Countries & Docs](../resources/supported-countries-and-docs.md) for the most updated list.



