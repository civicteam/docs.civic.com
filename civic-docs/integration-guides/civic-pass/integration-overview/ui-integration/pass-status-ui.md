# Pass Status UI

For convenience and less code, simply drop the [<mark style="color:orange;">Identity Button</mark>](pass-status-ui.md#identity-button) widget into your UI.&#x20;

It will handle both displaying the user's Civic Pass status and triggering the issuance flow for new users, all without them ever leaving your dApp.&#x20;

<div>

<figure><img src="../../../../.gitbook/assets/button-get-pass (2).png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../../../.gitbook/assets/button-active (1).png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../../../.gitbook/assets/button-inactive (1).png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../../../.gitbook/assets/button-expired (1).png" alt=""><figcaption></figcaption></figure>

</div>

## Identity Button

The Identity button changes appearance with text and icons to indicate when the user needs to take action. It can be clicked by the user at any point in the process.&#x20;

The initial click on the button by a user initiates the Civic Pass modal which will guide the user through the process of issuing their Civic Pass. If a Civic Pass already exists for the connected wallet, the UI will update to show the 'Active' status.

Once the user has gone through the issuance flow via the Civic Pass modal, any subsequent click will launch the Civic Pass iframe with a screen describing the current status of the process.

| **Property** | **Description**                                                                 | **Values**    |
| ------------ | ------------------------------------------------------------------------------- | ------------- |
| mode         | The default setting of the button is dark. We also provide a `light mode`.      | DARK \| LIGHT |
| animation    | The button provides a neat animation on hover. The default value is `dark mode` | true \| false |

{% tabs %}
{% tab title="Solana" %}
```jsx
import {
  IdentityButton,
  ButtonMode,
} from '@civic/solana-gateway-react';

<IdentityButton mode={ButtonMode.LIGHT} animation={true} />
```
{% endtab %}

{% tab title="Ethereum + EVMs" %}
```jsx
import {
  IdentityButton,
  ButtonMode,
} from '@civic/ethereum-gateway-react';

<IdentityButton mode={ButtonMode.LIGHT} animation={true} />
```
{% endtab %}
{% endtabs %}
