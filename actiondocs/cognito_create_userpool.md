## Create userpool

This action will create a new userpool.

- **`poolname`**: the name of the userpool. You can use an [Intrinsic expression](#intrinsic_expression.md) for this parameter.
- **`docstring`**: you can pass additional options as a json object in **docstring**. The complete option format looks like the following:

    ```json
    """
    {
        "AccountRecoverySetting": { 
            "RecoveryMechanisms": [ 
                { 
                    "Name": "string",
                    "Priority": number
                }
            ]
        },
        "AdminCreateUserConfig": { 
            "AllowAdminCreateUserOnly": boolean,
            "InviteMessageTemplate": { 
                "EmailMessage": "string",
                "EmailSubject": "string",
                "SMSMessage": "string"
            },
            "UnusedAccountValidityDays": number
        },
        "AliasAttributes": [ "string" ],
        "AutoVerifiedAttributes": [ "string" ],
        "DeviceConfiguration": { 
            "ChallengeRequiredOnNewDevice": boolean,
            "DeviceOnlyRememberedOnUserPrompt": boolean
        },
        "EmailConfiguration": { 
            "ConfigurationSet": "string",
            "EmailSendingAccount": "string",
            "From": "string",
            "ReplyToEmailAddress": "string",
            "SourceArn": "string"
        },
        "EmailVerificationMessage": "string",
        "EmailVerificationSubject": "string",
        "LambdaConfig": { 
            "CreateAuthChallenge": "string",
            "CustomEmailSender": { 
                "LambdaArn": "string",
                "LambdaVersion": "string"
            },
            "CustomMessage": "string",
            "CustomSMSSender": { 
                "LambdaArn": "string",
                "LambdaVersion": "string"
            },
            "DefineAuthChallenge": "string",
            "KMSKeyID": "string",
            "PostAuthentication": "string",
            "PostConfirmation": "string",
            "PreAuthentication": "string",
            "PreSignUp": "string",
            "PreTokenGeneration": "string",
            "UserMigration": "string",
            "VerifyAuthChallengeResponse": "string"
        },
        "MfaConfiguration": "string",
        "Policies": { 
            "PasswordPolicy": { 
                "MinimumLength": number,
                "RequireLowercase": boolean,
                "RequireNumbers": boolean,
                "RequireSymbols": boolean,
                "RequireUppercase": boolean,
                "TemporaryPasswordValidityDays": number
            }
        },
        "PoolName": "string",
        "Schema": [ 
            { 
                "AttributeDataType": "string",
                "DeveloperOnlyAttribute": boolean,
                "Mutable": boolean,
                "Name": "string",
                "NumberAttributeConstraints": { 
                    "MaxValue": "string",
                    "MinValue": "string"
                },
                "Required": boolean,
                "StringAttributeConstraints": { 
                    "MaxLength": "string",
                    "MinLength": "string"
                }
            }
        ],
        "SmsAuthenticationMessage": "string",
        "SmsConfiguration": { 
            "ExternalId": "string",
            "SnsCallerArn": "string"
        },
        "SmsVerificationMessage": "string",
        "UsernameAttributes": [ "string" ],
        "UsernameConfiguration": { 
            "CaseSensitive": boolean
        },
        "UserPoolAddOns": { 
            "AdvancedSecurityMode": "string"
        },
        "UserPoolTags": { 
            "string" : "string" 
        },
        "VerificationMessageTemplate": { 
            "DefaultEmailOption": "string",
            "EmailMessage": "string",
            "EmailMessageByLink": "string",
            "EmailSubject": "string",
            "EmailSubjectByLink": "string",
            "SmsMessage": "string"
        }
    }
    """
    ```
    See [CreateUserPool](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPool.html) for further explanation of all the fields.


The result of the action is a JSON response looking like the following:

```json
{
    "AccountRecoverySetting": { 
         "RecoveryMechanisms": [ 
            { 
               "Name": "string",
               "Priority": number
            }
         ]
      },
      "AdminCreateUserConfig": { 
         "AllowAdminCreateUserOnly": boolean,
         "InviteMessageTemplate": { 
            "EmailMessage": "string",
            "EmailSubject": "string",
            "SMSMessage": "string"
         },
         "UnusedAccountValidityDays": number
      },
      "AliasAttributes": [ "string" ],
      "Arn": "string",
      "AutoVerifiedAttributes": [ "string" ],
      "CreationDate": number,
      "CustomDomain": "string",
      "DeviceConfiguration": { 
         "ChallengeRequiredOnNewDevice": boolean,
         "DeviceOnlyRememberedOnUserPrompt": boolean
      },
      "Domain": "string",
      "EmailConfiguration": { 
         "ConfigurationSet": "string",
         "EmailSendingAccount": "string",
         "From": "string",
         "ReplyToEmailAddress": "string",
         "SourceArn": "string"
      },
      "EmailConfigurationFailure": "string",
      "EmailVerificationMessage": "string",
      "EmailVerificationSubject": "string",
      "EstimatedNumberOfUsers": number,
      "Id": "string",
      "LambdaConfig": { 
         "CreateAuthChallenge": "string",
         "CustomEmailSender": { 
            "LambdaArn": "string",
            "LambdaVersion": "string"
         },
         "CustomMessage": "string",
         "CustomSMSSender": { 
            "LambdaArn": "string",
            "LambdaVersion": "string"
         },
         "DefineAuthChallenge": "string",
         "KMSKeyID": "string",
         "PostAuthentication": "string",
         "PostConfirmation": "string",
         "PreAuthentication": "string",
         "PreSignUp": "string",
         "PreTokenGeneration": "string",
         "UserMigration": "string",
         "VerifyAuthChallengeResponse": "string"
      },
      "LastModifiedDate": number,
      "MfaConfiguration": "string",
      "Name": "string",
      "Policies": { 
         "PasswordPolicy": { 
            "MinimumLength": number,
            "RequireLowercase": boolean,
            "RequireNumbers": boolean,
            "RequireSymbols": boolean,
            "RequireUppercase": boolean,
            "TemporaryPasswordValidityDays": number
         }
      },
      "SchemaAttributes": [ 
         { 
            "AttributeDataType": "string",
            "DeveloperOnlyAttribute": boolean,
            "Mutable": boolean,
            "Name": "string",
            "NumberAttributeConstraints": { 
               "MaxValue": "string",
               "MinValue": "string"
            },
            "Required": boolean,
            "StringAttributeConstraints": { 
               "MaxLength": "string",
               "MinLength": "string"
            }
         }
      ],
      "SmsAuthenticationMessage": "string",
      "SmsConfiguration": { 
         "ExternalId": "string",
         "SnsCallerArn": "string"
      },
      "SmsConfigurationFailure": "string",
      "SmsVerificationMessage": "string",
      "Status": "string",
      "UsernameAttributes": [ "string" ],
      "UsernameConfiguration": { 
         "CaseSensitive": boolean
      },
      "UserPoolAddOns": { 
         "AdvancedSecurityMode": "string"
      },
      "UserPoolTags": { 
         "string" : "string" 
      },
      "VerificationMessageTemplate": { 
         "DefaultEmailOption": "string",
         "EmailMessage": "string",
         "EmailMessageByLink": "string",
         "EmailSubject": "string",
         "EmailSubjectByLink": "string",
         "SmsMessage": "string"
      }
   }
}
```
Example of usage:

- Create new userpool named *mytestpool* with no additional options:

    > ``aws cognito create userpool: poolname=`mytestpool`  ``  
    > """  
    > {}  
    > """

- Create new userpool named *mytestpool* with password policies:

    > ``aws cognito create userpool: poolname=`mytestpool`  ``  
    > """  
    > {  
    >    "Policies": {  
    >       "PasswordPolicy": {  
    >            "MinimumLength": 5,  
    >            "RequireLowercase": true,  
    >            "RequireNumbers": false,  
    >            "RequireSymbols": false,  
    >            "RequireUppercase": false,  
    >            "TemporaryPasswordValidityDays": 10  
    >     } } }  
    > }    
    > """

References:

[CreateUserPool](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPool.html)