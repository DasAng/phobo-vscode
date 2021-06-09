## Get caller identity

This action will Returns details about the IAM user or role whose credentials are used to call the operation.

The reponse JSON will have the following structure:

```json
{
    "UserId": "AIDASAMPLEUSERID",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/DevAdmin"
}
```

Example of usage:

- get identity of current IAM user

    > ``aws sts get caller identity ``

References:

[GetCallerIdentity](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetCallerIdentity.html)
[Get caller identity](https://github.com/DasAng/phobo-release/blob/master/docs/aws_sts_actions.md#get-caller-identity)