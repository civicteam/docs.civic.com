# Next.JS

## Quick Start

Integrate Civic Auth into your Next.js application using the following steps (a working example is available in our [github examples repo](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth/nextjs)):

### **1. Add the Civic Auth Plugin**

This is where you give your app the Client ID provided when you sign up at [auth.civic.com](https://auth.civic.com).

The defaults should work out of the box for most customers, but if you want to configure your app, see [below](next.js.md#configuration) for details.

<pre class="language-typescript" data-title="next.config.js"><code class="lang-typescript"><strong>import { createCivicAuthPlugin } from "@civic/auth/nextjs"
</strong>import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: 'YOUR CLIENT ID'
});

export default withCivicAuth(nextConfig)
</code></pre>

### **2. Create an API Route**

This is where your app will handle login and logout requests.

Create this file at the following path:

`src/app/api/auth/[...civicauth]/route.ts`

{% code title="route.ts" %}
```typescript
import { handler } from '@civic/auth/nextjs'

export const GET = handler()
```
{% endcode %}

{% hint style="info" %}
These steps apply to the [App Router](https://nextjs.org/docs/app). If you are using the Pages Router, please [contact us](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord) for integration steps.
{% endhint %}

### **3. Middleware**

Middleware is used to protect your backend routes, server components and server actions from unauthenticated requests.&#x20;

Using the Civic Auth middleware ensures that only logged-in users have access to secure parts of your service.

{% code title="src/middleware.ts" %}
```typescript
import { authMiddleware } from '@civic/auth/nextjs/middleware'

export default authMiddleware()

export const config = {
  // include the paths you wish to secure here
  matcher: [ '/api/:path*', '/admin/:path*'  ] 
}
```
{% endcode %}

#### Middleware Chaining

If you are already using middleware in your Next.js app, then you can chain them with Civic Auth as follows:

{% code title="src/middleware.ts" %}
```typescript
import { auth } from '@civic/auth/nextjs'
import { NextRequest, NextResponse } from "next/server";

const withCivicAuth = auth()

const otherMiddleware = (request: NextRequest) => {
    console.log('my middleware')
    return NextResponse.next()
}

export default withCivicAuth(otherMiddleware)
```
{% endcode %}

### **4. Frontend Integration**

Add the Civic Auth context to your app to give your frontend access to the logged-in user.

```javascript
import { CivicAuthProvider } from "@civic/auth/nextjs";

function Layout({ children }) {
  return (
    // ... the rest of your app layout
    <CivicAuthProvider>
      {children}
    </CivicAuthProvider>
  )
}
```

{% hint style="info" %}
Unlike the pure [React](react.md) integration, you do _not_ have to add your client ID again here!
{% endhint %}

## Usage

### Getting User Information on the Frontend

[Next.JS client components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) can use the Civic Auth React tools to obtain user information as well as display convenient login, and logout buttons. See the [React Usage page](react.md) for details.

### Getting User Information on the Backend

Retrieve user information on backend code, such as in React Server Components, React Server Actions, or api routes using `getUser`:

```typescript
import { getUser } from '@civic/auth/nextjs';

const user = await getUser();
```

For example, in a NextJS Server Component:

```typescript
import { getUser } from '@civic/auth/nextjs';

export async function MyServerComponent() {
  const user = await getUser();
  
  if (!user) return <div>User not logged in</div>
  
  return <div>Hello { user.name }!</div>
}
```

{% hint style="info" %}
The `name` property is used as an example here, check out the [React Usage page](react.md) to see the entire basic user object structure.&#x20;
{% endhint %}

## Advanced Configuration

Civic Auth is a "low-code" solution, so most of the configuration takes place via the [dashboard](https://auth.civic.com). Changes you make there will be updated automatically in your integration without any code changes. The only required parameter you need to provide is the client ID.

The integration also offers the ability customize the library according to the needs of your Next.js app. For example, to restrict authentication checks to specific pages and routes in your app. You can do so inside `next.config.js` as follows:

```typescript
const withCivicAuth = createCivicAuthPlugin({
  clientId: 'YOUR CLIENT ID'
  ...other config
});

export default withCivicAuth(nextConfig) // your next config here
```

Here are the available configuration options:

<table><thead><tr><th width="133">Field</th><th width="100">Required</th><th width="171">Default</th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>clientId</td><td>Yes</td><td>-</td><td><code>2cc5633d-2c92-48da-86aa-449634f274b9</code></td><td>The key obtained on signup to <a href="https://auth.civic.com">auth.civic.com</a></td></tr><tr><td>callbackUrl</td><td>No</td><td>/api/auth/callback</td><td>/api/myroute/callback</td><td>The path to route the browser to after a succesful login. Set this value if you are hosting your civic auth API route somewhere other than the default recommended <a href="next.js.md#create-an-api-route">above</a>.</td></tr><tr><td>loginUrl</td><td>No</td><td>/</td><td>/admin</td><td>The path your user will be sent to if they access a resource that needs them to be logged in. If you have a dedicated login page, you can set it here.</td></tr><tr><td>logoutUrl</td><td>No</td><td>/</td><td>/goodbye</td><td>The path your user will be sent to after a successful log-out.</td></tr><tr><td>include</td><td>No</td><td>['/*']</td><td><p>[</p><p> '/admin/*', '/api/admin/*'</p><p>]</p></td><td>An array of path <a href="https://man7.org/linux/man-pages/man7/glob.7.html">globs</a> that require a user to be logged-in to access. If not set, will include all paths matched by your Next.js <a href="next.js.md#middleware">middleware</a>.</td></tr><tr><td>exclude</td><td>No</td><td>-</td><td>['public/home']</td><td>An array of path <a href="https://man7.org/linux/man-pages/man7/glob.7.html">globs</a> that are excluded from the Civic Auth <a href="next.js.md#middleware">middleware</a>. In some cases, it might be easier and safer to specify exceptions rather than keep an inclusion list up to date.</td></tr></tbody></table>
