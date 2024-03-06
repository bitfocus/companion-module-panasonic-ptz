import { combineRgb } from '@companion-module/base'
import { getAndUpdateSeries } from './common.js'
import ICONS from './icons.js'

export function getPresetDefinitions(self) {
	const presets = {}

	const colorWhite = combineRgb(255, 255, 255)
	const colorRed = combineRgb(255, 0, 0)
	const colorOrange = combineRgb(255, 102, 0)
	const colorYellow = combineRgb(255, 255, 0)
	const colorGreen = combineRgb(0, 255, 0)
	//const colorPurple = combineRgb(255, 0, 255)
	//const colorActiveBlue = combineRgb(0, 51, 204)
	const colorBlue = combineRgb(0, 51, 204)
	const colorDarkRed = combineRgb(102, 0, 0)
	const colorDarkBlue = combineRgb(0, 0, 102)
	const colorGrey = combineRgb(51, 51, 51)
	const colorBlack = combineRgb(0, 0, 0)

	const SERIES = getAndUpdateSeries(self)
	// console.log(SERIES);

	// ##########################
	// #### Pan/Tilt Presets ####
	// ##########################

	if (SERIES.capabilities.panTilt) {
		presets['pan-tilt-up'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'UP',
			style: {
				text: '',
				png64: ICONS.UP,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '12',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-down'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'DOWN',
			style: {
				text: '',
				png64: ICONS.DOWN,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '10',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-left'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'LEFT',
			style: {
				text: '',
				png64: ICONS.LEFT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '01',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-right'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'RIGHT',
			style: {
				text: '',
				png64: ICONS.RIGHT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '21',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-up-right'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'UP RIGHT',
			style: {
				text: '',
				png64: ICONS.UP_RIGHT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '22',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-up-left'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'UP LEFT',
			style: {
				text: '',
				png64: ICONS.UP_LEFT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '02',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-down-left'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'DOWN LEFT',
			style: {
				text: '',
				png64: ICONS.DOWN_LEFT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '00',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-down-right'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'DOWN RIGHT',
			style: {
				text: '',
				png64: ICONS.DOWN_RIGHT,
				pngalignment: 'center:center',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptMove',
							options: {
								dir: '20',
							},
						},
					],
					up: [
						{
							actionId: 'ptMove',
							options: {
								dir: '11',
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-home'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Home',
			style: {
				text: 'HOME',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'home',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.ptSpeed) {
		presets['pan-tilt-speed'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed',
			style: {
				text: 'P/T SPEED\\n$(generic-module:ptSpeed)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeed',
							options: {
								scope: 'pt',
								op: 's',
								speed: 25,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'ptSpeed',
							options: {
								scope: 'pt',
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'ptSpeed',
							options: {
								scope: 'pt',
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	// ######################
	// #### Lens Presets ####
	// ######################

	if (SERIES.capabilities.zoom) {
		presets['lens-zoom'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom In',
			style: {
				text: 'ZOOM\\nIN',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoom',
							options: {
								dir: 1,
							},
						},
					],
					up: [
						{
							actionId: 'zoom',
							options: {
								dir: 0,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.zSpeed) {
		presets['lens-zoom-speed'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed Up',
			style: {
				text: 'ZOOM\\nSPEED\\nUP\\n$(generic-module:zSpeed)',
				size: '7',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zSpeedU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.focus) {
		presets['lens-focus'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Near',
			style: {
				text: 'FOCUS\\nNEAR',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusN',
							options: {},
						},
					],
					up: [
						{
							actionId: 'focusS',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.fSpeed) {
		presets['lens-focus-speed'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed Up',
			style: {
				text: 'FOCUS\\nSPEED\\nUP\\n$(generic-module:fSpeed)',
				size: '7',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fSpeedU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.focusAuto) {
		presets['lens-focus-auto'] = {
			type: 'button',
			category: 'Lens',
			name: 'Auto Focus',
			style: {
				text: 'AUTO\\nFOCUS',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusM',
							options: {
								bol: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'autoFocus',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets['lens-focus-push-auto'] = {
			type: 'button',
			category: 'Lens',
			name: 'Push Auto Focus',
			style: {
				text: 'PUSH\\nAUTO\\nFOCUS',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusPushAuto',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	presets[`lens-ois-mode`] = {
		type: 'button',
		category: 'Lens',
		name: 'O.I.S. Mode',
		style: {
			text: 'O.I.S.\n$(generic-module:ois)',
			size: '14',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		options: {
			rotaryActions: true,
		},
		steps: [
			{
				down: [
					{
						actionId: 'ois',
						options: {
							op: 't',
						},
					},
				],
				up: [],
				rotate_left: [
					{
						actionId: 'ois',
						options: {
							op: -1,
						},
					},
				],
				rotate_right: [
					{
						actionId: 'ois',
						options: {
							op: 1,
						},
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'oisMode',
				options: {
					option: SERIES.capabilities.ois.dropdown[0].id,
				},
				isInverted: true,
				style: {
					color: colorWhite,
					bgcolor: colorRed,
				},
			},
		],
	}

	// ##########################
	// #### Exposure Presets ####
	// ##########################

	if (SERIES.capabilities.iris) {
		presets['exposure-iris'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris',
			style: {
				text: 'IRIS\\n$(generic-module:irisPosition)\\n$(generic-module:irisPositionBar)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'irisMode',
							options: {
								op: 't',
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'iris',
							options: {
								op: -1,
								step: 0x1e,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'iris',
							options: {
								op: 1,
								step: 0x1e,
							},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'irisMode',
					options: {},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets['exposure-iris-auto'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Auto Iris',
			style: {
				text: 'AUTO\\nIRIS',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'iris',
							options: {
								bol: 1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'autoIris',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.gain) {
		presets['exposure-gain'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Up',
			style: {
				text: 'GAIN\\nUP',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.shutter) {
		presets['exposure-shutter-up'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Up',
			style: {
				text: 'Shut\\nUP',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['exposure-shutter-down'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Down',
			style: {
				text: 'Shut\\nDOWN',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.pedestal) {
		presets['exposure-pedestal'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Master Pedestal',
			style: {
				text: 'Pedestal\\n$(generic-module:masterPed)',
				size: '14',
				color: colorWhite,
				bgcolor: colorGrey,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ped',
							options: {
								op: 's',
								speed: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'ped',
							options: {
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'ped',
							options: {
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.filter) {
		presets['exposure-filter'] = {
			type: 'button',
			category: 'Exposure',
			name: 'ND Filter',
			style: {
				text: 'ND Filter\\n$(generic-module:filter)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'filter',
							options: {
								op: 's',
								set: SERIES.capabilities.filter.dropdown[0].id,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'filter',
							options: {
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'filter',
							options: {
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'filterMode',
					options: {
						option: SERIES.capabilities.filter.dropdown[0].id,
					},
					isInverted: true,
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	// ########################
	// #### System Presets ####
	// ########################

	if (SERIES.capabilities.power) {
		presets['system-power'] = {
			type: 'button',
			category: 'System',
			name: 'Power Off',
			style: {
				text: 'Power\\nOFF',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'powerOff',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'powerState',
					options: {
						option: '0',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.colorbar) {
		presets['system-colorbar'] = {
			type: 'button',
			category: 'System',
			name: 'Color Bar',
			style: {
				text: 'Color Bar',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'colorbarOff',
							options: {},
						},
					],
					up: [],
				},
				{
					down: [
						{
							actionId: 'colorbarOn',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'colorbarState',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.tally) {
		presets['system-tally'] = {
			type: 'button',
			category: 'System',
			name: 'Red Tally',
			style: {
				text: 'TALLY',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tallyState',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.tally2) {
		presets['system-tally2'] = {
			type: 'button',
			category: 'System',
			name: 'Green Tally',
			style: {
				text: 'TALLY',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tally2State',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorGreen,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.tally3) {
		presets['system-tally3'] = {
			type: 'button',
			category: 'System',
			name: 'Yellow Tally',
			style: {
				text: 'TALLY',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tally3State',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorYellow,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.ins) {
		presets['system-ins-desktop'] = {
			type: 'button',
			category: 'System',
			name: 'INS Desktop',
			style: {
				text: 'INS\\nDesk',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'insPosition',
							options: {
								position: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'insState',
					options: {
						option: '0',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets['system-ins-hanging'] = {
			type: 'button',
			category: 'System',
			name: 'INS Hanging',
			style: {
				text: 'INS\\nHang',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'insPosition',
							options: {
								position: 1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'insState',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.recordSD) {
		presets['system-sd-card-recording-start'] = {
			type: 'button',
			category: 'System',
			name: 'SD Card Recording Start',
			style: {
				text: 'SD Card\\nRecording\\nStart',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sdCardRec',
							options: {
								value: 'start',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['system-sd-card-recording-stop'] = {
			type: 'button',
			category: 'System',
			name: 'SD Card Recording Stop',
			style: {
				text: 'SD Card\\nRecording\\nStop',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sdCardRec',
							options: {
								value: 'end',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// #################
	// #### Presets ####
	// #################

	if (SERIES.capabilities.presetSpeed && SERIES.capabilities.presetTime) {
		presets['recall-preset-preset-mode-speed'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Mode Speed',
			style: {
				text: 'PRESET\\nMODE\\nSPEED',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'modePset',
							options: {
								mode: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['recall-preset-preset-mode-time'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Mode Time',
			style: {
				text: 'PRESET\\nMODE\\nTIME',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'modePset',
							options: {
								mode: 1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.presetSpeed) {
		presets['recall-preset-speed-high'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Speed High',
			style: {
				text: 'RECALL\\nSPEED\\nHIGH',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 25,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['recall-preset-speed-mid'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Speed Mid',
			style: {
				text: 'RECALL\\nSPEED\\nMID',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 15,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['recall-preset-speed-low'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Speed Low',
			style: {
				text: 'RECALL\\nSPEED\\nLOW',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 5,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.presetTime) {
		presets['recall-preset-time-high'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Time High',
			style: {
				text: 'RECALL\\nTIME\\n5 Sec',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 5,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['recall-preset-time-mid'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Time Mid',
			style: {
				text: 'RECALL\\nTIME\\n10 Sec',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 10,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['recall-preset-time-low'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Set Recall Time Low',
			style: {
				text: 'RECALL\\nTIME\\n30 Sec',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speedPset',
							options: {
								speed: 30,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.preset) {
		presets['recall-preset-mode-a'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Mode A',
			style: {
				text: 'Preset\\nMode A',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'recallModePset',
							options: {
								val: '0',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recallModePset',
					options: {
						option: '0',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets['recall-preset-mode-b'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Mode B',
			style: {
				text: 'Preset\\nMode B',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'recallModePset',
							options: {
								val: '1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recallModePset',
					options: {
						option: '1',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		presets['recall-preset-mode-c'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Mode C',
			style: {
				text: 'Preset\\nMode C',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'recallModePset',
							options: {
								val: '2',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recallModePset',
					options: {
						option: '2',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		for (let i = 0; i < 100; i++) {
			presets[`recall-preset-${i}`] = {
				type: 'button',
				category: 'Preset Memory',
				name: 'Recall, Store or Clear Preset ' + (i + 1).toString(),
				style: {
					text: 'PRESET\\n' + (i + 1).toString(),
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				options: {
					relativeDelay: false,
				},
				steps: [
					{
						down: [
							{
								actionId: 'presetResetSelectedCompletedState',
								options: {},
							},
						],
						up: [
							{
								actionId: 'presetMem',
								options: {
									op: 'R',
									val: i.toString(10).padStart(2, '0'),
								},
							},
						],
						1000: {
							options: { runWhileHeld: true },
							actions: [
								{
									actionId: 'presetMem',
									options: {
										op: 'M',
										val: i.toString(10).padStart(2, '0'),
									},
								},
							],
						},
						2000: {
							options: { runWhileHeld: true },
							actions: [
								{
									actionId: 'presetMem',
									options: {
										op: 'C',
										val: i.toString(10).padStart(2, '0'),
									},
								},
							],
						},
					},
				],
				feedbacks: [
					{
						feedbackId: 'presetMemory',
						options: {
							option: i.toString(10).padStart(2, '0'),
						},
						style: {
							color: colorWhite,
							bgcolor: colorGrey,
						},
					},
					{
						feedbackId: 'presetThumbnail',
						options: {
							option: i.toString(10).padStart(2, '0'),
						},
					},
					{
						feedbackId: 'presetSelected',
						options: {
							option: i.toString(10).padStart(2, '0'),
						},
						style: {
							color: colorWhite,
							bgcolor: colorOrange,
						},
					},
					{
						feedbackId: 'presetComplete',
						options: {
							option: i.toString(10).padStart(2, '0'),
						},
						style: {
							color: colorWhite,
							bgcolor: colorBlue,
						},
					},
				],
			}
		}
	}

	// ###############################
	// #### White Balance Presets ####
	// ###############################

	let steps = []
	for (const x in SERIES.capabilities.whiteBalance.dropdown) {
		steps.push({
			down: [
				{
					actionId: 'whiteBalanceMode',
					options: {
						val: SERIES.capabilities.whiteBalance.dropdown[x].id,
					},
				},
			],
			up: [],
		})
	}
	presets[`whitebalance-mode`] = {
		type: 'button',
		category: 'White Balance',
		name: 'White Balance Mode',
		style: {
			text: 'WB MODE\\n$(generic-module:whiteBalance)',
			size: '14',
			color: colorWhite,
			bgcolor: colorBlack,
		},
		steps: steps,
		feedbacks: [
			{
				feedbackId: 'whiteBalanceMode',
				options: {
					option: SERIES.capabilities.whiteBalance.dropdown[0].id,
				},
				style: {
					color: colorWhite,
					bgcolor: colorRed,
				},
			},
		],
	}

	if (SERIES.capabilities.colorGain) {
		presets['whitebalance-color-temp'] = {
			type: 'button',
			category: 'White Balance',
			name: 'Color Temperature',
			style: {
				text: 'Temp.\\n$(generic-module:colorTemperature)',
				size: '14',
				color: colorBlack,
				bgcolor: colorWhite,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [],
					up: [],
					rotate_left: [
						{
							actionId: 'colorTemperatureDown',
							options: {},
						},
					],
					rotate_right: [
						{
							actionId: 'colorTemperatureUp',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.colorGain) {
		presets['whitebalance-red-gain'] = {
			type: 'button',
			category: 'White Balance',
			name: 'Red Gain',
			style: {
				text: 'Red Gain\\n$(generic-module:redGain)',
				size: '14',
				color: colorWhite,
				bgcolor: colorRed,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [],
					up: [],
					rotate_left: [
						{
							actionId: 'gainRedD',
							options: {},
						},
					],
					rotate_right: [
						{
							actionId: 'gainRedU',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['whitebalance-blue-gain'] = {
			type: 'button',
			category: 'White Balance',
			name: 'Blue Gain',
			style: {
				text: 'Blue Gain\\n$(generic-module:blueGain)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlue,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [],
					up: [],
					rotate_left: [
						{
							actionId: 'gainBlueD',
							options: {},
						},
					],
					rotate_right: [
						{
							actionId: 'gainBlueU',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.colorPedestal) {
		presets['whitebalance-red-ped'] = {
			type: 'button',
			category: 'White Balance',
			name: 'Red Pedestal',
			style: {
				text: 'Red Ped.\\n$(generic-module:redPed)',
				size: '14',
				color: colorWhite,
				bgcolor: colorDarkRed,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [],
					up: [],
					rotate_left: [
						{
							actionId: 'pedRedD',
							options: {},
						},
					],
					rotate_right: [
						{
							actionId: 'pedRedU',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['whitebalance-blue-ped'] = {
			type: 'button',
			category: 'White Balance',
			name: 'Blue Pedestal',
			style: {
				text: 'Blue Ped.\\n$(generic-module:bluePed)',
				size: '14',
				color: colorWhite,
				bgcolor: colorDarkBlue,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [],
					up: [],
					rotate_left: [
						{
							actionId: 'pedBlueD',
							options: {},
						},
					],
					rotate_right: [
						{
							actionId: 'pedBlueU',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	// ###########################
	// #### Streaming Presets ####
	// ###########################

	if (SERIES.capabilities.streamRTMP) {
		presets['streaming-rtmp-start'] = {
			type: 'button',
			category: 'Streaming',
			name: 'RTMP (Client) Streaming Start',
			style: {
				text: 'RTMP\\nStreaming\\nStart',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rtmpStreamCtrl',
							options: {
								value: 'start',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['streaming-rtmp-stop'] = {
			type: 'button',
			category: 'Streaming',
			name: 'RTMP (Client) Streaming Stop',
			style: {
				text: 'RTMP\\nStreaming\\nStop',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rtmpStreamCtrl',
							options: {
								value: 'stop',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.streamSRT) {
		presets['streaming-srt-start'] = {
			type: 'button',
			category: 'Streaming',
			name: 'SRT (Caller) Streaming Start',
			style: {
				text: 'SRT\\nStreaming\\nStart',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'srtStreamCtrl',
							options: {
								value: 'start',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['streaming-srt-stop'] = {
			type: 'button',
			category: 'Streaming',
			name: 'SRT (Caller) Streaming Stop',
			style: {
				text: 'SRT\\nStreaming\\nStop',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'srtStreamCtrl',
							options: {
								value: 'stop',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	return presets
}
