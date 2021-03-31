## Initiate auth

This action will initiates the authentication flow.

- **`authflow`**: the authentication flow for this call to execute. It can be one of the following values:
    - USER_SRP_AUTH
    - REFRESH_TOKEN_AUTH
    - REFRESH_TOKEN
    - CUSTOM_AUTH
    - USER_PASSWORD_AUTH
    - ADMIN_USER_PASSWORD_AUTH
    
    You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`clientid`**: the app client ID. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- `authparameters`: the authentication parameters. These are inputs corresponding to the *authflow* that you are invoking. The required values depend on the value of *authflow*. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- `clientmetadata`: a map of custom key-value pairs that you can provide as input for certain custom workflows that this action triggers. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- `analyticsendpointid`: the Amazon Pinpoint analytics metadata for collecting metrics for InitiateAuth calls. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- `encodeddata`: contextual data such as the user's device fingerprint, IP address, or location used for evaluating the risk of an unexpected event by Amazon Cognito advanced security. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.

The action returns a JSON result:

```json
{
   "AuthenticationResult": { 
      "AccessToken": "string",
      "ExpiresIn": number,
      "IdToken": "string",
      "NewDeviceMetadata": { 
         "DeviceGroupKey": "string",
         "DeviceKey": "string"
      },
      "RefreshToken": "string",
      "TokenType": "string"
   },
   "ChallengeName": "string",
   "ChallengeParameters": { 
      "string" : "string" 
   },
   "Session": "string"
}
```

Example of usage:

- Initiates authentication flow to login user *testuser* with password *_12abcdefG*

    > ``aws cognito initiate auth: authflow=USER_PASSWORD_AUTH clientid=`sdaxwa` authparameters=`{"USERNAME": "testuser", "PASSWORD": "_12abcdefG"}` ``


References:

[InitiateAuth](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html)