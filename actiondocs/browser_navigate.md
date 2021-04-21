## Navigate to url

Navigate to a specific url. You must specify the url to navigate to. You can specify an optional timeout value to wait for the page to load.
If the page failed to load within the timeout period then it will still count as a successfull action. The timeout value is used to ensure that the page gets enough time to finish it's requests and load it's content. If you don't specify a timeout value the default timeout value of 5000ms will be used.

All network requests will be captured within the timeout period and will be displayed in the HTML report.

This action will fail if you have not already launched a browser with the action `a new browser` see [Launch browser](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#launch-browser)

- `@url`: url to navigate to
- `@timeout`: an optional timeout value in milliseconds to wait for the page to load

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Navigate to a url using default timeout value of 5000ms

  > `navigate to https://google.com`

- Set timeout value to 10000ms

   > `navigate to https://google.com timeout=10000`
  

References:

[Navigate to url](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#navigate-to-url)