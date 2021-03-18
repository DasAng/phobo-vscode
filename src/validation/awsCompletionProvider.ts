import * as vscode from 'vscode';

export default class AwsCompletionProvider {
    
    constructor(context: vscode.ExtensionContext) {

        const folder = vscode.workspace.workspaceFolders?.[0];
        if (folder) {
            const pattern = new vscode.RelativePattern(folder, '*.feature');
            const provider = vscode.languages.registerCompletionItemProvider({pattern: pattern}, {
                async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
                    const item = new vscode.CompletionItem('aws ssm get parameter');
                    item.kind = vscode.CompletionItemKind.Keyword;
                    item.filterText = 'aws ssm';

                    const item2 = new vscode.CompletionItem('aws cognito user login');
                    item2.kind = vscode.CompletionItemKind.Keyword;
                    item2.filterText = 'aws cognito';

                    const item3 = new vscode.CompletionItem('aws cognito create user');
                    item3.kind = vscode.CompletionItemKind.Keyword;
                    item3.filterText = 'aws cognito';

                    return [item, item2, item3];
                }
            });
            context.subscriptions.push(provider);
        }
        
    }
}