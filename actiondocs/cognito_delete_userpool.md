## Delete userpool

This action will delete a userpool

- **`userpoolid`**: the user pool ID for the user pool where the user will be deleted. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The action does not return any JSON result.

Example of usage:

- Delete userpool with id *eu_central_1_sdsd*

    > ``aws cognito delete userpool: userpoolid=`eu_central_1_sdsd` ``


References:

[DeleteUserPool](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_DeleteUserPool.html)
[Delete userpool](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#delete-userpool)