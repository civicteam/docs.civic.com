# API Reference

In the Customer API, the term `chain` refers to a blockchain programming model and the term `chainNetwork` to a network of the chain. For example, a "Layer 2" network like Polygon, which is using the ethereum (EVM) programming model is represented as `/pass/ethereum/matic`.

### Authentication

Authentication follows the [OAuth standard](https://oauth.net/2/). The Civic authentication endpoint is `https://auth.civic.com/oauth/token`. The `grant_type` to request is `client_credentials`.

To manage API authentication we recommend using one of the available <mark style="color:orange;"></mark> [<mark style="color:orange;">OAuth libraries</mark>](https://oauth.net/code/)<mark style="color:orange;">.</mark>

#### Try it out!

You can try out the Civic Pass Customer API by using the following demo credentials to generate an OAuth token:

* `client_id: j5kwZ68j4bM8fdPAYKu7DlGQGr37eNPs`
* `client_secret: S1qSiacDUDPRVfxiSvwsRASxE0fH47U60eYeNYIt4JKSVSsgo2yy0n6V-Uz1IYBK`

_The demo credentials only work for the development networks, i.e._

* &#x20;`solana/devnet`
* &#x20;`ethereum/goerli`

Also, please keep in mind that since these are _shared credentials_, i.e. others have access to the same Civic Passes and can , for example, freeze them.

To receive access to the production / mainnet Customer API please <mark style="color:orange;"></mark> [<mark style="color:orange;">contact us</mark>](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a).

{% swagger src="../../../.gitbook/assets/customer_api.yaml" path="/pass/{chain}/{chainNetwork}" method="post" %}
[customer_api.yaml](../../../.gitbook/assets/customer_api.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/customer_api.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="get" %}
[customer_api.yaml](../../../.gitbook/assets/customer_api.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/customer_api.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="delete" %}
[customer_api.yaml](../../../.gitbook/assets/customer_api.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/customer_api.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="patch" %}
[customer_api.yaml](../../../.gitbook/assets/customer_api.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/customer_api.yaml" path="/pass" method="post" %}
[customer_api.yaml](../../../.gitbook/assets/customer_api.yaml)
{% endswagger %}
