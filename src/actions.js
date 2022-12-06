/* eslint-disable no-unused-vars */
import { MODELS, SERIES_SPECS } from './models.js'
import * as c from './choices.js'

// ########################
// #### Value Look Ups ####
// ########################
const CHOICES_IRIS = []
for (let i = 0; i < 100; ++i) {
	CHOICES_IRIS.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Iris ' + i })
}

const CHOICES_PRESET = []
for (let i = 0; i < 100; ++i) {
	CHOICES_PRESET.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Preset ' + (i + 1) })
}

// ######################
// #### Send Actions ####
// ######################

export function sendPTZ(self, str) {
	if (str !== undefined) {
		self.system.emit(
			'rest_get',
			'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_ptz?cmd=%23' + str + '&res=1',
			function (err, result) {
				if (self.config.debug) {
					self.debug(
						'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_ptz?cmd=%23' + str + '&res=1'
					)
					self.log('warn', 'Send CMD: ' + String(str))
				}
				if (err) {
					// self.log('error', 'Error from PTZ: ' + String(err));
					return
				}
				// console.log("Result from REST:" + result.data);
			}
		)
	}
}

export function sendCam(self, str) {
	if (str !== undefined) {
		self.system.emit(
			'rest_get',
			'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_cam?cmd=' + str + '&res=1',
			function (err, result) {
				if (self.config.debug) {
					self.debug(
						'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_cam?cmd=' + str + '&res=1'
					)
					self.log('warn', 'Send CMD: ' + String(str))
				}
				if (err) {
					// self.log('error', 'Error from PTZ: ' + String(err));
					return
				}
				// console.log("Result from REST:" + result.data);
			}
		)
	}
}

export function sendWeb(self, str) {
	// Currently Only for web commands that don't requre Admin rights

	if (str !== undefined) {
		self.system.emit(
			'rest_get',
			'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/' + str,
			function (err, result) {
				if (self.config.debug) {
					self.debug('http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/' + str)
					self.log('warn', 'Send Web CMD: ' + String(str))
				}
				if (!err) {
					// self.log('error', 'Error from PTZ: ' + String(err));
					return
				}
				// console.log("Result from REST:" + result);
			}
		)
	}
}

