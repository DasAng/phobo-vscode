import Translator from 'bunbo/validator/translator';
import * as vscode from 'vscode';
import { TextDocumentContentProvider } from 'vscode';
import * as path from 'path';

export default class TranslatorView implements TextDocumentContentProvider {

    // it is important that we hookup the ondidchange event here and not in the constructor
    // otherwise it will not work
    public onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange?: vscode.Event<vscode.Uri> = this.onDidChangeEmitter.event;

    constructor(context: vscode.ExtensionContext) {
        const provider = vscode.workspace.registerTextDocumentContentProvider('phobo', this);
        context.subscriptions.push(provider);
    }

    async provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Promise<string | null | undefined> {
        const translator = new Translator
        try {
            const resultData = await translator.translate(path.resolve(uri.fsPath));
            if (resultData) {
                return resultData;
            }
        } catch (error) {
            console.log(error);
        }
        return '';
    }
}