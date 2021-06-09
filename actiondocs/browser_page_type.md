## Page type

This action will type the specified text into any element on the page that can accept input. To find the element you will need to specify an XPATH expression.

The text to type needs to be specified in double quotes, but the double quotes will be removed before typing in the text.

This action expects a page has been loaded and exist otherwise it will fail.

- `@text`: the text value to enter. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter
- `@xpathquery`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Type the word *hello world* into an input element

    > `page type "hello world" //*input[@id='myinput']`


References:

[Page type](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-type)