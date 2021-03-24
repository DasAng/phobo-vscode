## Get credentials from environment

This action will retrieve the AWS credentials from environment variables. The environment variables expected are:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

This action will fail if the environment variables are not found.

Example of usage:

- Get the AWS credentials from environment variables

    > `aws credentials from environment`