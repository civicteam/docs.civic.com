## civic.me profile library

With [civic.me](https://civic.me) users can publish a public profile, with a custom name, headline and profile image selected from the user's NFTs. The [Civic.me profile](https://www.npmjs.com/package/@civic/profile) library is provided to allow for easy retrieval of this profile data. By supplying a wallet address, [did](https://did.civic.com/) or (SNS name)[https://naming.bonfida.org/], a user's public civic.me profile data can easily be retrieved.


## Library Usage

Simply import the library and load a user's profile as follows:
```javascript
import { CivicProfile, ProfileResult } from "@civic/profile";

...
// Query using a wallet address, did or SNS name
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

// A civic.me profile headline , if available
profile.headline?.value
```
