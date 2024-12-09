# Fastify

Follow these simple steps to set up Civic Auth with a [Fastify](https://fastify.dev/) backend.

## 1. Install dependencies

{% tabs %}
{% tab title="npm" %}
```bash
npm install @civic/auth @fastify/cookie
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @civic/auth @fastify/cookie
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @civic/auth @fastify/cookie
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @civic/auth @fastify/cookie
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
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { CookieStorage } from '@civic/auth/server';

const fastify = Fastify().register(fastifyCookie, {
  secret: "my-secret", // should be changed in production
  parseOptions: {}
})

class FastifyCookieStorage extends CookieStorage {
  constructor(private request: FastifyRequest, private reply: FastifyReply) {
    super();
  }

  async get(key: string): Promise<string | null> {
    return Promise.resolve(this.request.cookies[key] ?? null);
  }

  async set(key: string, value: string): Promise<void> {
    await this.reply.setCookie(key, value, this.settings);
  }
}

// attach an instance of the cookie storage to each request
fastify.decorateRequest('storage', null);
fastify.addHook('preHandler', async (request, reply) => {
  request.storage = new FastifyCookieStorage(request, reply);
});
```

## 4. Create a Login Endpoint

This endpoint will handle login requests,  build the Civic login URL and redirect the user to it.

```typescript
import { buildLoginUrl } from '@civic/auth/server';

fastify.get('/', async (request, reply) => {
  const url = await buildLoginUrl(config, request.storage);

  return reply.redirect(url.toString());
});
```

## 5. Create the Callback Endpoint

This endpoint handles successful logins and creates the session

```typescript
import { resolveOAuthAccessCode } from '@civic/auth/server';

fastify.get<{
  Querystring: { code: string, state: string }
}>('/auth/callback', async (request, reply) => {
  await resolveOAuthAccessCode(request.query.code, request.query.state, request.storage, config);
  reply.redirect('/admin/hello');
});
```

## 6. Add an Authentication Hook

This hook protects routes that require login.

```typescript
import { isLoggedIn } from '@civic/auth/server';

fastify.addHook('preHandler', async (request, reply) => {
  // apply to whichever routes need it
  if (!request.url.includes('/admin')) return;

  const loggedIn = await isLoggedIn(request.storage);
  if (!loggedIn) return reply.status(401).send({ error: 'Unauthorized' });
});
```

## 7. Use the Session

If needed, get the logged-in user information.

```typescript
import { user } from '@civic/auth/server';

fastify.get('/admin/hello', async (request, reply) => {
  const user = await getUser(request.storage);
  return `Hello, ${user?.name}!`;
});
```

## PKCE and Client Secrets

Civic Auth uses [**PKCE** (Proof Key for Code Exchange)](https://oauth.net/2/pkce/), to protect users and clients from unauthorized access to user information. This, alongside domain registration for apps in production environments, mean that you don't need to provide a client secret in your backend.

When using the Civic Auth SDK, PKCE is handled entirely by the library.
