import { EventEmitter } from 'events';
import * as ws from 'ws';
import { execFile } from 'child_process';
import * as vscode from 'vscode';
import { Scheme } from '../scheme/scheme';
import * as fs from 'fs';
import * as path from 'path';
import { ChildProcess } from 'node:child_process';

export interface FileAccessor {
	readFile(path: string): Promise<string>;
}

export enum DebuggerActionType {
    NONE=0,
    CONTINUE=1,
    STEP=2,
    STOP=3,
    BREAKPOINT=4,
    BREAKPOINTCHANGED=5,
    STEPINFO=6
}

interface IStackFrame {
	index: number;
	name: string;
	file: string;
	line: number;
	column?: number;
}

interface IStack {
	count: number;
	frames: IStackFrame[];
}

export default class DebuggerRuntime extends EventEmitter {

    private server?: ws.Server;
    private lastFrame?: any;
    public sourceFile?: string;
    private _isRunning = false;
    private debuggeeProcess?: ChildProcess;

    constructor() {
        super();
    }

    private onConnection(socket: ws): any {
        console.log('client connected: ', socket.url);
        socket.on('message', this.onMessage.bind(this,socket));
        socket.on('close', this.onClose.bind(this));
    }

    private async onMessage(socket: ws, message: any): Promise<any> {
        console.log('received: %s', message);
        try {
            const json = JSON.parse(message);
            this.lastFrame = json;
            if (json.type === DebuggerActionType.BREAKPOINT) {
                this.sendEvent('stopOnBreak', this.lastFrame);
            } else if(json.type === DebuggerActionType.STEPINFO) {
                this.sendEvent('stepInfo', this.lastFrame);
            }
            
        } catch (error) {
            
        }
    }

    private async onClose(event: ws.CloseEvent): Promise<any> {
        console.log('client disconnected: %s', event.reason);
    }

    public async start(breakpoints: number[]) {
        let self = this;
        this._isRunning = true;
        const serverPort = this.randomPort(7000, 9000);
        console.log('start server at port: ', serverPort);
        this.server = new ws.Server({ port: serverPort, clientTracking: true });
        this.server.on('connection', this.onConnection.bind(this));
        if (vscode.window.activeTextEditor) {
            if (vscode.window.activeTextEditor.document.uri.scheme !== Scheme.Phobo) {
                const execPath = vscode.workspace.getConfiguration('phobo').get('executablePath');
                if (fs.existsSync(<string>execPath)) {
                    let breakArgs = [vscode.window.activeTextEditor.document.fileName,'--d','--attach-dbg', '--port', `${serverPort}`];
                    if (breakpoints && breakpoints.length > 0) {
			            breakpoints.forEach(x => { breakArgs.push(`--b`);breakArgs.push(`${x}`);});
                    }
                    this.debuggeeProcess = execFile(<string>execPath,breakArgs, {
                        cwd: path.dirname(<string>execPath)
                    },function(error, stdout,stderr) {
                        if (error) {
                            console.log('execute phobo error: ', error);
                        }
                        if (stdout) {
                            console.log(stdout);
                            self.sendEvent('log', stdout);
                        }
                    });
                    if (this.debuggeeProcess) {
                        console.log("phobo pid: ", this.debuggeeProcess.pid);
                        this.debuggeeProcess.on('exit', this.onDebuggeeExit.bind(this));
                        this.debuggeeProcess.stdout?.on('data', this.onStdoutData.bind(this));
                    }
                    
                } else {
                    vscode.window.showWarningMessage(`Could not find Phobo executable. Go to Preferences and set the Phobo exectuable path`);
                }
            }
        }
    }

    public async stop() {
        if (this.server) {
            console.log('close server');
            this.server.close();
            this._isRunning = false;
        }

        if (this.debuggeeProcess) {
            console.log('kill phobo');
            this.debuggeeProcess.kill();
        }
    }

    public async step() {
        if (this.lastFrame) {
            if (this.server?.clients) {
                for(let client of this.server.clients) {
                    client.send(JSON.stringify({
                        id:this.lastFrame.id,
                        type: DebuggerActionType.STEP,
                        data: null
                    }));
                }
            }
        }
    }

    public async continue() {
        if (this.lastFrame) {
            if (this.server?.clients) {
                for(let client of this.server.clients) {
                    client.send(JSON.stringify({
                        id:this.lastFrame.id,
                        type: DebuggerActionType.CONTINUE,
                        data: null
                    }));
                }
            }
        }
    }

    private sendEvent(event: string, ... args: any[]) {
		setImmediate(_ => {
			this.emit(event, ...args);
		});
	}

    public stack(startFrame: number, endFrame: number): IStack {

		console.log("debug runtime: get stack: ", startFrame, endFrame);

        const frames = new Array<IStackFrame>();

        if (this.lastFrame) {

            const stackFrame: IStackFrame = {
                index: 0,
                name: this.lastFrame.data.text,
                file: this.sourceFile!,
                line: this.lastFrame.data.line
            };
            frames.push(stackFrame);
        }
		
		return {
			frames: frames,
			count: frames.length
		};
	}

    public isRunning(): boolean {
        return this._isRunning;
    }

    private onDebuggeeExit(code: number) {
        console.log('phobo exited with code: ', code);
        this.sendEvent('end', code);
    }

    private onStdoutData(data: any) {
        this.sendEvent('log', data);
    }

    private randomPort(min: number, max: number) {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    public setBreakpoints(breakpoints: number[]) {
        if (this.server?.clients) {
            for(let client of this.server.clients) {
                client.send(JSON.stringify({
                    id:0,
                    type: DebuggerActionType.BREAKPOINTCHANGED,
                    data: breakpoints
                }));
            }
        }
    }

    public getLastFrame() : any {
        return this.lastFrame;
    }
}