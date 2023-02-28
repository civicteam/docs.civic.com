# API Integration

&#x20;You can use Civic Pass to restrict access to your dApp, without using Civic verification services and UI components. You are solely responsible for collecting and verifying your user's information.

&#x20;Once a user has been successfully vetted according to your logic, you can then call the Civic Customer API to issue a Civic Pass for your user's wallet. The API also enables you to <mark style="color:orange;"></mark> [<mark style="color:orange;">manage the complete lifecycle</mark>](../turnkey-integration/ui-integration/gateway-provider/gateway-status.md) <mark style="color:orange;"></mark> of any Civic Pass you issued.

Naturally, your on-chain smart contract still has to check for a valid Civic Pass during program execution. See the <mark style="color:orange;"></mark> [<mark style="color:orange;">On-Chain Integration</mark>](../turnkey-integration/on-chain-integration/) section for details on that.

