# Candy Machine v3

We are fully integrated into MetaPlex's Candy Machine v3 protocol to enable mint protection using [<mark style="color:purple;">Candy Guard</mark>](https://developers.metaplex.com/core-candy-machine/guards).

Permissioning with Civic Pass & Candy Guard allows you to verify minters in real-time, evaluating every request to mint by your criteria, including:

* conducting a bot check using CAPTCHA
* checking for liveness and uniqueness
* checking for a minimum age
* checking buyers from locations you want to allow
* checking ID documents

{% hint style="info" %}
You can use our [<mark style="color:purple;">reference implementation UI template using Candy Machine V3 with integrated Civic Pass -></mark>](https://github.com/MarkSackerberg/umi-cmv3-ui-inofficial)

We recommend using the [<mark style="color:purple;">latest sugar command line tool</mark>](https://developers.metaplex.com/candy-machine/sugar) to create your mint.
{% endhint %}

#### Creating a protected mint using Sugar CLI

In Candy Machine v3 creation of the token guard is separate from the mint.

1. install sugar: currently sugar support for Candy Machine needs to be downloaded [<mark style="color:purple;">here</mark>](https://github.com/metaplex-foundation/sugar/releases)
2.  Create your mint (with Candy Machine v3 the mint and the token guard are created separately). Follow the prompts on the CLI:

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

### Enabling Civic Pass Checks

#### CAPTCHA Check

When CAPTCHA is enabled, a user will be issued a Civic Pass after successfully completing a CAPTCHA challenge and automatically checked by the Candy Machine prior to minting.

#### Liveness Check

When liveness is enabled, a user must do a 3D video selfie to prove they are a real person and not a bot before they can mint.

**Uniqueness Check**

When uniqueness is enabled, the user must do a 3D video selfie to ensure that a real person only uses one wallet to mint. You can decide how many NFTs this unique user can mint.

**ID Document Check**

When enabled, the user must provide a government issued ID and complete a 3D video selfie before they they are issued a Civic Pass.

For any of the above keys, please go through the process of requesting access [here](../../introduction/get-network-keys.md). For detailed configuration instructions on how to configure and deploy your mint, please refer to MetaPlex's [<mark style="color:purple;">Sugar repository</mark>](https://github.com/metaplex-foundation/sugar).

{% hint style="info" %}
Please review the [<mark style="color:purple;">Civic Pass Terms of Service</mark>](https://www.civic.com/legal/terms-of-service-civic-pass-v1/) carefully before continuing. By installing or integrating the Civic Pass (or CAPTCHA) plugin, you agree to Civic Pass Terms of Service on behalf of the organization, company or other legal entity for which you act; and represent that you have the authority to bind the same.

If you do not have such authority, or if you do not agree with this the Civic Pass Terms of Service, you must not continue and may not use the Services.
{% endhint %}

#### Terms and Conditions

You agree and acknowledge that you are solely responsible and liable for your use of the CAPTCHA verification technology provided here (“**Verification**”) or any resulting data of such Verification (“**Verification Results**”). Civic Technologies, Inc. (“**Civic**”) makes no representations or warranties regarding the accuracy or completeness of any Verification Results, or that such Verification or Verification Results are adequate for, or achieve, your business purpose or requirements. You assume sole responsibility for compliance with any and all required registrations, licensing, and other requirements regulating your products and services and related activities.

Civic assumes no responsibility for compliance with any laws or regulations regarding your products or services or your use of the Verification or Verification Results. Without limiting the foregoing, Civic is not responsible for, and will not provide you with any advice, counsel, or recommendation pertaining to legal compliance of your products or services associated with your use of the Verification or Verification Results in connection with your products or services, and Civic hereby explicitly disclaims any representation or warranty that use of any Verification or Verification Results will meet your legal obligations, if any.
