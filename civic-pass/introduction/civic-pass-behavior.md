# 🔄 Civic Pass Behavior

## Criteria for Issuing Civic Passes

### All Passes

Users must meet **all** of the following criteria:&#x20;

1. Agreed to Civic’s [Terms and Conditions](https://www.civic.com/legal/end-user-terms-of-service), [Privacy Policy](https://www.civic.com/legal/privacy-policy), and[ Biometric Policy](https://www.civic.com/legal/biometric-policy-notice/).
2. Completed wallet ownership verification by signing a transaction with their wallet.
3. Over the age of 18.
4. Not a resident or citizen of a blocked or banned location.
5. Not physically located in a blocked or banned location.

Blocked locations include: Bangladesh, China.

Banned countries: Afghanistan, Belarus, Burundi, Central African Republic, Cuba, Democratic Republic of Congo, Iran, Iraq, Lebanon, Libya, Myanmar, Nicaragua, North Korea, Russia, Somalia, South Sudan, Sudan, Syria, Venezuela, Yemen, Zimbabwe, and the following regions of Ukraine: Crimea/Sevastopol, Donetsk People's Republic, and the Luhansk People's Republic.

### Liveness, Uniqueness, and ID Verification Passes

Users must meet **all** the above criteria and **additional** criteria below:

1. Agreed to Civic’s [Biometric Policy](https://www.civic.com/legal/biometric-policy-notice/).
2. Completed VPN check. Using the IP address collected during the wallet ownership verification, Civic Pass will check the user’s IP address to verify that they are not located in a blocked or banned location.
3. Completed a 3D FaceScan (video selfie of face).&#x20;
   * The face will be analyzed by artificial intelligence technology to distinguish live humans from attempted spoofs. A topology of the face will be produced (FaceMap). The newly captured FaceMap of the user will be compared against the previously enrolled FaceMap to ensure the same user is using the wallet.&#x20;
     * In the case of Uniqueness Passes and in some cases ID Verification, the captured FaceMap is stored and will be compared against any new FaceMaps incoming.

### ID Verification Passes

Users must meet **all** the above criteria and **additional** criteria below:

1. Completed government-issued ID verification.

**Identity data is collected and stored by Civic** as stated in our [Biometric Policy Notice](https://www.civic.com/legal/biometric-policy-notice/) and in accordance with our [Privacy Policy](https://www.civic.com/legal/privacy-policy).

Civic Pass will only collect and store the following personal data of users requesting a Pass:&#x20;

1. Email address
2. 3D FaceScan from a video selfie of face
3. Picture upload of government-issued ID
4. Data from ID document (combination of MRZ and OCR)
   * Name (full)
   * Date of birth
   * Document type
   * Document number
   * Document expiration
   * Country of issuance

**Identity data verified by Civic:**

Civic Pass will verify the following data on users requesting a Pass:&#x20;

1. Email address verified with verification code
2. Government-issued ID authenticity
3. Selfie matches government-issued ID photo
4. Liveness

### ID Verification Passes with PII Sharing

Users must meet **all** the above criteria and **additional** criteria below:

1. Agreed to share PII with the requesting project.

## Customization Options for Custom Passes

Businesses will need API keys to access Custom Civic Passes. This integration method allows businesses to directly manage the issuance of Civic Passes to their users. Learn more about the functionality of the Custom Pass by reading the full [OpenAPI specification](https://civicteam.github.io/openapi-docs/). \


Customization options include:

* Document type
* Age restrictions
* Country restrictions
* Pass expiration duration
* Combining Uniqueness with ID Verification
* Combining any features from different Pass types

## Pass Statuses

After a Civic has been issued on-chain, the following status values may apply.

### **All Passes**

**Access Attempts from a Blocked Location**

Attempts to access the app from a blocked location (e.g., China, Russia) will be blocked and the issued Pass will be frozen.

`Pass Status is FROZEN`\
\
**Access Attempts from a Banned Location**

Attempts to access your app from a banned location (e.g., Cuba) will be blocked and the issued Pass will be revoked.

`Pass Status is REVOKED`\
\
**Pass Expiration**

CAPTCHA and Liveness: 30 days

Uniqueness: 90 days

ID Verification: On the day of government-issued ID expiration, or one year after issuance, whichever comes first.

`Pass Status is EXPIRED`

### **Uniqueness Pass**

**Pass Refresh**

Users will be required to refresh their Pass after it expires. Refreshing a Pass will happen automatically the next time the user connects to the requesting project. When connecting, Civic Pass will:

1. Request a user to sign a transaction with their wallet which will verify wallet ownership.
2. Check the user’s IP address to verify that they are not located in a blocked or banned location.
3. Take a 3D FaceScan from a video selfie.
4. Match the FaceScan against the original FaceScan on the pass.

Successfully verifying wallet ownership and passing the above checks automatically reactivates a user’s pass. An active Pass will remain active for 90 days after refresh unless it expires.

`Pass Status is REFRESHED / ACTIVE PASS or Pass Status is RECONNECTING / ACTIVE PASS`

\
**Active Pass Early Pass Refresh**

Each time user connects to your app with an Active Pass where the requesting project has forced a refresh, Civic Pass will:

1. Request a user to sign a transaction with their wallet which will verify wallet ownership.
2. Check the user’s IP address to verify that they are not located in a blocked or banned location.
3. Re-verification depending on Pass type:
   1. **For CAPTCHA**: re-verify CAPTCHA.
   2. **For Liveness**: re-verify Liveness.
   3. **For Uniqueness or ID Verification**: Take a 3D FaceScan from a video selfie and match the FaceScan against the original FaceScan on the pass.

Successfully verifying wallet ownership and passing the above checks automatically reactivates a user’s pass and updates the Pass expiration date.

`Pass Status is REFRESHED / ACTIVE PASS or Pass Status is RECONNECTING / ACTIVE PASS`

### **ID Verification Pass**

**Pass Refresh**

Users will be required to refresh their Pass after it expires. Refreshing a Pass will happen automatically the next time the user connects to the requesting project. When connecting, Civic Pass will:

1. Request a user to sign a transaction with their wallet which will verify wallet ownership.
2. Check the user’s IP address to verify that they are not located in a blocked or banned location.
3. Pass biometrics re-authentication.
4. Pass government-issued ID document verification.

Successfully verifying wallet ownership, passing the IP address check, passing government-issued ID verification, as well as the biometrics verification automatically refreshes a user’s Pass. An active Pass will remain active for one year after refresh unless the document expires sooner.

`Pass Status is REFRESHED / ACTIVE PASS or Pass Status is RECONNECTING / ACTIVE PASS`

\
**Reconnecting to Subscriber Property with Active Pass**

Each time a user connects to your app with an Active Pass, Civic Pass will still check the user’s IP address to verify that they are not located in a blocked or banned location.

When a user connects to your app with an Active Pass, Civic will check the Biometrics refresh status to ensure the same person is using the pass.&#x20;

The Active Pass will remain active for one year after reconnecting or when document expires, whichever comes first. After one year, the pass will become inactive.

`Pass Status is REFRESHED / ACTIVE PASS or Pass Status is RECONNECTING / ACTIVE PASS`



## PII Sharing

End user must consent to share PII with the Subscriber.

Subscriber has up to 24 hours to retrieve PII after End User consents to share. End user PII will no longer be available to you from Civic after 7 days or once retrieved, whichever comes first.

### **Identity data shared**

With user’s consent, Civic Pass will share the following data on individuals requesting a Pass:&#x20;

1. Email Address
2. Data from ID document (combination of MRZ and OCR)
   * Name (full)
   * Date of birth
   * Document type
   * Document number
   * Document expiration
   * Country of issuance
