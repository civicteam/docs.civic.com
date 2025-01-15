# 1-Player-1-Wallet

## Ensuring Player Uniqueness in Gaming Platforms

Game developers should ensure every player on their platform is unique, especially when rewards or competitive play are involved. The Civic Uniqueness Pass is a powerful solution, preventing the creation of multiple accounts through advanced technologies like video selfies and 1-user-1-wallet verification. This protects the game's integrity and fairness while operating seamlessly on multiple blockchain networks.&#x20;

### Key Benefits

Developers can significantly improve in-game fair play and fraud prevention measures by ensuring that each player is unique, no matter if that player is using a Web2 or Web3 signup method. Here are a few advantages of integrating versus building your own solution:

* High levels of security. Having every player account uniquely verified reduces the risk of fraudulent activities, and using tested tools like Civic Pass ensures overall security robustness.
* Reduction of cheating. Having each player verified curbs the use of multiple accounts for unfair advantages.
* Community trust. Assures players that they compete in a fair environment, enhancing player satisfaction and engagement.

### Use Cases

Verifying player uniqueness addresses a number of challenges in the game development space:

* Ensuring Fair Competition: It's common for players to artificially boost a character's strength or exploit resources in beginner zones, especially in MMOs, using multiple accounts tied to the same person. The Civic Uniqueness Pass reduces the likelihood of such fraudulent activities.
* Preventing Economic Disruption: The Civic Uniqueness Pass curtails market manipulation and resource hoarding, preserving the balance and fairness of in-game economies by helping developers enforce “one person - one account” rules.
* Simplifying Moderation and Rule Enforcement: Moderators have a clearer understanding of each player's actions within the game, facilitating more effective rule enforcement and ensuring that penalties for misbehavior are appropriately applied and banned players can’t just create new accounts.
* Minimizing “Smurfing”: In competitive eSports, high-skill players often create secondary accounts to compete against less experienced players, discouraging newcomers. The Civic Uniqueness Pass helps reduce smurfing, maintaining competitive balance.
* Preventing Abuse of Referral and/or In-Game Bonuses: Some players exploit referral bonus systems by creating multiple fake accounts. The Civic Uniqueness Pass ensures that each new account linked to a referral is genuinely distinct and verified.

### How It Works

The Civic Uniqueness Pass uses liveness detection and face verification through a video selfie matched to a user's wallet. This process helps ensure that a live, unique individual operates the wallet. The pass is supported on several blockchain networks, including Arbitrum, Avalanche, Base, Casper, Ethereum, Fantom, Optimism, Polygon, Solana, and XDC.&#x20;

The system's compatibility spans desktop and mobile platforms, making it adaptable to most gaming environments. Integration requires installing Civic's React library to incorporate the Civic Gateway component, but no extra effort on the user side.&#x20;

Frontend adjustments involve using the Identity Button or UI modal to display the pass status and facilitate user verification. For more advanced use cases that include smart contracts, developers can implement the Pass requirement in their on-chain logic.&#x20;

Technical requirements for users getting verified:

* Internet and browser support - the gaming platform must support JavaScript in environments such as browsers or webviews, as the Civic integration uses React components adaptable to these technologies.
* Device camera for conducting the required liveness checks in the identity verification
* &#x20;process.
* Users must disable VPNs during the verification process to ensure accurate location and identity checks.

There are two payment options for a Uniqueness pass. Players can pay for their own passes if you are building for a crypto-native audience using their own wallets. Players would be responsible, in this case, for both the pass fee and the associated transaction costs, depending on the blockchain in use.&#x20;

Another way to manage this process is to pay on behalf of the user, using a 3rd party crypto wallet that the game controls. This makes it easier to onboard Web2 users to a Web3 game. In either case, users will need to have their own crypto wallets to receive the Pass once verification is complete.&#x20;

If you would like to pay on behalf of users that don’t manage their own keys, then please get in touch with our team to discuss which plan fits best for your implementation.

Each pass has an expiration date that can be either standard, or customized, as well as refreshed on demand, based on a trigger inside your app. This ensures it's the same user every time.

### Get In Touch

We encourage all game developers to integrate the Civic Uniqueness Pass into their platforms. [Request a network key](../../introduction/get-network-keys.md) or [get in touch](https://civickey.typeform.com/req-custom) to see how Civic can help.&#x20;

\
