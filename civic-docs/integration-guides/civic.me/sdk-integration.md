# SDK Integration

{% hint style="success" %}
Use Cases

* Utilize addresses to gain access to rich profile information
* Check for Civic Passes - Provides verification properties of addresses such as age check, uniqueness, ID document verification, and [<mark style="color:orange;">KYC</mark>](https://www.civic.com/blog/are-you-looking-for-a-kyc-aml-solution-for-your-dapp/).
{% endhint %}

\
Use the rich profile information to personalize your user's experience:

<figure><img src="../../.gitbook/assets/realms-example.png" alt=""><figcaption></figcaption></figure>

### Loading the Profile Data <a href="#loading-the-profile" id="loading-the-profile"></a>

Import the [<mark style="color:orange;">SDK</mark>](https://www.npmjs.com/package/@civic/profile) and load a profile as follows:

```javascript
import { CivicProfile, Profile } from "@civic/profile";

...
// Query a user's profile using a wallet address, did or .sol domain
const profile: Profile = await CivicProfile.get(user);
```

The profile result will contain the following data:

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

### Getting a list of Civic Passes for a Wallet <a href="#getting-a-list-of-civic-passes" id="getting-a-list-of-civic-passes"></a>

This returns a list of Civic passes owned by the profile's keys.

{% tabs %}
{% tab title="Solana" %}
```
// A Solana Connection is required in order to query for passes. Public devnet used as an example here:
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { CivicProfile, Profile, GatewayToken } from "@civic/profile";

const solanaConnection: Connection =  new Connection(clusterApiUrl("devnet"));
const profile: Profile = await CivicProfile.get(user, { solana: { connection }});

const passes: GatewayToken[] = await profile.getPasses();
```

By default, multiple pass types are queried. A blockchain RPC call is made for each combination of public key & pass type. The list of pass types to query can be overridden. A pass type is represented by its corresponding Gatekeeper Network address.

```
const passes: GatewayToken[] = await profile.getPasses(["ni1jXzPTq1yTqo67tUmVgnp22b1qGAAZCtPmHtskqYG"]);
```
{% endtab %}

{% tab title="Ethereum + EVMs" %}
```
// An Ethereum Connection is required in order to query for passes. Public devnet used as an example here:
import { getDefaultProvider } from "@ethersproject/providers";
import { CivicProfile, Profile, GatewayToken } from "@civic/profile";

const provider = getDefaultProvider();
const profile: Profile = await CivicProfile.get(user, { ethereum: { connection }});

const passes: GatewayToken[] = await profile.getPasses();
```

By default, multiple pass types are queried. A blockchain RPC call is made for each combination of pass types. The list of pass types to query can be overridden. A pass type is represented by its corresponding Gatekeeper Network address.

### Supported Gateway Token Types <a href="#getting-a-list-of-associated-public-keys" id="getting-a-list-of-associated-public-keys"></a>

Depending on the Gateway Token it can either be a token from Solana or an EVM supported chain. The token has the following properties which are different between chains.

```
type BaseGatewayToken = {
  readonly issuingGatekeeper: string;
  readonly gatekeeperNetworkAddress: string;
  readonly owner: string;
  readonly state: string;
  readonly expiration?: number;
  readonly chain: Chain;
};

type EthereumTokenMetadata = {
  readonly tokenId: number;
  readonly chainId: number;
  readonly bitmask: number;
  readonly tokenURI?: string;
  readonly contractAddress: string;
};

type SolanaTokenMetadata = {
  readonly tokenAddress: string;
  readonly programId: string;
};

export type SolanaGatewayToken = BaseGatewayToken & SolanaTokenMetadata;
export type EthereumGatewayToken = BaseGatewayToken & EthereumTokenMetadata;
export type GatewayToken = SolanaGatewayToken | EthereumGatewayToken;    
```
{% endtab %}
{% endtabs %}
