---
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🔑 Get Network Keys

## Self-Serve Network Keys

This is the fastest way to start integrating Civic Pass. Request network keys for CAPTCHA, Liveness or Uniqueness Passes by filling out the appropriate form below. You will receive an automated email from Civic with a key to get started. See [Pricing](https://www.civic.com/pricing/pass-pricing) for more information on costs.

### **CAPTCHA Pass**&#x20;

A challenge-response test to determine human or bot. [**Try it out ->**](https://getpass.civic.com/?scope=captcha,uniqueness,liveness)

[**Get CAPTCHA key ->**](https://civickey.typeform.com/req-captcha)

### **Liveness Pass**&#x20;

A video selfie to determine human or bot. [**Try it out ->**](https://getpass.civic.com/?scope=liveness,uniqueness,captcha)

[**Get Liveness key ->**](https://civickey.typeform.com/req-liveness)

### **Uniqueness Pass**&#x20;

A video selfie to determine 1-user-1-wallet. [**Try it out ->**](https://getpass.civic.com/?scope=liveness,uniqueness,captcha)

[**Get Uniqueness key ->**](https://civickey.typeform.com/req-uniqueness)



***

## **Network Keys That Require a Contract**&#x20;

Our team will be in touch to learn more about your business needs. See [Pricing](https://www.civic.com/pricing/pass-pricing) for more information on costs.

### **ID Verification Pass**&#x20;

Verifies real-world identity using government-issued ID documents. [**Try it out ->**](https://getpass.civic.com/?pass=identity)

[**Get in touch ->**](https://civickey.typeform.com/req-id)

### **Custom Pass**&#x20;

Need additional countries, on-chain checks, not yet supported chains, or other verifications?

[**Get in touch ->**](https://civickey.typeform.com/req-custom)



***

## What are Network Keys?

Network Keys are unique identifiers that reference a specific Civic Pass type, such as a CAPTCHA Pass or a Liveness Pass. They are used to identify a particular pass type within the Civic system, though they may not always be unique to a given application. However, passes that have custom requirements will be issued unique network keys for the specific pass.&#x20;

Network Keys are IDs that correspond to a specific pass type on the Civic side. They are used to identify the type of pass being utilized and help query whether users possess a certain pass type. They do not serve as authentication credentials for applications to access the Civic Pass system.

For example, builders that want to ensure user uniqueness can rely on the Uniqueness Pass network and use its corresponding network key to query the on-chain state of the pass in each of the user wallets presented in their application. They cannot issue a pass directly but can call for passes to be issued through the Civic SDKs, using the network key to identify the pass types.&#x20;

## Testing with Network Keys

You can use a network key on testnet/devnet to test your integration with Civic Pass. This allows you to simulate real-world scenarios and verify that your application is correctly configured.&#x20;

## Key Points

* **Not application-specific**: Network Keys are tied to pass types, not specific applications.
* **No secure communication implication**: Network Keys do not imply or facilitate secure communication through encryption. They simply allow on-chain identification of the pass being used.
* **No authentication role**: They do not authenticate applications to the Civic system; front-end applications do not require authentication to use them.
* **No data encryption**: Network Keys do not encrypt or decrypt data transmitted between applications and the Civic Pass system.

## Troubleshooting

If you encounter issues such as authentication errors or invalid key messages:

1. **Verify key accuracy**: Double-check that you have entered the correct Network Key and that it matches the one provided by Civic Pass.
2. **Contact support**: [Reach out to the Civic team on Discord](https://discord.com/invite/8H5Kdtr5Wn).



\
