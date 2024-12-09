# Node.JS

The Civic Auth SDK also works with any Node.js backend. The core integration points here are as follows:

* Direct users to the Civic Auth login page
* Set up an endpoint that the auth server should redirect to once complete
* Set up middleware to ensure only logged-in users can access protected parts of your app.

Use these guides to set up Civic Auth with any of the most common Node.js server libraries.

<table data-view="cards"><thead><tr><th align="center"></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center">Express   </td><td></td><td></td><td><a href="../../.gitbook/assets/cropped-express.png">cropped-express.png</a></td><td><a href="./#express">#express</a></td></tr><tr><td align="center">Hono</td><td></td><td></td><td><a href="../../.gitbook/assets/cropped-hono.png">cropped-hono.png</a></td><td><a href="hono.md">hono.md</a></td></tr><tr><td align="center">Fastify</td><td></td><td></td><td><a href="../../.gitbook/assets/cropped-fastify.png">cropped-fastify.png</a></td><td><a href="fastify.md">fastify.md</a></td></tr></tbody></table>

## Usage

Civic Auth SDK is optimized for React and Next.js. However, some features are usable in other JS environments. For example, the `getUser` function verifies and parses the user information stored in the id\_token cookie and makes it available to your app.

### Getting User Information on the Backend

Here are some examples of using the getUser function in popular Node.JS server environments. Note - this snippet assumes you have followed the steps to integrate login with your app as described [here](./).

{% tabs %}
{% tab title="Express" %}
```typescript
import { getUser } from '@civic/auth/server';

app.get('/admin/hello', async (req, res) => {
  const user = await getUser(req.storage);
  res.send(`hello ${user.name}!`);
});
```
{% endtab %}

{% tab title="Hono" %}
```typescript
import { getUser } from '@civic/auth/server';

app.get('/admin/hello', async (c) => {
  const user = await getUser(c.storage);
  return c.text(`hello ${user.name}!`);
});
```
{% endtab %}

{% tab title="Fastify" %}
```typescript
import { getUser } from '@civic/auth/server';

fastify.get('/admin/hello', async (request, reply) => {
  const user = await getUser(request.storage);
  reply.send(`hello ${user.name}!`);
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
The `name` property is used as an example here, check out the [React Usage page](../react.md#usage) to see the entire basic user object structure.&#x20;
{% endhint %}
