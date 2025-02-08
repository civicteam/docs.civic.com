# Solana

{% hint style="warning" %}

**Coming Soon**

The Civic Auth Solana implementation is available only for our early-access customers at present.

Furthermore, the below API is subject to change as we continue to develop and refine our solution.

If you’re interested in using Civic Auth Web3 on Solana, please [contact us](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord) and we'll keep you informed.

{% endhint %}

## Creating a Wallet

When a new user logs in, they do not yet have a Web3 wallet by default. You can create a wallet for them by calling the `createWallet` function on the user object. Here’s a basic example:

```javascript
import { userHasWallet } from "@civic/auth-web3";
import { useUser } from '@civic/auth-web3/react';

export const afterLogin = async () => {
  const userContext = await useUser();

  if (userContext.user && !userHasWallet(userContext)) {
    await userContext.createWallet();
  }
};
```

## **The useUser hook and UserContext Object**

The useUser hook returns a user context object that provides access to the base library's [user object](../integration/react.md#user) in the 'user' field, and adds some Web3 specific fields. The returned object has different types depending on these cases:&#x20;

If the user has a wallet,

```typescript
type ExistingWeb3UserContext = UserContext & {
  sol: {
    address: string // the base58 public key of the embedded wallet
    wallet: Wallet // a Solana Wallet object
  } 
}
```

The wallet object follows the interface used by [Solana's Wallet Adapter](https://www.npmjs.com/package/@solana/wallet-adapter-react).

If the user does not yet have a wallet:

```typescript
type NewWeb3UserContext = UserContext & {
  createWallet: () => Promise<void>;
  walletCreationInProgress: boolean;
} 
```

An easy way to distinguish between the two is to use the `userHasWallet` type guard.

```typescript
if (userHasWallet(userContext)) {
  user.sol.wallet; // user has a wallet
} else {
  user.createWallet();// user does not have a wallet
}
```

## Using the Wallet

### Sending a transaction

```typescript
const connection = new Connection(/* your rpc endpoint */);  
const { publicKey, sendTransaction } = user.wallet.solana;

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: new PublicKey(recipient),
    lamports: 1000000,
  })
);
const signature = await sendTransaction(transaction, connection);
```

### Checking the balance

```typescript
const connection = new Connection(/* your rpc endpoint */);
const { publicKey } = user.sol.wallet;
const balance = await connection.getBalance(publicKey);
```

## Using the Wallet with the Solana Wallet Adapter

The Civic Auth Web3 SDK uses the [Solana Wallet Adapter](https://www.npmjs.com/package/@solana/wallet-adapter-react) to expose the embedded wallet to React frontends.
This allows you to use familiar hooks such as `useWallet` and `useConnection` to interact with the wallet.

Make sure to follow the steps described [here](https://solana.com/developers/cookbook/wallets/connect-wallet-react) (React) and [here](https://solana.com/developers/guides/wallets/add-solana-wallet-adapter-to-nextjs) (Next.Js)
to get started with the Solana Wallet Adapter.

The Civic Auth Web3 SDK follows the [wallet standard](https://github.com/wallet-standard/wallet-standard?tab=readme-ov-file),
meaning that the Solana Wallet Adapter will automatically discover the embedded wallet.

Set up the Solana Wallet Adapter as shown below:

```tsx
export const Providers: FC = () => {
    const endpoint = "YOUR RPC ENDPOINT";
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    { /* Your app's components go here */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
```

### A Full Example

See below for a full minimal example of a Solana Adapter app using Civic Auth for an embedded wallet. This is based on [this GitHub repository](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth-web3/Solana Adapter) that contains a sample implementation.

```tsx
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import { embeddedWallet, userHasWallet } from '@civic/auth-web3';
import { CivicAuthProvider, UserButton, useUser } from '@civic/auth-web3/react';
import { mainnet, sepolia } from "Solana Adapter/chains";

// Wrap the content with the necessary providers to give access to hooks: react-query, Solana Adapter & civic auth provider
const App = () => {
    const endpoint = "YOUR RPC ENDPOINT";
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <AppContent/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

// A simple hook to get the wallet SOL balance
const useBalance = (): number | null => {
    const [balance, setBalance] = useState<number | null>(null);
    // The Solana Wallet Adapter hooks
    const connection = useConnection();
    const { publicKey } = useWallet();
    connection.getBalance(publicKey).then(setBalance);
    return balance;
};

// Separate component for the app content that needs access to hooks
const AppContent = () => {
  // The civic user hook
  const userContext = useUser();
  // Get the Solana wallet balance
  const balance = useBalance();

  return (
    <>
      <UserButton />
      {userContext.user && 
        <div>
          {userHasWallet(userContext) && 
            <>
              <p>Wallet address: {userContext.sol.wallet}</p>
              <p>Balance: {
                balance
                  ? `${balance / 1e9} SOL`
                  : 'Loading...'
              }</p>
            </>
          }
        </div>
      }
    </>
  );
};

export default App;
```
