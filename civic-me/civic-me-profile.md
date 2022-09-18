# Profile SDK

With [<mark style="color:orange;">civic.me</mark>](https://civic.me), users can publish a public profile with a custom name, headline and profile image selected from their NFTs.

The [<mark style="color:orange;">civic.me profile</mark>](https://www.npmjs.com/package/@civic/profile) SDK allows for easy retrieval of this profile data, through a wallet address, [<mark style="color:orange;">did</mark>](https://did.civic.com/) or [<mark style="color:orange;">.sol domain</mark>](https://naming.bonfida.org/).

## SDK Usage

### Loading the profile

Simply import the [<mark style="color:orange;">SDK</mark>](https://www.npmjs.com/package/@civic/profile) and load a profile as follows:

```javascript
import { CivicProfile, Profile } from "@civic/profile";

...
// Query using a wallet address, did or .sol domain
const profile: Profile = await CivicProfile.get("query");
```

The corresponding profile result will contain the following data:

```javascript
// The resolved public key
profile.address

// The resolved did
profile.did

// A civic.me profile name, if available
profile.name?.value

// A civic.me profile image, if available
profile.image?.url

// A civic.me profile headline, if available
profile.headline?.value
```

### Getting a list of associated public keys

```javascript
const profile: Profile = await CivicProfile.get("query");
const linkedKeys: PublicKey[] = await profile.getLinkedPublicKeys();
```

This returns a list of Solana public keys associated with the profile.

### Getting a list of Civic passes

This returns a list of Civic passes owned by the profile's keys.

```javascript
// A Solana Connection is required in order to query for passes. Public devnet used as an example here:
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { CivicProfile, Profile, GatewayToken } from "@civic/profile";

const solanaConnection: Connection =  new Connection(clusterApiUrl("devnet"));
const profile: Profile = await CivicProfile.get("query", { solana: { connection }});

const passes: GatewayToken[] = await profile.getPasses();
```

By default, multiple pass types are queried. A blockchain RPC call is made for each combination of public key & pass type. The list of pass types to query can be overridden. A pass type is represented by its corresponding Gatekeeper Network address on Solana.

```javascript
const passes: GatewayToken[] = await profile.getPasses(["ni1jXzPTq1yTqo67tUmVgnp22b1qGAAZCtPmHtskqYG"]);
```
