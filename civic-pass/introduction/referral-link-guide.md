---
description: >-
  How any partner can embed a pre‑configured Civic Pass URL in their product or
  campaign
---

# 🔗 Referral Link Guide

**1. Why use a pre‑configured link?**

Embedding the right query parameters up‑front means users arrive with exactly the **Pass type**, **blockchain**, and **partner attribution** you need, so:

| Benefit                  | Detail                                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| **Friction‑free UX**     | Users skip drop‑downs and get straight to verification.                |
| **Accurate attribution** | The `referrer` tag lets you track traffic and revenue‑share precisely. |
| **Zero‑code updates**    | Adding new Pass scopes or chains is as simple as editing the URL.      |

***

**2. Referral‑link anatomy**

```html
https://getpass.civic.com/
  ?scope=<scopes>          # Pass scopes, comma‑separated
  &chain=<chains>          # Allowed blockchains, comma‑separated
  &referrer=<your‑slug>    # Partner identifier (lowercase, URL‑safe)
```

| Parameter  | Required | Example value(s)     | Purpose                                     |
| ---------- | -------- | -------------------- | ------------------------------------------- |
| `scope`    | ✅        | `uniqueness,captcha` | Select one or more Civic Pass scopes.       |
| `chain`    | ✅        | `base,ethereum`      | Restricts issuance to the listed networks.  |
| `referrer` | ✅        | `partner‑xyz`        | Tags verifications for analytics & billing. |

> **Tip:** Spaces in chain names must be URL‑encoded (`%20`). For example, `arbitrum one` → `arbitrum%20one`.

***

**3. Building your link**

1. **Pick scopes** – choose 1‑N from `uniqueness`, `captcha`, `liveness`, `kyc`, …
2. **Pick chains** – list any EVM chain slug (`base`, `optimism`, `polygon`, …).
3. **Get your referrer slug** – request it from your Civic account manager.

```
Example
--------
Scope(s):  uniqueness
Chain(s):  base
Referrer:  partner-xyz

URL:
https://getpass.civic.com/?scope=uniqueness&chain=base&referrer=partner-xyz
```

Feel free to experiment in a browser; the link is self‑validating.

***

**4. How to embed the link**

**4.1 Static HTML ‑ simplest**

```html
<a href="https://getpass.civic.com/?scope=uniqueness&chain=xdc&referrer=partner-xyz"
   target="_blank" rel="noopener noreferrer">
  Verify with Civic Pass
</a>
```

**4.2 React (ES5 class)**

```jsx
var CivicPassButton = React.createClass({
  render: function () {
    var url = 'https://getpass.civic.com/?scope=uniqueness&chain=base&referrer=partner-xyz';
    return React.createElement(
      'a',
      { href: url, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn-primary' },
      'Verify with Civic Pass'
    );
  }
});
```

**4.3 Next.js / Link component**

```js
import Link from 'next/link';

export default function CivicPassLink() {
  const url =
    'https://getpass.civic.com/?scope=uniqueness&chain=solana&referrer=partner-xyz';
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      Verify with Civic Pass
    </Link>
  );
}
```

***

**5. QA checklist before going live**

Open the link in a private/incognito window; confirm only your chosen scopes appear.

Switch your wallet to a non‑allowed chain and confirm issuance is blocked.

Complete a test verification; check the Civic Partner Dashboard shows your `referrer` slug.

If using `redirect_uri`, verify the `state` value is echoed back unchanged.

***

**6. Troubleshooting guide**

| Symptom                                | Likely cause                 | Fix                           |
| -------------------------------------- | ---------------------------- | ----------------------------- |
| Extra scopes showing                   | Wrong `scope=` list          | Keep only the scopes you need |
| Users not restricted to a single chain | Multiple chain slugs present | Limit `chain=` to one entry   |
| Analytics show “unknown” referrer      | Typo or missing `referrer=`  | Confirm slug with Civic team  |

***

**7. Frequently asked questions**

**Q. Can I support multiple chains?**\
Yes—comma‑separate them: `chain=base,optimism,polygon`.

**Q. How do I support testnets?**\
Use the same URL; Civic follows the wallet network. Just ensure your dApp is on the matching test chain (e.g., Base Sepolia).

**Q. What if I add CAPTCHA later?**\
Update the link to `scope=uniqueness,captcha`. No code changes beyond that.
