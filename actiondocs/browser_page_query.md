## Page query

This action will find the specified element or elements using an XPATH expression.

The can be used if for example you want to find certain elements on the page. The items found will be saved in an internal list of queried items and can be used by other actions to check on them.

Items found will also be displayed in the HTML report.

This action expects a page has been loaded and exist otherwise it will fail.

- `@xpathquery`: an XPATH query string

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Find all elements on the page using the specified XPATH

    > `page query  /li/ul`