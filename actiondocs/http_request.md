## Http request

This action will perform a HTTP/HTTPS request to the specified url.

- **`@method`**: this parameter is required and specifies the request method. It can be one of the following:
    - get
    - head
    - options
    - delete
- **`@url`**: this parameter is required and is url to retrieve data. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter
- **`@headers`**: this parameter is optional. Specify the headers to use with the request. The format for specifying headers must be a comma separated name value pair like so:
    
    \<name>:\<value>

    For example:

    > headers=\`content-type:application/json,content-length:1024`

The result of the action is a JSON value of the following form:

```json
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},
}
```

Example of usage:

- Make a HTTP get request for https://myapi.com/users/ 

    > http get \`https://myapi.com/users/\`

- Make a HTTP get request for https://myapi.com/users/ and set headers

    > http get \`https://myapi.com/users/\` headers=\`content-type:application/json,content-length:1024\`

- Make a HTTP head request for https://myapi.com/users/ 

    > http head \`https://myapi.com/users/\`

- Make a HTTP delete request for https://myapi.com/users/ 

    > http delete \`https://myapi.com/users/\`

- Make a HTTP options request for https://myapi.com/users/ 

    > http options \`https://myapi.com/users/\`

References:

[Http request](https://github.com/DasAng/phobo-release/blob/master/docs/request_actions.md#http-request)