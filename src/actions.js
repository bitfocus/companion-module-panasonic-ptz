/* eslint-disable no-unused-vars */
import { e } from './enum.js'
import { getAndUpdateSeries, getNext, getNextValue, toHexString } from './common.js'
import { parseUpdate, parseWeb } from './parser.js'
import got from 'got'

// ######################
// #### Send Actions ####
// ######################

export async function sendPTZ(self, cmd) {
	const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/aw_ptz?cmd=%23${cmd}&res=1`
	if (self.config.debug) {
		self.log('info', `PTZ Request: ${url}`)
	}

	try {
		const response = await got.get(url)

		if (response.body) {
			const str = response.body.trim()

			if (self.config.debug) {
				self.log('info', 'Received PTZ Command Response: ' + str)
			}

			parseUpdate(self, str.split(':'))

			self.checkVariables()
			self.checkFeedbacks()
		}

	} catch (err) {
		throw new Error(`PTZ Action failed: ${url}`)
	}
}

export async function sendCam(self, cmd) {
	const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/aw_cam?cmd=${cmd}&res=1`

	if (self.config.debug) {
		self.log('info', `Cam Request: ${url}`)
	}

	try {
		const response = await got.get(url)
		
		if (response.body) {
			const str = response.body.trim()

			if (self.config.debug) {
				self.log('info', 'Received Cam Command Response: ' + str)
			}

			parseUpdate(self, str.split(':'))

			self.checkVariables()
			self.checkFeedbacks()
		}
	} catch (err) {
		throw new Error(`Cam Action failed: ${url}`)
	}
}

