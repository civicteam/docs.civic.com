# Integrate

Depending on your use-case, there are two ways you can integrate Civic Pass into your dApp: ["Turnkey" Integration](turnkey-integration/) or integrating directly via the [Civic Customer API](api-integration/).&#x20;

If after reading this section you are unsure which is the right choice for your, feel free to contact us and we will support you in making the right choice for you.

{% hint style="info" %}
In this documentation the term _blockchain_ is always used to reference **a programming model**. For example, "Layer 2" solutions like [Polygon](https://polygon.io/), all fall under the _Ethereum (EVM)_ programming model.
{% endhint %}

### <mark style="color:orange;"></mark>[<mark style="color:orange;">Turnkey Integration</mark>](turnkey-integration/)

The first integration type, which we call "Turnkey" Integration, is the one to choose if you want to let Civic take care of everything:

* Civic collects the user's data
* Civic verifies the user's data
* Civic issues and manages the user's Civic Pass
* (Optional) Civic gives you access to the user's data if compliance requires you to have store it.

All you have to do is integrate one library into your UI and on library into your smart contract.

### <mark style="color:orange;"></mark>[<mark style="color:orange;">API Integration</mark>](api-integration/)<mark style="color:orange;"></mark>

If you want to use your own verification process, then you can also integrate directly with Customer API. In this use-case:

* You collect the user's data
* You verify the user's data
* You call the Civic Customer API to trigger the issuance and manage the user's Civic Pass.
