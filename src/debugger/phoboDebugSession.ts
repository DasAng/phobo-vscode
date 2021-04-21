import * as vscode from 'vscode';
import {
	Logger, logger,
	LoggingDebugSession,
	InitializedEvent, TerminatedEvent, StoppedEvent,
	Thread, StackFrame, Scope, Source, Handles, Breakpoint
} from 'vscode-debugadapter';
import { DebugProtocol } from 'vscode-debugprotocol';
import { basename } from 'path';
import { FileAccessor } from './debuggerRuntime';
import { Subject } from 'await-notify';
import DebuggerRuntime from './debuggerRuntime';
import * as _ from 'lodash';
import StepsDecorator from '../decorators/stepsDecorator';


/**
 * This interface describes the mock-debug specific launch attributes
 * (which are not part of the Debug Adapter Protocol).
 * The schema for these attributes lives in the package.json of the mock-debug extension.
 * The interface should always match this schema.
 */
interface ILaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
	/** An absolute path to the "program" to debug. */
	program: string;
	/** Automatically stop target after launch. If not specified, target does not stop. */
	stopOnEntry?: boolean;
	/** enable logging the Debug Adapter Protocol */
	trace?: boolean;
	/** run without debugging */
	noDebug?: boolean;
}

export class PhoboDebugSession extends LoggingDebugSession {

	// we don't support multiple threads, so we can use a hardcoded ID for the default thread
	private static threadID = 1;

	private _variableHandles = new Handles<string>();

	private _configurationDone = new Subject();

	private _breakpoints: number[] = [];
	private _activeSourceFile = "";
	private debuggerRuntime: DebuggerRuntime;
	private _breakpointId = 1;
	private scopeLocal = 'local';
	private scopeGlobal = 'global';
	private _activeEditor?: vscode.TextEditor

	private stepsDecorator: StepsDecorator;
	private stepInfos: any[] = [];
	
	/**
	 * Creates a new debug adapter that is used for one debug session.
	 * We configure the default implementation of a debug adapter here.
	 */
	public constructor(fileAccessor: FileAccessor, stepsDecorator: StepsDecorator) {
		super("phobo-debug.txt");

		let self = this;

		this.stepsDecorator = stepsDecorator;

		// this debugger uses one-based lines and columns
		this.setDebuggerLinesStartAt1(true);
		this.setDebuggerColumnsStartAt1(true);

		this.debuggerRuntime = new DebuggerRuntime();

		this.debuggerRuntime.on('stopOnBreak', (event) => {
			if (this._breakpoints.find(x => x === event.data.line)) {
				this.sendEvent(new StoppedEvent('breakpoint', PhoboDebugSession.threadID));	
			} else {
				this.sendEvent(new StoppedEvent('step', PhoboDebugSession.threadID));
			}
			self.stepInfos.push(event);
			if (self._activeEditor) {
				self.stepsDecorator.showDecorators(self._activeEditor, self.stepInfos);
			}
		});
		this.debuggerRuntime.on('log', (event) =>  {
			const debugConsole = vscode.debug.activeDebugConsole;
			if (debugConsole) {
				debugConsole.append(event);
			}
		});
		this.debuggerRuntime.on('stepInfo', (event) =>  {
			self.stepInfos.push(event);
			if (self._activeEditor) {
				self.stepsDecorator.showDecorators(self._activeEditor, self.stepInfos);
			}
		})
		this.debuggerRuntime.on('end', (event) => {
			this.sendEvent(new TerminatedEvent());
			const debugConsole = vscode.debug.activeDebugConsole;
			if (debugConsole) {
				debugConsole.appendLine(`debugger exited with code: ${event}`);
			}
		});

	}

	/**
	 * The 'initialize' request is the first request called by the frontend
	 * to interrogate the features the debug adapter provides.
	 */
	protected initializeRequest(response: DebugProtocol.InitializeResponse, args: DebugProtocol.InitializeRequestArguments): void {

		// build and return the capabilities of this debug adapter:
		response.body = response.body || {};

		response.body.supportsGotoTargetsRequest = false;

		// the adapter implements the configurationDoneRequest.
		response.body.supportsConfigurationDoneRequest = true;

		// make VS Code use 'evaluate' when hovering over source
		response.body.supportsEvaluateForHovers = true;

		// make VS Code show a 'step back' button
		response.body.supportsStepBack = false;

		// make VS Code support data breakpoints
		response.body.supportsDataBreakpoints = false;

		// make VS Code support completion in REPL
		response.body.supportsCompletionsRequest = false;

		// make VS Code send cancelRequests
		response.body.supportsCancelRequest = false;

		// make VS Code send the breakpointLocations request
		response.body.supportsBreakpointLocationsRequest = false;

		// make VS Code provide "Step in Target" functionality
		response.body.supportsStepInTargetsRequest = false;

		// the adapter defines two exceptions filters, one with support for conditions.
		response.body.supportsExceptionFilterOptions = false;

		// make VS Code send exceptionInfoRequests
		response.body.supportsExceptionInfoRequest = false;


		this.sendResponse(response);

		// since this debug adapter can accept configuration requests like 'setBreakpoint' at any time,
		// we request them early by sending an 'initializeRequest' to the frontend.
		// The frontend will end the configuration sequence by calling 'configurationDone' request.
		this.sendEvent(new InitializedEvent());
	}

