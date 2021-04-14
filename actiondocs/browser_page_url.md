## Page url like

This action will check if the page url contains the specified url.

It can for example be used to ensure that we have loaded the correct url.

This action will return success if the page url contains the specified url, otherwise it will fail.

This action expects a page has been loaded and exist otherwise it will fail.

- `@url`: a url or partial part of url to match

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Expect the url to be https://google.com

    > `page url like https://google.com`

- Expect the url to contain the string ?query=10&name=bob

    > `page url like ?query=10&name=bob`


References:

[Page url like](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-url-like)