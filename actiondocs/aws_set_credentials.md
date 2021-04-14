## Set credentials

This action will set the AWS credentials to the specified values.

This action will fail if the credentials are empty.

- **`aws_access_key`**: the aws access key to set
- **`aws_secret_access_key`**: the aws secret key to set
- `session_token`: an optional session token value to set

Example of usage:

- Set the aws access key and secret key, but not session token:

    > `aws credentials: accesskey=AIBSZWDF secretkey=/sdasds#xa12dsad`

- Set the aws access key, secret key and session token:

    > `aws credentials: accesskey=AIBSZWDF secretkey=/sdasds#xa12dsad sessiontoken=|sdadasdsdsad%sad2`

References:

[Set credentials](https://github.com/DasAng/phobo-release/blob/master/docs/aws_credentials_actions.md#set-credentials)