	/**
	 * Called at the end of the configuration sequence.
	 * Indicates that all breakpoints etc. have been sent to the DA and that the 'launch' can start.
	 */
	protected configurationDoneRequest(response: DebugProtocol.ConfigurationDoneResponse, args: DebugProtocol.ConfigurationDoneArguments): void {
		console.log('session: configuration done request: ', args);

		super.configurationDoneRequest(response, args);

		// notify the launchRequest that configuration has finished
		this._configurationDone.notify();
	}

	protected async launchRequest(response: DebugProtocol.LaunchResponse, args: ILaunchRequestArguments) {

		console.log('session: launch request: ', args);

		this._activeSourceFile = args.program;

		// make sure to 'Stop' the buffered logging if 'trace' is not set
		logger.setup(args.trace ? Logger.LogLevel.Verbose : Logger.LogLevel.Stop, false);

		// wait until configuration has finished (and configurationDoneRequest has been called)
		await this._configurationDone.wait(1000);

		this.debuggerRuntime.sourceFile = this._activeSourceFile;

		this._activeEditor = vscode.window.activeTextEditor;

		if (this._activeEditor) {
			this.stepsDecorator.clearDecorators(this._activeEditor);
		}
		

		await this.debuggerRuntime.start(this._breakpoints);

		this.sendResponse(response);
	}

	protected async setBreakPointsRequest(response: DebugProtocol.SetBreakpointsResponse, args: DebugProtocol.SetBreakpointsArguments): Promise<void> {

		console.log('session: set breakpoints: ', args);

		let self = this;
		const path = args.source.path as string;
		const clientLines = args.lines || [];

		if (path === this._activeSourceFile && args.lines) {
			this._breakpoints = [];
			this._breakpoints.push(...args.lines);

			const actualBreakpoints0 = clientLines.map(async l => {
				const bp = new Breakpoint(true, this.convertDebuggerLineToClient(l)) as DebugProtocol.Breakpoint;
				bp.id= self._breakpointId++;
				return bp;
			});

			const actualBreakpoints = await Promise.all<DebugProtocol.Breakpoint>(actualBreakpoints0);

			// send back the actual breakpoint positions
			response.body = {
				breakpoints: actualBreakpoints
			};

			this.debuggerRuntime.setBreakpoints(this._breakpoints);
		}
		this.sendResponse(response);
	}

	protected threadsRequest(response: DebugProtocol.ThreadsResponse): void {

		// runtime supports no threads so just return a default thread.
		response.body = {
			threads: [
				new Thread(PhoboDebugSession.threadID, "thread 1")
			]
		};
		this.sendResponse(response);
	}

	protected stackTraceRequest(response: DebugProtocol.StackTraceResponse, args: DebugProtocol.StackTraceArguments): void {

		console.log('session: stacktracerequest args: ', args);

		const startFrame = typeof args.startFrame === 'number' ? args.startFrame : 0;
		const maxLevels = typeof args.levels === 'number' ? args.levels : 1000;
		const endFrame = startFrame + maxLevels;

		const stk = this.debuggerRuntime.stack(startFrame, endFrame);

		response.body = {
			stackFrames: stk.frames.map(f => {
				const sf = new StackFrame(f.index, f.name, this.createSource(f.file), this.convertDebuggerLineToClient(f.line));
				if (typeof f.column === 'number') {
					sf.column = this.convertDebuggerColumnToClient(f.column);
				}
				return sf;
			}),
			//no totalFrames: 				// VS Code has to probe/guess. Should result in a max. of two requests
			totalFrames: stk.count			// stk.count is the correct size, should result in a max. of two requests
			//totalFrames: 1000000 			// not the correct size, should result in a max. of two requests
			//totalFrames: endFrame + 20 	// dynamically increases the size with every requested chunk, results in paging
		};

		console.log('session: stack grace request: ', response.body);
		this.sendResponse(response);
	}

	protected scopesRequest(response: DebugProtocol.ScopesResponse, args: DebugProtocol.ScopesArguments): void {

		console.log('session: scopes requests: ', args);

		response.body = {
			scopes: [
				new Scope("Local", this._variableHandles.create(this.scopeLocal), false),
				new Scope("Global", this._variableHandles.create(this.scopeGlobal), false)
			]
		};
		this.sendResponse(response);
	}

