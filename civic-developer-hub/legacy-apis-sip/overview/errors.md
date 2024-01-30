# Errors

Civic uses conventional HTTP response codes to indicate the success or failure of an API request. In general, a response code of 2xx indicates the operation was successful. Other error codes indicate either a client error (4xx) or a server error (5xx).

The Civic API uses the following error codes:

| Error Code | Meaning                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| 400        | Bad Request -- Check the response 'message’ field for details.              |
| 401        | Unauthorized -- Authentication failed.                                      |
| 405        | Method Not Allowed -- You tried to access an invalid method.                |
| 429        | Too Many Requests -- Your request was throttled by our gateway.             |
| 500        | Internal Server Error -- We had a problem with our server. Try again later. |
| 504        | Endpoint Request Timed-out Exception.                                       |

