# React

## Quick Start

Integrate Civic Auth into your React application with ease, just wrap your app with the Civic Auth provider and add your Client ID (provided after you [sign up](https://auth.civic.com)). A working example is available in our [github examples repo](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth/reactjs).

```typescript
import { CivicAuthProvider, UserButton } from "@civic/auth/react";

function App({ children }) {
  return (
    <CivicAuthProvider clientId="YOUR CLIENT ID">
      <UserButton />
      {children}
    </CivicAuthProvider>
  )
}
```

## Usage

### The User Button

The Civic Auth SDK comes with a multi-purpose styled component called the `UserButton`

```typescript
import { UserButton, CivicAuthProvider } from '@civic/auth/react';

export function TitleBar() {
  return (
    <div className="flex justify-between items-center">
      <h1>My App</h1>
      <UserButton />
    </div>
  );
};

function App({ children }) {
  return (
    <CivicAuthProvider clientId="YOUR CLIENT ID">
      <TitleBar />
    </CivicAuthProvider>
  )
}
```

This component is context-dependent. If the user is logged in, it will show their profile picture and name. If the user is not logged in, it will show a Log In button.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>The user button</p></figcaption></figure>

### Getting User Information on the Frontend

Use the Civic Auth SDK to retrieve user information on the frontend.

```typescript
import { useUser } from '@civic/auth/react';

export function MyComponent() {
  const { user } = useUser();
  
  if (!user) return <div>User not logged in</div>
  
  return <div>Hello { user.name }!</div>
}
```

{% hint style="info" %}
We use `name` as an example here, but you can call any user object property from the user fields schema, as shown [below](react.md#base-user-fields).
{% endhint %}

## Advanced Configuration

Civic Auth is a "low-code" solution, so all configuration takes place via the [dashboard](https://auth.civic.com). Changes you make there will be updated automatically in your integration without any code changes. The only required parameter you need to provide is the client ID.

The integration provides additional run-time settings and hooks that you can use to customize the library's integration with your own app. If you need any of these, you can add them to the CivicAuthProvider as follows:

```typescript
<CivicAuthProvider
  clientId="YOUR CLIENT ID"
  ...other configuration
>
```

See below for the list of all configuration options

<table><thead><tr><th width="115">Field</th><th width="70">Required</th><th width="96">Default</th><th width="251">Example</th><th>Description</th></tr></thead><tbody><tr><td>clientId</td><td>Yes</td><td>-</td><td><code>2cc5633d-2c92-48da-86aa-449634f274b9</code></td><td>The key obtained on signup to <a href="https://auth.civic.com">auth.civic.com</a></td></tr><tr><td>nonce</td><td>No</td><td>-</td><td>1234</td><td>A single-use ID used during login, binding a login token with a given client. Needed in advanced authentication processes only</td></tr><tr><td>onSignIn</td><td>No</td><td>-</td><td><p></p><pre class="language-typescript"><code class="lang-typescript">(error?: Error) => {
  if (error) { 
    // handle error
  } else {
    // handle successful login
  }
}
</code></pre></td><td>A hook that executes after a sign-in attempt, whether successful or not.</td></tr><tr><td>onSignOut</td><td>No</td><td>-</td><td><pre class="language-typescript"><code class="lang-typescript">() => {
  // handle signout
}
</code></pre></td><td>A hook that executes after a user logs out.</td></tr><tr><td>redirectUrl</td><td>No</td><td>currentURL</td><td>/authenticating</td><td>An override for the page that OAuth will redirect to to perform token-exchange. By default Civic will redirect to the current URL and Authentication will be finished by the Civic provider automatically. Only use if you'd like to have some custom display or logic during OAuth token-exchange. The redirect page must have the CivicAuthProvider running in order to finish authentication.</td></tr><tr><td><p></p><p>modalIframe</p></td><td>No</td><td>true</td><td>modalIframe={true}</td><td>Set to <code>true</code> if you want to embed the login iframe in your app rather than opening the iframe in a modal. See <a href="react.md#embedded-login-iframe">Embedded Login Iframe section</a> below.</td></tr></tbody></table>

### Display Mode

The display mode indicates where the Civic  login UI will be displayed. The following display modes are supported:

* `iframe` (default): the UI loads in an iframe that shows in an overlay on top of the existing page content
* `redirect`: the UI redirects the current URL to a Civic login screen, then redirects back to your site when login is complete
* `new_tab`: the UI opens in a new tab or popup window (depending on browser preferences), and after login is complete, the tab or popup closes to return the user to your site

## API

### User Context

The full user context object (provided by `useUser`) looks like this:

<pre class="language-typescript"><code class="lang-typescript"><strong>{ 
</strong>  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (displayMode?: DisplayMode) => Promise&#x3C;void>;
  signOut: () => Promise&#x3C;void>;
}
</code></pre>

### User

The `User` object looks like this:

<pre class="language-typescript"><code class="lang-typescript"><strong>type BaseUser = {
</strong>  id: string;
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  updated_at?: Date;
};

type Tokens = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  forwardedTokens: ForwardedTokens;
};

type User = BaseUser &#x26; Tokens
</code></pre>

Field descriptions:

#### Base User Fields

<table><thead><tr><th width="174">Field</th><th></th></tr></thead><tbody><tr><td>id</td><td>The user's unique ID with respect to your app. You can use this to look up the user in the <a href="https://auth.civic.com/dashboard">dashboard</a>.</td></tr><tr><td>email</td><td>The user's email address</td></tr><tr><td>name</td><td>The user's full name</td></tr><tr><td>given_name</td><td>The user's given name</td></tr><tr><td>family_name</td><td>The user's family name</td></tr><tr><td>updated_at</td><td>The time at which the user's profile was most recently updated.</td></tr></tbody></table>

#### Token Fields

{% hint style="info" %}
Typically developers will not need to interact with the token fields, which are used only for advanced use cases.
{% endhint %}

<table><thead><tr><th width="185">Field</th><th></th></tr></thead><tbody><tr><td>idToken</td><td>The OIDC id token, used to request identity information about the user</td></tr><tr><td>accessToken</td><td>The OAuth 2.0 access token, allowing a client to make API calls to Civic Auth on behalf of the user.</td></tr><tr><td>refreshToken</td><td>The OAuth 2.0 refresh token, allowing a login session to be extended automatically without requiring user interaction. <br>The Civic Auth SDK handles refresh automatically, so you do not need to do this.</td></tr><tr><td>forwardedTokens</td><td>If the user authenticated using SSO (single-sign-on login) with a federated OAuth provider such as Google, this contains the OIDC and OAuth 2.0 tokens from that provider.<br><br></td></tr></tbody></table>

#### Forwarded Tokens

Use forwardedTokens if you need to make requests to the source provider, such as find out provider-specific information.

\
An example would be, if a user logged in via Google, using the Google forwarded token to query the Google Groups that the user is a member of.

For example:

```typescript
const googleAccessToken = user.forwardedTokens?.google?.accessToken;
```

#### Embedded Login Iframe

If you want to have the Login screen open directly on a page without the user having to click on button, you can import the `CivicAuthIframeContainer` component along with the AuthProvider option `modalIframe={false}`&#x20;

You just need to ensure that the `CivicAuthIframeContainer` is a child under a `CivicAuthProvider`

```typescript
import { CivicAuthIframeContainer } from "@civic/auth/react";


const Login = () => {
  return (
      <div class="login-container">
        <CivicAuthIframeContainer />
      </div>
  );
};

const App = () => {
  return (
      <CivicAuthProvider
        clientId={"YOUR CLIENT ID"}
        modalIframe={false}
      >
        <Login />
      </CivicAuthProvider>
  );
}
```