	protected async variablesRequest(response: DebugProtocol.VariablesResponse, args: DebugProtocol.VariablesArguments, request?: DebugProtocol.Request) {

		console.log('session: variables requests: ', args);

		const variables: DebugProtocol.Variable[] = [];

		const id = this._variableHandles.get(args.variablesReference);

		if (id === this.scopeLocal) {
			if (this.debuggerRuntime) {
				const lastFrame = this.debuggerRuntime.getLastFrame();
				if (lastFrame) {
					if (lastFrame.data && lastFrame.data.attachments) {
						variables.push({
							name: 'attachments',
							type: 'array',
							value: 'Array',
							variablesReference: this._variableHandles.create('data.attachments'),
							presentationHint: { kind: 'data'}
						});
						
					}
					if (lastFrame.data && lastFrame.data.scenario) {
						variables.push({
							name: 'scenario',
							type: 'string',
							value: lastFrame.data.scenario,
							variablesReference: 0
						});
					}
					if (lastFrame.data && lastFrame.data.message) {
						variables.push({
							name: 'message',
							type: 'string',
							value: lastFrame.data.message,
							variablesReference: 0
						});
					}
					if (lastFrame.data && lastFrame.data.status) {
						let statusText = '';
						if (lastFrame.data.status === 1) {
							statusText = 'PASSED';
						}
						else if (lastFrame.data.status === 2) {
							statusText = 'SKIPPED';
						}
						else if (lastFrame.data.status === 3) {
							statusText = 'PENDING';
						}
						else if (lastFrame.data.status === 4) {
							statusText = 'UNDEFINED';
						}
						else if (lastFrame.data.status === 5) {
							statusText = 'AMBIGUOUS';
						}
						else if (lastFrame.data.status === 6) {
							statusText = 'FAILED';
						}
						variables.push({
							name: 'status',
							type: 'string',
							value: statusText,
							variablesReference: 0
						});
					}

					if (lastFrame.data && lastFrame.data.result) {
						if (typeof lastFrame.data.result === 'string') {
							variables.push({
								name: 'result',
								type: 'string',
								value: lastFrame.data.result,
								variablesReference: 0
							});
						} else if (Array.isArray(lastFrame.data.result)) {
							variables.push({
								name: 'result',
								type: 'array',
								value: 'Array',
								variablesReference: this._variableHandles.create('data.result'),
								presentationHint: { kind: 'data'}
							});
						} else if (typeof lastFrame.data.result === 'object') {
							variables.push({
								name: 'result',
								type: 'object',
								value: 'Object',
								variablesReference: this._variableHandles.create('data.result'),
								presentationHint: { kind: 'data'}
							});
						} else if (typeof lastFrame.data.result === 'number') {
							variables.push({
								name: 'result',
								type: 'Number',
								value: lastFrame.data.result.toString(),
								variablesReference: 0
							});
						} else if (typeof lastFrame.data.result === 'boolean') {
							variables.push({
								name: 'result',
								type: 'Boolean',
								value: lastFrame.data.result?'true':'false',
								variablesReference: 0
							});
						}
					}
				}
			}
		}
		else if (id === this.scopeGlobal) {
			if (this.debuggerRuntime) {
				const lastFrame = this.debuggerRuntime.getLastFrame();
				if (lastFrame && lastFrame.data) {
					if (lastFrame.data.variables) {
						variables.push({
							name: 'variables',
							type: 'object',
							value: 'Object',
							variablesReference: this._variableHandles.create('data.variables'),
							presentationHint: { kind: 'data'}
						});
					}
				}
			}
		}
		else if (id === 'data.attachments') {

			const lastFrame = this.debuggerRuntime.getLastFrame();
			if (lastFrame) {

				for(let i=0;i<lastFrame.data.attachments.length;i++) {
					variables.push({
						name: `${i}`,
						type: 'object',
						value: 'Object',
						variablesReference: this._variableHandles.create(`data.attachments[${i}]`),
						presentationHint: { kind: 'data'}
					});
				}
			}
		} else {

			const lastFrame = this.debuggerRuntime.getLastFrame();
			if (lastFrame) {
				const obj = _.get(lastFrame, id);
				//console.log('variable obj: ', obj);
				if (typeof obj === 'object') {
					const props = Object.keys(obj);
					for(let prop of props) {
						if (typeof obj[prop] === 'string') {
							variables.push({
								name: `${prop}`,
								type: 'string',
								value: obj[prop],
								variablesReference: 0,
								presentationHint: { kind: 'data'}
							});	
						} else if (typeof obj[prop] === 'object') {
							variables.push({
								name: `${prop}`,
								type: 'object',
								value: 'Object',
								variablesReference: this._variableHandles.create(`${id}.${prop}`),
								presentationHint: { kind: 'data'}
							});	
						} else if (Array.isArray(obj[prop])) {
							for(let i=0;i<obj[prop].length;i++) {
								variables.push({
									name: `${i}`,
									type: 'object',
									value: 'Object',
									variablesReference: this._variableHandles.create(`${id}.${prop}[${i}]`),
									presentationHint: { kind: 'data'}
								});
							}
						} else if (typeof obj[prop] === 'number') {
							variables.push({
								name: `${prop}`,
								type: 'Number',
								value: obj[prop].toString(),
								variablesReference: 0
							});
						} else if (typeof obj[prop] === 'boolean') {
							variables.push({
								name: `${prop}`,
								type: 'Boolean',
								value: obj[prop]?'true':'false',
								variablesReference: 0
							});
						}
					}

				} else if (typeof obj === 'string') {
					variables.push({
						name: id,
						type: 'string',
						value: obj,
						variablesReference: 0
					});
				} else if (typeof obj === 'number') {
					variables.push({
						name: id,
						type: 'Number',
						value: obj.toString(),
						variablesReference: 0
					});
				} else if (typeof obj === 'boolean') {
					variables.push({
						name: id,
						type: 'Boolean',
						value: obj?'true':'false',
						variablesReference: 0
					});
				} else if (Array.isArray(obj)) {
					for(let i=0;i<obj.length;i++) {
						variables.push({
							name: `${i}`,
							type: 'array',
							value: 'Array',
							variablesReference: this._variableHandles.create(`${id}[${i}]`),
							presentationHint: { kind: 'data'}
						});
					}
				}
			}
		}

		response.body = {
			variables: variables
		};
		this.sendResponse(response);
	}

