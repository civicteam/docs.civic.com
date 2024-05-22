# Realms

[<mark style="color:orange;">Realms</mark>](https://realms.today) is the DAO governance platform on Solana, using the [<mark style="color:orange;">spl-governance</mark>](https://github.com/solana-labs/solana-program-library/tree/master/governance) program.

Civic Pass can be added to a DAO on Realms using the "[<mark style="color:orange;">plugin</mark>](https://github.com/solana-labs/governance-program-library)" system.

When using the Realms UI, no coding is required to integrate Civic Pass into your DAO. Simply follow the steps in the [<mark style="color:orange;">Realms docs page</mark>](https://docs.realms.today/Extra%20Guides/civic).

See section below for Civic Pass verifications available via the Realms UI. To add a pass not included in the UI dropdown, choose "Other" and enter the address manually.

{% hint style="success" %}
Quick Reference: If you are looking for the "Community Voter Weight Add-in" to enter into the DAO Parameters, it is `GgathUhdrCWRHowoRKACjgWhYHfxCEdBi5ViqYN6HVxk`
{% endhint %}

#### Step-by-Step Tutorial: Setting up a DAO on Realms and protecting it with Civic Pass

{% embed url="https://www.youtube.com/watch?ab_channel=Civic&v=vNqeCZ7YBIE" %}

#### Choosing a Civic Pass Verification

<table data-header-hidden data-full-width="true"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Pass Type</strong></td><td><strong>Features</strong></td><td><strong>Integrations</strong></td></tr><tr><td><a href="https://getpass.civic.com/?scope=captcha,uniqueness,liveness">Civic CAPTCHA Pass </a></td><td><p>User-interpreted input</p><p><br>Determines bot or not</p></td><td><a href="https://share.hsforms.com/1OElIx6SpTjChCq9EZa4-Fwbzn0a"><mark style="color:orange;"><strong>Request Network Key -></strong></mark></a></td></tr><tr><td><a href="https://getpass.civic.com/?scope=uniqueness,liveness,captcha">Civic Uniqueness Pass</a></td><td><p>Proof of Personhood</p><p></p><p>Video selfie to determine 1-user-1-wallet</p><p><br>Limits one user to one wallet only and prevent Sybil attacks</p></td><td><a href="https://share.hsforms.com/1NhExhEX0Sf6NLptdGi4cAwbzn0a"><mark style="color:orange;"><strong>Request Network Key -></strong></mark></a></td></tr><tr><td><a href="https://getpass.civic.com/?scope=liveness,uniqueness,captcha">Civic Liveness Pass</a></td><td><p>Proof of Personhood</p><p></p><p>Video selfie to determine human or bot</p></td><td><a href="https://share.hsforms.com/1pkdva9v2Q_yAKALLIrPAVwbzn0a"><mark style="color:orange;"><strong>Request Network Key -></strong></mark></a></td></tr><tr><td><a href="https://getpass.civic.com/?pass=identity">Civic ID Verification Pass</a></td><td>Verifies a user's real-world identity using government issues ID documents</td><td><a href="https://share.hsforms.com/1Z4QgWNh0RN2-81jJDcrN2Qbzn0a"><mark style="color:orange;"><strong>Contact Us-></strong></mark></a></td></tr></tbody></table>

{% hint style="info" %}
Please review the [Civic Pass Terms of Service](https://www.civic.com/legal/terms-of-service-civic-pass-v1/) carefully before continuing. By installing or integrating the Civic Pass (or CAPTCHA) plugin, you agree to Civic Pass Terms of Service on behalf of the organization, company or other legal entity for which you act; and represent that you have the authority to bind the same.

If you do not have such authority, or if you do not agree with this the Civic Pass Terms of Service, you must not continue and may not use the Services.
{% endhint %}
