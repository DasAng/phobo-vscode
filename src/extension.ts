import * as vscode from 'vscode';
import PhoboValidator from './validation/phoboValidator';

export function activate(context: vscode.ExtensionContext) {

	const validator = new PhoboValidator(context);
}

export function deactivate() {}
