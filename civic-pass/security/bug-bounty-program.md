# 🐞 Bug Bounty Program

## Areas of Interest

Our primary focus is on vulnerabilities that:

* Would allow attackers to gain unauthorized access to customers accounts.
* Would allow attackers to steal customer’s information.
* Would allow attackers to make customers’ money unavailable.
* Would allow attackers to spend customers’ money.
* High severity attacks on the server (e.g. remote code execution, SQL injection, etc.).

## In Scope Assets

| Domain         | [**api.civic.com/ociv-gatekeeper**](http://api.civic.com/ociv-gatekeeper)                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain         | [**api.civic.com/nft-adapter**](http://api.civic.com/nft-adapter)                                                                                                |
| Domain         | [**api.civic.com/pinning-service**](http://api.civic.com/pinning-service)                                                                                        |
| Domain         | [**api.civic.com/sip**](http://api.civic.com/sip)                                                                                                                |
| Domain         | [**idv.civic.com**](http://idv.civic.com/)                                                                                                                       |
| Domain         | [**github.com/civicteam/lexi**](https://github.com/civicteam/lexi)                                                                                               |
| Smart Contract | [**https://github.com/identity-com/on-chain-identity-gateway/tree/main/ethereum**](https://github.com/identity-com/on-chain-identity-gateway/tree/main/ethereum) |
| Smart Contract | [**https://github.com/identity-com/on-chain-identity-gateway/tree/main/solana**](https://github.com/identity-com/on-chain-identity-gateway/tree/main/solana)     |

{% hint style="info" %}
For smart contract related findings, please review guidelines listed  and submit your report directly on [Civic's Hackenproof page](https://hackenproof.com/civic/civic-smart-contracts).
{% endhint %}

## Out of Scope Vulnerabilities

When reporting vulnerabilities, please consider (1) attack scenario / exploitability, and (2) security impact of the bug. The following issues are considered out of scope:

* Reports that involve a secondary user account where an existing business relationship is being leveraged and the impact is limited solely to the parent account
* Scanner output or scanner-generated reports, including any automated or active exploit tool
* Attacks requiring physical access to a user’s device, or administrative access to a user’s device
* Vulnerabilities involving stolen credentials or physical access to a device
* Social engineering attacks, including those targeting or impersonating internal employees by any means (e.g. customer service chat features, social media, personal domains, etc.)
* Host header injections without a specific, demonstrable impact
* Denial of service (DOS) attacks using automated tools
* Self-XSS, which includes any payload entered by the victim
* Content spoofing without embedding an external link or JavaScript
* Low severity or unexploitable divergences from best practices
* Most vulnerabilities within our sandbox, lab, or staging environments
* Vulnerabilities only affecting users of outdated or unpatched platforms
* Information disclosure of public or non-protected information (e.g. code in a public repository, server banners, etc.), or information disclosed outside of Civic’s control (e.g. a personal, non-employee repository; a list from a previous infodump; etc.)
* Exposed credentials that are either no longer valid, or do not pose a risk to an in scope asset
* Vulnerabilities on third party libraries without showing specific impact to the target application (e.g. a CVE with no exploit)
* Any keys, credentials, or tokens supporting code or configuration that is published as part of a suite of automated tests, such as those in a test/ directory in a repository. Assume any keys or credentials or tokens in these directories are intended to be public, unless you have specific indicators or evidence to the contrary.

## Guidelines

* Please provide detailed reports with reproducible steps. If the report is not detailed enough to reproduce the issue, the issue will not be eligible for a reward.
* Submit one vulnerability per report, unless you need to chain vulnerabilities to provide impact.
* When duplicates occur, we only award the first report that was received (provided that it can be fully reproduced).
* Multiple vulnerabilities caused by one underlying issue will be awarded one bounty.
* Social engineering (e.g. phishing, vishing, smishing) is prohibited.
* We will not reward vulnerability reports that result from automated scanning tools.
* Vulnerabilities that do not result in unauthorized disclosure of user data, unauthorized privilege escalation, or code execution are unlikely to result in significant bounties.
* Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with the explicit permission of the account holder.

## Disclosure

Please email all submissions to [security@civic.com](mailto:security@civic.com). Your submission should include any steps required to reproduce or exploit the vulnerability. Please allow time for triage and the vulnerability to be fixed before discussing any findings publicly. After receiving a submission, Civic Technologies will make a best effort to provide a timely first response. We’ll try to keep you informed about our progress throughout the process.

{% hint style="info" %}
For smart contract related findings, please review guidelines listed  and submit your report directly on [Civic's Hackenproof page](https://hackenproof.com/civic/civic-smart-contracts).
{% endhint %}

## Safe Harbor

To encourage research and responsible disclosure of security vulnerabilities, we will not pursue civil or criminal action, or send notice to law enforcement for accidental or good faith violations of this policy. If legal action is initiated by a third party against you in connection with activities conducted under this policy, we will take steps to make it known that your actions were conducted in compliance with this policy.

Thank you for helping keep Civic Technologies and our users safe!
