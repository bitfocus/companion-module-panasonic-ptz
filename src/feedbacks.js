import { combineRgb } from '@companion-module/base'
import { getAndUpdateSeries } from './common.js'

// ########################
// #### Value Look Ups ####
// ########################
const CHOICES_PRESET = []
for (let i = 0; i < 100; ++i) {
	CHOICES_PRESET.push({ id: ('0' + (i+1).toString(10)).substr(-2, 2), label: 'Preset ' + (i + 1) })
}

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
			description: 'Indicate if Camera is ON or OFF',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate Power State',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'OFF' },
						{ id: '1', label: 'ON' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.power === 'OFF') {
							return true
						}
						break
					case '1':
						if (self.data.power === 'ON') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.colorbarState) {
		feedbacks.colorbarState = {
			type: 'boolean',
			name: 'System - Color Bar State',
			description: 'Indicates whether the color bar is currently ENABLED on this camera',
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
			description: 'Indicate if red Tally is ON or OFF',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'OFF' },
						{ id: '1', label: 'ON' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.tally === 'OFF') {
							return true
						}
						break
					case '1':
						if (self.data.tally === 'ON') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.tally2State) {
		feedbacks.tally2State = {
			type: 'boolean',
			name: 'System - Green Tally State',
			description: 'Indicate if green Tally is ON or OFF',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'OFF' },
						{ id: '1', label: 'ON' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.tally2 === 'OFF') {
							return true
						}
						break
					case '1':
						if (self.data.tally2 === 'ON') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.insState) {
		feedbacks.insState = {
			type: 'boolean',
			name: 'System - Install Position',
			description: 'Indicate if PTZ is on Desktop or Hanging',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X position',
					id: 'option',
					default: '1',
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
					default:
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
			description: 'Indicate if Auto focus is ON or OFF',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Manual' },
						{ id: '1', label: 'Auto' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.oaf === 'Manual') {
							return true
						}
						break
					case '1':
						if (self.data.oaf === 'Auto') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.autoIris) {
		feedbacks.autoIris = {
			type: 'boolean',
			name: 'Lens - Auto Iris State',
			description: 'Indicate if Auto iris is ON or OFF',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: '1',
					choices: [
						{ id: '0', label: 'Manual' },
						{ id: '1', label: 'Auto' },
					],
				},
			],
			callback: function (feedback) {
				const opt = feedback.options
				switch (opt.option) {
					case '0':
						if (self.data.irisMode === 'Manual') {
							return true
						}
						break
					case '1':
						if (self.data.irisMode === 'Auto') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
	}

	if (SERIES.feedbacks.preset) {
		feedbacks.recallModePset = {
			type: 'boolean',
			name: 'Preset - Mode A, B, C',
			description: 'Indicate what preset mode is currently selected on the camera',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
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
		feedbacks.presetCompletion = {
			type: 'boolean',
			name: 'Preset Completion Notification',
			description: 'Indicate if recalled preset is completed',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorOrange,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: CHOICES_PRESET[0].id,
					choices: CHOICES_PRESET,
				},
			],
			callback: function (feedback) {
				return (self.data.lastPresetCompleted == feedback.options.val) ? true : false
			},
		}
	}

	return feedbacks
}
