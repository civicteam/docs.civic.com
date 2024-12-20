# Other

Civic Auth can be integrated into other environments using any OIDC or OAuth 2.0-compliant client libraries.

The information you will need:

* Auth Server URL: `https://auth.civic.com/oauth`
* Client ID: Provided on sign-up at [auth.civic.com](https://auth.civic.com)
* Scopes: `openid,email,profile`

## **The Civic Auth Server**

At its core, Civic Auth is an [OAuth 2.0 auth server](https://oauth.net/2/). It supports the [authorization code](https://oauth.net/2/grant-types/authorization-code/) grant type with [PKCE](https://oauth.net/2/pkce/).&#x20;

{% hint style="info" %}
If you are looking for other OAuth 2 grant types, we'd like to [hear from you](https://discord.com/invite/MWmhXauJw8/?referrer=home-discord).
{% endhint %}

### Sample Call to the OAuth Server

To trigger a login process, simply call the oauth server as follows:

```
https://auth.civic.com/oauth
    ?response_type=code
    &client_id={clientId}
    &redirect_uri={redirectUri}
    &scope=openid,email,profile
    &state={state}
    &code_challenge={codeChallenge}
    &code_challenge_method=S256
```

#### **Query Parameters:**

* `client_id`: Your application's unique identifier provided by CivicAuth.
* `redirect_uri`: The URL to which users should be redirected after authentication.
* `scope`: The permissions your application is requesting (e.g., `email`, `profile`, `openid`).
* `state`: A random string to maintain state between the request and callback.
* `code_challenge`: A code challenge derived from the code verifier for PKCE.

{% hint style="info" %}
Civic Auth requires the use of **PKCE** (Proof Key for Code Exchange), so the`code_challenge` parameter is obligatory. For more information, see [PKCE (Proof Key for Code Exchange)](https://oauth.net/2/pkce/).
{% endhint %}

### Example

See below for an example of using Civic Auth with a third-party library: [OAuth 4 WebAPI](https://github.com/panva/oauth4webapi)

<details>

<summary>Sample code</summary>

{% code title="index.html" %}
```html
<!DOCTYPE html>
<html>
<body>
<button id="login" disabled onclick='location.href=authURL'>login</button>
<div id="information"></div>
</body>

<script>

const libraryCDN = "https://cdn.jsdelivr.net/npm/oauth4webapi@2.10.3/+esm"
const openIdConnectUrl = new URL('https://auth.civic.com/oauth');
const clientId = 'YOUR CLIENT ID';
const redirectUri = 'https://localhost:3000';
const scope = 'openid';

const buttonEl = document.querySelector('#login')
const informationEl = document.querySelector('#information')

var authURL = ''
let as
let codeVerified

import(libraryCDN).then((oauth) => {
  const client = {
    client_id: clientId,
    token_endpoint_auth_method: 'none', 
  }
  async function discover(){
    as = await oauth
      .discoveryRequest(openIdConnectUrl, { algorithm: 'oidc' })
      .then((response) => oauth.processDiscoveryResponse(openIdConnectUrl, response))
    if (currentURL.searchParams.get('code')) {
      codeVerified = sessionStorage.getItem("code_verifier" )
      getInfo()
    }

    const code_challenge_method = 'S256'
    const code_verifier = oauth.generateRandomCodeVerifier()
    sessionStorage.setItem("code_verifier", code_verifier)
    const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier)

    const authorizationUrl = new URL(as.authorization_endpoint)
    authorizationUrl.searchParams.set('client_id', clientId)
    authorizationUrl.searchParams.set('redirect_uri', redirectUri)
    authorizationUrl.searchParams.set('response_type', 'code')
    authorizationUrl.searchParams.set('scope', scope)
    authorizationUrl.searchParams.set('code_challenge', code_challenge)
    authorizationUrl.searchParams.set('code_challenge_method', code_challenge_method)
    
    authURL = authorizationUrl.href
  }
  
  discover()
  async function getInfo(){
    const currentUrl = new URL(location.href)
    const params = oauth.validateAuthResponse(as, client, currentUrl)
    
    if (oauth.isOAuth2Error(params)) {
      throw new Error() // Handle OAuth 2.0 redirect error
    }

    const response = await oauth.authorizationCodeGrantRequest(
      as,
      client,
      params,
      redirectUri,
      codeVerified,
    )
    const result = await oauth.processAuthorizationCodeOpenIDResponse(as, client, response )

    const { access_token } = result
    const claims = oauth.getValidatedIdTokenClaims(result)

    const { sub } = claims;

    const responseInfo = await oauth.userInfoRequest(as, client, access_token)

    const resultInfo = await oauth.processUserInfoResponse(as, client, sub, responseInfo)
    informationEl.innerText = 'Welcome '+resultInfo.preferred_username+' ('+resultInfo.name+')'
  }
})

</script>

</html>
```
{% endcode %}

</details>

## Usage

The **Civic Auth SDK** is designed to simplify front-end integration, with optimized support for **React** and **Next.js**. However, if your frontend uses another framework, you can still retrieve user information after login by inspecting the ID token.

The ID token is produced after completing the login process. A common pattern is for your backend to pass that token to your frontend as a cookie.

Here’s an example of how to access user information in vanilla JavaScript by reading the ID token cookie:

```typescript
import jwt from 'jsonwebtoken';

function getUserFromToken() {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('id_token='));

  if (!cookie) return null;

  const token = cookie.split('=')[1];
  return jwt.decode(token);
}

const user = getUserFromToken();
console.log(user); // Log user info or use it in your app
```