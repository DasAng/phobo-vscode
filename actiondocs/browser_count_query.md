## Page count queried items

This action will count the number of elements last quried by any previous actions like for example `page query`.

The can be used for example to check if a number of elements are present.

This action will return success if the number of elements found are equal to the specified number. Otherwise this action will fail.

This action expects a page has been loaded and exist otherwise it will fail.

- `@count`: number of items to expect

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Expect the last queried items is equal to 5

    > `page count queried items are 5`

References:

[Page count queried items](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-count-queried-items)