## Delete users when finished

This action will make sure thats users created in the scenario with the action `aws cognito create user` will be deleted at the end of the scenario regardless whether the scenario runs successfully or failed. This can be used for example to clean up all the users created in the scenario.

The action does not return any result.

Example of usage:

- Delete all users when the scenario finished regardless or any steps that failed

    > `delete cognito users when finished`


References:

[Delete users when finished](https://github.com/DasAng/phobo-release/blob/master/docs/aws_cognito_actions.md#delete-users-when-finished)