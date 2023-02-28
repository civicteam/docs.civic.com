# API Reference

In the Customer API, the term `chain` refers to a blockchain programming model and the term `chainNetwork` to a network of the chain. For example, a "Layer 2" network like Polygon, which is using the ethereum (EVM) programming model is represented as `/pass/ethereum/polygon`.

### Authentication

Authentication follows the [<mark style="color:orange;">OAuth standard</mark>](https://oauth.net/2/)<mark style="color:orange;">.</mark> The token endpoint is [`https://auth.civic.com/oauth/token`](https://auth.civic.com/oauth/token) and the `grant_type` to request is `client_credentials`.

To manage API authentication we recommend using one of the available <mark style="color:orange;"></mark> [<mark style="color:orange;">OAuth libraries</mark>](https://oauth.net/code/)<mark style="color:orange;">.</mark>

#### Try it out!

You can try out the Civic Pass Customer API by using the following demo credentials to generate a valid OAuth token (these credentials only support the development networks, i.e. `solana/devnet` & `ethereum/goerli)` :

* `client_id: j5kwZ68j4bM8fdPAYKu7DlGQGr37eNPs`
* `client_secret: S1qSiacDUDPRVfxiSvwsRASxE0fH47U60eYeNYIt4JKSVSsgo2yy0n6V-Uz1IYBK`

To receive production access to the production / mainnet Customer API please <mark style="color:orange;"></mark> [<mark style="color:orange;">contact us</mark>](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a).



{% swagger src="../../../.gitbook/assets/openapi (17).yaml" path="/pass/{chain}/{chainNetwork}" method="post" %}
[openapi (17).yaml](<../../../.gitbook/assets/openapi (17).yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi (17).yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="get" %}
[openapi (17).yaml](<../../../.gitbook/assets/openapi (17).yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi (17).yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="patch" %}
[openapi (17).yaml](<../../../.gitbook/assets/openapi (17).yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi (17).yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="delete" %}
[openapi (17).yaml](<../../../.gitbook/assets/openapi (17).yaml>)
{% endswagger %}
