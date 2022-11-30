# Adding Civic Pass protection to Candy Machine v3

## Adding Civic Pass to Candy Machine v3

Want to keep bots out your next NFT drop?&#x20;

We are fully integrated into MetaPlex's Candy Machine v3 protocol to enable mint protection using [Candy Guard](https://docs.metaplex.com/programs/candy-machine/available-guards/gatekeeper).

<mark style="color:orange;"></mark>[<mark style="color:orange;">Visit a reference implementation UI using Candy Machine V3 with integrated CivicPass -></mark>](https://github.com/civicteam/Candy-Machine-V3-UI)<mark style="color:orange;"></mark>

We recommend using the [latest sugar command line tool](https://docs.metaplex.com/developer-tools/sugar/guides/sugar-for-cmv3) to create your mint.

#### Creating a protected mint using Sugar CLI

In Candy Machine v3 creation of the token guard is separate from the mint.

1. install sugar: currently sugar support for Candy Machine is alpha mode and needs to be downloaded [here](https://github.com/metaplex-foundation/sugar/releases/tag/sugar-cmv3-alpha.2)
2.  Create your mint (with Candy Machine v3 the mint and the token guard are created separately) using. Follow the prompts on the CLI:

    ```
    sugar launch
    ```
3.  A config.json should have been created. Edit this file and add a 'guards' section (see the section below for alternative networks):\


    ```
    "guards": {
        "default": {
          "gatekeeper": {
            "gatekeeperNetwork": "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
            "expireOnUse": false
          }
        },
        "groups": null
      }
    ```
4.  Create the guard for your mint:

    ```
    sugar guard add
    ```
5.  The script should run successfully and you should see output like below:

    ```
    %  sugar guard add
    [1/3] 🔍 Looking up candy machine

    Candy machine ID: Hjyvm2VpAMfFQDNKJaQUoQqr3HPXDSGokRGD9hpSBZay

    [2/3] 🛡  Initializing a candy guard
    Signature: 4AMsoW9n9j6gWbgqHwTK9haSHwFSDSJX18YYZrYDzYTepXgBpoGh2QgQ3wnYticfTgw5P92GY8P7rTebK6g6WMWj

    Candy guard ID: EYajALMJFqdFSYJj6KVFzYDjbRGFL61WTUECKiS4wGBC

    [3/3] 📦 Wrapping
    Signature: 2oyYp8Jd3copk7bkB69kk7hSEpHLJKnWxZAZTwyT1mEmpjC5faKaDLwoRNHZxgjRDK2fmvPs4gqKdd83QFUXeiyD

    The candy guard is now the mint authority of the candy machine.

    ✅ Command successful.
     
    ```

#### Captcha-protection

Use this guards config for captcha protection:

```
"gatekeeper": {
    "gatekeeperNetwork": "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6",
    "expireOnUse": true
  },
```

When captcha is enabled, a user will be issued a Civic Captcha Pass after successfully completing the captcha challenge and automatically checked by the Candy Machine prior to minting.

A Civic Captcha Pass **remains active only for 10 minutes and for one mint** to limit the options of malicious botters verifying multiple wallets. If a user tries to use an inactive pass, it will automatically prompt them to refresh it.

#### Liveness protection

Use this guards config for liveness protection:

```
"gatekeeper": {
    "gatekeeperNetwork": "vaa1QRNEBb1G2XjPohqGWnPsvxWnwwXF67pdjrhDSwM",
    "expireOnUse": true
  },
```

When liveness is enabled, a user must do a 3D video selfie to prove they are not a bot before they can mint.&#x20;

For detailed configuration instructions on how to configure and deploy your mint, please refer to MetaPlex's [Sugar repository](https://github.com/metaplex-foundation/sugar).

{% hint style="info" %}
Please review the [<mark style="color:orange;">Civic Pass Terms of Service</mark>](https://www.civic.com/legal/terms-of-service-civic-pass-v1/) carefully before continuing. By installing or integrating the Civic Pass (or Captcha) plugin, you agree to Civic Pass Terms of Service on behalf of the organization, company or other legal entity for which you act; and represent that you have the authority to bind the same.

If you do not have such authority, or if you do not agree with this the Civic Pass Terms of Service, you must not continue and may not use the Services.
{% endhint %}

#### Terms and Conditions

You agree and acknowledge that you are solely responsible and liable for your use of the captcha verification technology provided here (“**Verification**”) or any resulting data of such Verification (“**Verification Results**”). Civic Technologies, Inc. (“**Civic**”) makes no representations or warranties regarding the accuracy or completeness of any Verification Results, or that such Verification or Verification Results are adequate for, or achieve, your business purpose or requirements. You assume sole responsibility for compliance with any and all required registrations, licensing, and other requirements regulating your products and services and related activities.

Civic assumes no responsibility for compliance with any laws or regulations regarding your products or services or your use of the Verification or Verification Results. Without limiting the foregoing, Civic is not responsible for, and will not provide you with any advice, counsel, or recommendation pertaining to legal compliance of your products or services associated with your use of the Verification or Verification Results in connection with your products or services, and Civic hereby explicitly disclaims any representation or warranty that use of any Verification or Verification Results will meet your legal obligations, if any.
