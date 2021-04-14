## Page click

This action will click on any element specified on the page. It can be used for example to click on a button.
The element to click on is specified using XPATH expression. If the element is not found this action will fail.

This action expects a page has been loaded and exist otherwise it will fail.

- `@xpathquery`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Click on a button with the specified XPATH expression

    > `page click //*button[@id='mybutton']`


References:

[Page click](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-click)