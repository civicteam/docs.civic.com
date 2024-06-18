# User PII Retrieval

For certain Civic Pass types where the user has to supply a document or email address, such evidence items will be made available to you for approval or rejection prior to pass issuance.&#x20;

As the user reaches the end of the Civic Pass data collection flow, including authorizing the collection of their PII, they will land on a screen informing them that their request is in "partner review". This serves as the interjection point where you will be able to view, inspect and decide on the outcome of the pass issuance request.

## Retrieving PII Evidence

The Gatekeeper Context will communicate a new presentation request ID when the user reaches the end of the data collection flow. See [<mark style="color:purple;">here</mark>](ui-integration/ui-modal/) for more detail on the use of `GatewayProvider` and `useGateway` .

```typescriptreact
const { pendingRequests } = useGateway();
```

`pendingRequests?.presentationRequestId` will be the identifier referred to by REQUEST\_ID in the snippets below.

### High-level overview

1. Retrieve an access token from the Civic auth endpoint
2. Retrieve PII for a specific request ID from the Civic Pass Partner API
3. Inspect the user-provided evidence and decide it it meets the requirements
4. Mark the request ID as pass or fail

### 1. Retrieve an access token

During onboarding you will be supplied a token URL, client ID and client secret. Use these to retrieve an access token.

**Request**

```
POST TOKEN_URL 
Body:
{
  "client_id": "{{ _.clientId }}",
  "client_secret": "{{ _.clientSecret }}",
  "audience": "https://api.civic.com/pass",
  "grant_type": "client_credentials"
}
```

**Response**

```
{
  "access_token": "ey...",
  "scope": "partner:admin update:pass issue:pass search:pass create:gkn update:gkn createWithId:gkn get:pii put:piirequest",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

### 2. Retrieve PII

Use the access token from step 1 to retrieve the evidence items for a specific request.

**Request**

```
GET https://api.civic.com/partner/piirequest/REQUEST_ID
Headers:
{
  "Authorization": "Bearer AUTH_TOKEN"
}
```

**Response**

```
{
  "id": "abc123",
  "type": "gatekeeperProofOfIdentityWithIdDocument-v3",
  "status": "verification-success",
  "links": [
      {
        "rel": "self",
        "href": "https://api.civic.com/partner/piirequest/abc123"
      },
      {
        "rel": "idDocumentFront",
        "href": "https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentFront"
      },
      {
        "rel": "idDocumentBack",
        "href": "https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentBack"
      },
      {
    ],
  "verifiedInformation": {
    "issueCountry": "GBR",
    "name": "John Smith",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01",
    "dateOfExpiry": "2031-05-28",
    "documentType": "passport",
    "documentNumber": "999999999",
    "address": "CoaMuXCeNuiFNZIWQoHL32ojbJNmU19Nu6P4z9T1EFAa",
    "accountId": "did:sol:CoaMuXCeNuiFNZIWQoHL32ojbJNmU19Nu6P4z9T1EFAa"
  }
}
```

### 3. Inspect PII evidence and decide on an outcome

In the response from 2 will be an email, data items extracted from the scanned document, as well as an array containing urls for images of the captured document front and, optionally, back. Use the URL from the array to retrieve the specific image.

**Request**

```
GET https://api.civic.com/partner/piirequest/abc123/evidence/idDocumentFront
Headers:
{
  "Authorization": "Bearer AUTH_TOKEN"
}
```

### 4. Mark the request as pass or fail

After inspecting the user-provided data and images in step 3, inform Civic that the pass should issued or rejected. Civic expects a status of either `partner-pass` or `partner-fail`

**Request**

```
PUT https://api.civic.com/partner/piirequest/REQUEST_ID/status
Headers:
{
  "Content-Type": "application/json"
  "Authorization": "Bearer AUTH_TOKEN"
}
Body:
{
  "status": "partner-pass"
}
```