// Currently only for web commands that don't require admin rights
export async function sendWeb(self, cmd) {
	const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/${cmd}`

	if (self.config.debug) {
		self.log('info', `Web Request: ${url}`)
	}

	try {
		const response = await got.get(url)

		if (response.body) {
			const lines = response.body.trim().split('\r\n')

			for (let line of lines) {
				const str = line.trim()

				if (self.config.debug) {
					self.log('info', 'Received Web Command Response: ' + str)
				}

				parseWeb(self, str.split('='), cmd)
			}

			self.checkVariables()
			self.checkFeedbacks()
		}
	} catch (err) {
		throw new Error(`Web Action failed: ${url}`)
	}
}

function speedCmd(speed) {
	return speed.toString().padStart(2, '0')
}

function speedCmdPT(speedPan, speedTilt) {
	return 'PTS' + speedCmd(speedPan) + speedCmd(speedTilt)
}

// ##########################
// #### Instance Actions ####
// ##########################
export function getActionDefinitions(self) {
	const actions = {}

	const SERIES = getAndUpdateSeries(self)

	const SPEED_OFFSET = 50
	const SPEED_MIN = 0
	const SPEED_MAX = 49
	const SPEED_DEFAULT = 25

	// ##########################
	// #### Pan/Tilt Actions ####
	// ##########################

	if (SERIES.capabilities.panTilt) {
		actions.left = {
			name: 'Pan/Tilt - Pan Left',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of panning left on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.ptSpeed, SPEED_OFFSET))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.ptSpeed, SPEED_OFFSET))
						})
					)
				}
			},
		}

		actions.right = {
			name: 'Pan/Tilt - Pan Right',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of panning right on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.ptSpeed, SPEED_OFFSET))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.ptSpeed, SPEED_OFFSET))
						})
					)
				}
			},
		}

		actions.up = {
			name: 'Pan/Tilt - Tilt Up',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of tilting up on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET, SPEED_OFFSET + self.ptSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET, SPEED_OFFSET + self.ptSpeed))
						})
					)
				}
			},
		}

		actions.down = {
			name: 'Pan/Tilt - Tilt Down',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of tilting down on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET, SPEED_OFFSET - self.ptSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET, SPEED_OFFSET - self.ptSpeed))
						})
					)
				}
			},
		}

		actions.upLeft = {
			name: 'Pan/Tilt - Up Left',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of the up left movement on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.pSpeed, SPEED_OFFSET + self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.pSpeed, SPEED_OFFSET + self.tSpeed))
						})
					)
				}
			},
		}

		actions.upRight = {
			name: 'Pan/Tilt - Up Right',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of the up right movement on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.pSpeed, SPEED_OFFSET + self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.pSpeed, SPEED_OFFSET + self.tSpeedy))
						})
					)
				}
			},
		}

		actions.downLeft = {
			name: 'Pan/Tilt - Down Left',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of the down left movement on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.pSpeed, SPEED_OFFSET - self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET - self.pSpeed, SPEED_OFFSET - self.tSpeed))
						})
					)
				}
			},
		}

		actions.downRight = {
			name: 'Pan/Tilt - Down Right',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of the down right movement on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.pSpeed, SPEED_OFFSET - self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, speedCmdPT(SPEED_OFFSET + self.pSpeed, SPEED_OFFSET - self.tSpeed))
						})
					)
				}
			},
		}

		actions.stop = {
			name: 'Pan/Tilt - Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, speedCmdPT(SPEED_OFFSET, SPEED_OFFSET))
				if (self.speedChangeEmitter.listenerCount('ptSpeed')) self.speedChangeEmitter.removeAllListeners('ptSpeed')
			},
		}

		actions.home = {
			name: 'Pan/Tilt - Home Position',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'APC7FFF7FFF')
			},
		}

		actions.ptSpeedS = {
			name: 'Pan/Tilt - Speed Set',
			options: [
				{
					type: 'checkbox',
					label: 'Advanced mode - set independent speed for panning and tilting',
					id: 'advanced',
					default: false,
				},
				{
					type: 'number',
					label: 'Speed setting',
					id: 'speed',
					default: SPEED_DEFAULT,
					min: SPEED_MIN,
					max: SPEED_MAX,
					required: true,
					range: true,
					isVisible: ((options) => options.advanced ? false : true)
				},
				{
					type: 'number',
					label: 'Pan speed setting',
					id: 'pSpeed',
					default: SPEED_DEFAULT,
					min: SPEED_MIN,
					max: SPEED_MAX,
					required: true,
					range: true,
					isVisible: ((options) => options.advanced ? true : false)
				},
				{
					type: 'number',
					label: 'Tilt speed setting',
					id: 'tSpeed',
					default: SPEED_DEFAULT,
					min: SPEED_MIN,
					max: SPEED_MAX,
					required: true,
					range: true,
					isVisible: ((options) => options.advanced ? true : false)
				},
			],
			callback: async (action) => {
				if (action.options.advanced === false) {
					self.ptSpeed = action.options.speed
					self.pSpeed = self.ptSpeed
					self.tSpeed = self.ptSpeed
				} else {
					self.pSpeed = action.options.pSpeed
					self.tSpeed = action.options.tSpeed
					if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed
				}
				self.setVariableValues({
					ptSpeedVar: self.ptSpeed,
					pSpeedVar: self.pSpeed,
					tSpeedVar: self.tSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.ptSpeedU = {
			name: 'Pan/Tilt - Speed Up',
			options: [],
			callback: async () => {
				self.ptSpeed = getNextValue(self.ptSpeed, SPEED_MIN, SPEED_MAX, +1)
				self.pSpeed = self.ptSpeed
				self.tSpeed = self.ptSpeed
				self.setVariableValues({
					ptSpeedVar: self.ptSpeed,
					pSpeedVar: self.pSpeed,
					tSpeedVar: self.tSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.pSpeedU = {
			name: 'Pan/Tilt - Pan - Speed Up',
			options: [],
			callback: async () => {
				self.pSpeed = getNextValue(self.pSpeed, SPEED_MIN, SPEED_MAX, +1)
				if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed
				self.setVariableValues({
					pSpeedVar: self.pSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.tSpeedU = {
			name: 'Pan/Tilt - Tilt - Speed Up',
			options: [],
			callback: async () => {
				self.tSpeed = getNextValue(self.tSpeed, SPEED_MIN, SPEED_MAX, +1)
				if (self.tSpeed === self.pSpeed) self.ptSpeed = self.tSpeed
				self.setVariableValues({
					tSpeedVar: self.tSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.ptSpeedD = {
			name: 'Pan/Tilt - Speed Down',
			options: [],
			callback: async () => {
				self.ptSpeed = getNextValue(self.ptSpeed, SPEED_MIN, SPEED_MAX, -1)
				self.pSpeed = self.ptSpeed
				self.tSpeed = self.ptSpeed
				self.setVariableValues({
					ptSpeedVar: self.ptSpeed,
					pSpeedVar: self.pSpeed,
					tSpeedVar: self.tSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.pSpeedD = {
			name: 'Pan/Tilt - Pan - Speed Down',
			options: [],
			callback: async () => {
				self.pSpeed = getNextValue(self.pSpeed, SPEED_MIN, SPEED_MAX, -1)
				if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed
				self.setVariableValues({
					pSpeedVar: self.pSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}

		actions.tSpeedD = {
			name: 'Pan/Tilt - Tilt - Speed Down',
			options: [],
			callback: async () => {
				self.tSpeed = getNextValue(self.tSpeed, SPEED_MIN, SPEED_MAX, -1)
				if (self.tSpeed === self.pSpeed) self.ptSpeed = self.tSpeed
				self.setVariableValues({
					tSpeedVar: self.tSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}
	}

	// ######################
	// #### Lens Actions ####
	// ######################

	if (SERIES.capabilities.zoom) {
		actions.zoomI = {
			name: 'Lens - Zoom In',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of zooming in on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, 'Z' + speedCmd(SPEED_OFFSET + self.zSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('zSpeed').then(
						self.speedChangeEmitter.on('zSpeed', async () => {
							await sendPTZ(self, 'Z' + speedCmd(SPEED_OFFSET + self.zSpeed))
						})
					)
				}
			},
		}

		actions.zoomO = {
			name: 'Lens - Zoom Out',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the velocity of zooming out on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, 'Z' + speedCmd(SPEED_OFFSET - self.zSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('zSpeed').then(
						self.speedChangeEmitter.on('zSpeed', async () => {
							await sendPTZ(self, 'Z' + speedCmd(SPEED_OFFSET - self.zSpeed))
						})
					)
				}
			},
		}

		actions.zoomS = {
			name: 'Lens - Zoom Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'Z' + speedCmd(SPEED_OFFSET))
				if (self.speedChangeEmitter.listenerCount('zSpeed')) self.speedChangeEmitter.removeAllListeners('zSpeed')
			},
		}

		actions.zSpeedS = {
			name: 'Lens - Zoom Speed Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Speed setting',
					default: SPEED_DEFAULT,
					min: SPEED_MIN,
					max: SPEED_MAX,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.zSpeed = action.options.val
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}

		actions.zSpeedU = {
			name: 'Lens - Zoom Speed Up',
			options: [],
			callback: async () => {
				self.zSpeed = getNextValue(self.zSpeed, SPEED_MIN, SPEED_MAX, +1)
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}

		actions.zSpeedD = {
			name: 'Lens - Zoom Speed Down',
			options: [],
			callback: async () => {
				self.zSpeed = getNextValue(self.zSpeed, SPEED_MIN, SPEED_MAX, +1)
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}
	}

	if (SERIES.capabilities.focus) {
		actions.focusN = {
			name: 'Lens - Focus Near',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the quickness of near focusing on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, 'F' + speedCmd(SPEED_OFFSET - self.fSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('fSpeed').then(
						self.speedChangeEmitter.on('fSpeed', async () => {
							await sendPTZ(self, 'F' + speedCmd(SPEED_OFFSET - self.fSpeed))
						})
					)
				}
			},
		}

		actions.focusF = {
			name: 'Lens - Focus Far',
			options: [
				{
					id: 'liveSpeed',
					type: 'checkbox',
					label: 'Adjust the quickness of far focusing on speed change',
					default: false
				}
			],
			callback: async (action) => {
				await sendPTZ(self, 'F' + speedCmd(SPEED_OFFSET + self.fSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('fSpeed').then(
						self.speedChangeEmitter.on('fSpeed', async () => {
							await sendPTZ(self, 'F' + speedCmd(SPEED_OFFSET + self.fSpeed))
						})
					)
				}
			},
		}

		actions.focusS = {
			name: 'Lens - Focus Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'F' + speedCmd(SPEED_OFFSET))
				if (self.speedChangeEmitter.listenerCount('fSpeed')) self.speedChangeEmitter.removeAllListeners('fSpeed')
			},
		}

		actions.fSpeedS = {
			name: 'Lens - Focus Speed Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Speed',
					default: SPEED_DEFAULT,
					min: SPEED_MIN,
					max: SPEED_MAX,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.fSpeed = action.options.val
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}

		actions.fSpeedU = {
			name: 'Lens - Focus Speed Up',
			options: [],
			callback: async () => {
				self.fSpeed = getNextValue(self.fSpeed, SPEED_MIN, SPEED_MAX, +1)
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}

		actions.fSpeedD = {
			name: 'Lens - Focus Speed Down',
			options: [],
			callback: async (action) => {
				self.fSpeed = getNextValue(self.fSpeed, SPEED_MIN, SPEED_MAX, -1)
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}
	}

	if (SERIES.capabilities.focusAuto) {
		actions.focusM = {
			name: 'Lens - Focus Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Focus',
					id: 'val',
					default: e.ENUM_MAN_AUTO[0].id,
					choices: e.ENUM_MAN_AUTO,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OAF:' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.focusPushAuto) {
		actions.focusOTAF = {
			name: 'Lens - Focus Push Auto',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OSE:69:1')
			},
		}
	}

	// ##########################
	// #### Exposure Actions ####
	// ##########################

	if (SERIES.capabilities.iris) {
		actions.irisU = {
			name: 'Exposure - Iris Up',
			options: [],
			callback: async (action) => {
				// await sendPTZ(self, 'I' + getNext(e.ENUM_IRIS, self.data.iris, +1).id)
				await sendPTZ(self, 'AXI' + toHexString(0x555 + getNextValue(self.data.irisPosition, 0x0, 0xAAA, +0x1E), 3))
			},
		}

		actions.irisD = {
			name: 'Exposure - Iris Down',
			options: [],
			callback: async (action) => {
				// await sendPTZ(self, 'I' + getNext(e.ENUM_IRIS, self.data.iris, -1).id)
				await sendPTZ(self, 'AXI' + toHexString(0x555 + getNextValue(self.data.irisPosition, 0x0, 0xAAA, -0x1E), 3))
			},
		}

		actions.irisS = {
			name: 'Exposure - Iris Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Iris setting',
					default: 0x555,
					min: 0x0,
					max: 0xAAA,
					step: 0x1E,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'AXI' + toHexString(0x555 + action.options.val, 3))
			},
		}

		actions.irisM = {
			name: 'Exposure - Iris Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Iris',
					id: 'val',
					default: e.ENUM_MAN_AUTO[0].id,
					choices: e.ENUM_MAN_AUTO,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'ORS:' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.gain.cmd) {
		actions.gainU = {
			name: 'Exposure - Gain Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.gain.cmd + ':' + getNext(SERIES.capabilities.gain.dropdown, self.data.gain, +1).id)
			},
		}

		actions.gainD = {
			name: 'Exposure - Gain Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.gain.cmd + ':' + getNext(SERIES.capabilities.gain.dropdown, self.data.gain, -1).id)
			},
		}

		actions.gainS = {
			name: 'Exposure - Gain Set',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					default: SERIES.capabilities.gain.dropdown[0].id,
					choices: SERIES.capabilities.gain.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.gain.cmd + ':' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.shutter) {
		actions.shutU = {
			name: 'Exposure - Shutter Up',
			options: [],
			callback: async (action) => {
				if (SERIES.capabilities.shutter.inc) {
					await sendCam(self, SERIES.capabilities.shutter.inc + ':0x01')
				} else {				
					await sendCam(self, SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, +1).id)
				}
			},
		}

		actions.shutD = {
			name: 'Exposure - Shutter Down',
			options: [],
			callback: async (action) => {
				if (SERIES.capabilities.shutter.dec) {
					await sendCam(self, SERIES.capabilities.shutter.dec + ':0x01')
				} else {
					await sendCam(self, SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, -1).id)
				}
			},
		}

		if (SERIES.capabilities.shutter) {
			actions.shutS = {
				name: 'Exposure - Shutter Mode Set',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter setting',
						id: 'val',
						default: SERIES.capabilities.shutter.dropdown[0].id,
						choices: SERIES.capabilities.shutter.dropdown,
					},
				],
				callback: async (action) => {
					await sendCam(self, SERIES.capabilities.shutter.cmd + ':' + action.options.val)
				},
			}
		}
	}

	if (SERIES.capabilities.pedestal.cmd) {
		actions.pedU = {
			name: 'Exposure - Master Pedestal Up',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.masterPedValue,
					-SERIES.capabilities.pedestal.limit, +SERIES.capabilities.pedestal.limit,
					+SERIES.capabilities.pedestal.step)
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' +
					toHexString(SERIES.capabilities.pedestal.offset + val, SERIES.capabilities.pedestal.hexlen))
			},			
		}

		actions.pedD = {
			name: 'Exposure - Master Pedestal Down',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.masterPedValue,
					-SERIES.capabilities.pedestal.limit, +SERIES.capabilities.pedestal.limit,
					-SERIES.capabilities.pedestal.step)
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' +
					toHexString(SERIES.capabilities.pedestal.offset + val, SERIES.capabilities.pedestal.hexlen))
			},	
		}

		actions.pedS = {
			name: 'Exposure - Master Pedestal Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -SERIES.capabilities.pedestal.limit,
					max: +SERIES.capabilities.pedestal.limit,
					step: SERIES.capabilities.pedestal.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' +
					toHexString(SERIES.capabilities.pedestal.offset + action.options.val, SERIES.capabilities.pedestal.hexlen))
			},
		}
	}

	if (SERIES.capabilities.whiteBalance) {
		actions.whiteBalanceMode = {
			name: 'White Balance - Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'val',
					default: SERIES.capabilities.whiteBalance.dropdown[0].id,
					choices: SERIES.capabilities.whiteBalance.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OAW:' + action.options.val)
			},
		}

		actions.whiteBalanceExecAWB = {
			name: 'White Balance - Execute AWC/AWB',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OWS')
			},
		}

		actions.whiteBalanceExecABB = {
			name: 'White Balance - Execute ABC/ABB',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OAS')
			},
		}
	}

	if (SERIES.capabilities.colorTemperature && SERIES.capabilities.colorTemperature.index) { 
		actions.colorTemperatureUp = {
			name: 'White Balance - Color Temperature Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.index.cmd + ':' +
					getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature, +1).id)
			},
		}

		actions.colorTemperatureDown = {
			name: 'White Balance - Color Temperature Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.index.cmd + ':' +
					getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature, -1).id)
			},
		}

		actions.colorTemperatureSet = {
			name: 'White Balance - Color Temperature Set',
			options: [
				{
					type: 'dropdown',
					label: 'Color Temperature',
					id: 'val',
					default: SERIES.capabilities.colorTemperature.index.dropdown[0].id,
					choices: SERIES.capabilities.colorTemperature.index.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.index.cmd + ':' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.colorTemperature && SERIES.capabilities.colorTemperature.advanced) { 
		actions.colorTemperatureUp = {
			name: 'White Balance - Color Temperature Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.advanced.inc + ':1')
			},
		}

		actions.colorTemperatureDown = {
			name: 'White Balance - Color Temperature Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.advanced.dec + ':1')
			},
		}

		if (SERIES.capabilities.colorTemperature.advanced.set) {
			actions.colorTemperatureSet = {
				name: 'White Balance - Color Temperature Set',
				options: [
					{
						id: 'val',
						type: 'number',
						label: 'Color Temperature [K]',
						default: 3200,
						min: SERIES.capabilities.colorTemperature.advanced.min,
						max: SERIES.capabilities.colorTemperature.advanced.max,
						step: 20,
						required: true,
						range: true,
					},
				],
				callback: async (action) => {
					await sendCam(self, SERIES.capabilities.colorTemperature.advanced.set + ':' +
						toHexString(action.options.val, 5) + ':0')
				},
			}
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.red) {
		actions.pedRedU = {
			name: 'Color - Red Pedestal Up',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.redPedValue,
					-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
					+SERIES.capabilities.colorPedestal.step)
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}

		actions.pedRedD = {
			name: 'Color - Red Pedestal Down',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.redPedValue,
					-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
					-SERIES.capabilities.colorPedestal.step)
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}

		actions.pedRedS = {
			name: 'Color - Red Pedestal Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -SERIES.capabilities.colorPedestal.limit,
					max: +SERIES.capabilities.colorPedestal.limit,
					step: SERIES.capabilities.colorPedestal.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + action.options.val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.blue) {
		actions.pedBlueU = {
			name: 'Color - Blue Pedestal Up',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.bluePedValue,
					-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
					+SERIES.capabilities.colorPedestal.step)
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}

		actions.pedBlueD = {
			name: 'Color - Blue Pedestal Down',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.bluePedValue,
					-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
					-SERIES.capabilities.colorPedestal.step)
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}

		actions.pedBlueS = {
			name: 'Color - Blue Pedestal Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -SERIES.capabilities.colorPedestal.limit,
					max: +SERIES.capabilities.colorPedestal.limit,
					step: SERIES.capabilities.colorPedestal.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + action.options.val, SERIES.capabilities.colorPedestal.hexlen))
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.red) {
		actions.gainRedU = {
			name: 'Color - Red Gain Up',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.redGainValue,
					-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
					+SERIES.capabilities.colorGain.step)
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
			},
		}

		actions.gainRedD = {
			name: 'Color - Red Gain Down',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.redGainValue,
					-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
					-SERIES.capabilities.colorGain.step)
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
			},
		}

		actions.gainRedS = {
			name: 'Color - Red Gain Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -SERIES.capabilities.colorGain.limit,
					max: +SERIES.capabilities.colorGain.limit,
					step: SERIES.capabilities.colorGain.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + action.options.val, SERIES.capabilities.colorGain.hexlen))
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.blue) {
		actions.gainBlueU = {
			name: 'Color - Blue Gain Up',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.blueGainValue,
					-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
					+SERIES.capabilities.colorGain.step)
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
			},
		}

		actions.gainBlueD = {
			name: 'Color - Blue Gain Down',
			options: [],
			callback: async (action) => {
				const val = getNextValue(self.data.blueGainValue,
					-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
					-SERIES.capabilities.colorGain.step)
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
			},
		}

		actions.gainBlueS = {
			name: 'Color - Blue Gain Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -SERIES.capabilities.colorGain.limit,
					max: +SERIES.capabilities.colorGain.limit,
					step: SERIES.capabilities.colorGain.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' +
				toHexString(SERIES.capabilities.colorGain.offset + action.options.val, SERIES.capabilities.colorGain.hexlen))
			},
		}
	}

	if (SERIES.capabilities.filter) {
		actions.filterU = {
			name: 'Exposure - ND Filter Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter, +1).id)
			},
		}

		actions.filterD = {
			name: 'Exposure - ND Filter Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter, -1).id)
			},
		}

		actions.filterS = {
			name: 'Exposure - ND Filter Set',
			options: [
				{
					type: 'dropdown',
					label: 'ND Filter setting',
					id: 'val',
					default: SERIES.capabilities.filter.dropdown[0].id,
					choices: SERIES.capabilities.filter.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OFT:' + action.options.val)
			},
		}
	}

	// ########################
	// #### Preset Actions ####
	// ########################

	if (SERIES.capabilities.preset) {
		actions.savePset = {
			name: 'Preset - Save',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'M' + action.options.val)
			},
		}

		actions.recallPset = {
			name: 'Preset - Recall',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'R' + action.options.val)
			},
		}

		actions.clearPset = {
			name: 'Preset - Clear',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'C' + action.options.val)
			},
		}

		actions.recallModePset = {
			name: 'Preset - Recall Scope Set',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Recall Scope',
					id: 'val',
					default: e.ENUM_PRESET_SCOPE[0].id,
					choices: e.ENUM_PRESET_SCOPE,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSE:71:' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.presetSpeed) {
		actions.speedPset = {
			name: 'Preset - Recall Speed Set',
			options: [
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'speed',
					default: e.ENUM_PSSPEED[0].id,
					choices: e.ENUM_PSSPEED,
				},
				{
					type: 'dropdown',
					label: 'Table',
					id: 'table',
					default: SERIES.capabilities.presetSpeed.dropdown[0].id,
					choices: SERIES.capabilities.presetSpeed.dropdown,
				},
			],
			callback: async (action) => {
				const r = parseInt(action.options.speed, 16)
				const s = r < 0x001 || r > 0x063
				if (SERIES.capabilities.presetTime) await sendCam(self, 'OSJ:29:' + (s?'0':'1'))
				if (s) await sendPTZ(self, 'PST' + action.options.table)
				await sendPTZ(self, 'UPVS' + action.options.speed)
			},
		}
	}

	if (SERIES.capabilities.presetTime) {
		actions.timePset = {
			name: 'Preset - Recall Time Set',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Time Seconds',
					default: 1,
					min: 1,
					max: 99,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSJ:29:1')
				await sendPTZ(self, 'UPVS' + toHexString(action.options.val, 3))
			},
		}
	}

	// ##############################
	// #### Autotracking Actions ####
	// ##############################

	if (SERIES.capabilities.trackingAuto) {
		actions.autotrackingMode = {
			name: 'Auto Tracking - Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'val',
					default: e.ENUM_OFF_ON[1].id,
					choices: e.ENUM_OFF_ON,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSL:B6:' + action.options.val)
			},
		}

		actions.autotrackingStartStop = {
			name: 'Auto Tracking - Start/Stop',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'val',
					default: e.ENUM_STOP_START[1].id,
					choices: e.ENUM_STOP_START,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSL:BC:' + action.options.val)
			},
		}
	}

	// ########################
	// #### System Actions ####
	// ########################

	if (SERIES.capabilities.power) {
		actions.powerOff = {
			name: 'System - Power Off',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'O0')
			},
		}

		actions.powerOn = {
			name: 'System - Power On',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'O1')
			},
		}
	}

	//ToDo: POST with Admin auth
	/*
 	if (SERIES.capabilities.restart) {
		actions.restart = {
			name: 'System - Restart Camera',
			options: [],
			callback: async (action) => {
				//ToDo: POST with Admin auth
				await sendWeb(self, 'initial?cmd=reset&Randomnum=0123456789ABCDEF')
			},
		}
	}
	*/

	if (SERIES.capabilities.tally) {
		if (SERIES.capabilities.tally2) {
			actions.tally = {
				name: 'System - Red Tally',
				options: [
					{
						type: 'dropdown',
						label: 'Option',
						id: 'val',
						default: e.ENUM_OFF_ON[1].id,
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendCam(self, 'TLR:' + action.options.val)
				},
			}
			actions.tally2 = {
				name: 'System - Green Tally',
				options: [
					{
						type: 'dropdown',
						label: 'Option',
						id: 'val',
						default: e.ENUM_OFF_ON[1].id,
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendCam(self, 'TLG:' + action.options.val)
				},
			}
			if (SERIES.capabilities.tally3) {
				actions.tally3 = {
					name: 'System - Yellow Tally',
					options: [
						{
							type: 'dropdown',
							label: 'Option',
							id: 'val',
							default: e.ENUM_OFF_ON[1].id,
							choices: e.ENUM_OFF_ON,
						},
					],
					callback: async (action) => {
						await sendCam(self, 'TLY:' + action.options.val)
					},
				}
			}
		} else { // Use legacy PTZ Tally
			actions.tally = {
				name: 'System - Tally',
				options: [
					{
						type: 'dropdown',
						label: 'Option',
						id: 'val',
						default: e.ENUM_OFF_ON[1].id,
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendPTZ(self, 'DA' + action.options.val)
				},
			}
		}
	}

	if (SERIES.capabilities.ois) {
		actions.autotrackingMode = {
			name: 'Image Stabilization - Set Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'val',
					default: SERIES.capabilities.ois.dropdown[1].id,
					choices: SERIES.capabilities.ois.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OIS:' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.colorbar) {
		actions.colorbar = {
			name: 'System - Color Bar',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'val',
					default: e.ENUM_OFF_ON[1].id,
					choices: e.ENUM_OFF_ON,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'DCB:' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.install) {
		actions.insPosition = {
			name: 'System - Installation Position',
			options: [
				{
					type: 'dropdown',
					label: 'Position',
					id: 'val',
					default: e.ENUM_INSTALL_POSITION[0].id,
					choices: e.ENUM_INSTALL_POSITION,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'INS' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.recordSD) {
		actions.sdCardRec = {
			name: 'System - SD Card Recording',
			options: [
				{
					type: 'dropdown',
					label: 'SD Card Action',
					id: 'val',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Recording' },
						{ id: 'end', label: 'Stop Recording' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'sdctrl?save=' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.streamSRT) {
		actions.srtStreamCtrl = {
			name: 'Streaming - SRT Stream Control',
			options: [
				{
					type: 'dropdown',
					label: 'SRT Action (Caller)',
					id: 'val',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Streaming' },
						{ id: 'stop', label: 'Stop Streaming' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'srt_ctrl?cmd=' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.streamRTMP) {
		actions.rtmpStreamCtrl = {
			name: 'Streaming - RTMP Stream Control',
			options: [
				{
					type: 'dropdown',
					label: 'RTMP Action (Push)',
					id: 'val',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Streaming' },
						{ id: 'stop', label: 'Stop Streaming' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'rtmp_ctrl?cmd=' + action.options.val)
			},
		}
	}

	actions.sendCustom = {
		name: 'Custom - Send Command',
		options: [
			{
				type: 'dropdown',
				label: 'Custom command destination',
				id: 'dest',
				default: '0',
				choices: [
					{ id: '0', label: 'Cam' },
					{ id: '1', label: 'PTZ' },
					{ id: '2', label: 'Web' },
				],
			},
			{
				id: 'cmd',
				type: 'textinput',
				label: 'Custom Command (without leading # for PTZ commands)',
				default: ''
			}
		],
		callback: async (action) => {
			switch (action.options.dest) {
				case '0': await sendCam(self, action.options.cmd); break
				case '1': await sendPTZ(self, action.options.cmd); break
				case '2': await sendWeb(self, action.options.cmd); break
			}
		},
	}

	return actions
}
