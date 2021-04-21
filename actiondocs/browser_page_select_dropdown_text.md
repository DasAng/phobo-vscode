## Page select by text dropdown

This action differs from the `page select dropdown` action by matching the text of the displayed option instead of selecting the value directly.

So imagine you have an HTML looking like this:

```html
<select id="language_select">
 <option value="1">English</option>
 <option value="2">Spanish</option>
 <option value="3">German</option>
</select>
```

So if you use this action like the following:

> `page select by text dropdown #language_select : Spanish`

It will attempt to find the option element where the displayed content is equal to *Spanish* and select the value of *2*.

You can select multiple options if is is multi-selected `<select>` element using a comma separated list of values:

> `page select by text dropdown #language_select : Spanish,German`

The items selected will be stored in the HTML report.

This action expects a page has been loaded and exist otherwise it will fail.

- `@cssquery`: a CSS query
- `@value`: the value to select

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Select the dropdown with the CSS query #select_language and the value Spanish

    > `page select dropdown #select_language : Spanish`

- If select is a multi-select element then you can select multiple values using comma separated list:

    > `page select dropdown #select_language : Spanish,German`


References:

[Page select by text dropdown](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-select-by-text-dropdown)