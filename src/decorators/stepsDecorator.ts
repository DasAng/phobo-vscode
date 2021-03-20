import * as vscode from 'vscode';
import * as path from 'path';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import { ActionResult } from 'bunbo/validator/actions/action';
import { ErrorMessage } from 'bunbo/validator/errorMessage';

export default class StepsDecorator {

    private decorator: vscode.TextEditorDecorationType;
    private errorDecorator: vscode.TextEditorDecorationType;

    constructor() {
        this.decorator = vscode.window.createTextEditorDecorationType({
            //color: 'rgba(0, 255, 0, 1)',
            before: {
                contentIconPath: path.join(__filename, '..', '..', 'images', 'check_small.png'),
            }

        });
        this.errorDecorator = vscode.window.createTextEditorDecorationType({
            before: {
                contentIconPath: path.join(__filename, '..', '..', 'images', 'error_small.png'),
            }

        });
    }

    public showDecorators(editor: vscode.TextEditor, result: ValidatorResult) {
        const ranges = result.actions.map((action: ActionResult) => {
            if (action.step && action.step.location && action.step.location.line && action.step.location.column) {
                if (action.step.location.line-1 > 0) {
                    try {
                        const line = editor.document.lineAt(action.step.location.line-1)
                        const endPos = line.range.end.character
                        return new vscode.Range(action.step.location.line-1,action.step.location.column-1,action.step.location.line-1,endPos);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            return null;
        });
        const filteredRanges: vscode.Range[] = ranges.filter(x => x !== null) as vscode.Range[];
        editor.setDecorations(this.decorator, filteredRanges);

        const errRanges = result.errorMessages.map((err: ErrorMessage) => {
            if (err.line && err.column) {
                if (err.line-1 > 0) {
                    try {
                        const line = editor.document.lineAt(err.line-1)
                        const endPos = line.range.end.character
                        return new vscode.Range(err.line-1,err.column-1,err.line-1,endPos);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            return null;
        });
        const filteredErrRanges: vscode.Range[] = errRanges.filter(x => x !== null) as vscode.Range[];
        editor.setDecorations(this.errorDecorator, filteredErrRanges);
    }


    public clearDecorators(editor: vscode.TextEditor) {
        editor.setDecorations(this.decorator, []);
        editor.setDecorations(this.errorDecorator, []);
    }
}