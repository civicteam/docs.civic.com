---
description: The steps you need to follow to use your App in a live environment
---

# Bring Your App to Production

Once you've configured your App using the [Civic Auth Dashboard](https://auth.civic.com/dashboard), here are the steps you need to take to promote your app to production.

### Configure SSO credentials

In Sandbox mode, your app uses Civic's credentials for SSO providers such as Google. However, for a live app you need to provide your own credentials for your chosen providers.&#x20;

For each provider, you need to set the `clientId` and `clientSecret` that will be provided to you when you set up your OAuth app.&#x20;

You also need to add the Civic Auth domains to the OAuth whitelisted URLs

#### _Example: Google_&#x20;

You will need to add the following domains: `https://auth.civic.com` and `https://auth.civic.com/login/api/callback/google`.&#x20;

For other providers, the callback URL will have a different ending.

### Set a domain

To ensure that your app is only usable by your website, you need to add the Domain that your website will be hosted on. You need to define at least one Domain, and a secure `https` site is recommended.

{% hint style="info" %}
Note that you can add localhost domains while testing but it's recommended that you remove localhost values when you bring your App to production as anyone running a localhost app could then potentially use your clientId.&#x20;
{% endhint %}

### Add payment information

You need to add payment information using our Billing page. Click here for more details on [Auth Pricing](https://www.civic.com/pricing/auth-pricing).

### Converting or duplicating your app

Once you have fulfilled all the steps, you can click on the 'Sandbox' header and select the option '+ Launch to production'.&#x20;

You now have two options of bringing your existing App to production: Convert and Duplicate

#### Convert

Choose this option if you would like to keep the `clientId` and all the settings the same as in Sandbox mode.

#### Duplicate

This option copies all the App settings to a new App, creating a new clientId that you can then use in your production site.

### Enabling Crypto Wallets (Web3 Apps only)

If you want your users to have access to embedded wallets, make sure to enable the 'Enable embedded wallets' setting in the Crypto Wallets dashboard page.
