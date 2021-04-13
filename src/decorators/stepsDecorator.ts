import * as vscode from 'vscode';
import * as path from 'path';

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

    public showDecorators(editor: vscode.TextEditor, result: any) {
        const ranges = result.map((action: any) => {
            if (action.data.line && action.data.column && action.data.status === 1) {
                try {
                    const line = editor.document.lineAt(action.data.line-1)
                    const endPos = line.range.end.character
                    return new vscode.Range(action.data.line, action.data.column, line.range.end.line, endPos);
                } catch (error) {
                    console.log(error);
                }
            }
            return null;
        });
        const filteredRanges: vscode.Range[] = ranges.filter((x:any) => x !== null) as vscode.Range[];
        editor.setDecorations(this.decorator, filteredRanges);

        const errRanges = result.map((action: any) => {
            if (action.data.line && action.data.column && action.data.status !== 1) {
                try {
                    const line = editor.document.lineAt(action.data.line-1)
                    const endPos = line.range.end.character
                    return new vscode.Range(action.data.line, action.data.column, line.range.end.line, endPos);
                } catch (error) {
                    console.log(error);
                }
            }
            return null;
        });
        const filteredErrRanges: vscode.Range[] = errRanges.filter((x:any) => x !== null) as vscode.Range[];
        editor.setDecorations(this.errorDecorator, filteredErrRanges);
    }


    public clearDecorators(editor: vscode.TextEditor) {
        editor.setDecorations(this.decorator, []);
        editor.setDecorations(this.errorDecorator, []);
    }
}