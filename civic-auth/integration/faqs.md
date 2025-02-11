# FAQs

### **How do I get a new Client ID?**

To obtain a new Client ID, sign up at [auth.civic.com](https://auth.civic.com/) to register your application. You can find your unique Client ID to use when integrating our API. Civic Auth uses Proof Key for Code Exchange (PKCE) to securely authenticate requests, so a client secret is not required for frontend integrations.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfx2uBBUo2SDd3t7yK1ods96iFRn1yU-c1g1VbY0oIQ3bHXWQIrb5vgVYj1iptiTLoErNUf2MN6b6wyVGuk_q_KF97RHnJpjbKGuOfrmSIk4hZiGYtX3RRbH9h2uFVGr_FONoC1?key=bpfm59RoatPWrgL42BLuapQY" alt=""><figcaption></figcaption></figure>

### **How do I terminate keys?**

Contact our support team via [Discord](https://discord.com/invite/MWmhXauJw8/) for assistance in managing or revoking keys associated with your application.

### **How do I add more authentication methods?**

Civic Auth supports Google as an authentication provider. However, Civic is working to add support for other major OIDC-compliant providers, such as Microsoft and Apple. Once available, these can be configured within your integration setup.

Contact our team via [Discord](https://discord.com/invite/MWmhXauJw8/) and let us know which provider you’d like to see added.&#x20;

### **How are these wallets managed?**

Civic Auth wallets are provided through a partnership with metakeep.xyz. These wallets are Externally Owned Accounts (EOAs), which are authenticated by a private key that is held by the Metakeep infrastructure. They are linked to a user’s email address. Users verify ownership of their email by entering a unique email code. Wallet management occurs securely through client-side encryption using keys from our wallet provider.

### **Does Civic own these wallets?**

No, Civic does not own these wallets. Civic Auth provides a non-custodial wallet solution. Civic facilitates wallet creation and management but does not hold custody of assets or keys.

### **Will users get private keys?**

Users do not directly access their private keys. The wallets are secured using HSM, and transactions are authorized through the user's SSO login credentials. This simplifies user experience and mitigates the risks of mismanaging private keys.

### **What happens if users lose their SSO access?**

If a user loses access to their SSO (e.g., Google login), Civic Auth’s wallet provider includes a recovery feature to restore wallet access, which works independently of Civic’s infrastructure. Recovery is managed through the provider. Contact our team via [Discord](https://discord.com/invite/MWmhXauJw8/) so that we can initiate the wallet recovery process.&#x20;

### **Can I test Civic Auth before going live in production?** &#x20;

Yes. By default, the Client ID retrieved from the dashboard will be configured for any environment. This will allow you to test your implementation before going live to production.&#x20;

You can get your Client ID at [https://auth.civic.com/](https://auth.civic.com/). Check out [ https://github.com/civicteam/civic-auth-examples](https://github.com/civicteam/civic-auth-examples) to see how an application integrated with Civic Auth functions.

### **What domains need to be registered for apps?** &#x20;

All domains or redirect URLs used by your application must be explicitly included in your Civic Auth configuration when your app is in production mode. This ensures that login and logout redirects function correctly and securely. &#x20;

### **How can I monitor usage for Civic Auth?** &#x20;

Civic Auth provides usage data, including logins from the user account and wallet creation events, via the developer dashboard at [https://auth.civic.com](https://auth.civic.com). &#x20;

### **How do I debug Civic Auth integration issues?** &#x20;

If you're experiencing any issues integrating Civic Auth, follow the troubleshooting steps below:

1. Verify if your Client ID at [https://auth.civic.com/](https://auth.civic.com/) is valid and set up properly.&#x20;
2. Check your console and network tabs for errors.
3. If you’re using an application that's already in production, ensure that all domains or redirect URLs are correctly registered in your app’s configuration. Civic Auth will only redirect to registered domains after login or logout.

If you’ve completed the steps above and still encounter issues, create a ticket on our [Discord](https://discord.com/invite/MWmhXauJw8/) and provide the following details to help us investigate further:

* A clear description of exactly what you're trying to achieve and the issue you're encountering in doing so
* At which step in the implementation does the issue arise
* Screenshots of the error or unexpected behavior
* Relevant snippets of your code, especially the sections interacting with Civic Auth.
* Any error messages from the Console and/or Network tabs

### **How do I report bugs or request new features?** &#x20;

Developers can report bugs or suggest new features via [Discord](https://discord.com/invite/MWmhXauJw8/). Provide as much detail as possible, including logs, screenshots, and steps to reproduce the issue.

### **How do I invite team members?**

While Civic Auth doesn’t have this feature yet, we are actively working to include it in a future version of Civic Auth.&#x20;

### **How do I customize my logo?**

While Civic Auth doesn’t have this feature yet, we are actively working to include it in a future version of Civic Auth.&#x20;

### **Can I restrict certain wallets or block specific users?** &#x20;

Currently, Civic Auth does not natively support blocking specific wallets or users.&#x20;

\
