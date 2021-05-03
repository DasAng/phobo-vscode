import { ActionResult } from 'bunbo/validator/actions/action';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import * as vscode from 'vscode';
import { actionDocMapper } from '../docstrings/actionDocInfo';

export default class ActionProvideHover {

    private result?: ValidatorResult;

    constructor(context: vscode.ExtensionContext, result?: ValidatorResult) {

        let self = this;
        this.result = result;

        const folder = vscode.workspace.workspaceFolders?.[0];
        if (folder) {
            const pattern = new vscode.RelativePattern(folder, '**/*.feature')
            const provider = vscode.languages.registerHoverProvider({pattern: pattern}, {
                provideHover(document,position,token) {
                    const line = document.lineAt(position);
                    if (self.result) {
                        const items = self.result.actions.filter((x: ActionResult) => {
                            if (x.step && x.step.location && x.step.location.line) {
                                if (x.step.location.line-1 === line.lineNumber) {
                                    return x;
                                }
                            }
                            return null;
                        })
                        .map((action: ActionResult) => {
                            const markdown = new vscode.MarkdownString('',true);
                            markdown.isTrusted = true;
                            markdown.appendMarkdown(`\`\`\`diff\n+ ${action.actionName}\n\`\`\`\n`);
                            markdown.appendMarkdown(`---\n`);
                            if (actionDocMapper.hasOwnProperty(action.actionDescriptionId)) {
                                markdown.appendMarkdown(`${actionDocMapper[action.actionDescriptionId]}`);
                            }
                            
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