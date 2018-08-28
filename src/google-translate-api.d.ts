interface TranslateOption {
	from?: string
	to?: string
	raw?: boolean
}
interface TranslateResult {
	text: string
	from: {
		language: {
			didYouMean: boolean
			iso: string
		}
		text: {
			autoCorrected: boolean
			value: string
			didYouMean: boolean
		}
	}
	raw: string
}
declare module 'google-translate-api' {
	function fn(text: string, options?: TranslateOption): Promise<TranslateResult>
	export = fn
}
