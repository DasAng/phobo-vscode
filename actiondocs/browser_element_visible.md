## Page element is visible or hidden

This action will check if the specified element(s) on the page is visible or hidden. Hidden can also mean that the element is not found on the page.

Use the keyword `visible` to check if the element(s) is visible and if it is the action will return success otherwise it will fail.

Use the keyword `hidden` to check if the element(s) is hidden or not found on the page. If the element(s) is found then the action will fail.

To find the element you will need to use an XPATH query.

This action expects a page has been loaded and exist otherwise it will fail.

- `@visible`: can be either *visible* or *hidden*
- `@xpathquery`: an XPATH query

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Check if element(s) is visible using specified XPATH query

    > `page element is visible : //*div/li/a[1]`

- Check if element(s) is hidden using specified XPATH query

    > `page element is hidden : //*div/li/a[1]`