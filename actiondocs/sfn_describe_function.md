## Describe step function

This action will retrive detailed information for a given step function.

- `arn`: the arn of the step function. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.


The result of the action is a JSON response looking like the following:

```json
{
  "stateMachineArn": "arn:aws:states:eu-central-1:111111:stateMachine:mystatemachine",
  "name": "mystatemachine",
  "status": "ACTIVE",
  "definition": "{\n    \"StartAt\": \"Get Parameters\"  }\n    }\n}",
  "roleArn": "arn:aws:iam::11111:role/mystaterole",
  "type": "STANDARD",
  "creationDate": "2020-11-25T13:42:43.537Z",
  "loggingConfiguration": {
    "level": "OFF",
    "includeExecutionData": false
  },
  "tracingConfiguration": {
    "enabled": false
  }
}
```
Example of usage:

- Describe the step function with the arn *arn:aws:states:eu-central-1:111111:stateMachine:mystatemachine*

    > `aws sfn describe function arn=arn:aws:states:eu-central-1:111111:stateMachine:mystatemachine`

References:

[DescribeStatMachine](https://docs.aws.amazon.com/step-functions/latest/apireference/API_DescribeStateMachine.html)