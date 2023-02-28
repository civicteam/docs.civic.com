# API Integration

&#x20;You can use Civic Pass to restrict access to your dApp, without using Civic verification services and UI components.\
\
&#x20;In this integration type, your dApp is responsible for collecting and verifying your user's information. Once a user has been successfully vetted according to your logic, you can then use the Civic Customer API to issue a Civic Pass for your user's wallet. Additionally, via the Customer API you can <mark style="color:orange;"></mark> [<mark style="color:orange;">manage the lifecycle</mark>](../turnkey-integration/ui-integration/gateway-provider/gateway-status.md) <mark style="color:orange;"></mark> of all Civic Passes you issued, for example freezing a user's pass.

Naturally, your on-chain smart contract still has to check for a valid Civic Pass during program execution. See the <mark style="color:orange;"></mark> [<mark style="color:orange;">On-Chain Integration</mark>](../turnkey-integration/on-chain-integration/) section for details on how to implement that part.