// ##########################
// #### Instance Actions ####
// ##########################
export function getActionDefinitions(self) {
	const actions = {}

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
	let SERIES =
		self.data.series !== 'Auto' && self.data.series !== 'Other'
			? SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series)
			: undefined
	SERIES = SERIES || SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')

	const seriesActions = SERIES.actions

	// ##########################
	// #### Pan/Tilt Actions ####
	// ##########################

	if (seriesActions.panTilt) {
		actions.left = {
			name: 'Pan/Tilt - Pan Left',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.ptSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'PTS' + string + '50')
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.right = {
			name: 'Pan/Tilt - Pan Right',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'PTS' + parseInt(50 + self.ptSpeed) + '50')
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.up = {
			name: 'Pan/Tilt - Tilt Up',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'PTS50' + parseInt(50 + self.ptSpeed))
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.down = {
			name: 'Pan/Tilt - Tilt Down',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.ptSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'PTS50' + string)
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.upLeft = {
			name: 'Pan/Tilt - Up Left',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.ptSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'PTS' + string + parseInt(50 + self.ptSpeed))
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.upRight = {
			name: 'Pan/Tilt - Up Right',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'PTS' + parseInt(50 + self.ptSpeed) + parseInt(50 + self.ptSpeed))
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.downLeft = {
			name: 'Pan/Tilt - Down Left',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.ptSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'PTS' + string + string)
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.downRight = {
			name: 'Pan/Tilt - Down Right',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.ptSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'PTS' + parseInt(50 + self.ptSpeed) + string)
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.stop = {
			name: 'Pan/Tilt - Stop',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'PTS5050')
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.home = {
			name: 'Pan/Tilt - Home',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'APC7FFF7FFF')
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.ptSpeedS = {
			name: 'Pan/Tilt - Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					default: 25,
					choices: c.CHOICES_SPEED,
				},
			],
			callback: function (action) {
				self.ptSpeed = action.options.speed

				const idx = c.CHOICES_SPEED.findIndex((sp) => sp.id === self.ptSpeed)
				if (idx > -1) {
					self.ptSpeedIndex = idx
				}

				self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
				self.setVariable('ptSpeedVar', self.ptSpeed)
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.ptSpeedU = {
			name: 'Pan/Tilt - Speed Up',
			options: [],
			callback: function (action) {
				if (self.ptSpeedIndex == 0) {
					self.ptSpeedIndex = 0
				} else if (self.ptSpeedIndex > 0) {
					self.ptSpeedIndex--
				}
				self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
				self.setVariable('ptSpeedVar', self.ptSpeed)
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.ptSpeedD = {
			name: 'Pan/Tilt - Speed Down',
			options: [],
			callback: function (action) {
				if (self.ptSpeedIndex == c.CHOICES_SPEED.length) {
					self.ptSpeedIndex = c.CHOICES_SPEED.length
				} else if (self.ptSpeedIndex < c.CHOICES_SPEED.length) {
					self.ptSpeedIndex++
				}
				self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
				self.setVariable('ptSpeedVar', self.ptSpeed)
			},
		}
	}

	// ######################
	// #### Lens Actions ####
	// ######################

	if (seriesActions.zoom) {
		actions.zoomI = {
			name: 'Lens - Zoom In',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'Z' + parseInt(50 + self.zSpeed))
			},
		}
	}

	if (seriesActions.zoom) {
		actions.zoomO = {
			name: 'Lens - Zoom Out',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.zSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'Z' + string)
			},
		}
	}

	if (seriesActions.zoom) {
		actions.zoomS = {
			name: 'Lens - Zoom Stop',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'Z50')
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedS = {
			name: 'Lens - Zoom Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					default: 25,
					choices: c.CHOICES_SPEED,
				},
			],
			callback: function (action) {
				self.zSpeed = action.options.speed

				const idx = c.CHOICES_SPEED.findIndex((sp) => sp.id === self.zSpeed)
				if (idx > -1) {
					self.zSpeedIndex = idx
				}

				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariable('zSpeedVar', self.zSpeed)
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedU = {
			name: 'Lens - Zoom Speed Up',
			options: [],
			callback: function (action) {
				if (self.zSpeedIndex == 0) {
					self.zSpeedIndex = 0
				} else if (self.zSpeedIndex > 0) {
					self.zSpeedIndex--
				}
				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariable('zSpeedVar', self.zSpeed)
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedD = {
			name: 'Lens - Zoom Speed Down',
			options: [],
			callback: function (action) {
				if (self.zSpeedIndex == c.CHOICES_SPEED.length) {
					self.zSpeedIndex = c.CHOICES_SPEED.length
				} else if (self.zSpeedIndex < c.CHOICES_SPEED.length) {
					self.zSpeedIndex++
				}
				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariable('zSpeedVar', self.zSpeed)
			},
		}
	}

	if (seriesActions.focus) {
		actions.focusN = {
			name: 'Lens - Focus Near',
			options: [],
			callback: function (action) {
				const n = parseInt(50 - self.fSpeed)
				const string = '' + (n < 10 ? '0' + n : n)
				sendPTZ(self, 'F' + string)
			},
		}
	}

	if (seriesActions.focus) {
		actions.focusF = {
			name: 'Lens - Focus Far',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'F' + parseInt(50 + self.fSpeed))
			},
		}
	}

	if (seriesActions.focus) {
		actions.focusS = {
			name: 'Lens - Focus Stop',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'F50')
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedS = {
			name: 'Lens - Focus Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					default: 25,
					choices: c.CHOICES_SPEED,
				},
			],
			callback: function (action) {
				self.fSpeed = action.options.speed

				const idx = c.CHOICES_SPEED.findIndex((sp) => sp.id === self.fSpeed)
				if (idx > -1) {
					self.fSpeedIndex = idx
				}

				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariable('fSpeedVar', self.fSpeed)
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedU = {
			name: 'Lens - Focus Speed Up',
			options: [],
			callback: function (action) {
				if (self.fSpeedIndex == 0) {
					self.fSpeedIndex = 0
				} else if (self.fSpeedIndex > 0) {
					self.fSpeedIndex--
				}
				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariable('fSpeedVar', self.fSpeed)
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedD = {
			name: 'Lens - Focus Speed Down',
			options: [],
			callback: function (action) {
				if (self.fSpeedIndex == c.CHOICES_SPEED.length) {
					self.fSpeedIndex = c.CHOICES_SPEED.length
				} else if (self.fSpeedIndex < c.CHOICES_SPEED.length) {
					self.fSpeedIndex++
				}
				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariable('fSpeedVar', self.fSpeed)
			},
		}
	}

	if (seriesActions.OAF) {
		actions.focusM = {
			name: 'Lens - Focus Mode (Auto Focus)',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Focus',
					id: 'bol',
					default: 0,
					choices: [
						{ id: 0, label: 'Auto Focus' },
						{ id: 1, label: 'Manual Focus' },
					],
				},
			],
			callback: function (action) {
				sendPTZ(self, action.options.bol == 0 ? 'D11' : 'D10')
			},
		}
	}

	if (seriesActions.OTAF) {
		actions.focusOTAF = {
			name: 'Lens - Focus One Touch Auto (OTAF)',
			options: [],
			callback: function (action) {
				sendCam(self, 'OSE:69:1')
			},
		}
	}

	// ##########################
	// #### Exposure Actions ####
	// ##########################

	if (seriesActions.iris) {
		actions.irisU = {
			name: 'Exposure - Iris Up',
			options: [],
			callback: function (action) {
				if (self.irisIndex == CHOICES_IRIS.length) {
					self.irisIndex = CHOICES_IRIS.length
				} else if (self.irisIndex < CHOICES_IRIS.length) {
					self.irisIndex++
				}
				self.irisVal = CHOICES_IRIS[self.irisIndex].id
				sendPTZ(self, 'I' + self.irisVal.toUpperCase())
			},
		}
	}

	if (seriesActions.iris) {
		actions.irisD = {
			name: 'Exposure - Iris Down',
			options: [],
			callback: function (action) {
				if (self.irisIndex == 0) {
					self.irisIndex = 0
				} else if (self.irisIndex > 0) {
					self.irisIndex--
				}
				self.irisVal = CHOICES_IRIS[self.irisIndex].id
				sendPTZ(self, 'I' + self.irisVal.toUpperCase())
			},
		}
	}

	if (seriesActions.iris) {
		actions.irisS = {
			name: 'Exposure - Set Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					default: CHOICES_IRIS[0].id,
					choices: CHOICES_IRIS,
				},
			],
			callback: function (action) {
				sendPTZ(self, 'I' + action.options.val)
				self.irisVal = action.options.val
				self.irisIndex = action.options.val
			},
		}
	}

	if (seriesActions.iris) {
		actions.irisM = {
			name: 'Exposure - Iris Mode (Auto Iris)',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Iris',
					id: 'bol',
					default: 0,
					choices: [
						{ id: 0, label: 'Auto Iris' },
						{ id: 1, label: 'Manual Iris' },
					],
				},
			],
			callback: function (action) {
				sendPTZ(self, action.options.bol == 0 ? 'D30' : 'D31')
			},
		}
	}

	if (seriesActions.gain.cmd) {
		actions.gainU = {
			name: 'Exposure - Gain Up',
			options: [],
			callback: function (action) {
				const index = seriesActions.gain.dropdown.findIndex((GAIN) => GAIN.id == self.data.gainValue)
				if (index !== -1) {
					self.gainIndex = index
				}

				if (self.gainIndex == seriesActions.gain.dropdown.length) {
					self.gainIndex = seriesActions.gain.dropdown.length
				} else if (self.gainIndex < seriesActions.gain.dropdown.length) {
					self.gainIndex++
				}
				self.gainVal = seriesActions.gain.dropdown[self.gainIndex].id

				sendCam(self, seriesActions.gain.cmd + self.gainVal.toUpperCase())
			},
		}
	}

	if (seriesActions.gain.cmd) {
		actions.gainD = {
			name: 'Exposure - Gain Down',
			options: [],
			callback: function (action) {
				let index = seriesActions.gain.dropdown.findIndex((GAIN) => GAIN.id == self.data.gainValue)
				if (index !== -1) {
					self.gainIndex = index
				}

				if (self.gainIndex == 0) {
					self.gainIndex = 0
				} else if (self.gainIndex > 0) {
					self.gainIndex--
				}
				self.gainVal = seriesActions.gain.dropdown[self.gainIndex].id

				sendCam(self, seriesActions.gain.cmd + self.gainVal.toUpperCase())
			},
		}
	}

	if (seriesActions.gain.cmd) {
		actions.gainS = {
			name: 'Exposure - Set Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					default: seriesActions.gain.dropdown[0].id,
					choices: seriesActions.gain.dropdown,
				},
			],
			callback: function (action) {
				sendCam(self, seriesActions.gain.cmd + action.options.val)
			},
		}
	}

	if (seriesActions.shut.cmd) {
		actions.shutU = {
			name: 'Exposure - Shutter Up',
			options: [],
			callback: function (action) {
				if (self.shutIndex == seriesActions.shut.dropdown.length) {
					self.shutIndex = seriesActions.shut.dropdown.length
				} else if (self.shutIndex < seriesActions.shut.dropdown.length) {
					self.shutIndex++
				}
				self.shutVal = seriesActions.shut.dropdown[self.shutIndex].id

				sendCam(self, seriesActions.shut.cmd + self.shutVal.toUpperCase())
			},
		}
	}

	if (seriesActions.shut.cmd) {
		actions.shutD = {
			name: 'Exposure - Shutter Down',
			options: [],
			callback: function (action) {
				if (self.shutIndex == 0) {
					self.shutIndex = 0
				} else if (self.shutIndex > 0) {
					self.shutIndex--
				}
				self.shutVal = seriesActions.shut.dropdown[self.shutIndex].id

				sendCam(self, seriesActions.shut.cmd + self.shutVal.toUpperCase())
			},
		}
	}

	if (seriesActions.shut.cmd) {
		actions.shutS = {
			name: 'Exposure - Set Shutter',
			options: [
				{
					type: 'dropdown',
					label: 'Shutter setting',
					id: 'val',
					default: seriesActions.shut.dropdown[0].id,
					choices: seriesActions.shut.dropdown,
				},
			],
			callback: function (action) {
				sendCam(self, seriesActions.shut.cmd + action.options.val.toUpperCase())
			},
		}
	}

	if (seriesActions.ped.cmd) {
		actions.pedU = {
			name: 'Exposure - Pedestal Up',
			options: [],
			callback: function (action) {
				if (self.pedestalIndex == seriesActions.ped.dropdown.length) {
					self.pedestalIndex = seriesActions.ped.dropdown.length
				} else if (self.pedestalIndex < seriesActions.ped.dropdown.length) {
					self.pedestalIndex++
				}
				self.pedestalVal = seriesActions.ped.dropdown[self.pedestalIndex].id

				sendCam(self, seriesActions.ped.cmd + self.pedestalVal.toUpperCase())
			},
		}
	}

	if (seriesActions.ped.cmd) {
		actions.pedD = {
			name: 'Exposure - Pedestal Down',
			options: [],
			callback: function (action) {
				if (self.pedestalIndex == 0) {
					self.pedestalIndex = 0
				} else if (self.pedestalIndex > 0) {
					self.pedestalIndex--
				}
				self.pedestalVal = seriesActions.ped.dropdown[self.pedestalIndex].id

				sendCam(self, seriesActions.ped.cmd + self.pedestalVal.toUpperCase())
			},
		}
	}

	if (seriesActions.ped.cmd) {
		actions.pedS = {
			name: 'Exposure - Set Pedestal',
			options: [
				{
					type: 'dropdown',
					label: 'Pedestal setting',
					id: 'val',
					default: seriesActions.ped.dropdown[0].id,
					choices: seriesActions.ped.dropdown,
				},
			],
			callback: function (action) {
				sendCam(self, seriesActions.ped.cmd + action.options.val.toUpperCase())
			},
		}
	}
	if (seriesActions.filter.cmd) {
		actions.filterU = {
			name: 'Exposure - ND Filter Up',
			options: [],
			callback: function (action) {
				if (self.filterIndex == seriesActions.filter.dropdown.length) {
					self.filterIndex = seriesActions.filter.dropdown.length
				} else if (self.filterIndex < seriesActions.filter.dropdown.length) {
					self.filterIndex++
				}
				self.filterVal = seriesActions.filter.dropdown[self.filterIndex].id

				sendCam(self, seriesActions.filter.cmd + self.filterVal)
			},
		}
	}

	if (seriesActions.filter.cmd) {
		actions.filterD = {
			name: 'Exposure - ND Filter Down',
			options: [],
			callback: function (action) {
				if (self.filterIndex == 0) {
					self.filterIndex = 0
				} else if (self.filterIndex > 0) {
					self.filterIndex--
				}
				self.filterVal = seriesActions.filter.dropdown[self.filterIndex].id

				sendCam(self, seriesActions.filter.cmd + self.filterVal)
			},
		}
	}

	if (seriesActions.filter.cmd) {
		actions.filterS = {
			name: 'Exposure - Set ND Filter',
			options: [
				{
					type: 'dropdown',
					label: 'ND Filter setting',
					id: 'val',
					default: seriesActions.filter.dropdown[0].id,
					choices: seriesActions.filter.dropdown,
				},
			],
			callback: function (action) {
				sendCam(self, seriesActions.filter.dropdown + action.options.val)
			},
		}
	}

	// #########################
	// #### Presets Actions ####
	// #########################

	if (seriesActions.preset) {
		actions.savePset = {
			name: 'Preset - Save',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: CHOICES_PRESET[0].id,
					choices: CHOICES_PRESET,
				},
			],
			callback: function (action) {
				sendPTZ(self, 'M' + action.options.val)
			},
		}
	}
	if (seriesActions.preset) {
		actions.recallPset = {
			name: 'Preset - Recall',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: CHOICES_PRESET[0].id,
					choices: CHOICES_PRESET,
				},
			],
			callback: function (action) {
				sendPTZ(self, 'R' + action.options.val)
			},
		}
	}
	if (seriesActions.preset) {
		actions.recallModePset = {
			name: 'Preset - Mode A, B, C',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Mode',
					id: 'val',
					default: '0',
					choices: [
						{ id: '0', label: 'Mode A - PTZ + Iris + WB/Color' },
						{ id: '1', label: 'Mode B - PTZ + Iris' },
						{ id: '2', label: 'Mode C - PTZ only' },
					],
				},
			],
			callback: function (action) {
				sendCam(self, 'OSE:71:' + action.options.val)
			},
		}
	}
	if (seriesActions.speedPset) {
		actions.speedPset = {
			name: 'Preset - Drive Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					default: 999,
					choices: c.CHOICES_PSSPEED,
				},
			],
			callback: function (action) {
				sendPTZ(self, 'UPVS' + action.options.speed)
			},
		}
	}
	if (seriesActions.timePset) {
		actions.timePset = {
			// TODO: currently only works when in Time mode.
			name: 'Preset - Drive Time',
			options: [
				{
					type: 'dropdown',
					label: 'Time Secconds',
					id: 'speed',
					default: '001',
					choices: c.CHOICES_PSTIME(),
				},
			],
			callback: function (action) {
				sendPTZ(self, 'UPVS' + action.options.speed)
			},
		}
	}

	if (seriesActions.timePset) {
		actions.modePset = {
			// TODO: currently only works when in Time mode.
			name: 'Preset - Drive Speed/Time Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Select mode',
					id: 'mode',
					default: '0',
					choices: [
						{ id: '0', label: 'Speed mode' },
						{ id: '1', label: 'Time mode' },
					],
				},
			],
			callback: function (action) {
				sendCam(self, 'OSJ:29:' + action.options.mode)
			},
		}
	}

	// ########################
	// #### System Actions ####
	// ########################

	if (seriesActions.power) {
		actions.powerOff = {
			name: 'System - Power Off',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'O0')
			},
		}
	}

	if (seriesActions.power) {
		actions.powerOn = {
			name: 'System - Power On',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'O1')
			},
		}
	}

	if (seriesActions.tally) {
		actions.tallyOff = {
			name: 'System - Tally Off',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'DA0')
			},
		}
	}

	if (seriesActions.tally) {
		actions.tallyOn = {
			name: 'System - Tally On',
			options: [],
			callback: function (action) {
				sendPTZ(self, 'DA1')
			},
		}
	}

	if (seriesActions.ins) {
		actions.insPosition = {
			name: 'System - Installation position',
			options: [
				{
					type: 'dropdown',
					label: 'Position',
					id: 'position',
					default: 0,
					choices: [
						{ id: '0', label: 'Desktop' },
						{ id: '1', label: 'Hanging' },
					],
				},
			],
			callback: function (action) {
				sendPTZ(self, 'INS' + action.options.position)
			},
		}
	}

	if (seriesActions.sdCard) {
		actions.sdCardRec = {
			name: 'System - SD Card Recording',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'value',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Recording' },
						{ id: 'end', label: 'Stop Recording' },
					],
				},
			],
			callback: function (action) {
				sendWeb(self, 'sdctrl?save=' + action.options.value)
			},
		}
	}

	return actions
}
