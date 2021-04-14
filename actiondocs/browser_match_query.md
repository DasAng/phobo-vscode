## Page queried items contains not,any,all or exact

This action will check if the last queried items contains any, all or exact list of text strings. 

The can be used for example to check if a specific text string is present or if all specified text strings are present or if any of the specified text strings are present.

For example we have queried the elements of a table to get back the text elements:

- bob
- alice
- jack

Now we could use this action to check if bob exists in the queried items, or we could check if bob and alice is present or if bob, alice and jack are all present.

By using the keyword `not`, `any`, `all` or `exact` we can control how we want to match the text strings.

- `not`: must not match any of the specified text strings
- `any` will match any of the text strings we specify
- `all` must match all the text strings we specify
- `exact` must match exact only those text strings we specify

This action will return success if the queried items fullfills the matches required. Order of the text strings are not important.

This action expects a page has been loaded and exist otherwise it will fail.

- `@match`: can either be one of *not*, *any*, *all* or *exact*
- `@values`: a comma separated list of text values. fx *john,bob,alice*

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Expect any one of bob, alice, jack to be present in the last queried elements

    > `page queried items contains any text values: bob,alice,jack`

- Expect all bob, alice, jack to be present in the last queried elements

    > `page queried items contains all text values: bob,alice,jack`

- Expect all last queried elements to have exactly and only the text strings bob, alice, jack in any order

    > `page queried items contains exact text values: bob,alice,jack`

- Expect none of the following text matches *bob,alice,jack*

    > `page queried items contains not text values: bob,alice,jack`


References:

[Page queried items contains not,any,all or exact](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-queried-items-contains-not,any,all-or-exact)