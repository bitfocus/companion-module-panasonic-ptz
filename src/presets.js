import { combineRgb } from '@companion-module/base'
import { getAndUpdateSeries } from './common.js'
import ICONS from './icons.js';

export function getPresetDefinitions(self) {
	const presets = {}

	const colorWhite = combineRgb(255, 255, 255)
	const colorRed = combineRgb(255, 0, 0)
	const colorGreen = combineRgb(0, 255, 0)
	const colorBlack = combineRgb(0, 0, 0)

	const SERIES = getAndUpdateSeries(self)
	const seriesActions = SERIES.actions
	// console.log(SERIES);

	// ##########################
	// #### Pan/Tilt Presets ####
	// ##########################

	if (seriesActions.panTilt) {
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
							actionId: 'up',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'down',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'left',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'right',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'upRight',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'upLeft',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'downLeft',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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
							actionId: 'downRight',
							options: {},
						},
					],
					up: [
						{
							actionId: 'stop',
							options: {},
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

	if (seriesActions.ptSpeed) {
		presets['pan-tilt-speed-up'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed Up',
			style: {
				text: 'SPEED\\nUP\\n$(Panasonic-PTZ:ptSpeedVar)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeedU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-speed-down'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed Down',
			style: {
				text: 'SPEED\\nDOWN\\n$(Panasonic-PTZ:ptSpeedVar)',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeedD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-speed-high'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed Set High',
			style: {
				text: 'SET\\nSPEED\\nHIGH',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeedS',
							options: {
								speed: 40,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['pan-tilt-speed-mid'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed Set Mid',
			style: {
				text: 'SET\\nSPEED\\nMID',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeedS',
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

		presets['pan-tilt-speed-low'] = {
			type: 'button',
			category: 'Pan/Tilt',
			name: 'Speed Set Low',
			style: {
				text: 'SET\\nSPEED\\nLOW',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ptSpeedS',
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
	}

	// ######################
	// #### Lens Presets ####
	// ######################

	if (seriesActions.zoom) {
		presets['lens-zoom-in'] = {
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
							actionId: 'zoomI',
							options: {},
						},
					],
					up: [
						{
							actionId: 'zoomS',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}

		presets['lens-zoom-out'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Out',
			style: {
				text: 'ZOOM\\nOUT',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoomO',
							options: {},
						},
					],
					up: [
						{
							actionId: 'zoomS',
							options: {},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (seriesActions.zSpeed) {
		presets['lens-zoom-speed-up'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed Up',
			style: {
				text: 'ZOOM\\nSPEED\\nUP\\n$(Panasonic-PTZ:zSpeedVar)',
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

		presets['lens-zoom-speed-down'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed Down',
			style: {
				text: 'ZOOM\\nSPEED\\nDOWN\\n$(Panasonic-PTZ:zSpeedVar)',
				size: '7',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zSpeedD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['lens-zoom-speed-high'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed High',
			style: {
				text: 'ZOOM\\nSPEED\\nHIGH',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zSpeedS',
							options: {
								speed: 40,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['lens-zoom-speed-mid'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed Mid',
			style: {
				text: 'ZOOM\\nSPEED\\nMID',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zSpeedS',
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

		presets['lens-zoom-speed-low'] = {
			type: 'button',
			category: 'Lens',
			name: 'Zoom Speed Low',
			style: {
				text: 'ZOOM\\nSPEED\\nLOW',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zSpeedS',
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
	}

	if (seriesActions.focus) {
		presets['lens-focus-near'] = {
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

		presets['lens-focus-far'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Far',
			style: {
				text: 'FOCUS\\nFAR',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusF',
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

	if (seriesActions.fSpeed) {
		presets['lens-focus-speed-up'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed Up',
			style: {
				text: 'FOCUS\\nSPEED\\nUP\\n$(Panasonic-PTZ:fSpeedVar)',
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

		presets['lens-focus-speed-down'] = {
			type: 'button',
			category: 'Lens',
			name: 'focusM Speed Down',
			style: {
				text: 'FOCUS\\nSPEED\\nDOWN\\n$(Panasonic-PTZ:fSpeedVar)',
				size: '7',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fSpeedD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['lens-focus-speed-high'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed High',
			style: {
				text: 'FOCUS\\nSPEED\\nHIGH',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fSpeedS',
							options: {
								speed: 40,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['lens-focus-speed-mid'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed Mid',
			style: {
				text: 'FOCUS\\nSPEED\\nMID',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fSpeedS',
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

		presets['lens-focus-speed-low'] = {
			type: 'button',
			category: 'Lens',
			name: 'Focus Speed Low',
			style: {
				text: 'FOCUS\\nSPEED\\nLOW',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fSpeedS',
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
	}

	if (seriesActions.OAF) {
		presets['lens-focus-manual'] = {
			type: 'button',
			category: 'Lens',
			name: 'Manual Focus',
			style: {
				text: 'MANUAL\\nFOCUS',
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
								bol: 1,
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
						option: '0',
					},
					style: {
						color: colorWhite,
						bgcolor: colorRed,
					},
				},
			],
		}

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

		presets['lens-focus-one-touch'] = {
			type: 'button',
			category: 'Lens',
			name: 'One Touch Focus',
			style: {
				text: 'OTAF\\nFOCUS',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusOTAF',
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
	}

	// ##########################
	// #### Exposure Presets ####
	// ##########################

	if (seriesActions.iris) {
		presets['exposure-iris-up'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Up',
			style: {
				text: 'IRIS\\nUP',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'irisU',
							options: {},
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
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'irisD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['exposure-iris-manual'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Manual Iris',
			style: {
				text: 'MANUAL\\nIRIS',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'irisM',
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
					feedbackId: 'autoIris',
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
							actionId: 'irisM',
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

	if (seriesActions.gain.cmd) {
		presets['exposure-gain-up'] = {
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

		presets['exposure-gain-down'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Down',
			style: {
				text: 'GAIN\\nDOWN',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (seriesActions.shut.cmd) {
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

	if (seriesActions.ped.cmd) {
		presets['exposure-pedestal-up'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Pedestal Up',
			style: {
				text: 'Pedestal\\nUP',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pedU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['exposure-pedestal-down'] = {
			type: 'button',
			category: 'Exposure',
			name: 'Pedestal Down',
			style: {
				text: 'Pedestal\\nDOWN',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pedD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (seriesActions.filter.cmd) {
		presets['exposure-filter-up'] = {
			type: 'button',
			category: 'Exposure',
			name: 'ND Filter Up',
			style: {
				text: 'ND Filter\\nUP',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'filterU',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets['exposure-filter-down'] = {
			type: 'button',
			category: 'Exposure',
			name: 'ND Filter Down',
			style: {
				text: 'ND Filter\\nDOWN',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'filterD',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		for (const x in seriesActions.filter.dropdown) {
			presets[`exposire-nd-filter-${x}`] = {
				type: 'button',
				category: 'Exposure',
				name: 'ND Filter Set ' + seriesActions.filter.dropdown[x].label,
				style: {
					text: 'ND FILTER\\nSET\\n' + seriesActions.filter.dropdown[x].label,
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'filterS',
								options: {
									val: seriesActions.filter.dropdown[x].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	// ########################
	// #### System Presets ####
	// ########################

	if (seriesActions.power) {
		presets['system-power-off'] = {
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

		presets['system-power-on'] = {
			type: 'button',
			category: 'System',
			name: 'Power On',
			style: {
				text: 'Power\\nON',
				size: '18',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'powerOn',
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

	if (seriesActions.colorbar) {
		presets['system-colorbar-off'] = {
			type: 'button',
			category: 'System',
			name: 'Color Bar Off',
			style: {
				text: 'Color Bar\\nOFF',
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
			],
			feedbacks: [
				{
					feedbackId: 'colorbarState',
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

		presets['system-colorbar-on'] = {
			type: 'button',
			category: 'System',
			name: 'Color Bar On',
			style: {
				text: 'Color Bar\\nON',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
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

	if (seriesActions.tally) {
		presets['system-tally-off'] = {
			type: 'button',
			category: 'System',
			name: 'Red Tally Off',
			style: {
				text: 'Red Tally\\nOFF',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tallyOff',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'tallyState',
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

		presets['system-tally-on'] = {
			type: 'button',
			category: 'System',
			name: 'Red Tally On',
			style: {
				text: 'Red Tally\\nON',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tallyOn',
							options: {},
						},
					],
					up: [],
				},
			],
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

	if (seriesActions.tally2) {
		presets['system-tally2-off'] = {
			type: 'button',
			category: 'System',
			name: 'Green Tally Off',
			style: {
				text: 'Green Tally\\nOFF',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tally2Off',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'tally2State',
					options: {
						option: '0',
					},
					style: {
						color: colorWhite,
						bgcolor: colorGreen,
					},
				},
			],
		}

		presets['system-tally2-on'] = {
			type: 'button',
			category: 'System',
			name: 'Green Tally On',
			style: {
				text: 'Green Tally\\nON',
				size: '14',
				color: colorWhite,
				bgcolor: colorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tally2On',
							options: {},
						},
					],
					up: [],
				},
			],
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

	if (seriesActions.ins) {
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

	if (seriesActions.sdCard) {
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
	// ###########################
	// #### Load/save Presets ####
	// ###########################

	if (seriesActions.preset) {
		for (let save = 0; save < 100; save++) {
			presets[`save-preset-${save}`] = {
				type: 'button',
				category: 'Save Preset',
				name: 'Save Preset ' + parseInt(save + 1),
				style: {
					text: 'SAVE\\nPSET\\n' + parseInt(save + 1),
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'savePset',
								options: {
									val: ('0' + save.toString(10).toUpperCase()).substr(-2, 2),
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	if (seriesActions.timePset) {
		presets['recall-preset-preset-mode-speed'] = {
			type: 'button',
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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

	if (seriesActions.speedPset) {
		presets['recall-preset-speed-high'] = {
			type: 'button',
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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

	if (seriesActions.timePset) {
		presets['recall-preset-time-high'] = {
			type: 'button',
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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

	if (seriesActions.preset) {
		presets['recall-preset-mode-a'] = {
			type: 'button',
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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
			category: 'Recall Preset',
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

		for (let recall = 0; recall < 100; recall++) {
			presets[`recall-preset-${recall}`] = {
				type: 'button',
				category: 'Recall Preset',
				name: 'Recall Preset ' + parseInt(recall + 1),
				style: {
					text: 'Recall\\nPSET\\n' + parseInt(recall + 1),
					size: '14',
					color: colorWhite,
					bgcolor: colorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'recallPset',
								options: {
									val: ('0' + recall.toString(10).toUpperCase()).substr(-2, 2),
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	return presets
}
