import * as vscode from 'vscode';

export function createCompletionItem(label: string, filterText: string, documentation: string, insertText?: string) : vscode.CompletionItem {
    const item = new vscode.CompletionItem(label);
    item.kind = vscode.CompletionItemKind.Keyword;
    item.documentation = new vscode.MarkdownString(documentation,true);
    item.documentation.isTrusted = true;
    item.filterText = filterText;
    item.insertText = insertText;
    return item;
}