import { combineRgb } from '@companion-module/base'
import { getAndUpdateSeries } from './common.js'
import { e } from './enum.js'

// ##########################
// #### Define Feedbacks ####
// ##########################
export function getFeedbackDefinitions(self) {
	const feedbacks = {}

	const SERIES = getAndUpdateSeries(self)
	// console.log(SERIES);

	const foregroundColor = combineRgb(255, 255, 255) // White
	const backgroundColorBlack = combineRgb(0, 0, 0) // Black
	const backgroundColorRed = combineRgb(255, 0, 0) // Red
	const backgroundColorGreen = combineRgb(0, 255, 0) // Green
	const backgroundColorOrange = combineRgb(255, 102, 0) // Orange
	const backgroundColorBlue = combineRgb(0, 51, 204)
	const backgroundColorGrey = combineRgb(51, 51, 51)

	if (SERIES.capabilities.power) {
		feedbacks.powerState = {
			type: 'boolean',
			name: 'System - Power State',
			description: 'Indicates if the camera is currently fully powered',
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

	if (SERIES.capabilities.colorbar) {
		feedbacks.colorbarState = {
			type: 'boolean',
			name: 'System - Color Bar State',
			description: 'Indicates if the color bar is currently enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.colorbar === 'ON'
			},
		}
	}

	if (SERIES.capabilities.tally) {
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

	if (SERIES.capabilities.tally2) {
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

	if (SERIES.capabilities.tally3) {
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

	if (SERIES.capabilities.install) {
		feedbacks.installState = {
			type: 'boolean',
			name: 'System - Install Position',
			description: 'Indicates if the selected mounting position is currently active',
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

	if (SERIES.capabilities.focusAuto) {
		feedbacks.autoFocus = {
			type: 'boolean',
			name: 'Lens - Focus Mode Auto',
			description: 'Indicates if Auto Focus is currently enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.focusMode === 'Auto'
			},
		}
	}

	if (SERIES.capabilities.irisAuto) {
		feedbacks.autoIris = {
			type: 'boolean',
			name: 'Lens - Iris Mode Auto',
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

	if (SERIES.capabilities.preset) {
		feedbacks.recallModePset = {
			type: 'boolean',
			name: 'Preset - Recall Mode',
			description: 'Indicates if the selected preset recall mode is currently active',
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
						if (self.data.presetScopeMode === 'Mode A') {
							return true
						}
						break
					case '1':
						if (self.data.presetScopeMode === 'Mode B') {
							return true
						}
						break
					case '2':
						if (self.data.presetScopeMode === 'Mode C') {
							return true
						}
						break
					default:
						break
				}
				return false
			},
		}
		feedbacks.presetSelected = {
			type: 'boolean',
			name: 'Preset - Selected / Active',
			description: 'Indicates if the selected preset is currently active (last selected)',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorOrange,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'option',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: function (feedback) {
				return self.data.presetSelectedIdx === parseInt(feedback.options.option)
			},
		}
		feedbacks.presetComplete = {
			type: 'boolean',
			name: 'Preset - Recall Completion Notification',
			description: 'Indicates if the last recall to the selected preset is completed',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorBlue,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'option',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: function (feedback) {
				return self.data.presetCompletedIdx === parseInt(feedback.options.option)
			},
		}
		feedbacks.presetMemory = {
			type: 'boolean',
			name: 'Preset - Memory State',
			description: 'Indicates if the selected preset memory slot is used',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorGrey,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'option',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: function (feedback) {
				return self.data.presetEntries[parseInt(feedback.options.option)] === '1'
			},
		}
	}

	if (SERIES.capabilities.ois) {
		feedbacks.oisMode = {
			type: 'boolean',
			name: 'Image Stabilization - Mode',
			description: 'Indicates whether the selected image stabilization mode is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'option',
					default: SERIES.capabilities.ois.dropdown[0].id,
					choices: SERIES.capabilities.ois.dropdown,
				},
			],
			callback: function (feedback) {
				return self.data.ois === feedback.options.option
			},
		}
	}

	if (SERIES.capabilities.whiteBalance) {
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
					default: SERIES.capabilities.whiteBalance.dropdown[0].id,
					choices: SERIES.capabilities.whiteBalance.dropdown
				},
			],
			callback: function (feedback) {
				return self.data.whiteBalance === feedback.options.option
			},
		}
	}

	if (SERIES.capabilities.recordSD) {
		feedbacks.recState = {
			type: 'boolean',
			name: 'Recording - State',
			description: 'Indicates if currently recording on camera',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.recording === 'ON'
			},
		}
	}

	if (SERIES.capabilities.streamRTMP) {
		feedbacks.streamStateRTMP = {
			type: 'boolean',
			name: 'Streaming - RTMP Client State',
			description: 'Indicates if streaming in RTMP Client Mode is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.streamRTMP
			},
		}
	}

	if (SERIES.capabilities.streamSRT) {
		feedbacks.streamStateSRT = {
			type: 'boolean',
			name: 'Streaming - SRT Caller State',
			description: 'Indicates if streaming in SRT Caller Mode is currently active',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: function (feedback) {
				return self.data.streamSRT
			},
		}
	}

	return feedbacks
}
