# 🏡 Real-World Assets (RWAs)

## Securing Real World Assets (RWAs) on Blockchain

Real-world assets (RWAs) are increasingly being tokenized on blockchain platforms, enabling secure and efficient trading, ownership transfer, and verification. **Civic ID Verification Pass with PII Sharing** offers a robust solution to this challenge. By leveraging blockchain technology and Civic's identity verification expertise, this innovative approach streamlines the verification process while ensuring the privacy and security of user data.

### Architecting RWA Tokens with On-Chain Identity Verification

When issuing tokens connected to real-world assets that are redeemable for money or money equivalents, compliance with local and international regulations is critical. Issuers must ensure that these tokens cannot be owned by OFAC-sanctioned entities or by residents of restricted geographies, such as non-accredited US investors.

Builders can now easily integrate these restrictions into the token smart contract itself, allowing only verified users to interact with the token. This is where Civic Pass comes in, providing an on-chain solution to gate smart contract functions, enabling actions such as buying, selling, transferring, claiming, and redeeming tokens only to users who meet the verification requirements.

A smart contract function gated with Civic Pass checks the state of the identity token before a user-initiated action can take place. The verification process ensures that only verified users can engage with the token.

### How the ID Verification Pass with PII Sharing Works

1. **Data Collection and User Authorization**

* Document Submission
  * Users submit government-issued ID documents and email.
* Authorization
  * Users authorize the collection of their Personally Identifiable Information (PII) as part of the Civic Pass data collection flow.

2. **Developer Review**

* Presentation Request ID
  * After the data collection, the user's information is placed in a "review" status. The Gatekeeper Context generates a presentation request ID, which the developer (the requesting platform or application) uses to access the user's PII.

3. **PII Retrieval**

* Access Token
  * The developer retrieves an access token from the Civic auth endpoint using their client ID and client secret.
* PII Request
  * Using the access token, the developer fetches the user’s PII for the specific request ID from the Civic Pass PII API. This includes data items extracted from the submitted documents and URLs for the document images.

4. **Evidence Inspection**

* Review
  * The developer’s team inspects the user-provided evidence, including the email, data items extracted from the scanned document, and images of the captured document to determine if it meets the criteria.
* Liveness Check
  * This may include performing liveness checks to ensure the user is a real person.

5. **Pass Issuance Decision**

* Approval or Rejection
  * Based on the inspection, the partner marks the request ID as “partner-pass” or “partner-fail,” indicating to Civic whether the pass should be issued or rejected.
* Tokenization
  * If approved, a Civic Pass is created as an attestation that does not contain any PII and that is stored on the blockchain to be used in smart contract or dapp automations. This token serves as proof of identity without revealing the underlying sensitive information.

### &#x20;Benefits of Tokenized Document Verification for RWAs

* **Security**
  * By tokenizing verified documents and user information, sensitive data is securely stored on the blockchain, reducing the risk of data breaches and identity theft.
* **Privacy**
  * Users have greater control over their personal data, as only the tokenized representation is shared with third parties, ensuring privacy.
* **Streamlined Processes**
  * The verification process is faster and more efficient, as it eliminates the need for manual checks, reducing administrative overhead.
* **Trust**
  * Blockchain technology helps in ensuring the immutability and transparency of the verification results, fostering trust among all parties involved.
* **Compliance**
  * Tokenized document verification helps platforms comply with regulatory requirements related to user identification (KYC) and anti-money laundering (AML) measures.

### Use Cases for Tokenized Document Verification in RWAs (Examples)

* **Property Ownership:** Verifies identity securely and efficiently for fractional ownership, trading, and transfer of real estate assets.
* **Art and Collectibles:** Verifies the authenticity of identity documents related to certificates and provenance documents for art pieces and collectibles, ensuring secure ownership and trading.
* **Commodity Trading:** Ensures efficient and transparent verification of identity documents related to commodity ownership and quality.
* **Vehicle Ownership:** Streamlines the transfer and verification process of identity documents for cars, boats, and other vehicles, reducing fraud and ensuring a clear ownership history.
* **Financial Instruments:** Provides secure and transparent verification of identity documents related to owning bonds, stocks, and other financial instruments, enhancing trust and reducing the risk of fraud.
* **Insurance Policies:** Streamlines the verification process for identity documents needed for claims and policy transfers, preventing fraud and ensuring all parties have access to accurate and up-to-date information.
* **Intellectual Property (IP) Rights:** Provides a secure and verifiable way to manage and transfer IP rights by verifying identity documents related to patents, trademarks, and copyrights, helping to protect against infringement and ensure proper attribution and compensation.

### Get Tokenized Document Verification for Your RWA Management

Enhance the security and efficiency of your real-world asset transactions with **Civic Pass ID Check and PII Sharing**. By integrating Civic's tokenized document verification into your platform, you can ensure the authenticity and integrity of user-provided documents. [Contact us](https://civickey.typeform.com/req-custom) to get started if you're ready to bring this powerful solution to your platform.
