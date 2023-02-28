# API Reference

{% hint style="info" %}
To receive access to the Customer API please [contact us](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a).
{% endhint %}

In the Customer API, the term `chain` refers to a blockchain programming model and the term `chainNetwork` to a network of the chain.&#x20;

For example, a "Layer 2" network like Polygon, which is using the ethereum (EVM) programming model is represented by `/pass/ethereum/polygon`.



{% swagger src="../../../.gitbook/assets/Without Auth Descritionendpoint.yaml" path="/pass" method="post" %}
[Without Auth Descritionendpoint.yaml](<../../../.gitbook/assets/Without Auth Descritionendpoint.yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/Without Auth Descritionendpoint.yaml" path="/pass/{chain}/{chainNetwork}" method="post" %}
[Without Auth Descritionendpoint.yaml](<../../../.gitbook/assets/Without Auth Descritionendpoint.yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/Without Auth Descritionendpoint.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="get" %}
[Without Auth Descritionendpoint.yaml](<../../../.gitbook/assets/Without Auth Descritionendpoint.yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/Without Auth Descritionendpoint.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="delete" %}
[Without Auth Descritionendpoint.yaml](<../../../.gitbook/assets/Without Auth Descritionendpoint.yaml>)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/Without Auth Descritionendpoint.yaml" path="/pass/{chain}/{chainNetwork}/{wallet}" method="patch" %}
[Without Auth Descritionendpoint.yaml](<../../../.gitbook/assets/Without Auth Descritionendpoint.yaml>)
{% endswagger %}
