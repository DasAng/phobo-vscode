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
    AWSSetRegionAction: AWSSetRegionDescription
}