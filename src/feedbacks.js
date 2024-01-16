import { combineRgb } from '@companion-module/base'
import { getAndUpdateSeries } from './common.js'
import { c } from './choices.js'

// ##########################
// #### Define Feedbacks ####
// ##########################
export function getFeedbackDefinitions(self) {
	const feedbacks = {}

	const SERIES = getAndUpdateSeries(self)
	// console.log(SERIES);

	const foregroundColor = combineRgb(255, 255, 255) // White
	const backgroundColorRed = combineRgb(255, 0, 0) // Red
	const backgroundColorGreen = combineRgb(0, 255, 0) // Green
	const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

	if (SERIES.feedbacks.powerState) {
		feedbacks.powerState = {
			type: 'boolean',
			name: 'System - Power State',
			description: 'Indicates if the camera is currently powered on',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.power === 'ON'
			}
		}
	}

	if (SERIES.feedbacks.colorbarState) {
		feedbacks.colorbarState = {
			type: 'boolean',
			name: 'System - Color Bar State',
			description: 'Indicates if the color bar is currently enabled on this camera',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.colorbar
			},
		}
	}

	if (SERIES.feedbacks.tallyState) {
		feedbacks.tallyState = {
			type: 'boolean',
			name: 'System - Red Tally State',
			description: 'Indicates if the red Tally is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.tally === 'ON'
			},
		}
	}

	if (SERIES.feedbacks.tally2State) {
		feedbacks.tally2State = {
			type: 'boolean',
			name: 'System - Green Tally State',
			description: 'Indicates if the green Tally is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorGreen,
			},
			options: [],
			callback: function (feedback) {
				return self.data.tally2 === 'ON'
			},
		}
	}

	if (SERIES.feedbacks.tally3State) {
		feedbacks.tally3State = {
			type: 'boolean',
			name: 'System - Yellow Tally State',
			description: 'Indicates if the yellow Tally is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorOrange,
			},
			options: [],
			callback: function (feedback) {
				return self.data.tally3 === 'ON'
			},
		}
	}

	if (SERIES.feedbacks.insState) {
		feedbacks.insState = {
			type: 'boolean',
			name: 'System - Install Position',
			description: 'Indicates the currently selected mounting position',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Position',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Desktop' },
						{ id: '1', label: 'Hanging' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.ins === 'Desktop') {
							return true
						}
						break
					case '1':
						if (self.data.ins === 'Hanging') {
							return true
						}
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.autoFocus) {
		feedbacks.autoFocus = {
			type: 'boolean',
			name: 'Lens - Auto Focus State',
			description: 'Indicates if Auto Focus is currently enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.autoFocus === 'Auto'
			},
		}
	}

	if (SERIES.feedbacks.autoIris) {
		feedbacks.autoIris = {
			type: 'boolean',
			name: 'Lens - Auto Iris State',
			description: 'Indicates if Auto Iris is currently enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.irisMode === 'Auto'
			},
		}
	}

	if (SERIES.feedbacks.preset) {
		feedbacks.recallModePset = {
			type: 'boolean',
			name: 'Preset - Mode A, B, C',
			description: 'Indicates which preset recall mode is currently selected',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'option',
					default: '0',
					choices: [
						{ id: '0', label: 'Mode A - PTZ + Iris + WB/Color' },
						{ id: '1', label: 'Mode B - PTZ + Iris' },
						{ id: '2', label: 'Mode C - PTZ only' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.recallModePset === 'Mode A') {
							return true
						}
						break
					case '1':
						if (self.data.recallModePset === 'Mode B') {
							return true
						}
						break
					case '2':
						if (self.data.recallModePset === 'Mode C') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
		feedbacks.presetComplete = {
			type: 'boolean',
			name: 'Preset - Recall Completion Notification',
			description: 'Indicates if the last preset recall is completed',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorOrange,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'option',
					default: c.CHOICES_PRESET[0].id,
					choices: c.CHOICES_PRESET,
				},
			],
			callback: function (feedback) {
				return self.data.lastPresetCompleted === parseInt(feedback.options.option)
			},
		}
	}

	if (SERIES.feedbacks.whiteBalance) {
		feedbacks.whiteBalanceMode = {
			type: 'boolean',
			name: 'White Balance - Mode',
			description: 'Indicates whether the selected white balance mode is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'option',
					default: c.CHOICES_WB_GET[0].id,
					choices: c.CHOICES_WB_GET,
				},
			],
			callback: function (feedback) {
				return self.data.whiteBalance === feedback.options.option
			},
		}
	}

	return feedbacks
}
