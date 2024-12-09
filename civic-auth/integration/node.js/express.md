# Express

Follow these simple steps to set up Civic Auth with an [Express](https://expressjs.com/) backend (a working example is available in our [github examples repo](https://github.com/civicteam/civic-auth-examples/tree/main/packages/civic-auth/server/express)).

## 1. Install dependencies

{% tabs %}
{% tab title="npm" %}
```bash
npm install @civic/auth cookies-parser
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @civic/auth cookies-parser
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @civic/auth cookies-parser
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @civic/auth cookies-parser
```
{% endtab %}
{% endtabs %}

## 2. Configure your App

Your app will need the following configuration:

```typescript
const config = {
  clientId: // Client ID from auth.civic.com
  redirectUrl: `http://localhost:3000/auth/callback` // change to your domain when deploying
};
```

## 3. Set up Cookies

Civic Auth uses cookies for storing the login state by default

```typescript
import express, { Request, Response } from 'express';
import { CookieStorage } from '@civic/auth/server';
import cookieParser from 'cookie-parser';

app.use(cookieParser());

// Tell Civic how to get cookies from your node server
class ExpressCookieStorage extends CookieStorage {
  constructor(private req: Request, private res: Response) {
    super({
      secure: false
    })
  }

  async get(key: string): Promise<string | null> {
    return Promise.resolve(this.req.cookies[key] ?? null);
  }

  async set(key: string, value: string): Promise<void> {
    await this.res.cookie(key, value, this.settings);
  }
}

app.use((req, res, next) => {
  // add an instance of the cookie storage to each request
  req.storage = new ExpressCookieStorage(req, res);
  next();
});
```

## 4. Create a Login Endpoint

This endpoint will handle login requests,  build the Civic login URL and redirect the user to it.

```typescript
import { buildLoginUrl } from '@civic/auth/server';

app.get('/', async (req: Request, res: Response) => {
  const url = await buildLoginUrl(config, req.storage);

  res.redirect(url.toString());
});
```

## 5. Create the Callback Endpoint

This endpoint handles successful logins and creates the session

```typescript
import { resolveOAuthAccessCode } from '@civic/auth/server';

app.get('/auth/callback', async (req: Request, res: Response) => {
  const { code, state } = req.query as { code: string; state: string };

  await resolveOAuthAccessCode(code, state, req.storage, config);
  res.redirect('/admin/hello');
});
```

## 6. Add Middleware

Middleware protects routes that require login.

```typescript
import { isLoggedIn } from '@civic/auth/server';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!(await isLoggedIn(req.storage))) return res.status(401).send('Unauthorized');
  next();
};

// Apply authentication middleware to any routes that need it
app.use('/admin', authMiddleware);
```

## 7. Use the Session

If needed, get the logged-in user information.

```typescript
import { user } from '@civic/auth/server';

app.get('/admin/hello', async (req: Request, res: Response) => {
  const user = await getUser(req.storage);
  res.send(`Hello, ${user?.name}!`);
});
```

## PKCE and Client Secrets

Civic Auth uses [**PKCE** (Proof Key for Code Exchange)](https://oauth.net/2/pkce/), to protect users and clients from unauthorized access to user information. This, alongside domain registration for apps in production environments, mean that you don't need to provide a client secret in your backend.

When using the Civic Auth SDK, PKCE is handled entirely by the library.
