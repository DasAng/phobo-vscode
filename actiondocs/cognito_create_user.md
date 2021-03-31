## Create user

This action will create a new user in the specified user pool.

- **`userpoolid`**: the user pool ID for the user pool where the user will be created. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`username`**: the username for the user. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- `desireddeliverymediums`: specify "email" if email will be used to send the welcome message. Specify "sms" if the phone number will be used. Specify "both" if both should be used. This parameter is optional.
- `forcealiascreation`: this parameter is only used if the *phone_number_verified* or *email_verified* attribute is set to **true**. Otherwise, it is ignored.
If this parameter is set to **true** and the phone number or email address specified in the *userattributes* parameter already exists as an alias with a different user, the action call will migrate the alias from the previous user to the newly created user. The previous user will no longer be able to log in using that alias.
If this parameter is set to **false**, the action throws an *AliasExistsException* error if the alias already exists. The default value is **false**. This parameter is optional.
- `messageaction`: set to "resend" to resend the invitation message to a user that already exists and reset the expiration limit on the user's account. Set to "suppress" to suppress sending the message. Only one value can be specified. This parameter is optional
- `temporarypassword`: the user's temporary password. This parameter is optional.
- `userattributes`: an array of name-value pairs that contain user attributes and attribute values to be set for the user to be created. You can create a user without specifying any attributes other than *Username*. For custom attributes, you must prepend the custom: prefix to the attribute name. The format is a JSON object like the following:
    ```json
    UserAttributes: [
        {
        Name: 'STRING_VALUE', /* required */
        Value: 'STRING_VALUE'
        },
        /* more items */
    ]
    ```
    You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter. This parameter is optional.
- `validationdata`: the user's validation data. This is an array of name-value pairs that contain user attributes and attribute values that you can use for custom validation, such as restricting the types of user accounts that can be registered. For example, you might choose to allow or disallow user sign-up based on the user's domain. The format is a JSON object like the following:
    ```json
    ValidationData: [
        {
        Name: 'STRING_VALUE', /* required */
        Value: 'STRING_VALUE'
        },
        /* more items */
    ]
    ```
    You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter. This parameter is optional.

The result of the action is a JSON response looking like the following:

```json
{
    "User": {
        "Username": "STRING",
        "Attributes": [
            {
                "Name": "String",
                "Value": "String"
            }
        ],
        "UserCreateDate ": <Date Representation>, 
        "UserLastModifiedDate ": <Date Representation>, 
        "Enabled ": Boolean, 
        "UserStatus": "String",
        "MFAOptions": [
            {
                "DeliveryMedium": "String",
                "AttributeName": "String"
            }
        ]
    }
}
```
Example of usage:

- Create new user named *bob* in the user pool *myuserpool*

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` ``

- Create new user and set delivery mediums to *email*

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` desireddeliverymediums=email``

- Create new user and set forcealiascreation to *true*

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` forcealiascreation=true``

- Create new user and set messageaction to *suppress*

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` messageaction=suppress``

- Create new user and set temporarypassword to *abcde*

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` temporarypassword=`abcde` ``

- Create new user and set userattributes

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` userattributes=`[{"name": "email", "value": "bob@email.com"}]` ``

- Create new user and set validationdata

    > ``aws cognito create user: userpoolid=`myuserpool` username=`bob` validationdata=`[{"name": "email", "value": "bob@email.com"}]` ``


References:

[AdminCreateUSer](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminCreateUser.html)