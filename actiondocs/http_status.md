## Http status

This action will check if a previous http response has the specified status code. If the status code does not match then this action will fail.

- **`@status`**: this parameter is required is the status code to expect.

This action returns null

Example of usage:

- Check if last HTTP response has status code 200

    > http status 200

References:

[Http status](https://github.com/DasAng/phobo-release/blob/master/docs/request_actions.md#http-status)