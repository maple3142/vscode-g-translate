'use strict'

import * as vscode from 'vscode'
import translate = require('google-translate-api')

export function activate(ctx: vscode.ExtensionContext) {
	console.log('Activated!')
	const disposable = vscode.commands.registerCommand('extension.translate', async () => {
		const text = await vscode.window.showInputBox({
			placeHolder: 'The text to translate.'
		})
		if (!text) {
			return
		}
		const from = await vscode.window.showInputBox({
			placeHolder: 'Text language.',
			value: 'auto'
		})
		if (!from) {
			return
		}
		const to = await vscode.window.showInputBox({
			placeHolder: 'Translate target.',
			value: vscode.env.language
		})
		if (!to) {
			return
		}
		const { text: translatedText } = await translate(text, { from, to })
		vscode.window.showInformationMessage(translatedText)
	})

	ctx.subscriptions.push(disposable)
}
export function deactivate() {}
