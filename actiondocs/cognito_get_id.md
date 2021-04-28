## Get id

This action will generate or retrieve the identity id for a linked cognito user pool.

- **`identitypoolid`**: the app identity pool id. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`accouuntid`**: the aws account id. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`login`**: A set of optional name-value pairs that map provider names to provider tokens. The available provider names for Logins are as follows:

    - Facebook: graph.facebook.com

    - Amazon Cognito user pool: cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>, for example, cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789.

    - Google: accounts.google.com

    - Amazon: www.amazon.com

    - Twitter: api.twitter.com

    - Digits: www.digits.com.
    
    You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

- **`idtoken`**: the id token. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The action returns a JSON result:

```json
{
   "IdentityId": "string"
}
```

Example of usage:

- get identity id for the identity pool *eu_adwxq12d2*

    > `` aws cognito get id: identitypoolid=`eu_adwxq12d2` accountid=`123456` login=`cognito-idp.eu-central-1.amazonaws.com/<$env.USER_POOL_ID$>` idtoken=`zxsaffcwefgbfvadwadaxwxax` ``


References:

[GetId](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_GetId.html)
[Get id](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#get-id)