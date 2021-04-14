## Page set value

This action will set the specified value of any element on the page. To find the element you will need to specify an XPATH expression.

The value to set needs to be specified in double quotes, but the double quotes will be removed before setting in the value.

This action expects a page has been loaded and exist otherwise it will fail.

- `@text`: the text value to set
- `@xpathquery`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Set the value *hello world* into an input element

    > `page set value "hello world" //*input[@id='myinput']`


References:

[Page set value](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-set-value)