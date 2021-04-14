## List step functions

This action will list all existing step functions.

- `maxresults`: sets the maximum number of functions returned in the response. By default the API returns up to 100 functions. The maximum value is 1000. The response might contain fewer objects but will never contain more. This parameter is optional
- `fetchall`:  this value can either be *true* or *false*. If true then all objects will be fetched if not it will fetch only the specified objects up to the specified *maxresults* or 1000. This parameter is optional.

The result of the action is a JSON response looking like the following:

```json
{
    "stateMachines": [
        {
            "stateMachineArn": "arn:aws:states:eu-central-1:111111111:stateMachine:mystatemachine",
            "name": "mystatemachine",
            "type": "STANDARD",
            "creationDate": "2020-11-25T13:42:43.537Z"
        },
        {
            "stateMachineArn": "arn:aws:states:eu-central-1:1111111:stateMachine:mystatemachine2",
            "name": "mystatemachine2",
            "type": "STANDARD",
            "creationDate": "2020-11-25T13:42:43.747Z"
        },
    ]
}
```

Example of usage:

- List all step functions with default up to max 100

    > `aws sfn list functions`

- List up to max 2 step functions 

    > `aws sfn list functions maxresults=2`

- List up to max 2 step functions per call but retrieve all functions

    > `aws sfn list functions maxresults=2 fetchall=true`

- List all step functions

    > `aws sfn list functions fetchall=true`

References:

[ListStateMachines](https://docs.aws.amazon.com/step-functions/latest/apireference/API_ListStateMachines.html)
[List step functions](https://github.com/DasAng/phobo-release/blob/master/docs/aws_stepfunctions_actions.md#list-step-functions)