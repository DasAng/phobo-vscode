## Page select dropdown

This action will select a value from a dropdown or in HTML a `<select>` element. You will need to specify a CSS query selector to find the HTML `<select>` element and then you will specify the value of the HTML `<option>` element to select.

So for example if you have a HTML like the following:

```html
<select id="language_select">
 <option value="1">English</option>
 <option value="2">Spanish</option>
 <option value="3">German</option>
</select>
```

you can use the action to select the option *Spanish* like so:

> `page select doprdown #language_select : 2

You can select multiple options if is is multi-selected `<select>` element using a comma separated list of values:

> `page select doprdown #language_select : 2,3

The items selected will be stored in the HTML report.

This action expects a page has been loaded and exist otherwise it will fail.

- `@cssquery`: a CSS query
- `@value`: the value to select

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Select the dropdown with the CSS query #select_language and the value of 1

    > `page select dropdown #select_language : 1`

- If select is a multi-select element then you can select multiple values using comma separated list:

    > `page select dropdown #select_language : 1,2`


References:

[Page select dropdown](https://github.com/DasAng/phobo-release/blob/master/docs/browser_actions.md#page-select-dropdown)