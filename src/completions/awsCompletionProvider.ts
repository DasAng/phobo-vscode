import * as vscode from 'vscode';
import { 
    AWSGetCredentialsConfigDescription,
    AWSGetCredentialsEnvironmentDescription,
    AWSSetCredentialsDescription,
    AWSSetRegionDescription,
    CognitoCreateUserDescription, 
    CognitoCreateUserPoolDescription, 
    CognitoDeleteUserDescription, 
    CognitoDeleteUserPoolDescription,
    CognitoDeleteUsersWhenFinishedDescription,
    CognitoInitiateAuthDescription,
    CognitoSetUserPasswordDescription,
    CognitoUserLoginDescription,
    DDBSqlQueryDescription,
    S3ListObjectsDescription,
    SFNDescribeFunctionDescription,
    SFNListFunctionsDescription,
    SSMGetParameterDescription
} from '../docstrings/actionDocInfo';
import { createCompletionItem } from './completionItemHelper';

export default class AwsCompletionProvider {

    constructor(context: vscode.ExtensionContext) {

        const self = this;
        const folder = vscode.workspace.workspaceFolders?.[0];
        if (folder) {
            const pattern = new vscode.RelativePattern(folder, '*.feature');
            const provider = vscode.languages.registerCompletionItemProvider({pattern: pattern}, {
                async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

                    return [
                        createCompletionItem('aws cognito create user', 'aws cognito', CognitoCreateUserDescription, 'aws cognito create user: userpoolid=`placeholder` username=`placeholder`'),
                        createCompletionItem('aws cognito delete user', 'aws cognito', CognitoDeleteUserDescription,'aws cognito delete user: userpoolid=`placeholder` username=`placeholder`'),
                        createCompletionItem('aws cognito create userpool', 'aws cognito', CognitoCreateUserPoolDescription,'aws cognito create userpool: poolname=`placeholder'),
                        createCompletionItem('aws cognito delete userpool', 'aws cognito', CognitoDeleteUserPoolDescription,'aws cognito delete userpool: userpoolid=`placeholder'),
                        createCompletionItem('aws cognito set user password', 'aws cognito', CognitoSetUserPasswordDescription, 'aws cognito set user password: userpoolid=`placeholder` username=`placeholder` password=`placeholder` permanent=false'),
                        createCompletionItem('delete cognito users when finished', 'delete cognito', CognitoDeleteUsersWhenFinishedDescription),
                        createCompletionItem('aws cognito initiate auth', 'aws cognito', CognitoInitiateAuthDescription,'aws cognito initiate auth: authflow=USER_PASSWORD_AUTH clientid=`plceholder`'),
                        createCompletionItem('aws cognito user login', 'aws cognito', CognitoUserLoginDescription, 'aws cognito user login: clientid=`placeholder` username=`placeholder` password=`placeholder`'),
                        createCompletionItem('aws ssm get parameter', 'aws ssm', SSMGetParameterDescription, 'aws ssm get parameter placeholder'),
                        createCompletionItem('aws s3 list objects', 'aws s3', S3ListObjectsDescription, 'aws s3 list objects: bucket=placeholder'),
                        createCompletionItem('aws dynamodb sql query', 'aws dynamodb', DDBSqlQueryDescription, 'aws dynamodb sql query\n"""\nselect * from placeholder\n"""'),
                        createCompletionItem('aws sfn list functions', 'aws sfn', SFNListFunctionsDescription, 'aws sfn list functions'),
                        createCompletionItem('aws sfn describe function', 'aws sfn', SFNDescribeFunctionDescription, 'aws sfn describe function arn=placeholder'),
                        createCompletionItem('aws credentials from environment', 'aws credentials', AWSGetCredentialsEnvironmentDescription, 'aws credentials from environment'),
                        createCompletionItem('aws credentials from config', 'aws credentials', AWSGetCredentialsConfigDescription, 'aws credentials from config'),
                        createCompletionItem('aws credentials', 'aws credentials', AWSSetCredentialsDescription, 'aws credentials: accesskey=placeholder secretkey=placeholder'),
                        createCompletionItem('aws region', 'aws region', AWSSetRegionDescription, 'aws region eu-central-1')
                    ];
                }
            });
            context.subscriptions.push(provider);
        }
    }
}