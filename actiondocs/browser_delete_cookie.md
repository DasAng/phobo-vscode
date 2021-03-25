## Page delete cookie

This action will delete the cookie specified in the name and for the specified domain.

This action expects a page has been loaded and exist otherwise it will fail.

- `@name`: name of cookie
- `@domain`: domain name

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Delete a cookie named *mycookie*

    > `page delete cookie: name=mycookie`

- Delete a cookie named *mycookie* with domain *mydomain*

    > `page delete cookie: name=mycookie domain=mydomain`