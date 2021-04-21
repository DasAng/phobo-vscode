## Set user password

This action will delete set the password for a cognito user

- **`userpoolid`**: the user pool ID wher the user is located in. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`username`**: the user name. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`password`**: the password for the user. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`permanent`**: *true* if the password is permanent, *false* if it is temporary

The action does not return any JSON result.

Example of usage:

- Set the password to *abcd* for the user named *bob* in the userpool *eu_central_1_sdsd*

    > ``aws cognito set user password: userpoolid=`eu_central_1_sdsd` username=`bob` password=`abcd` permanent=true ``


References:

[AdminSetUserPassword](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminSetUserPassword.html)
[Set user password](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#set-user-password)