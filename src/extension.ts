import * as vscode from 'vscode';
import { CaseConverter } from './caseConverter';
import { TextCaseKind } from './textCaseKind';

export function activate(context: vscode.ExtensionContext) {

	let commands: vscode.Disposable[] = [];
	Object.entries(TextCaseKind).forEach((keyValue, _) => {
		const key = keyValue[0];
		const caseKind = keyValue[1];

		let command = vscode.commands.registerTextEditorCommand(`case.converter.${caseKind}`, (textEditor, edit, ...args: any[]) => {
			for (let i = 0; i < textEditor.selections.length; i++) {
				try {
					const selection = textEditor.selections[i];
					const text = textEditor.document.getText(new vscode.Range(selection.start, selection.end));
					let cc = new CaseConverter();
					const result = cc.changeCase(text, caseKind);
					edit.replace(selection, result);
				} catch (error) {
					if (error instanceof Error) {
						vscode.window.showWarningMessage(error.message);
					}
				}
			}
		});
		commands.push(command);
		context.subscriptions.push(command);
	});
}

export function deactivate() { }
