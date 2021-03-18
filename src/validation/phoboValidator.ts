import * as vscode from 'vscode';
import Validator from 'bunbo/validator/validator';
import ValidationErrorDecorator from './validationErrorDecorator';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import ErrorProvideHover from './errorProvideHover';
import AwsCompletionProvider from './awsCompletionProvider';

export default class PhoboValidator {

    private validator: Validator;
    private errorDecorator: ValidationErrorDecorator;
    private validatorResult?: ValidatorResult;
    private errorProvideHover: ErrorProvideHover;
    private awsCompletionProvider: AwsCompletionProvider;

    constructor(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor.bind(this)));
        context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument.bind(this)));

        this.validator = new Validator();
        this.errorDecorator = new ValidationErrorDecorator();
        this.errorProvideHover = new ErrorProvideHover(context, this.validatorResult);
        this.awsCompletionProvider = new AwsCompletionProvider(context);


        if (vscode.window.activeTextEditor) {
            if (vscode.window.activeTextEditor.document) {
                this.onDidChangeActiveTextEditor(vscode.window.activeTextEditor);
            }
        }
    }

    private async parseFeature(e: vscode.TextEditor) {

        if (e.document.fileName.endsWith('.feature')) {
            this.clearValidation(e);
            this.validatorResult = await this.validator.validate(e.document.fileName);
            if (this.validatorResult.errorMessages) {
                this.errorDecorator.showErrors(e, this.validatorResult);
                this.errorProvideHover.setResult(this.validatorResult);
            }
        }
    }

    private async onDidChangeActiveTextEditor(e: vscode.TextEditor | undefined) {
        if (e) {
            await this.parseFeature(e);
        }
    }

    private async onDidChangeTextDocument(e: vscode.TextDocumentChangeEvent) {
        if (vscode.window.activeTextEditor) {
            await this.parseFeature(vscode.window.activeTextEditor);
        }
    }

    private clearValidation(e: vscode.TextEditor) {
        this.validatorResult = undefined;
        this.errorDecorator.clearErrors(e);
    }

}