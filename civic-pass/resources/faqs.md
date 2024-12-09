# ❓ FAQs

## Managing Civic Passes

### Q: How do I issue a Civic Pass to a user?

To issue a Civic Pass:

1. Log into the Dashboard at `dashboard.civic.com` and select Passes on the left side of the screen.
2. Enter the wallet address of the user to whom you wish to issue a Civic Pass.
3. Select Issue Pass. The Civic Pass will be issued to the user’s wallet after a few minutes, depending on blockchain congestion and network issues.

### Q: How do I update a user’s Civic Pass?

To update a user’s Civic Pass:

1. Log into the Dashboard at `dashboard.civic.com` and select Passes on the left side of the screen.
2. Enter the wallet address of the user whose Civic Pass you wish to update in the Search bar.
3. The Civic Pass(es) associated with that user’s wallet address will be displayed on the screen. Select Update.
4. A window will appear. Under Pass Status, select the drop-down menu and update the user’s Civic Pass status as desired.

### Q: What does each Civic Pass status mean?

<table data-header-hidden><thead><tr><th width="164"></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Status</strong></td><td><strong>Description</strong></td><td><strong>Behavior when <code>requestGatewayToken</code> is triggered</strong></td></tr><tr><td><code>ACTIVE</code></td><td>The Civic Pass is Active. The user can trade.</td><td>Opens the Civic Pass modal dialog with a user-friendly explanation of the status.</td></tr><tr><td><code>EXPIRED</code></td><td>The Civic Pass has expired. Depending on the Gatekeeper Network configured, an IP check and/or proof of wallet ownership are required to refresh it.</td><td>Proof of wallet ownership is automatically initiated.</td></tr><tr><td><code>FROZEN</code></td><td>The Pass has been frozen, for example because the user connected from a blocked IP.</td><td>Opens the Civic Pass modal dialog with a user-friendly explanation of the status.</td></tr><tr><td><code>REVOKED</code></td><td>The Pass has been revoked, for example because the user connected from a banned IP.</td><td>Opens the Civic Pass modal dialog with a user-friendly explanation of the status.</td></tr></tbody></table>

## General Information

### Q: Which blockchains does Civic Pass support?

* Arbitrum
* Avalanche
* Base
* BNB Smart Chain (BSC)
* Ethereum
* Fantom
* Internet Computer (ICP)
* Optimism
* Polygon
* Polygon zkEVM
* Solana
* X Layer
* XDC

## Using the Dashboard

### Q: How do I access the Civic Dashboard?

To access the Civic Dashboard, follow these steps:

* Go to `dashboard.civic.com` and click on Login.
* Enter the name your organization uses to access the Dashboard and click Continue.
* Enter the email address invited to access the Dashboard and the email password. You can also use ‘Continue with Google’ or ‘Continue with GitHub’ to log in. You will then be redirected to your organization’s Dashboard.

### Q: Can I issue and manage Civic Passes in the Dashboard?

Business and Enterprise clients can issue, update, and manage their users’ Civic Passes in the Dashboard. This includes issuing new passes, freezing, revoking, and updating the status of existing passes.

### Q: What should I do if I experience issues with the Dashboard or managing Civic Passes?

If you encounter any issues, please [contact our support team](https://support.civic.com/hc/en-us/requests/new) and provide:

1. Screenshots or screen recordings of the issue.
2. Any error messages and/or responses in the console logs.
3. The name of your organization.
4. The wallet address(es) and chain network you are experiencing issues with
