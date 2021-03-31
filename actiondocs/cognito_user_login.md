## User login

This action will sign in the cognito user using username and password flow.

- **`clientid`**: the app client ID. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`username`**: user name. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`password`**: user password. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.

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

- login user *testuser* with password *_12abcdefG*

    > ``aws cognito user login: clientid=`sdaxwa` username=`testuser` password=`_12abcdefG` ``


References:

[InitiateAuth](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html)