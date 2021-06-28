var { MODELS, SERIES_SPECS } = require('./models.js')
const c = require('./choices.js')

module.exports = {
	setPresets: function (i) {
		var self = i
		var presets = []
		var SERIES = {}

		const foregroundColor = self.rgb(255, 255, 255) // White
		const backgroundColorRed = self.rgb(255, 0, 0) // Red
		const backgroundColorGreen = self.rgb(0, 255, 0) // Green
		const backgroundColorOrange = self.rgb(255, 102, 0) // Orange

		// Set the model and series selected, if in auto, dettect what model is connected via TCP
		if (self.config.model === 'Auto') {
			self.data.model = self.data.modelTCP
		} else {
			self.data.model = self.config.model
		}

		if (self.data.model !== 'NaN') {
			self.data.series = MODELS.find((MODELS) => MODELS.id == self.data.model).series
		}

		// Find the specific commands for a given series
		if (
			self.data.series === 'Auto' ||
			self.data.series === 'Other' ||
			SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series) == undefined
		) {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')
		} else {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series)
		}
		var s = SERIES.actions
		// console.log(SERIES);

		// ##########################
		// #### Pan/Tilt Presets ####
		// ##########################

		if (s.panTilt == true) {
			presets.push({
				category: 'Pan/Tilt',
				label: 'UP',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_UP,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'up',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'DOWN',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_DOWN,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'down',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'LEFT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_LEFT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'left',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'RIGHT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_RIGHT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'right',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'UP RIGHT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_UP_RIGHT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'upRight',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'UP LEFT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_UP_LEFT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'upLeft',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'DOWN LEFT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_DOWN_LEFT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'downLeft',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'DOWN RIGHT',
				bank: {
					style: 'png',
					text: '',
					png64: self.ICON_DOWN_RIGHT,
					pngalignment: 'center:center',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'downRight',
					},
				],
				release_actions: [
					{
						action: 'stop',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'Home',
				bank: {
					style: 'text',
					text: 'HOME',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'home',
					},
				],
			})
		}

		if (s.ptSpeed == true) {
			presets.push({
				category: 'Pan/Tilt',
				label: 'Speed Up',
				bank: {
					style: 'text',
					text: 'SPEED\\nUP\\n$(Panasonic-PTZ:ptSpeedVar)',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'ptSpeedU',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'Speed Down',
				bank: {
					style: 'text',
					text: 'SPEED\\nDOWN\\n$(Panasonic-PTZ:ptSpeedVar)',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'ptSpeedD',
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'Speed Set High',
				bank: {
					style: 'text',
					text: 'SET\\nSPEED\\nHIGH',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'ptSpeedS',
						options: {
							speed: 40,
						},
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'Speed Set Mid',
				bank: {
					style: 'text',
					text: 'SET\\nSPEED\\nMID',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'ptSpeedS',
						options: {
							speed: 25,
						},
					},
				],
			})

			presets.push({
				category: 'Pan/Tilt',
				label: 'Speed Set Low',
				bank: {
					style: 'text',
					text: 'SET\\nSPEED\\nLOW',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'ptSpeedS',
						options: {
							speed: 10,
						},
					},
				],
			})
		}

		// ######################
		// #### Lens Presets ####
		// ######################

		if (s.zoom == true) {
			presets.push({
				category: 'Lens',
				label: 'Zoom In',
				bank: {
					style: 'text',
					text: 'ZOOM\\nIN',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zoomI',
					},
				],
				release_actions: [
					{
						action: 'zoomS',
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Zoom Out',
				bank: {
					style: 'text',
					text: 'ZOOM\\nOUT',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zoomO',
					},
				],
				release_actions: [
					{
						action: 'zoomS',
					},
				],
			})
		}

		if (s.zSpeed == true) {
			presets.push({
				category: 'Lens',
				label: 'Zoom Speed Up',
				bank: {
					style: 'text',
					text: 'ZOOM\\nSPEED\\nUP\\n$(Panasonic-PTZ:zSpeedVar)',
					size: '7',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zSpeedU',
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Zoom Speed Down',
				bank: {
					style: 'text',
					text: 'ZOOM\\nSPEED\\nDOWN\\n$(Panasonic-PTZ:zSpeedVar)',
					size: '7',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zSpeedD',
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Zoom Speed High',
				bank: {
					style: 'text',
					text: 'ZOOM\\nSPEED\\nHIGH',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zSpeedS',
						options: {
							speed: 40,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Zoom Speed Mid',
				bank: {
					style: 'text',
					text: 'ZOOM\\nSPEED\\nMID',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zSpeedS',
						options: {
							speed: 25,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Zoom Speed Low',
				bank: {
					style: 'text',
					text: 'ZOOM\\nSPEED\\nLOW',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'zSpeedS',
						options: {
							speed: 10,
						},
					},
				],
			})
		}

		if (s.focus == true) {
			presets.push({
				category: 'Lens',
				label: 'Focus Near',
				bank: {
					style: 'text',
					text: 'FOCUS\\nNEAR',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'focusN',
					},
				],
				release_actions: [
					{
						action: 'focusS',
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Focus Far',
				bank: {
					style: 'text',
					text: 'FOCUS\\nFAR',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'focusF',
					},
				],
				release_actions: [
					{
						action: 'focusS',
					},
				],
			})
		}

		if (s.fSpeed == true) {
			presets.push({
				category: 'Lens',
				label: 'Focus Speed Up',
				bank: {
					style: 'text',
					text: 'FOCUS\\nSPEED\\nUP\\n$(Panasonic-PTZ:fSpeedVar)',
					size: '7',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'fSpeedU',
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'focusM Speed Down',
				bank: {
					style: 'text',
					text: 'FOCUS\\nSPEED\\nDOWN\\n$(Panasonic-PTZ:fSpeedVar)',
					size: '7',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'fSpeedD',
					},
				],
			})
			presets.push({
				category: 'Lens',
				label: 'Focus Speed High',
				bank: {
					style: 'text',
					text: 'FOCUS\\nSPEED\\nHIGH',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'fSpeedS',
						options: {
							speed: 40,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Focus Speed Mid',
				bank: {
					style: 'text',
					text: 'FOCUS\\nSPEED\\nMID',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'fSpeedS',
						options: {
							speed: 25,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Focus Speed Low',
				bank: {
					style: 'text',
					text: 'FOCUS\\nSPEED\\nLOW',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'fSpeedS',
						options: {
							speed: 10,
						},
					},
				],
			})
		}

		if (s.OAF == true) {
			presets.push({
				category: 'Lens',
				label: 'Manual Focus',
				bank: {
					style: 'text',
					text: 'MANUAL\\nFOCUS',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'focusM',
						options: {
							bol: 1,
						},
					},
				],
				feedbacks: [
					{
						type: 'autoFocus',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'Auto Focus',
				bank: {
					style: 'text',
					text: 'AUTO\\nFOCUS',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'focusM',
						options: {
							bol: 0,
						},
					},
				],
				feedbacks: [
					{
						type: 'autoFocus',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Lens',
				label: 'One Touch Focus',
				bank: {
					style: 'text',
					text: 'OTAF\\nFOCUS',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'focusOTAF',
						options: {
							bol: 0,
						},
					},
				],
				feedbacks: [
					{
						type: 'autoFocus',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		// ##########################
		// #### Exposure Presets ####
		// ##########################

		if (s.iris == true) {
			presets.push({
				category: 'Exposure',
				label: 'Iris Up',
				bank: {
					style: 'text',
					text: 'IRIS\\nUP',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'irisU',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Iris Down',
				bank: {
					style: 'text',
					text: 'IRIS\\nDOWN',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'irisD',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Manual Iris',
				bank: {
					style: 'text',
					text: 'MANUAL\\nIRIS',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'irisM',
						options: {
							bol: 1,
						},
					},
				],
				feedbacks: [
					{
						type: 'autoIris',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Auto Iris',
				bank: {
					style: 'text',
					text: 'AUTO\\nIRIS',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'irisM',
						options: {
							bol: 0,
						},
					},
				],
				feedbacks: [
					{
						type: 'autoIris',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		if (s.gain.cmd) {
			presets.push({
				category: 'Exposure',
				label: 'Gain Up',
				bank: {
					style: 'text',
					text: 'GAIN\\nUP',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'gainU',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Gain Down',
				bank: {
					style: 'text',
					text: 'GAIN\\nDOWN',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'gainD',
					},
				],
			})
		}

		if (s.shut.cmd) {
			presets.push({
				category: 'Exposure',
				label: 'Shutter Up',
				bank: {
					style: 'text',
					text: 'Shut\\nUP',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'shutU',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Shutter Down',
				bank: {
					style: 'text',
					text: 'Shut\\nDOWN',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'shutD',
					},
				],
			})
		}

		if (s.ped.cmd) {
			presets.push({
				category: 'Exposure',
				label: 'Pedestal Up',
				bank: {
					style: 'text',
					text: 'Pedestal\\nUP',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'pedU',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Pedestal Down',
				bank: {
					style: 'text',
					text: 'Pedestal\\nDOWN',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'pedD',
					},
				],
			})
		}

		if (s.filter.cmd) {
			presets.push({
				category: 'Exposure',
				label: 'Filter Up',
				bank: {
					style: 'text',
					text: 'Filter\\nUP',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'filterU',
					},
				],
			})

			presets.push({
				category: 'Exposure',
				label: 'Filter Down',
				bank: {
					style: 'text',
					text: 'Filter\\nDOWN',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'filterD',
					},
				],
			})

			for (var x in s.filter.dropdown) {
				presets.push({
					category: 'Exposure',
					label: 'ND Filter Set ' + s.filter.dropdown[x].label,
					bank: {
						style: 'text',
						text: 'FILTER\\nSET\\n' + s.filter.dropdown[x].label,
						size: '14',
						color: '16777215',
						bgcolor: self.rgb(0, 0, 0),
					},
					actions: [
						{
							action: 'filterS',
							options: {
								val: s.filter.dropdown[x].id,
							},
						},
					],
				})
			}
		}

		// ########################
		// #### System Presets ####
		// ########################

		if (s.power == true) {
			presets.push({
				category: 'System',
				label: 'Power Off',
				bank: {
					style: 'text',
					text: 'Power\\nOFF',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'powerOff',
					},
				],
				feedbacks: [
					{
						type: 'powerState',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'System',
				label: 'Power On',
				bank: {
					style: 'text',
					text: 'Power\\nON',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'powerOn',
					},
				],
				feedbacks: [
					{
						type: 'powerState',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		if (s.tally == true) {
			presets.push({
				category: 'System',
				label: 'Tally Off',
				bank: {
					style: 'text',
					text: 'Tally\\nOFF',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'tallyOff',
					},
				],
				feedbacks: [
					{
						type: 'tallyState',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'System',
				label: 'Tally On',
				bank: {
					style: 'text',
					text: 'Tally\\nON',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'tallyOn',
					},
				],
				feedbacks: [
					{
						type: 'tallyState',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		if (s.ins == true) {
			presets.push({
				category: 'System',
				label: 'INS Desktop',
				bank: {
					style: 'text',
					text: 'INS\\nDesk',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'insPosition',
						options: {
							position: 0,
						},
					},
				],
				feedbacks: [
					{
						type: 'insState',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'System',
				label: 'INS Hanging',
				bank: {
					style: 'text',
					text: 'INS\\nHang',
					size: '18',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'insPosition',
						options: {
							position: 1,
						},
					},
				],
				feedbacks: [
					{
						type: 'insState',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		if (s.sdCard == true) {
			presets.push({
				category: 'System',
				label: 'SD Card Recording Start',
				bank: {
					style: 'text',
					text: 'SD Card\\nRecording\\nStart',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'sdCardRec',
						options: {
							value: 'start',
						},
					},
				],
			})

			presets.push({
				category: 'System',
				label: 'SD Card Recording Stop',
				bank: {
					style: 'text',
					text: 'SD Card\\nRecording\\nStop',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'sdCardRec',
						options: {
							value: 'end',
						},
					},
				],
			})
		}
		// ###########################
		// #### Load/save Presets ####
		// ###########################

		if (s.preset == true) {
			for (var save = 0; save < 100; save++) {
				presets.push({
					category: 'Save Preset',
					label: 'Save Preset ' + parseInt(save + 1),
					bank: {
						style: 'text',
						text: 'SAVE\\nPSET\\n' + parseInt(save + 1),
						size: '14',
						color: '16777215',
						bgcolor: self.rgb(0, 0, 0),
					},
					actions: [
						{
							action: 'savePset',
							options: {
								val: ('0' + save.toString(10).toUpperCase()).substr(-2, 2),
							},
						},
					],
				})
			}
		}

		if (s.timePset == true) {
			presets.push({
				category: 'Recall Preset',
				label: 'Preset Mode Speed',
				bank: {
					style: 'text',
					text: 'PRESET\\nMODE\\nSPEED',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'modePset',
						options: {
							mode: 0,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Preset Mode Time',
				bank: {
					style: 'text',
					text: 'PRESET\\nMODE\\nTIME',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'modePset',
						options: {
							mode: 1,
						},
					},
				],
			})
		}

		if (s.speedPset == true) {
			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Speed High',
				bank: {
					style: 'text',
					text: 'RECALL\\nSPEED\\nHIGH',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 25,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Speed Mid',
				bank: {
					style: 'text',
					text: 'RECALL\\nSPEED\\nMID',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 15,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Speed Low',
				bank: {
					style: 'text',
					text: 'RECALL\\nSPEED\\nLOW',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 5,
						},
					},
				],
			})
		}

		if (s.timePset == true) {
			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Time High',
				bank: {
					style: 'text',
					text: 'RECALL\\nTIME\\n5 Sec',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 5,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Time Mid',
				bank: {
					style: 'text',
					text: 'RECALL\\nTIME\\n10 Sec',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 10,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Set Recall Time Low',
				bank: {
					style: 'text',
					text: 'RECALL\\nTIME\\n30 Sec',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'speedPset',
						options: {
							speed: 30,
						},
					},
				],
			})
		}

		if (s.preset == true) {
			presets.push({
				category: 'Recall Preset',
				label: 'Preset Mode A',
				bank: {
					style: 'text',
					text: 'Preset\\nMode A',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'recallModePset',
						options: {
							val: '0',
						},
					},
				],
				feedbacks: [
					{
						type: 'recallModePset',
						options: {
							option: '0',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})

			presets.push({
				category: 'Recall Preset',
				label: 'Preset Mode B',
				bank: {
					style: 'text',
					text: 'Preset\\nMode B',
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'recallModePset',
						options: {
							val: '1',
						},
					},
				],
				feedbacks: [
					{
						type: 'recallModePset',
						options: {
							option: '1',
						},
						style: {
							color: foregroundColor,
							bgcolor: backgroundColorRed,
						},
					},
				],
			})
		}

		presets.push({
			category: 'Recall Preset',
			label: 'Preset Mode C',
			bank: {
				style: 'text',
				text: 'Preset\\nMode C',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'recallModePset',
					options: {
						val: '2',
					},
				},
			],
			feedbacks: [
				{
					type: 'recallModePset',
					options: {
						option: '2',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed,
					},
				},
			],
		})

		for (var recall = 0; recall < 100; recall++) {
			presets.push({
				category: 'Recall Preset',
				label: 'Recall Preset ' + parseInt(recall + 1),
				bank: {
					style: 'text',
					text: 'Recall\\nPSET\\n' + parseInt(recall + 1),
					size: '14',
					color: '16777215',
					bgcolor: self.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'recallPset',
						options: {
							val: ('0' + recall.toString(10).toUpperCase()).substr(-2, 2),
						},
					},
				],
			})
		}

		return presets
	},
}
