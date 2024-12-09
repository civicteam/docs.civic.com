# Ethereum / EVM

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

## **The useUser hook and U**serContext **Object**

The useUser hook returns a user context object that provides access to the base library's [user object](../integration/react.md#user) in the 'user' field, and adds some Web3 specific fields. The returned object has different types depending on these cases:&#x20;

If the user has a wallet,

```typescript
type ExistingWeb3UserContext = UserContext & {
  walletAddress: "0x..." // the address of the embedded wallet
  wallet: // a Viem WalletClient
}
```

If the user does not yet have a wallet:

```typescript
type NewWeb3UserContext = UserContext & {
  createWallet: () => Promise<void>;
  walletCreationInProgress: boolean;
} 
```

An easy way to distinguish between the two is to use the `userHasWallet` type guard.

## **Using the Wallet**

The CivicAuth Web3 SDK uses [Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/) to expose the embedded wallet to your app, simplifying wallet interactions on both the front end and back end.

* **React Apps**: Civic Auth is optimized for React, with easy access to **Wagmi hooks** for a seamless experience.
* **Non-React Apps**: For non-React frameworks, use **Viem** directly to interact with the wallet.

### **Using the Wallet with Wagmi**

To use the embedded wallet with Wagmi, follow these steps:

{% hint style="info" %}
Ensure you have created the user's wallet first as described [above](ethereum-evm.md#creating-a-wallet).
{% endhint %}

#### **1. Add the Embedded Wallet to Wagmi Config**

Include `embeddedWallet()` in your Wagmi configuration as shown below:

```javascript
import { embeddedWallet } from "@civic/auth-web3";

const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: transports,
  connectors: [
    embeddedWallet(),
  ],
});
```

#### Call `connect`

Initiate the connection to the embedded wallet using Wagmi’s `connect` method.

```javascript
const { connectors, connect } = useConnect();

// connect to the "civic" connector
const connector = connectors[0];
connect(connector);
```

#### **Use Wagmi Hooks**

Once connected, you can use Wagmi hooks to interact with the embedded wallet. Common hooks include:

* `useBalance`: Retrieve the wallet balance.
* `useAccount`: Access account details.
* `useSendTransaction`: Send transactions from the wallet.
* `useSignMessage`: Sign messages with the wallet.

For more detailed documentation on how to use these hooks, see the [Wagmi docs](https://wagmi.sh/react/api/hooks).

### A Full Example

See below for a full minimal example of a Wagmi app using Civic Auth for an embedded wallet. This is based on [this GitHub repository](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth-web3/wagmi) that contains a sample implementation.

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, useAccount, useConnect, useBalance, http } from 'wagmi';
import { embeddedWallet, userHasWallet } from '@civic/auth-web3';
import { CivicAuthProvider, UserButton, useUser } from '@civic/auth-web3/react';
import { mainnet, sepolia } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [ mainnet, sepolia ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    embeddedWallet(),
  ],
});

// Wagmi requires react-query
const queryClient = new QueryClient();

// Wrap the content with the necessary providers to give access to hooks: react-query, wagmi & civic auth provider
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider clientId="< YOUR CLIENT ID >">
          <AppContent />
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

// Separate component for the app content that needs access to hooks
const AppContent = () => {
  // The civic user hook
  const userContext = useUser();

  // Add the wagmi hooks
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const balance = useBalance({
    address: userHasWallet(userContext) ? userContext.walletAddress as `0x${string}`: undefined,
  });

  // A function to connect to an existing civic embedded wallet
  const connectExistingWallet = () => connect({
    connector: connectors[0],
  });

  // A function that creates the wallet if the user doesn't have one already
  const createWallet = () => {
    if (userContext.user && !userHasWallet(userContext)) {
      // Once the wallet is created, we can connect it straight away
      return userContext.createWallet().then(connectExistingWallet)
    }
  }

  return (
    <>
      <UserButton />
      {userContext.user && 
        <div>
          {!userHasWallet(userContext) &&
            <p><button onClick={createWallet}>Create Wallet</button></p>
          }
          {userHasWallet(userContext) && 
            <>
              <p>Wallet address: {userContext.walletAddress}</p>
              <p>Balance: {
                balance?.data
                  ? `${(BigInt(balance.data.value) / BigInt(1e18)).toString()} ${balance.data.symbol}`
                  : 'Loading...'
              }</p>
              {isConnected ? <p>Wallet is connected</p> : (
                <button onClick={connectExistingWallet}>Connect Wallet</button>
              )}
            </>
          }
        </div>
      }
    </>
  );
};

export default App;
```

### **Using the Wallet with Viem**

If you are not using Wagmi, you may also use [Viem](https://viem.sh) directly to access the same wallet capabilities:

```typescript
const userContext  = useUser();

if (userContext.user && userHasWallet(userContext)) {
  const { wallet } = userContext;
  const hash = await wallet.sendTransaction({ 
    to: '0x...',
    value: 1000n
  })
}
```

Full documentation for Viem can be found [here](https://viem.sh/docs/).

#### Using Viem without React

While our SDK is Our SDK is currently being adapted to support other frontend frameworks beyond React.&#x20;

[Contact us](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord) if you have questions about integrating Civic Auth Web3 with a different framework.
