import * as vscode from 'vscode';
import Validator from 'bunbo/validator/validator';
import ValidationErrorDecorator from '../decorators/validationErrorDecorator';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import ErrorProvideHover from '../hovers/errorProvideHover';
import TranslatorView from '../translator/translatorView';
import { Command } from '../commands/commands';
import ViewTranslatorCommand from '../commands/viewTranslatorCommand';
import { Scheme } from '../scheme/scheme';
import ActionProvideHover from '../hovers/actionProvideHover';
import StepsDecorator from '../decorators/stepsDecorator';
import RunPhoboCommand from '../commands/runPhoboCommand';
import ActionCompletionProvider from '../completions/actionCompletionProvider';

export default class PhoboValidator {

    private validator: Validator;
    private errorDecorator: ValidationErrorDecorator;
    private stepsDecorator: StepsDecorator;
    private validatorResult?: ValidatorResult;
    private errorProvideHover: ErrorProvideHover;
    private actionProvideHover: ActionProvideHover;
    private actionCompletionProvider: ActionCompletionProvider;
    private translatorView: TranslatorView;
    private viewTranslatorCommand: ViewTranslatorCommand;
    private runPhoboCommand: RunPhoboCommand;

    constructor(context: vscode.ExtensionContext) {

        this.viewTranslatorCommand = new ViewTranslatorCommand();
        this.runPhoboCommand = new RunPhoboCommand();

        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor.bind(this)));
        // context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument.bind(this)));
        context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(this.onDidSaveTextDocument.bind(this)));

        context.subscriptions.push(vscode.commands.registerCommand(Command.ViewTranslator,this.viewTranslatorCommand.run.bind(this.viewTranslatorCommand)))
        context.subscriptions.push(vscode.commands.registerCommand(Command.RunPhobo,this.runPhoboCommand.run.bind(this.runPhoboCommand)))

        this.validator = new Validator();
        this.errorDecorator = new ValidationErrorDecorator();
        this.stepsDecorator = new StepsDecorator();
        this.errorProvideHover = new ErrorProvideHover(context, this.validatorResult);
        this.actionProvideHover = new ActionProvideHover(context, this.validatorResult);
        this.actionCompletionProvider = new ActionCompletionProvider(context);
        this.translatorView = new TranslatorView(context);


        if (vscode.window.activeTextEditor) {
            if (vscode.window.activeTextEditor.document) {
                this.onDidChangeActiveTextEditor(vscode.window.activeTextEditor);
            }
        }

    }

    private async parseFeature(e: vscode.TextEditor) {

        if (e.document.fileName.endsWith('.feature') && e.document.uri.scheme !== Scheme.Phobo) {
            this.clearValidation(e);
            if(vscode.workspace.getConfiguration('phobo').get('enableValidation')) {
                this.validatorResult = await this.validator.validate(e.document.fileName);
                if (this.validatorResult.errorMessages) {
                    this.errorDecorator.showErrors(e, this.validatorResult);
                    this.errorProvideHover.setResult(this.validatorResult);
                }
                this.actionProvideHover.setResult(this.validatorResult);
                //this.stepsDecorator.showDecorators(e, this.validatorResult);
            }
        }
    }

    private async onDidChangeActiveTextEditor(e: vscode.TextEditor | undefined) {
        if (e) {
            await this.parseFeature(e);
        }
    }

    private async onDidSaveTextDocument(e: vscode.TextDocument) {
        if (vscode.window.activeTextEditor) {
            if (e.fileName.endsWith('.feature') && e.uri.scheme !== Scheme.Phobo) {
                //console.log('saved document: ', e.fileName);
                await this.parseFeature(vscode.window.activeTextEditor);
                const newUri = e.uri.with({scheme: Scheme.Phobo, path: e.fileName});
                this.translatorView.onDidChangeEmitter.fire(newUri);
            }
        }
    }

    private clearValidation(e: vscode.TextEditor) {
        this.validatorResult = undefined;
        if (this.errorDecorator) {
            this.errorDecorator.clearErrors(e);
        }
        //this.stepsDecorator.clearDecorators(e);
    }

}