import * as fs from 'fs';
import * as path from 'path';

export const CognitoCreateUserDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_create_user.md')).toString();
export const CognitoDeleteUserDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_delete_user.md')).toString();
export const SSMGetParameterDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'ssm_get_parameter.md')).toString();
export const CognitoCreateUserPoolDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_create_userpool.md')).toString();
export const CognitoDeleteUserPoolDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_delete_userpool.md')).toString();
export const CognitoSetUserPasswordDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_set_user_password.md')).toString();
export const CognitoDeleteUsersWhenFinishedDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_delete_users_when_finished.md')).toString();
export const CognitoInitiateAuthDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_initiate_auth.md')).toString();
export const CognitoUserLoginDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'cognito_user_login.md')).toString();
export const S3ListObjectsDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 's3_list_objects.md')).toString();
export const DDBSqlQueryDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'ddb_sql_query.md')).toString();
export const SFNListFunctionsDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'sfn_list_functions.md')).toString();
export const SFNDescribeFunctionDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'sfn_describe_function.md')).toString();
export const AWSGetCredentialsEnvironmentDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'aws_get_credentials_environment.md')).toString();
export const AWSGetCredentialsConfigDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'aws_get_credentials_config.md')).toString();
export const AWSSetCredentialsDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'aws_set_credentials.md')).toString();
export const AWSSetRegionDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'aws_set_region.md')).toString();
export const JmesPathMatchDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'jmespath_match.md')).toString();
export const JmesPathSelectDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'jmespath_select.md')).toString();
export const BrowserLaunchDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_launch.md')).toString();
export const BrowserNavigateToDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_navigate.md')).toString();
export const BrowserCloseDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_close.md')).toString();
export const BrowserScreenshotDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_screenshot.md')).toString();
export const BrowserCountRequestErrorDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_count_error.md')).toString();
export const BrowserAnyRequestErrorDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_any_error.md')).toString();
export const BrowserPageWaitDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_wait.md')).toString();
export const BrowserPageClickDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_click.md')).toString();
export const BrowserPageTypeDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_type.md')).toString();
export const BrowserPageQueryDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_query.md')).toString();
export const BrowserCountQueriedItemsDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_count_query.md')).toString();
export const BrowserMatchQueriedItemsDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_match_query.md')).toString();
export const BrowserPageUrlLikeDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_url.md')).toString();
export const BrowserPageReloadDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_reload.md')).toString();
export const BrowserPageSelectDropdownDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_select_dropdown.md')).toString();
export const BrowserPageSelectDropdownTextDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_select_dropdown_text.md')).toString();
export const BrowserPageElementVisibleDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_element_visible.md')).toString();
export const BrowserPageSetViewportDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_viewport.md')).toString();
export const BrowserPageDeleteCookieDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_delete_cookie.md')).toString();
export const BrowserPageClearLocalstorageDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_clear_localstorage.md')).toString();
export const BrowserPageSetValueDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'browser_page_setvalue.md')).toString();
export const EnvironmentSetDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'environment_set.md')).toString();
export const EnvironmentExportDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'environment_export.md')).toString();
export const EnvironmentGetDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'environment_get.md')).toString();
export const RandomStringDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'random_string.md')).toString();
export const PrintDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'print.md')).toString();
export const RepeatUntilDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'repeat_until.md')).toString();
export const MatchResultDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'match_result.md')).toString();
export const HttpRequestDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'http_request.md')).toString();
export const HttpStatusDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'http_status.md')).toString();
export const HttpStatusOkDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'http_ok.md')).toString();
export const HttpRequestWithBodyDescription = fs.readFileSync(path.join(__filename, '..', '..', 'actiondocs', 'http_request_with_body.md')).toString();


type actionDocMapperType = {
    [key: string]: string
}

export const actionDocMapper: actionDocMapperType = {
    CognitoCreateUserAction: CognitoCreateUserDescription,
    CognitoDeleteUserAction: CognitoDeleteUserDescription,
    SSMGetParameterAction: SSMGetParameterDescription,
    CognitoCreateUserPoolAction: CognitoCreateUserPoolDescription,
    CognitoDeleteUserPoolAction: CognitoDeleteUserPoolDescription,
    CognitoSetUserPasswordAction: CognitoSetUserPasswordDescription,
    CognitoDeleteUsersWhenFinishedAction: CognitoDeleteUsersWhenFinishedDescription,
    CognitoInitiateAuthAction: CognitoInitiateAuthDescription,
    CognitoUserLoginAction: CognitoUserLoginDescription,
    S3ListObjectsAction: S3ListObjectsDescription,
    DDBSqlQueryAction: DDBSqlQueryDescription,
    SFNListFunctionsAction: SFNListFunctionsDescription,
    SFNDescribeFunctionAction: SFNDescribeFunctionDescription,
    AWSGetCredentialsEnvironmentAction: AWSGetCredentialsEnvironmentDescription,
    AWSGetCredentialsConfigAction: AWSGetCredentialsConfigDescription,
    AWSSetCredentialsAction: AWSSetCredentialsDescription,
    AWSSetRegionAction: AWSSetRegionDescription,
    JmesPathMatchAction: JmesPathMatchDescription,
    JmesPathSelectAction: JmesPathSelectDescription,
    BrowserLaunchAction: BrowserLaunchDescription,
    BrowserNavigateToAction: BrowserNavigateToDescription,
    BrowserCloseAction: BrowserCloseDescription,
    BrowserScreenshotAction: BrowserScreenshotDescription,
    BrowserCountRequestErrorAction: BrowserCountRequestErrorDescription,
    BrowserAnyRequestErrorAction: BrowserAnyRequestErrorDescription,
    BrowserPageWaitAction: BrowserPageWaitDescription,
    BrowserPageClickAction: BrowserPageClickDescription,
    BrowserPageTypeAction: BrowserPageTypeDescription,
    BrowserPageQueryAction: BrowserPageQueryDescription,
    BrowserCountQueriedItemsAction: BrowserCountQueriedItemsDescription,
    BrowserMatchQueriedItemsAction: BrowserMatchQueriedItemsDescription,
    BrowserPageUrlLikeAction: BrowserPageUrlLikeDescription,
    BrowserPageReloadAction: BrowserPageReloadDescription,
    BrowserPageSelectDropdownAction: BrowserPageSelectDropdownDescription,
    BrowserPageSelectDropdownTextAction: BrowserPageSelectDropdownTextDescription,
    BrowserPageElementVisibleAction: BrowserPageElementVisibleDescription,
    BrowserPageSetViewportAction: BrowserPageSetViewportDescription,
    BrowserPageDeleteCookieAction: BrowserPageDeleteCookieDescription,
    BrowserPageClearLocalstorageAction: BrowserPageClearLocalstorageDescription,
    BrowserPageSetValueAction: BrowserPageSetValueDescription,
    EnvironmentSetAction: EnvironmentSetDescription,
    EnvironmentExportAction: EnvironmentExportDescription,
    EnvironmentGetAction: EnvironmentGetDescription,
    RandomStringAction: RandomStringDescription,
    PrintAction: PrintDescription,
    RepeatUntilAction: RepeatUntilDescription,
    MatchResultAction: MatchResultDescription,
    HttpRequestAction: HttpRequestDescription,
    HttpStatusAction: HttpStatusDescription,
    HttpStatusOkAction: HttpStatusOkDescription,
    HttpRequestWithBodyAction: HttpRequestWithBodyDescription,
}