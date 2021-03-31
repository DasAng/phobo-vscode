## Export

This action will set the environment variable to the specified value.

- **`@name`**: name of environment variable to set. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`@value`**: value of environment variable to set. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.

The result of the action is the value of the environment variable.

Example of usage:

- Set environment variable named *MYVAR* to the value *hello*

    > ``export MYVAR=hello ``