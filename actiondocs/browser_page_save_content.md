## Page save content

This action will save the HTML content of the page to a file on disk.

This action expects a page has been loaded and exist otherwise it will fail.

- `@filePath`: the file to save on disk. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter.

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Saves the HTML content of the page to a file named myfile.html

    > `page save content myfile.html`


References:

[Page type](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-save-content)