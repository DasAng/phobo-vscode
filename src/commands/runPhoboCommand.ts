import * as vscode from 'vscode';
import { Scheme } from '../scheme/scheme';
import * as fs from 'fs';
import * as path from 'path'

export default class RunPhoboCommand {

    private terminalName: string;

    constructor() {
        this.terminalName = "phobo";
    }

    public async run() {
        if (vscode.window.activeTextEditor) {
            if (vscode.window.activeTextEditor.document.uri.scheme !== Scheme.Phobo) {
                const execPath = vscode.workspace.getConfiguration('phobo').get('executablePath');
                if (fs.existsSync(<string>execPath)) {
                    let shellCommand = `${execPath} ${vscode.window.activeTextEditor.document.fileName} --d`;
                    let terminalFound = this.getTerminal(this.terminalName);
                    if (!terminalFound) {
                        terminalFound = vscode.window.createTerminal({name: this.terminalName, env: {}, cwd: path.dirname(<string>execPath)});
                    }
                    
                    if (terminalFound) {
                        terminalFound.show();
                        terminalFound.sendText(shellCommand);
                    }
                } else {
                    vscode.window.showWarningMessage(`Could not find Phobo executable. Go to Preferences and set the Phobo exectuable path`);
                }
            }
        }
    }

    private getTerminal(terminalName: string) : vscode.Terminal|null {
        const terminalFound = vscode.window.terminals.filter(x => x.name === terminalName);
        if (terminalFound && terminalFound.length > 0) {
            return terminalFound[0];
        }
        return null;
    }
}