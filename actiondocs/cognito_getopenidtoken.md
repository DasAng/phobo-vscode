## Get OpenId token

This action gets an OpenID token, using a known Cognito ID. This known Cognito ID is returned by [GetId](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#get-id) action.

- **`identityid`**: a unique identifier in the format REGION:GUID. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`idtoken`**: the aws account id. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`login`**: a set of optional name-value pairs that map provider names to provider tokens. When using graph.facebook.com and www.amazon.com, supply the access_token returned from the provider's authflow. For accounts.google.com, an Amazon Cognito user pool provider, or any other OpenID Connect provider, always include the **idtoken**. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

- **`idtoken`**: the id token. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The action returns a JSON result:

```json
{
   "IdentityId": "string",
   "Token": "string"
}
```

Example of usage:

- get OpenID token for OpenID connect provider

    > `` aws cognito get openid token: identityid=`eu-central-1:234sxx2-22s2-xsds` login=`cognito-idp.eu-central-1.amazonaws.com/<$env.USER_POOL_ID$>` idtoken=`swswaaxxw23dax2` ``


References:

[GetOpenIdToken](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_GetOpenIdToken.html)
[Get openid token](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#get-openid-token)