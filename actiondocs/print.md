## Print

This action will print the specified message to console.

- **`@text`**: this text to print to console. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.

The result of the action is the message to print.

Example of usage:

- Print *hello world*

    > ``print `hello world` ``

- Print the environment variable *MYVAR*

    > ``print `$env.MYVAR` ``