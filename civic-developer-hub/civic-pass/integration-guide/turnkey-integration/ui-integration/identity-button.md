# Identity Button

The **IdentityButton** is a reference implementation of a UI widget that leverages the [<mark style="color:orange;">GatewayProvider</mark>](gateway-provider/) to communicate to your users [<mark style="color:orange;">the status of their Civic Pass</mark>](gateway-provider/gateway-status.md)<mark style="color:orange;">.</mark>

It changes appearance with text and icons to indicate when the user needs to take action and can be clicked by the user at any point in the process. The initial click on the button by a user will initiate the Civic Pass modal which will guide the user through the process of issuing their Civic Pass. If a Civic Pass already exists for the connected wallet, the UI will already have updated to show the 'Active' status.

Once the user has gone through the issuance flow via the Civic Modal, any subsequent click will launch the Civic compliance iframe with a screen describing the current status of the flow.

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

{% tab title="Ethereum" %}
```jsx
import {
  IdentityButton,
  ButtonMode,
} from '@civic/ethereum-gateway-react';

<IdentityButton mode={ButtonMode.LIGHT} animation={true} />
```
{% endtab %}
{% endtabs %}

<figure><img src="../../../../.gitbook/assets/image (10).png" alt=""><figcaption><p>The Identity Button displaying different Civic Pass states</p></figcaption></figure>



