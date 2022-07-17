---
description: Adding Civic Pass to DAOs on Solana
---

# Realms Integration

[Realms](https://realms.today) is the DAO governance platform on Solana, using the [spl-governance](https://github.com/solana-labs/solana-program-library/tree/master/governance) program.

Civic Pass can be added to a DAO on Realms using the "[plugin](https://github.com/solana-labs/governance-program-library)" system.

When using the [Realms](https://realms.today) UI, no coding is required to integrate Civic Pass into your DAO. Simply follow the steps in the [Realms docs page](https://docs.realms.today/DAO-Management/creating-DAOs/gated-DAO).

#### Choosing a Civic Pass Verification

Below are the Civic Pass verifications available via the Realms UI. To add a pass not included in the UI dropdown, choose "Other" and enter the address manually.

|                          |                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bot-Resistance           | See [civic-captcha-pass.md](../../civic-pass/civic-captcha-pass.md "mention")                                                                                                                                      |
| Uniqueness               | A pass that links a user's identity to a single wallet, bringing sybil-attack resistance and non-plutocratic voting systems to Solana DAOs.                                                                        |
| ID Verification          | ID Document-based full KYC. [Contact us](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a) for access or join our [Discord Server](https://discord.gg/8H5Kdtr5Wn).                                           |
| ID Verification for DeFi | ID Document-based full KYC with "DeFi-friendly" region restrictions. [Contact us ](https://share.hsforms.com/1NvBk0zfyR3aWcMosBxJETQbzn0a)for access or join our [Discord Server](https://discord.gg/8H5Kdtr5Wn).  |

{% hint style="success" %}
Quick Reference: If you are looking for the "Community Voter Weight Add-in" to enter into the DAO Parameters, it is `GgathUhdrCWRHowoRKACjgWhYHfxCEdBi5ViqYN6HVxk`
{% endhint %}
