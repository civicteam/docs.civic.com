# Integration Guide

Depending on your use-case, there are two ways you can integrate Civic Pass into your dApp: [<mark style="color:orange;">"Turnkey" Integration</mark>](turnkey-integration/) or integrating directly via the [<mark style="color:orange;">Civic Customer API</mark>](custom-integration/).&#x20;

If after reading this section you are unsure which is the right choice for your, feel free to contact us and we will support you in making the right choice for you.

{% hint style="info" %}
In this documentation the term _blockchain_ is always used to reference **a programming model**. For example, "Layer 2" solutions like [<mark style="color:orange;">Polygon</mark>](https://polygon.io/), all fall under the _Ethereum (EVM)_ programming model.
{% endhint %}

### <mark style="color:orange;"></mark>[<mark style="color:orange;">Turnkey Pass Integration</mark>](turnkey-integration/)

Choose our Turnkey Integration if you want to let Civic take care of everything:

* Civic verifies user data
* Civic issues and manages the user's Civic Pass:
  * Identity documents
  * Age
  * Liveness
  * Captcha
  * Location
  * OFAC
* Users control their data, and can choose to share that data if your compliance requires (optional)

All you have to do is integrate one library into your UI and one library into your smart contract.

### <mark style="color:orange;"></mark>[<mark style="color:orange;">Custom Pass Integration</mark>](custom-integration/)<mark style="color:orange;"></mark>

You may also use your own verification process and integrate directly via an API. In this use case:

* You verify user data
* You issue and manage the user's Civic Pass:
  * Issue, freeze, and revoke identity tokens and access via an API
  * Dashboard for token management
* You have sole control of and access to user data
