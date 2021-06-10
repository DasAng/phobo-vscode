## Page iframe click

This action will click on any element specified on the iframe. It can be used for example to click on a button inside an iframe.
The element to click on is specified using XPATH expression. If the element is not found this action will fail.

This action expects a page has been loaded and exist otherwise it will fail.

- `@iframeQuery`: a CSS query string to find the iframe
- `@query`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Click on a button inside the iframe with id "frame-epv":

    > `page iframe=`iframe[id="frame-epv"]` click //*button[@id='mybutton']`


References:

[Page iframe click](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-iframe-click)