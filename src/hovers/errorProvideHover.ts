import { ErrorMessage } from 'bunbo/validator/errorMessage';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import * as vscode from 'vscode';

export default class ErrorProvideHover {

    private result?: ValidatorResult;

    constructor(context: vscode.ExtensionContext, result?: ValidatorResult) {

        let self = this;
        this.result = result;

        const folder = vscode.workspace.workspaceFolders?.[0];
        if (folder) {
            const pattern = new vscode.RelativePattern(folder, '*.feature')
            const provider = vscode.languages.registerHoverProvider({pattern: pattern}, {
                provideHover(document,position,token) {
                    const line = document.lineAt(position);
                    if (self.result) {
                        const items = self.result.errorMessages.filter((x: ErrorMessage) => {
                            if (x.line && x.column) {
                                if (x.line-1 === line.lineNumber) {
                                    return x;
                                }
                            }
                            return null;
                        })
                        .map((err: ErrorMessage) => {
                            const markdown = new vscode.MarkdownString();
                            markdown.appendMarkdown(`**Error**:\n\n`)
                            markdown.appendMarkdown(`${err.message}\n\n`);
                            markdown.appendMarkdown(`*${err.source}*\n\n`);
                            markdown.appendMarkdown(`**Translated text**:\n\n`);
                            markdown.appendMarkdown(`*${err.translated}*`);
                            return markdown;
                        })
                        if(vscode.workspace.getConfiguration('phobo').get('enableValidation')) {
                            return new vscode.Hover(items);
                        }
                        return null;
                    }
                }
            });
            context.subscriptions.push(provider);
        }
    }

    public setResult(result: ValidatorResult) {
        this.result = result;
    }
}