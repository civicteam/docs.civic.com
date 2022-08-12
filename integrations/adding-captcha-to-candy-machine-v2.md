# Adding Captcha to Candy Machine v2

Want to keep bots out your next NFT drop?&#x20;

We are fully integrated into MetaPlex's Candy Machine v2 to enable captcha verification prior to minting.

[<mark style="color:orange;">Go to Candy Machine Repo -></mark>](https://github.com/metaplex-foundation/metaplex/tree/master/js/packages/cli) <mark style="color:orange;"></mark>&#x20;

Enabling captcha requires the gatekeeperNetwork values below to your candy machine settings:

```
  "gatekeeper": {
    "gatekeeperNetwork": "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
    "expireOnUse": true
  },
```

When captcha is enabled, a user will be issued a Civic Captcha Pass after successfully completing the captcha challenge and automatically checked by the Candy Machine prior to minting.&#x20;

A Civic Captcha Pass **remains active only for 10 minutes and for one mint** to limit the options of malicious botters verifying multiple wallets. If a user tries to use an inactive pass, it will automatically prompt them to refresh it.

{% hint style="info" %}
Please review the [Civic Pass Terms of Service](https://www.civic.com/legal/terms-of-service-civic-pass-v1/) carefully before continuing. By installing or integrating the Civic Pass (or Captcha) plugin, you agree to Civic Pass Terms of Service on behalf of the organization, company or other legal entity for which you act; and represent that you have the authority to bind the same.

If you do not have such authority, or if you do not agree with this the Civic Pass Terms of Service, you must not continue and may not use the Services.
{% endhint %}

#### &#x20;Terms and Conditions

You agree and acknowledge that you are solely responsible and liable for your use of the captcha verification technology provided here (“**Verification**”) or any resulting data of such Verification (“**Verification Results**”). Civic Technologies, Inc. (“**Civic**”) makes no representations or warranties regarding the accuracy or completeness of any Verification Results, or that such Verification or Verification Results are adequate for, or achieve, your business purpose or requirements. You assume sole responsibility for compliance with any and all required registrations, licensing, and other requirements regulating your products and services and related activities.&#x20;

Civic assumes no responsibility for compliance with any laws or regulations regarding your products or services or your use of the Verification or Verification Results. Without limiting the foregoing, Civic is not responsible for, and will not provide you with any advice, counsel, or recommendation pertaining to legal compliance of your products or services associated with your use of the Verification or Verification Results in connection with your products or services, and Civic hereby explicitly disclaims any representation or warranty that use of any Verification or Verification Results will meet your legal obligations, if any.
