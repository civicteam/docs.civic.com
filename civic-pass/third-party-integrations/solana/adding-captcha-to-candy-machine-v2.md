# Adding Captcha Verification to Candy Machine v2

Want to keep bots out your next NFT drop?

We are fully integrated into MetaPlex's Candy Machine v2 to enable captcha verification prior to minting.

[<mark style="color:orange;">Visit the reference Candy Machine UI with integrated CivicPass -></mark>](https://github.com/metaplex-foundation/candy-machine-ui)

Enabling captcha requires the gatekeeperNetwork values below to your candy machine settings:

```
  "gatekeeper": {
    "gatekeeperNetwork": "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
    "expireOnUse": true
  },
```

For detailed configuration instructions on how to configure and deploy your mint, please refer to MetaPlex's [Sugar repository](https://github.com/metaplex-foundation/sugar).

#### Using Sugar to create a protected mint

1. install sugar
2.  Create your mint (with Candy Machine v3 the mint and the token guard are created separately) using:

    ```
    sugar launch
    ```
3.  Create a guard for your mint:

    ```
    sugar guard add
    ```
4.  follow the instructions and choose 'Gatekeeper' under extra settings:&#x20;

    {% code overflow="wrap" %}
    ```
    ? Which extra features do you want to use? (use [SPACEBAR] to select options you want and hit [ENTER] when done) › 
    ✔ SPL Token Mint 
    ✔ Gatekeeper 
    ✔ Whitelist Mint 
    ✔ End Settings 
    ✔ Hidden Settings
    ```
    {% endcode %}
5.  Choose Civic Pass when asked which gatekeeper network to use:

    {% code overflow="wrap" %}
    ```
    ? Which gatekeeper network do you want to use? Check https://docs.metaplex.com/guides/archived/candy-machine-v2/configuration#provider-networks for more info. › 
    ❯ Civic Pass 
    Verify by Encore
    ```
    {% endcode %}
6.  Choose 'y' when asked if you want to expire the gatekeeper token after use:

    {% code overflow="wrap" %}
    ```
    ? To help prevent bots even more, do you want to expire the gatekeeper token on each mint? (y/n) › y
    ```
    {% endcode %}

When captcha is enabled, a user will be issued a Civic Captcha Pass after successfully completing the captcha challenge and automatically checked by the Candy Machine prior to minting.

A Civic Captcha Pass **remains active only for 10 minutes and for one mint** to limit the options of malicious botters verifying multiple wallets. If a user tries to use an inactive pass, it will automatically prompt them to refresh it.

{% hint style="info" %}
Please review the [<mark style="color:orange;">Civic Pass Terms of Service</mark>](https://www.civic.com/legal/terms-of-service-civic-pass-v1/) carefully before continuing. By installing or integrating the Civic Pass (or Captcha) plugin, you agree to Civic Pass Terms of Service on behalf of the organization, company or other legal entity for which you act; and represent that you have the authority to bind the same.

If you do not have such authority, or if you do not agree with this the Civic Pass Terms of Service, you must not continue and may not use the Services.
{% endhint %}

#### Terms and Conditions

You agree and acknowledge that you are solely responsible and liable for your use of the captcha verification technology provided here (“**Verification**”) or any resulting data of such Verification (“**Verification Results**”). Civic Technologies, Inc. (“**Civic**”) makes no representations or warranties regarding the accuracy or completeness of any Verification Results, or that such Verification or Verification Results are adequate for, or achieve, your business purpose or requirements. You assume sole responsibility for compliance with any and all required registrations, licensing, and other requirements regulating your products and services and related activities.

Civic assumes no responsibility for compliance with any laws or regulations regarding your products or services or your use of the Verification or Verification Results. Without limiting the foregoing, Civic is not responsible for, and will not provide you with any advice, counsel, or recommendation pertaining to legal compliance of your products or services associated with your use of the Verification or Verification Results in connection with your products or services, and Civic hereby explicitly disclaims any representation or warranty that use of any Verification or Verification Results will meet your legal obligations, if any.
