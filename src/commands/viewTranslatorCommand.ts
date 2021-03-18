import * as vscode from 'vscode';
import { Scheme } from '../scheme/scheme';

export default class ViewTranslatorCommand {

    constructor() {
    }

    public async run() {
        if (vscode.window.activeTextEditor) {
            if (vscode.window.activeTextEditor.document.uri.scheme !== Scheme.Phobo) {
                // const uri = vscode.Uri.parse(`${Scheme.Phobo}:${vscode.window.activeTextEditor.document.uri.path}`);
                const uri = vscode.Uri.parse(`${Scheme.Phobo}:${vscode.window.activeTextEditor.document.fileName}`);
                const doc = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(doc, { preview: false, viewColumn: vscode.ViewColumn.Beside });
            }
        }
    }
}