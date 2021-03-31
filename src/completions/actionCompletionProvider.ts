import * as vscode from 'vscode';
import { 
    AWSGetCredentialsConfigDescription,
    AWSGetCredentialsEnvironmentDescription,
    AWSSetCredentialsDescription,
    AWSSetRegionDescription,
    BrowserAnyRequestErrorDescription,
    BrowserCloseDescription,
    BrowserCountQueriedItemsDescription,
    BrowserCountRequestErrorDescription,
    BrowserLaunchDescription,
    BrowserMatchQueriedItemsDescription,
    BrowserNavigateToDescription,
    BrowserPageClearLocalstorageDescription,
    BrowserPageClickDescription,
    BrowserPageDeleteCookieDescription,
    BrowserPageElementVisibleDescription,
    BrowserPageQueryDescription,
    BrowserPageReloadDescription,
    BrowserPageSelectDropdownDescription,
    BrowserPageSelectDropdownTextDescription,
    BrowserPageSetValueDescription,
    BrowserPageSetViewportDescription,
    BrowserPageTypeDescription,
    BrowserPageUrlLikeDescription,
    BrowserPageWaitDescription,
    BrowserScreenshotDescription,
    CognitoCreateUserDescription, 
    CognitoCreateUserPoolDescription, 
    CognitoDeleteUserDescription, 
    CognitoDeleteUserPoolDescription,
    CognitoDeleteUsersWhenFinishedDescription,
    CognitoInitiateAuthDescription,
    CognitoSetUserPasswordDescription,
    CognitoUserLoginDescription,
    DDBSqlQueryDescription,
    EnvironmentExportDescription,
    EnvironmentGetDescription,
    EnvironmentSetDescription,
    JmesPathMatchDescription,
    JmesPathSelectDescription,
    S3ListObjectsDescription,
    SFNDescribeFunctionDescription,
    SFNListFunctionsDescription,
    SSMGetParameterDescription
} from '../docstrings/actionDocInfo';
import { createCompletionItem } from './completionItemHelper';

export default class ActionCompletionProvider {

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
                        createCompletionItem('aws region', 'aws region', AWSSetRegionDescription, 'aws region eu-central-1'),
                        createCompletionItem('jmespath match', 'jmespath', JmesPathMatchDescription, 'jmespath match placeholder\n"""\nplaceholder\n"""'),
                        createCompletionItem('jmespath select', 'jmespath', JmesPathSelectDescription, 'jmespath select placeholder'),
                        createCompletionItem('a new headless chrome browser', 'browser chrome', BrowserLaunchDescription, 'a new headless chrome browser'),
                        createCompletionItem('a new headless edge browser', 'browser edge', BrowserLaunchDescription, 'a new headless edge browser'),
                        createCompletionItem('a new chrome browser', 'browser edge', BrowserLaunchDescription, 'a new chrome browser'),
                        createCompletionItem('a new edge browser', 'browser edge', BrowserLaunchDescription, 'a new edge browser'),
                        createCompletionItem('navigate to', 'navigate', BrowserNavigateToDescription, 'navigate to placeholder'),
                        createCompletionItem('close browser', 'browser close', BrowserCloseDescription, 'close browser'),
                        createCompletionItem('take screenshot', 'screenshot', BrowserScreenshotDescription, 'take screenshot'),
                        createCompletionItem('request error', 'request error', BrowserCountRequestErrorDescription, '0 request error'),
                        createCompletionItem('any request error', 'request error', BrowserAnyRequestErrorDescription, 'any request error'),
                        createCompletionItem('page wait', 'page wait', BrowserPageWaitDescription, 'page wait 5000'),
                        createCompletionItem('page click', 'page click', BrowserPageClickDescription, 'page click @xpathquery'),
                        createCompletionItem('page type', 'page type', BrowserPageTypeDescription, 'page type "text to type" @xpathquery'),
                        createCompletionItem('page query', 'page query', BrowserPageQueryDescription, 'page query @xpathquery'),
                        createCompletionItem('page count queried items', 'page count query', BrowserCountQueriedItemsDescription, 'page count queried items are 0'),
                        createCompletionItem('page queried items contains', 'page contains query', BrowserMatchQueriedItemsDescription, 'page queried items contains any text values: @values'),
                        createCompletionItem('page url like', 'page url', BrowserPageUrlLikeDescription, 'page url like @url'),
                        createCompletionItem('page reload', 'page reload', BrowserPageReloadDescription, 'page reload'),
                        createCompletionItem('page select dropdown', 'page select dropdown', BrowserPageSelectDropdownDescription, 'page select dropdown @cssquery : @values'),
                        createCompletionItem('page select by text dropdown', 'page select dropdown', BrowserPageSelectDropdownTextDescription, 'page select by text dropdown @cssquery : @values'),
                        createCompletionItem('page element visible', 'page element visible', BrowserPageElementVisibleDescription, 'page element is visible: @xpathquery'),
                        createCompletionItem('page element hidden', 'page element hidden', BrowserPageElementVisibleDescription, 'page element is hidden: @xpathquery'),
                        createCompletionItem('page viewport', 'page viewport', BrowserPageSetViewportDescription, 'page viewpoert width=800,height=600'),
                        createCompletionItem('page delete cookie', 'page delete cookie', BrowserPageDeleteCookieDescription, 'page delete cookie: name=@cookiename'),
                        createCompletionItem('page clear localstorage', 'page localstorage', BrowserPageClearLocalstorageDescription, 'page clear localstorage'),
                        createCompletionItem('page set value', 'page value', BrowserPageSetValueDescription, 'page set value "@text" @xpathquery'),
                        createCompletionItem('set environment variable', 'set environment variable', EnvironmentSetDescription, 'set environment variable: name=`@name` value=`@value`'),
                        createCompletionItem('export', 'environment export', EnvironmentExportDescription, 'export @name=@value'),
                        createCompletionItem('get environment variable', 'get environment variable', EnvironmentGetDescription, 'get environment variable @name')
                    ];
                }
            });
            context.subscriptions.push(provider);
        }
    }
}