## Page iframe query

This action will find the specified element or elements inside an iframe.

The can be used if for example you want to find certain elements inside an iframe. The items found will be saved in an internal list of queried items and can be used by other actions to check on them.

Items found will also be displayed in the HTML report.

This action expects a page has been loaded and exist otherwise it will fail.

- `@iframeQuery`: a CSS query string to find the iframe
- `@query`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Find all elements inside the iframe with id "frame-epv"

    > `page iframe=`iframe[id="frame-epv"]` query /li/ul`


References:

[Page iframe query](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page--iframe-query)