## Select

This action will use an JMESPath query to search and select values from the last saved JSON object from any actions that produced a JSON response.
This could for example be a call to `aws ssm get paramter` or some other actions.

A full comprehensive tutorial on JMESPath is out of scope for this documenation but you can find good tutorials for example here https://jmespath.org/tutorial.html.

- `<query>`: the jmespath query

The matching is case insensitive and can appear anywhere within the sentence.

Example of usage:

- Select *foo.bar* from the last saved result

    > jmespath select foo.bar 