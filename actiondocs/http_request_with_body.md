## Http request with body

This action will perform a HTTP/HTTPS request to the specified url. You can specify a JSON data for the request body.

- **`@method`**: this parameter is required and specifies the request method. It can be one of the following:
    - get
    - head
    - options
    - delete
    - post
    - put
    - patch
- **`@url`**: this parameter is required and is url to retrieve data. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter
- **`@headers`**: this parameter is optional. Specify the headers to use with the request. The format for specifying headers must be a comma separated name value pair like so:
    
    \<name>:\<value>

    For example:

    > headers=\`content-type:application/json,content-length:1024`
- **`@body`**: this parameter is required and is specified in a docstring. The JSON data to send in the body of the request. You can use an [Intrinsic expression](https://github.com/DasAng/phobo-release/blob/master/docs/intrinsic_expression.md) for this parameter

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

- Make a HTTP post request for https://myapi.com/users/ with body *{"age": 10}*

    > http with body post \`https://myapi.com/users/\`  
    > """  
    > {"age": 10}  
    > 

References:

[Http request with body](https://github.com/DasAng/phobo-release/blob/master/docs/request_actions.md#http-request-with-body)