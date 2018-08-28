'use strict'

import * as vscode from 'vscode'
import * as clipboardy from 'clipboardy'
import translate = require('google-translate-api')

export function activate(ctx: vscode.ExtensionContext) {
	console.log('Activated!')
	const disposable = vscode.commands.registerCommand('extension.translate', async () => {
		const editor = vscode.window.activeTextEditor
		const selectedText = editor ? editor.document.getText(editor.selection) : null
		const text =
			selectedText ||
			(await vscode.window.showInputBox({
				prompt: 'The text to translate'
			}))
		if (!text) {
			vscode.window.showErrorMessage('No text to translate.')
			return
		}
		const from = await vscode.window.showInputBox({
			prompt: 'Source language',
			value: 'auto'
		})
		if (!from) {
			vscode.window.showErrorMessage('No source language.')
			return
		}
		const to = await vscode.window.showInputBox({
			prompt: 'Target language',
			value: vscode.env.language
		})
		if (!to) {
			vscode.window.showErrorMessage('No target language.')
			return
		}
		const { text: translatedText } = await translate(text, { from, to })
		const userAction = await vscode.window.showInformationMessage(translatedText, 'Copy')
		if (userAction === 'Copy') {
			clipboardy.write(translatedText)
		}
	})

	ctx.subscriptions.push(disposable)
}
export function deactivate() {}
