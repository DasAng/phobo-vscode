## Var

This action will create a local variable internally that can be referred and used by other actions. This variable must have a unique name.
The value of the variable can be any type, string, number, boolean or JSON object.

- **`name`**: name of variable to create. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.
- **`value`**: value of variable. The value can be of the following types:
    - string
    - number
    - boolean
    - JSON obejct
    
    You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The result of the action is the value of the variable.

Example of usage:

- Create a variable named *bob* with JSON value *{"name": "bob"}*

    > ``var bob={"name": "bob"} ``

- Create a variable named *age* with value of 10

    > ``var age=10 `` 

- Create a variable named *todos* with an array of *["shopping", "studying"]*

    > ``var todos=["shopping","studying"] ``


References:

[Variable](https://github.com/DasAng/phobo-release/blob/master/docs/misc_actions.md#var)