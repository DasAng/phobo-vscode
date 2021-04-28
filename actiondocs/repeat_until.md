## Repeat until

This action will continue to repeat a specified action until a specified condition has been met.

The action to repeat is specified inside a docstring and must be one of the avaialable Phobo actions. This action will be repeated up to a maximum specified number of times and if a condition has been fullfilled then it will stop. The condition is also another Phobo action that is specified inside a docstring.

The way the condition checking is working is that the action for the condition is performed and if no assertion or exceptions occured then the condition is considered fullfilled and the repeat stops. Otherwise the action is repeated and the condition is checked again until the max number of repeat has been reached.

During each repeat the action will wait for the specified interval in milliseconds before attempting again.

- **`@interval`**: this parameter is required and is the wait interval in milliseconds between each repeated call
- **`@count`**: this parameter is required and is the maximum number of repeat to perform before giving up.
- **`@action`**: this parameter is inside a docstring and specifies the actual action to repeat. eg. it must be one of the valid Phobo actions available.
- **`@condition`**: this parameter is inside a docstring and specified the actual condition that must be met. It must be one of the valid Phobo actions available.
- **`@actionContent`**: this parameter is inside a docstring. This parameter is optional and can be used to pass additioanl content as a docstring to the action specified in `action`.
- **`@conditionContent`**: this parameter is inside a docstring. This parameter is optional and can be used to pass additioanl content as a docstring to the action specified in `condition`.

The result of the action is any value returned by the repeated action

Example of usage:

- Call the action *aws ssm get parameter /test* repeatedly for maximum 2 times with interval of 5 seconds. Until the condition specified by the action *jmespath match* has been met

    > Then repeat until interval=5000 count=2  
    > """  
    > action=aws ssm get parameter /test  
    > condition=jmespath match Parameter.{Name:Name,Type:Type,Value:Value,Version:Version,ARN:ARN,DataType:DataType}  
    > conditionContent={ "Name": "/test", "Type": "String", "Value": "test", "Version": 1,"ARN": "arn:aws:ssm:eu-central-1:362168270949:parameter/test","DataType":"text"}  
    > """  

References:

[Repeat until](https://github.com/DasAng/phobo-release/blob/master/docs/condition_actions.md#repeat-until)