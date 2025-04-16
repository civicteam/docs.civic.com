---
description: The steps you need to follow to use your App in a live environment
---

# Bringing your App to production

Once you've configured your App the way you want it using the [civic-auth dashboard](https://auth.civic.com/dashboard), there are a few steps you need to take to use your app in your production site.

### Configure SSO credentials

In Sandbox mode, your app uses Civic's credentials for SSO providers such as Google. However, for a live app you need to provide your own credentials for your chosen providers.&#x20;

For each provider, you need to set the clientId and clientSecret that will be provided to you when you set up your OAuth app.&#x20;

You also need to add the civic auth domains to the OAuth whitelisted URLs, e.g. for google you'd need to add [https://auth-preprod.civic.com](https://auth-preprod.civic.com) and [https://auth-preprod.civic.com/login/api/callback/google](https://auth-preprod.civic.com/login/api/callback/google). For other providers, the callback URL will have a different ending.

### Set a domain

To ensure that your app is only usable by your website, you need to add the Domain that your website will be hosted on. You need to define at least one Domain, and a secure https site is recommended.

{% hint style="info" %}
Note that you can add localhost domains while testing but it's recommended that you remove localhost values when you bring your App to production as anyone running a localhost app could then potentially use your clientId.&#x20;
{% endhint %}

### Add payment information

You need to add payment information using our Billing page. Click here for more details on [Auth Pricing](../auth-pricing.md).

### Converting or duplicating your app

Once you have fulfilled all the steps, you can click on the 'Sandbox' header and select the option '+ Launch to production'. You now have two options of bringing your existing App to production,

#### Convert

&#x20;This leaves the clientId and all the settings the same as in Sandbox mode.

#### Duplicate

This copies all the App settings to a new App, creating a new clientId that you can then use in your production site.
