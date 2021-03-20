import * as vscode from 'vscode';
import * as path from 'path';
import { ValidatorResult } from 'bunbo/validator/validatorResult';
import { ErrorMessage } from 'bunbo/validator/errorMessage';

export default class ValidationErrorDecorator {

    private errorDecorator: vscode.TextEditorDecorationType;

    constructor() {
        this.errorDecorator = vscode.window.createTextEditorDecorationType({
            gutterIconPath: path.join(__filename, '..', '..', 'images', 'error.png'),
            gutterIconSize: '50%',
            overviewRulerLane: vscode.OverviewRulerLane.Full,
            overviewRulerColor: 'rgba(205,21,0,0.7)',
            //backgroundColor: 'rgba(201, 118, 118, 0.2)',
            textDecoration: 'underline wavy red'
        });
    }

    public getErrorDecorator() : vscode.TextEditorDecorationType {
        return this.errorDecorator;
    }

    public showErrors(editor: vscode.TextEditor, result: ValidatorResult) {
        const ranges = result.errorMessages.map((err: ErrorMessage) => {
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
        const filteredRanges: vscode.Range[] = ranges.filter(x => x !== null) as vscode.Range[];
        editor.setDecorations(this.errorDecorator, filteredRanges);
    }

    public clearErrors(editor: vscode.TextEditor) {
        editor.setDecorations(this.errorDecorator, []);
    }
}