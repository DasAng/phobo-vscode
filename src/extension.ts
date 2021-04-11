import * as vscode from 'vscode';
import { activatePhoboDebug } from './debugger/activatePhoboDebug';
import PhoboValidator from './validation/phoboValidator';

export function activate(context: vscode.ExtensionContext) {

	const validator = new PhoboValidator(context);
	activatePhoboDebug(context);
}

export function deactivate() {}
