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
	const colorDarkGreen = combineRgb(0, 102, 0)
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

		presets['pan-tilt-position'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Pan/Tilt Position',
			style: {
				text: 'P/T Pos.\\n$(generic-module:panPositionDeg)°\\n$(generic-module:tiltPositionDeg)°',
				size: '14',
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

	presets['pan-tilt-speed'] = {
		type: 'button',
		category: 'Pan/Tilt',
		name: 'Speed',
		style: {
			text: 'P/T Speed\\n$(generic-module:ptSpeed)',
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
							set: 25,
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

	// ######################
	// #### Lens Presets ####
	// ######################

	if (SERIES.capabilities.zoom) {
		presets['lens-zoom'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom',
			style: {
				text: 'ZOOM\\n$(generic-module:zoomPosition)\\n$(generic-module:zoomPositionBar)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [],
		}

		presets['lens-zoom-in'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom In',
			style: {
				text: 'ZOOM\\nIN',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [ { actionId: 'zoom', options: { dir: 1 } } ],
					up: [ { actionId: 'zoom', options: { dir: 0 } } ]
				}],
			feedbacks: [],
		}

		presets['lens-zoom-out'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Out',
			style: {
				text: 'ZOOM\\nOUT',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [ { actionId: 'zoom', options: { dir: -1 } } ],
					up: [ { actionId: 'zoom', options: { dir: 0 } } ]
				}],
			feedbacks: [],
		}

		presets['lens-zoom-speed'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed',
			style: {
				text: 'Zoom\\nSpeed\\n$(generic-module:zSpeed)',
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
							actionId: 'zoomSpeed',
							options: { op: 's',	set: 25 },
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'zoomSpeed',
							options: { op: -1 },
						},
					],
					rotate_right: [
						{
							actionId: 'zoomSpeed',
							options: { op: 1 },
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.focus) {
		presets['lens-focus'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus',
			style: {
				text: 'FOCUS\\n$(generic-module:focusPosition)\\n$(generic-module:focusPositionBar)',
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
							actionId: 'focusPushAuto',
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'focusFollow',
							options: {
								op: -1,
								step: 10,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'focusFollow',
							options: {
								op: 1,
								step: 10,
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['lens-focus-far'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Far',
			style: {
				text: 'FOCUS\\nFAR',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [ { actionId: 'focus', options: { dir: 1 } } ],
					up: [ { actionId: 'focus', options: { dir: 0 } } ]
				}],
			feedbacks: [],
		}

		presets['lens-focus-near'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Near',
			style: {
				text: 'FOCUS\\nNEAR',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [ { actionId: 'focus', options: { dir: -1 } } ],
					up: [ { actionId: 'focus', options: { dir: 0 } } ]
				}],
			feedbacks: [],
		}

		presets['lens-focus-speed'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed',
			style: {
				text: 'Focus\\nSpeed\\n$(generic-module:zSpeed)',
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
							actionId: 'focusSpeed',
							options: { op: 's',	set: 25 },
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'focusSpeed',
							options: { op: -1 },
						},
					],
					rotate_right: [
						{
							actionId: 'focusSpeed',
							options: { op: 1 },
						},
					],
				},
			],
			feedbacks: [],
		}

		if (SERIES.capabilities.focusAuto) {
			presets['lens-focus-mode'] = {
				type: 'button',
				category: 'Lens',
				name: 'Focus Mode',
				style: {
					text: 'FOCUS MODE\\n$(generic-module:focusMode)',
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'focusMode',
								options: { op: 't' },
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'focusMode',
						style: {
							color: colorWhite,
							bgcolor: colorRed,
						},
					},
				],
			}
		}

		if (SERIES.capabilities.focusPushAuto) {
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
				text: 'IRIS\\n$(generic-module:irisPosition) $(generic-module:irisF)\\n$(generic-module:irisPositionBar)',
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
								step: 30,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'iris',
							options: {
								op: 1,
								step: 30,
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['exposure-iris-up'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Up',
			style: {
				text: 'IRIS\\nUP',
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
								op: 1,
								step: 0x1e,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['exposure-iris-down'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Down',
			style: {
				text: 'IRIS\\nDOWN',
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
								op: -1,
								step: 0x1e,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.irisAuto) {
		presets['exposure-iris-mode'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Mode',
			style: {
				text: 'IRIS MODE\\n$(generic-module:irisMode)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
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
				},
			],
			feedbacks: [
				{
					feedbackId: 'irisMode',
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.shutter) {
		presets[`exposure-shutter`] = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter',
			style: {
				text: 'Shutter\\n$(generic-module:shutter)',
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
							actionId: 'shutter',
							options: {
								op: 't',
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'shutter',
							options: {
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'shutter',
							options: {
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'shutter',
					options: {
						option: SERIES.capabilities.shutter.dropdown[0].id,
					},
					isInverted: true,
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

		if (SERIES.capabilities.shutter.inc && SERIES.capabilities.shutter.dec) {
			presets[`exposure-shutter-step`] = {
				type: 'button',
				category: 'Exposure',
				name: 'Shutter Step',
				style: {
					text: 'Shutter Step\\n$(generic-module:shutterStep)',
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
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
								actionId: 'shutterStepD',
							},
						],
						rotate_right: [
							{
								actionId: 'shutterStepU',
							},
						],
					},
				],
				feedbacks: [],
			}
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
								op: 't',
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
					feedbackId: 'filter',
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

	// #########################
	// #### Picture Presets ####
	// #########################

	if (SERIES.capabilities.gain) {
		presets[`picture-gain`] = {
			type: 'button',
			category: 'Picture',
			name: 'Gain',
			style: {
				text: 'GAIN\\n$(generic-module:gain)',
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
							actionId: 'gain',
							options: {
								op: 't',
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'gain',
							options: {
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'gain',
							options: {
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'gain',
					options: {
						option: SERIES.capabilities.gain.dropdown[0].id,
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.pedestal) {
		presets['picture-pedestal'] = {
			type: 'button',
			category: 'Picture',
			name: 'Pedestal',
			style: {
				text: 'Total Ped.\\n$(generic-module:masterPed)',
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
								set: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'ped',
							options: {
								op: -1,
								step: 1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'ped',
							options: {
								op: 1,
								step: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.colorGain) {
		presets['picture-red-gain'] = {
			type: 'button',
			category: 'Picture',
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
					down: [
						{
							actionId: 'gainRed',
							options: {
								op: 's',
								set: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'gainRed',
							options: {
								op: -1,
								step: 1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'gainRed',
							options: {
								op: 1,
								step: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['picture-blue-gain'] = {
			type: 'button',
			category: 'Picture',
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
					down: [
						{
							actionId: 'gainBlue',
							options: {
								op: 's',
								set: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'gainBlue',
							options: {
								op: -1,
								step: 1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'gainBlue',
							options: {
								op: 1,
								step: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.colorPedestal) {
		presets['picture-red-ped'] = {
			type: 'button',
			category: 'Picture',
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
					down: [
						{
							actionId: 'pedRed',
							options: {
								op: 's',
								set: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'pedRed',
							options: {
								op: -1,
								step: 1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'pedRed',
							options: {
								op: 1,
								step: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['picture-blue-ped'] = {
			type: 'button',
			category: 'Picture',
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
					down: [
						{
							actionId: 'pedBlue',
							options: {
								op: 's',
								set: 0,
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'pedBlue',
							options: {
								op: -1,
								step: 1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'pedBlue',
							options: {
								op: 1,
								step: 1,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (SERIES.capabilities.whiteBalance) {
		presets[`picture-whitebalance`] = {
			type: 'button',
			category: 'Picture',
			name: 'White Balance',
			style: {
				text: 'WB Mode\\n$(generic-module:whiteBalance)',
				size: '14',
				color: colorBlack,
				bgcolor: colorWhite,
			},
			options: {
				rotaryActions: true,
			},
			steps: [
				{
					down: [
						{
							actionId: 'whiteBalanceMode',
							options: {
								op: 't',
							},
						},
					],
					up: [],
					rotate_left: [
						{
							actionId: 'whiteBalanceMode',
							options: {
								op: -1,
							},
						},
					],
					rotate_right: [
						{
							actionId: 'whiteBalanceMode',
							options: {
								op: 1,
							},
						},
					],
				},
			],
			feedbacks: [
				{
					feedbackId: 'whiteBalance',
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

		if (SERIES.capabilities.colorTemperature) {
			presets['picture-colortemp'] = {
				type: 'button',
				category: 'Picture',
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
								actionId: 'colorTemperature',
								options: {
									op: -1,
									step: 20,
								},
							},
						],
						rotate_right: [
							{
								actionId: 'colorTemperature',
								options: {
									op: 1,
									step: 20,
								},
							},
						],
					},
				],
				feedbacks: [],
			}
		}

		presets['picture-awb'] = {
			type: 'button',
			category: 'Picture',
			name: 'Execute Auto White Balance',
			style: {
				text: 'Execute\\nAWB',
				size: '14',
				color: colorBlack,
				bgcolor: colorWhite,
			},
			steps: [
				{
					down: [
						{
							actionId: 'whiteBalanceExecAWB',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['picture-abb'] = {
			type: 'button',
			category: 'Picture',
			name: 'Execute Auto Black Balance',
			style: {
				text: 'Execute\\nABB',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'whiteBalanceExecABB',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ########################
	// #### System Presets ####
	// ########################

	if (SERIES.capabilities.power) {
		presets['system-power'] = {
			type: 'button',
			category: 'System',
			name: 'Power',
			style: {
				text: 'Power\\n$(generic-module:power)',
				size: '14',
				color: colorWhite,
				bgcolor: colorOrange,
			},
			steps: [
				{
					down: [
						{
							actionId: 'power',
							options: {
								op: 't',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'powerState',
					style: {
						color: colorWhite,
						bgcolor: colorDarkGreen,
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
				text: 'Color Bar\\n$(generic-module:colorbar)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'colorbar',
							options: {
								op: 't',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'colorbarState',
					style: {
						png64: ICONS.COLORBAR,
						pngalignment: 'center:center',
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
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tallyState',
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
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tally2State',
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
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'tally3State',
					style: {
						color: colorWhite,
						bgcolor: colorYellow,
					},
				},
			],
		}
	}

	if (SERIES.capabilities.install) {
		presets['system-install-position'] = {
			type: 'button',
			category: 'System',
			name: 'Installation Position',
			style: {
				text: 'INSTALL. POS.\\n$(generic-module:installMode)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'installPosition',
							options: {
								op: 't',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
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
							actionId: 'presetSpeed',
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
							actionId: 'presetTime',
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

	if (SERIES.capabilities.preset) {
		presets['recall-preset-scope-a'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Recall Scope A',
			style: {
				text: 'Preset Recall Scope\\nA',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'presetRecallScope',
							options: {
								op: 's',
								set: '0',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'presetRecallScope',
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

		presets['recall-preset-scope-b'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Recall Scope B',
			style: {
				text: 'Preset Recall Scope\\nB',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'presetRecallScope',
							options: {
								op: 's',
								set: '1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'presetRecallScope',
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

		presets['recall-preset-scope-c'] = {
			type: 'button',
			category: 'Preset Memory',
			name: 'Preset Recall Scope C',
			style: {
				text: 'Preset Recall Scope\\nC',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'presetRecallScope',
							options: {
								op: 's',
								set: '2',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'presetRecallScope',
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
