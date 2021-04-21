## Delete user

This action will delete a user in the specified user pool.

- **`userpoolid`**: the user pool ID for the user pool where the user will be deleted. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`username`**: the username of the user to be deleted. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The action does not return any JSON result.

Example of usage:

- Delete user named *bob* in the user pool *myuserpool*

    > ``aws cognito delete user: userpoolid=`myuserpool` username=`bob` ``


References:

[AdminDeleteUSer](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminDeleteUser.html)
[Delete user](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#delete-user)