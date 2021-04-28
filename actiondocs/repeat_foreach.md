## Repeat for each

This action will loop through the specified array and repeat the specified action.

The action to repeat is specified inside a docstring and must be one of the avaialable Phobo actions. This action will be repeated  for each item in the specified array.

- **`items`**: this parameter is required and is the array of items to loop through.
- **`action`**: this parameter is inside a docstring and specifies the actual action to repeat. eg. it must be one of the valid Phobo actions available.
- **`actionContent`**: this parameter is inside a docstring. This parameter is optional and can be used to pass additioanl content as a docstring to the action specified in `action`.

The result of the action is any value returned by the repeated action

Example of usage:

- loop through the array *[1,2,3,4,5]* and print the values

    > Then repeat for each items=`[1,2,3,4,5]`
    > """  
    > action=print `<$result>`
    > """ 

- loop through the result of a previous action stored inside the field *Items* and match if all the fields *active* inside the items array is set to 1 

    > Then repeat for each items=`<$jmes.Items$>`
    > """  
    > action=jmespath match active
    > actionContent=1
    > """ 

References:

[Repeat for each](https://github.com/DasAng/phobo-release/blob/master/docs/condition_actions.md#repeat-for-each)