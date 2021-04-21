## Page reload

This action will reload the current page. A timeout value can be specified to wait for a period of time after the reload.

All network requests will be captured during the reload of the page and stored in the HTML report.

This action expects a page has been loaded and exist otherwise it will fail.

- `@timeout`: an optional timeout value in milliseconds

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Reload page

    > `page reload`

- Reload page and set timeout to 5000ms

    > `page reload timeout=5000`

References:

[Page reload](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-reload)