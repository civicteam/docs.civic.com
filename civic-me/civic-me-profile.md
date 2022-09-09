# Profile SDK

With [civic.me](https://civic.me), users can publish a public profile with a custom name, headline and profile image selected from their NFTs.

The [civic.me profile](https://www.npmjs.com/package/@civic/profile) SDK allows for easy retrieval of this profile data, through a wallet address, [did](https://did.civic.com/) or [.sol domain](https://naming.bonfida.org/).

### SDK Usage

Simply import the [SDK](https://www.npmjs.com/package/@civic/profile) and load a profile as follows:

```javascript
import { CivicProfile, ProfileResult } from "@civic/profile";

...
// Query using a wallet address, did or .sol domain
const profile: ProfileResult = await CivicProfile.get("query");
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
