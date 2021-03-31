## Get credentials from configuration file

This action will retrieve the AWS credentials shared init file usually located in the following location:

- The shared credentials file on Linux, Unix, and macOS: ~/.aws/credentials
- he shared credentials file on Windows: C:\Users\USER_NAME\.aws\credentials

You can optionally specify a profile from the configuration file to use.

This action will fail if the environment variables are not found.

- `profilename`: an optional profile name to use. This parameter is optional.


Example of usage:

- Get the AWS credentials from configuration file using default profile:

    > `aws credentials from config`

- Get the AWS credentials from configuration file using specified profile 'myprofile':

    > `aws credentials from config profile=myprofile`