import { CreateConvertToBooleanFeedbackUpgradeScript } from '@companion-module/base'

export const UpgradeScripts = [
	CreateConvertToBooleanFeedbackUpgradeScript({
		powerState: true,
		tallyState: true,
		insState: true,
		autoFocus: true,
		autoIris: true,
		modePset: true,
	}),
]