	protected async continueRequest(response: DebugProtocol.ContinueResponse, args: DebugProtocol.ContinueArguments): Promise<void> {
		console.log('session: continue request: ', args);
		await this.debuggerRuntime.continue();
		this.sendResponse(response);
	}

	protected async nextRequest(response: DebugProtocol.NextResponse, args: DebugProtocol.NextArguments): Promise<void> {
		console.log('session: next request: ', args);
		await this.debuggerRuntime.step();
		this.sendResponse(response);
	}

	protected async stepInRequest(response: DebugProtocol.StepInResponse, args: DebugProtocol.StepInArguments): Promise<void> {
		console.log('session: step into request: ', args);
		await this.debuggerRuntime.step();
		this.sendResponse(response);
	}

	protected async stepOutRequest(response: DebugProtocol.StepOutResponse, args: DebugProtocol.StepOutArguments): Promise<void> {
		console.log('session: step out request: ', args);
		await this.debuggerRuntime.step();
		this.sendResponse(response);
	}

	protected terminateRequest(response: DebugProtocol.TerminateResponse, args: DebugProtocol.TerminateArguments, request?: DebugProtocol.Request) {
		console.log('session: terminate request: ', args, request);
		super.terminateRequest(response,args,request);
		this.debuggerRuntime.stop();
	}

	protected disconnectRequest(response: DebugProtocol.DisconnectResponse, args: DebugProtocol.DisconnectArguments, request?: DebugProtocol.Request) {
		console.log('session: disconnect request: ', args, request);
		super.disconnectRequest(response,args,request);
		this.debuggerRuntime.stop();
	}

	//---- helpers

	private createSource(filePath: string): Source {
		return new Source(basename(filePath), this.convertDebuggerPathToClient(filePath), undefined, undefined, 'phobo-adapter-data');
	}

	// private async setNextStatement(line: number, col: number) : Promise<void> {
	// 	try {
	// 		const debugSession = vscode.debug.activeDebugSession;
	// 		if (!debugSession) {
	// 			return;
	// 		}
			
	// 		const currentEditor = vscode.window.activeTextEditor;
	
	// 		if (!currentEditor) {
	// 			return;
	// 		}

	// 		const currentDocument = currentEditor.document;
	// 		if (currentDocument.isDirty) {
	// 			throw new Error("The current document has unsaved edits.");
	// 		} 
	
	// 		console.log("session: set next statement: ", line, col);

	// 		const gotoTargetsArg : DebugProtocol.GotoTargetsArguments = {
	// 			source: {
	// 				path: currentDocument.uri.fsPath
	// 			},
	// 			line: line,
	// 			column: col
	// 		};
	
	// 		const gotoTargetsResponseBody = await debugSession.customRequest('gotoTargets', gotoTargetsArg);
	
	// 		const gotoArg  = {
	// 			targetId: PhoboDebugSession.threadID
	// 		};
	
	// 		await debugSession.customRequest('goto', gotoArg);
	// 	} 
	// 	catch (err) {
	// 		vscode.window.showErrorMessage(`Unable to set the next statement. ${err}`);
	// 	}
	// }
}