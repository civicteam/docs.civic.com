# Error Codes

## OAuth Error Codes

This section describes the error codes that may be encountered during the OAuth authentication flow.

### Error Code Reference

#### UNKNOWN (0x0000)

Indicates an unspecified error condition has occurred. This error is returned when the system encounters an error that doesn't match any other defined error code.

#### MISSING\_CLIENT\_ID (0x0001)

Returned when the OAuth request does not include a client ID parameter. The client ID is required for identifying the application requesting access.

#### MISSING\_REDIRECT\_URI (0x0002)

Returned when the OAuth request does not specify a redirect URI. A valid redirect URI is required to ensure the authorization response is sent to the correct destination.

#### INVALID\_CLIENT\_ID (0x0003)

Returned when the provided client ID is not recognized or has been deactivated. Verify that you are using a valid client ID that has been properly registered.

#### INVALID\_REDIRECT\_URI (0x0004)

Returned when the provided redirect URI doesn't match the pre-registered redirect URIs for the client ID. The redirect URI must exactly match one of the URIs specified during application registration.

#### INVALID\_SCOPES (0x0005)

Returned when one or more requested scopes are invalid or not available for the given client ID. Ensure all requested scopes are valid and that your application has permission to request them.

### Handling Error Responses

The error codes will be displayed on the login screen
