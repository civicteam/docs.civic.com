# Remix

## Quick Start

Integrate Civic Auth into your Remix application using the following steps (a working example is available in our [github examples repo](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth/remix)):

{% hint style="info" %}
This guide assumes you are using TypeScript. Please adjust the snippets as needed to remove the types if you are using plain JS.
{% endhint %}

{% hint style="info" %}
If you plan to use Web3 features, select "Auth + Web3" from the tabs below.
{% endhint %}

### **1. Setup Environment Variables**

Create a `.env` file in your project root with the following variables:

```env
CIVIC_CLIENT_ID=your_civic_client_id
SESSION_SECRET=some_secure_random_string
```

### **2. Setup Root Loader**

This is where you give your app the Client ID provided when you sign up at [auth.civic.com](https://auth.civic.com).

{% tabs %}
{% tab title="Auth" %}
{% code title="app/root.tsx" %}

```typescript
import { createRootAuthLoader } from "@civic/auth/remix";

export const loader = createRootAuthLoader({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});
```

{% endcode %}
{% endtab %}

{% tab title="Auth + Web3" %}
{% code title="app/root.tsx" %}

```typescript
import { createRootAuthLoader } from "@civic/auth-web3/remix";

export const loader = createRootAuthLoader({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});
```

{% endcode %}
{% endtab %}
{% endtabs %}

### **3. Setup Auth Routes**

Create a catch-all route to handle authentication flows:

{% tabs %}
{% tab title="Auth" %}
{% code title="app/routes/auth.$.tsx" %}

```typescript
import { createRouteHandlers } from "@civic/auth/remix";

const handlers = createRouteHandlers({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});

export async function loader({ request, params }) {
  const authPath = params["*"];

  switch (authPath) {
    case "challenge":
      return handlers.loginLoader({ request });
    case "callback":
      return handlers.callbackLoader({ request });
    case "refresh":
      return handlers.refreshLoader({ request });
    case "logout":
      return handlers.logoutLoader({ request });
    default:
      return handlers.logoutLoader({ request });
  }
}
```

{% endcode %}
{% endtab %}

{% tab title="Auth + Web3" %}
{% code title="app/routes/auth.$.tsx" %}

```typescript
import { createRouteHandlers } from "@civic/auth-web3/remix";

const handlers = createRouteHandlers({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});

export async function loader({ request, params }) {
  const authPath = params["*"];

  switch (authPath) {
    case "challenge":
      return handlers.loginLoader({ request });
    case "callback":
      return handlers.callbackLoader({ request });
    case "refresh":
      return handlers.refreshLoader({ request });
    case "logout":
      return handlers.logoutLoader({ request });
    default:
      return handlers.logoutLoader({ request });
  }
}
```

{% endcode %}
{% endtab %}
{% endtabs %}

### **4. Protect Routes**

Use the auth middleware to protect routes that require authentication:

{% tabs %}
{% tab title="Auth" %}
{% code title="app/routes/protected.tsx" %}

```typescript
import { createAuthMiddleware } from "@civic/auth/remix";

export const loader = createAuthMiddleware({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});

export default function ProtectedRoute() {
  const { user } = useLoaderData<typeof loader>();
  return <div>Welcome, {user.name}!</div>;
}
```

{% endcode %}
{% endtab %}

{% tab title="Auth + Web3" %}
{% code title="app/routes/protected.tsx" %}

```typescript
import { createAuthMiddleware } from "@civic/auth-web3/remix";

export const loader = createAuthMiddleware({
  clientId: process.env.CIVIC_CLIENT_ID,
  // ... other config options
});

export default function ProtectedRoute() {
  const { user } = useLoaderData<typeof loader>();
  return <div>Welcome, {user.name}!</div>;
}
```

{% endcode %}
{% endtab %}
{% endtabs %}

## Usage

### Getting User Information in Components

Use the `useAuth` hook and `AuthButton` component in your React components:

{% tabs %}
{% tab title="Auth" %}
{% code title="app/components/SomeComponent.tsx" %}

```typescript
import { useAuth, AuthButton } from "@civic/auth/remix";

export function SomeComponent() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      {isLoggedIn ? <p>Welcome, {user.name}!</p> : <p>Please sign in</p>}
      <AuthButton />
    </div>
  );
}
```

{% endcode %}
{% endtab %}

{% tab title="Auth + Web3" %}
{% code title="app/components/SomeComponent.tsx" %}

```typescript
import { useAuth, AuthButton } from "@civic/auth-web3/remix";

export function SomeComponent() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      {isLoggedIn ? <p>Welcome, {user.name}!</p> : <p>Please sign in</p>}
      <AuthButton />
    </div>
  );
}
```

{% endcode %}
{% endtab %}
{% endtabs %}

### Getting User Information in Loaders

Retrieve user information in your route loaders using the `getUser` function:

{% tabs %}
{% tab title="Auth" %}

```typescript
import { getUser } from "@civic/auth/remix";

export async function loader({ request }) {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  return json({ user });
}
```

{% endtab %}

{% tab title="Auth + Web3" %}

```typescript
import { getUser } from "@civic/auth-web3/remix";

export async function loader({ request }) {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  return json({ user });
}
```

{% endtab %}
{% endtabs %}

## Advanced Configuration

Civic Auth is a "low-code" solution, so most of the configuration takes place via the [dashboard](https://auth.civic.com). Changes you make there will be updated automatically in your integration without any code changes. The only required parameter you need to provide is the client ID.

The integration also offers the ability to customize the library according to the needs of your Remix app. You can do so by passing configuration options to the various functions:

{% tabs %}
{% tab title="Auth" %}
{% code title="auth.config.ts" %}

```typescript
import type { AuthConfig } from "@civic/auth/remix";

export const authConfig: AuthConfig = {
  clientId: process.env.CIVIC_CLIENT_ID,
  oauthServer: "https://auth.civic.com",
  callbackUrl: "/auth/callback",
  loginUrl: "/",
  logoutUrl: "/",
  refreshUrl: "/auth/refresh",
  logoutCallbackUrl: "/",
  scope: "openid profile email",
  logging: {
    level: "info",
  },
};
```

{% endcode %}
{% endtab %}

{% tab title="Auth + Web3" %}
{% code title="auth.config.ts" %}

```typescript
import type { AuthConfig } from "@civic/auth-web3/remix";

export const authConfig: AuthConfig = {
  clientId: process.env.CIVIC_CLIENT_ID,
  oauthServer: "https://auth.civic.com",
  callbackUrl: "/auth/callback",
  loginUrl: "/",
  logoutUrl: "/",
  refreshUrl: "/auth/refresh",
  logoutCallbackUrl: "/",
  scope: "openid profile email",
  logging: {
    level: "info",
  },
};
```

{% endcode %}
{% endtab %}
{% endtabs %}

Here are the available configuration options:

<table><thead><tr><th width="133">Field</th><th width="100">Required</th><th width="171">Default</th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>clientId</td><td>Yes</td><td>-</td><td><code>2cc5633d-2c92-48da-86aa-449634f274b9</code></td><td>The key obtained on signup to <a href="https://auth.civic.com">auth.civic.com</a></td></tr><tr><td>oauthServer</td><td>No</td><td>https://auth.civic.com</td><td>https://custom-auth.civic.com</td><td>The URL of the OAuth server</td></tr><tr><td>callbackUrl</td><td>No</td><td>/auth/callback</td><td>/api/myroute/callback</td><td>The path that the auth-server redirects to after SSO login is complete</td></tr><tr><td>loginUrl</td><td>No</td><td>/</td><td>/admin</td><td>The path your user will be sent to if they access a resource that needs them to be logged in</td></tr><tr><td>logoutUrl</td><td>No</td><td>/</td><td>/goodbye</td><td>The path your user will be sent to after a successful log-out</td></tr><tr><td>refreshUrl</td><td>No</td><td>/auth/refresh</td><td>/api/auth/refresh</td><td>The path that handles token refresh requests</td></tr><tr><td>logoutCallbackUrl</td><td>No</td><td>/</td><td>/goodbye</td><td>The path your user will be sent to after a successful log-out</td></tr><tr><td>scope</td><td>No</td><td>openid profile email</td><td>openid profile email custom_scope</td><td>The OAuth scopes to request during authentication</td></tr><tr><td>logging</td><td>No</td><td>{ level: "info" }</td><td>{ level: "debug" }</td><td>Configuration for logging levels</td></tr></tbody></table>

This documentation follows the same structure as the Next.js documentation while being specific to Remix's patterns and conventions. It includes all the necessary steps for integration, usage examples, and configuration options. The documentation is split into tabs for regular auth and Web3 auth, making it easy for users to follow the appropriate path for their needs.
