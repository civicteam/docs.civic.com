# Hono

Follow these simple steps to set up Civic Auth with a [Hono](https://hono.dev/) backend (a working example is available in our [github examples repo](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth/server/hono)).

## 1. Install dependencies

{% tabs %}
{% tab title="npm" %}
```bash
npm install @civic/auth
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @civic/auth
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @civic/auth
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @civic/auth
```
{% endtab %}
{% endtabs %}

## 2. Configure your App

Your app will need the following configuration:

```typescript
const config = {
  clientId: // Client ID from auth.civic.com
  redirectUrl: 'http://localhost:3000/auth/callback', // change to your domain when deploying
  postLogoutRedirectUrl: 'http://localhost:3000/' // The postLogoutRedirectUrl is the URL where the user will be redirected after successfully logging out from Civic's auth server.
};
```

Note: `redirectUrl` and `postLogoutRedirectUrl` must be absolute URLs.

## 3. Set up Cookies

Civic Auth uses cookies for storing the login state by default

```typescript
import { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { CookieStorage } from '@civic/auth/server';

class HonoCookieStorage extends CookieStorage {
  constructor(private c: Context) {
    super();
  }

  async get(key: string) {
    return getCookie(this.c, key) ?? null;
  }

  async set(key: string, value: string): void {
    setCookie(this.c, key, value);
  }
}

// Middleware to attach CookieStorage to each request
app.use('*', async (c, next) => {
  const storage = new HonoCookieStorage(c)
  c.set('storage', storage);
  return next();
});
```

## 4. Create a Login Endpoint

This endpoint will handle login requests,  build the Civic login URL and redirect the user to it.

```typescript
import { buildLoginUrl } from '@civic/auth/server';

app.get('/', async (c) => {
  const url = await buildLoginUrl(config, c.get('storage'));

  return c.redirect(url.toString());
});
```

## 5. Create the Callback Endpoint

This endpoint handles successful logins and creates the session

```typescript
import { resolveOAuthAccessCode } from '@civic/auth/server';

app.get('/auth/callback', async (c) => {
  const code = c.req.query('code') as string
  const state = c.req.query('state') as string

  await resolveOAuthAccessCode(code, state, c.get('storage'), config);
  return c.redirect('/admin/hello');
});
```

## 6. Create a Logout Endpoint

This endpoint will handle logout requests, build the Civic logout URL and redirect the user to it.

```typescript
import { buildLogoutRedirectUrl } from '@civic/auth/server';

app.get('/auth/logout', async (req: Request, res: Response) => {
  const url = await buildLogoutRedirectUrl(config, req.storage);
  res.redirect(url.toString());
});
```

## 7. Add Middleware

Middleware protects routes that require login.

```typescript
import { isLoggedIn } from '@civic/auth/server';

// Apply authentication middleware to any routes that need it
app.use('/admin/*', async (c, next) => {
  if (!isLoggedIn(c.get('storage'))) return c.text('Unauthorized', 401);

  return next();
});
```

## 8. Use the Session

If needed, get the logged-in user information.

```typescript
import { user } from '@civic/auth/server';

app.get('/admin/hello', async (c) => {
  const user = await getUser(c.get('storage'));
  return c.text(`Hello, ${user?.name}!`);
});
```

## PKCE and Client Secrets

Civic Auth uses [**PKCE** (Proof Key for Code Exchange)](https://oauth.net/2/pkce/), to protect users and clients from unauthorized access to user information. This, alongside domain registration for apps in production environments, mean that you don't need to provide a client secret in your backend.

When using the Civic Auth SDK, PKCE is handled entirely by the library.
