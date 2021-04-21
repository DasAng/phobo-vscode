/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import { PhoboDebugSession } from './phoboDebugSession';
import { FileAccessor } from './debuggerRuntime';
import * as fs from 'fs';
import StepsDecorator from '../decorators/stepsDecorator';

export function activatePhoboDebug(context: vscode.ExtensionContext) {

	let factory: vscode.DebugAdapterDescriptorFactory;

	// register a configuration provider for 'mock' debug type
	const provider = new PhoboConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('phobo', provider));

	// register a dynamic configuration provider for 'mock' debug type
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('phobo', {
		provideDebugConfigurations(folder: WorkspaceFolder | undefined): ProviderResult<DebugConfiguration[]> {
			return [
				{
					name: "Phobo Launch",
					request: "launch",
					type: "phobo",
					program: "${file}"
				}
			];
		}
	}, vscode.DebugConfigurationProviderTriggerKind.Dynamic));

	factory = new InlineDebugAdapterFactory();
	
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('phobo', factory));
	if ('dispose' in factory) {
		context.subscriptions.push(factory);
	}

	// // override VS Code's default implementation of the debug hover
	// context.subscriptions.push(vscode.languages.registerEvaluatableExpressionProvider('feature', {
	// 	provideEvaluatableExpression(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.EvaluatableExpression> {
	// 		const wordRange = document.getWordRangeAtPosition(position);
	// 		return wordRange ? new vscode.EvaluatableExpression(wordRange) : undefined;
	// 	}
	// }));

	// // override VS Code's default implementation of the "inline values" feature"
	// context.subscriptions.push(vscode.languages.registerInlineValuesProvider('feature', {

	// 	provideInlineValues(document: vscode.TextDocument, viewport: vscode.Range, context: vscode.InlineValueContext) : vscode.ProviderResult<vscode.InlineValue[]> {

	// 		const allValues: vscode.InlineValue[] = [];

	// 		for (let l = 0; l <= context.stoppedLocation.end.line; l++) {
	// 			const line = document.lineAt(l);
	// 			var regExp = /local_[ifso]/ig;	// match variables of the form local_i, local_f, Local_i, LOCAL_S...
	// 			do {
	// 				var m = regExp.exec(line.text);
	// 				if (m) {
	// 					const varName = m[0];
	// 					const varRange = new vscode.Range(l, m.index, l, m.index + varName.length);

	// 					// some literal text
	// 					//allValues.push(new vscode.InlineValueText(rng, `${varName}: some value`));

	// 					// value found via variable lookup
	// 					allValues.push(new vscode.InlineValueVariableLookup(varRange, varName, false));

	// 					// value determined via expression evaluation
	// 					//allValues.push(new vscode.InlineValueEvaluatableExpression(rng, varName));
	// 				}
	// 			} while (m);
	// 		}

	// 		return allValues;
	// 	}
	// }));
}

class PhoboConfigurationProvider implements vscode.DebugConfigurationProvider {

	/**
	 * Massage a debug configuration just before a debug session is being launched,
	 * e.g. add all missing attributes to the debug configuration.
	 */
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {

		const execPath = vscode.workspace.getConfiguration('phobo').get('executablePath');
		if (!fs.existsSync(<string>execPath)) {
			return vscode.window.showErrorMessage("Phobo executable not found. Please go to preference for Phobo and set the excectuable path").then(_ => {
				return undefined;	// abort launch
			});
		}

		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === 'feature') {
				config.type = 'phobo';
				config.name = 'Launch';
				config.request = 'launch';
				config.program = '${file}';
				config.stopOnEntry = false;
			}
		}

		if (!config.program) {
			return vscode.window.showInformationMessage("Cannot find a program to debug").then(_ => {
				return undefined;	// abort launch
			});
		}

		return config;
	}
}

export const workspaceFileAccessor: FileAccessor = {
	async readFile(path: string) {
		try {
			const uri = vscode.Uri.file(path);
			const bytes = await vscode.workspace.fs.readFile(uri);
			const contents = Buffer.from(bytes).toString('utf8');
			return contents;
		} catch(e) {
			try {
				const uri = vscode.Uri.parse(path);
				const bytes = await vscode.workspace.fs.readFile(uri);
				const contents = Buffer.from(bytes).toString('utf8');
				return contents;
			} catch (e) {
				return `cannot read '${path}'`;
			}
		}
	}
};

class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {

	private stepsDecorator: StepsDecorator = new StepsDecorator();

	createDebugAdapterDescriptor(_session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
		return new vscode.DebugAdapterInlineImplementation(new PhoboDebugSession(workspaceFileAccessor, this.stepsDecorator));
	}
}