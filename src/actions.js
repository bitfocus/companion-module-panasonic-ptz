/* eslint-disable no-unused-vars */
import { e } from './enum.js'
import { getAndUpdateSeries, getNext } from './common.js'
import got from 'got'

// ######################
// #### Send Actions ####
// ######################

export async function sendPTZ(self, cmd) {
	if (cmd) {
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

				self.parseUpdate(str.split(':'))

				self.checkVariables()
				self.checkFeedbacks()
			}

		} catch (err) {
			throw new Error(`PTZ Action failed: ${url}`)
		}
	}
}

export async function sendCam(self, cmd) {
	if (cmd) {
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

				self.parseUpdate(str.split(':'))

				self.checkVariables()
				self.checkFeedbacks()
			}
		} catch (err) {
			throw new Error(`Cam Action failed: ${url}`)
		}
	}
}

// Currently only for web commands that don't require admin rights
export async function sendWeb(self, cmd) {

	if (cmd) {
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

					self.parseWeb(str.split('='), cmd)
				}

				self.checkVariables()
				self.checkFeedbacks()
			}
		} catch (err) {
			throw new Error(`Web Action failed: ${url}`)
		}
	}
}

// ##########################
// #### Instance Actions ####
// ##########################
export function getActionDefinitions(self) {
	const actions = {}

	const SERIES = getAndUpdateSeries(self)

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
				let n = parseInt(50 - self.ptSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'PTS' + string + '50')

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							n = parseInt(50 - self.ptSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'PTS' + string + '50')
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
				await sendPTZ(self, 'PTS' + parseInt(50 + self.ptSpeed) + '50')

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, 'PTS' + parseInt(50 + self.ptSpeed) + '50')
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
				await sendPTZ(self, 'PTS50' + parseInt(50 + self.ptSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, 'PTS50' + parseInt(50 + self.ptSpeed))
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
				let n = parseInt(50 - self.ptSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'PTS50' + string)

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							n = parseInt(50 - self.ptSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'PTS50' + string)
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
				let n = parseInt(50 - self.pSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'PTS' + string + parseInt(50 + self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							n = parseInt(50 - self.pSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'PTS' + string + parseInt(50 + self.tSpeed))
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
				await sendPTZ(self, 'PTS' + parseInt(50 + self.pSpeed) + parseInt(50 + self.tSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							await sendPTZ(self, 'PTS' + parseInt(50 + self.pSpeed) + parseInt(50 + self.tSpeed))
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
				let np = parseInt(50 - self.pSpeed)
				let nt = parseInt(50 - self.tSpeed)
				let pString = '' + (np < 10 ? '0' + np : np)
				let tString = '' + (nt < 10 ? '0' + nt : nt)

				await sendPTZ(self, 'PTS' + pString + tString)

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							np = parseInt(50 - self.pSpeed)
							nt = parseInt(50 - self.tSpeed)
							pString = '' + (np < 10 ? '0' + np : np)
							tString = '' + (nt < 10 ? '0' + nt : nt)
							await sendPTZ(self, 'PTS' + pString + tString)
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
				let n = parseInt(50 - self.tSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'PTS' + parseInt(50 + self.pSpeed) + string)

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
						self.speedChangeEmitter.on('ptSpeed', async () => {
							n = parseInt(50 - self.tSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'PTS' + parseInt(50 + self.pSpeed) + string)
						})
					)
				}
			},
		}

		actions.stop = {
			name: 'Pan/Tilt - Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'PTS5050')
				if (self.speedChangeEmitter.listenerCount('ptSpeed')) self.speedChangeEmitter.removeAllListeners('ptSpeed')
			},
		}

		actions.home = {
			name: 'Pan/Tilt - Home',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'APC7FFF7FFF')
			},
		}
	}

	if (SERIES.capabilities.ptSpeed) {
		actions.ptSpeedS = {
			name: 'Pan/Tilt - Speed',
			options: [
				{
					type: 'checkbox',
					label: 'Advanced mode - set independent speed for panning and tilting',
					id: 'advanced',
					default: false,
				},
				{
					type: 'dropdown',
					label: 'Speed setting',
					id: 'speed',
					default: 25,
					choices: e.ENUM_SPEED,
					isVisible: ((options) => options.advanced ? false : true)
				},
				{
					type: 'dropdown',
					label: 'Pan speed setting',
					id: 'pSpeed',
					default: 25,
					choices: e.ENUM_SPEED,
					isVisible: ((options) => options.advanced ? true : false)
				},
				{
					type: 'dropdown',
					label: 'Tilt speed setting',
					id: 'tSpeed',
					default: 25,
					choices: e.ENUM_SPEED,
					isVisible: ((options) => options.advanced ? true : false)
				},
			],
			callback: async (action) => {
				if (action.options.advanced === false) {
					const i = e.ENUM_SPEED.findIndex((speed) => speed.id === action.options.speed)

					if (i > -1) self.ptSpeedIndex = i
					self.ptSpeed = e.ENUM_SPEED[self.ptSpeedIndex].id
					self.pSpeed = self.ptSpeed
					self.tSpeed = self.ptSpeed
				} else {
					const j = e.ENUM_SPEED.findIndex((speed) => speed.id === action.options.pSpeed)
					const k = e.ENUM_SPEED.findIndex((speed) => speed.id === action.options.tSpeed)

					if (j > -1) self.pSpeedIndex = j
					if (k > -1) self.tSpeedIndex = k
					self.pSpeed = e.ENUM_SPEED[self.pSpeedIndex].id
					self.tSpeed = e.ENUM_SPEED[self.tSpeedIndex].id
					if (self.pSpeed === self.tSpeed) {
						self.ptSpeed = self.pSpeed
					}
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.ptSpeed)
				if (i > 0) {
					self.ptSpeedIndex = i - 1
				}

				self.ptSpeed = e.ENUM_SPEED[self.ptSpeedIndex].id
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.pSpeed)
				if (i > 0) {
					self.pSpeedIndex = i - 1
				}

				self.pSpeed = e.ENUM_SPEED[self.pSpeedIndex].id
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.tSpeed)
				if (i > 0) {
					self.tSpeedIndex = i - 1
				}

				self.tSpeed = e.ENUM_SPEED[self.tSpeedIndex].id
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.ptSpeed)
				if (i < 49) {
					self.ptSpeedIndex = i + 1
				}

				self.ptSpeed = e.ENUM_SPEED[self.ptSpeedIndex].id
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.pSpeed)
				if (i < 49) {
					self.pSpeedIndex = i + 1
				}

				self.pSpeed = e.ENUM_SPEED[self.pSpeedIndex].id
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
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.tSpeed)
				if (i < 49) {
					self.tSpeedIndex = i + 1
				}

				self.tSpeed = e.ENUM_SPEED[self.tSpeedIndex].id
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
				await sendPTZ(self, 'Z' + parseInt(50 + self.zSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('zSpeed').then(
						self.speedChangeEmitter.on('zSpeed', async () => {
							await sendPTZ(self, 'Z' + parseInt(50 + self.zSpeed))
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
				let n = parseInt(50 - self.zSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'Z' + string)

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('zSpeed').then(
						self.speedChangeEmitter.on('zSpeed', async () => {
							n = parseInt(50 - self.zSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'Z' + string)
						})
					)
				}
			},
		}

		actions.zoomS = {
			name: 'Lens - Zoom Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'Z50')
				if (self.speedChangeEmitter.listenerCount('zSpeed')) self.speedChangeEmitter.removeAllListeners('zSpeed')
			},
		}
	}

	if (SERIES.capabilities.zSpeed) {
		actions.zSpeedS = {
			name: 'Lens - Zoom Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed setting',
					id: 'speed',
					default: 25,
					choices: e.ENUM_SPEED,
				},
			],
			callback: async (action) => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === action.options.speed)
				if (i > -1) {
					self.zSpeedIndex = i
				}

				self.zSpeed = e.ENUM_SPEED[self.zSpeedIndex].id
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}

		actions.zSpeedU = {
			name: 'Lens - Zoom Speed Up',
			options: [],
			callback: async () => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.zSpeed)
				if (i > 0) {
					self.zSpeedIndex = i - 1
				}

				self.zSpeed = e.ENUM_SPEED[self.zSpeedIndex].id
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}

		actions.zSpeedD = {
			name: 'Lens - Zoom Speed Down',
			options: [],
			callback: async () => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.zSpeed)
				if (i < 49) {
					self.zSpeedIndex = i + 1
				}

				self.zSpeed = e.ENUM_SPEED[self.zSpeedIndex].id
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
				let n = parseInt(50 - self.fSpeed)
				let string = '' + (n < 10 ? '0' + n : n)

				await sendPTZ(self, 'F' + string)

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('fSpeed').then(
						self.speedChangeEmitter.on('fSpeed', async () => {
							n = parseInt(50 - self.fSpeed)
							string = '' + (n < 10 ? '0' + n : n)
							await sendPTZ(self, 'F' + string)
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
				await sendPTZ(self, 'F' + parseInt(50 + self.fSpeed))

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.removeAllListeners('fSpeed').then(
						self.speedChangeEmitter.on('fSpeed', async () => {
							await sendPTZ(self, 'F' + parseInt(50 + self.fSpeed))
						})
					)
				}
			},
		}

		actions.focusS = {
			name: 'Lens - Focus Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'F50')
				if (self.speedChangeEmitter.listenerCount('fSpeed')) self.speedChangeEmitter.removeAllListeners('fSpeed')
			},
		}
	}

	if (SERIES.capabilities.fSpeed) {
		actions.fSpeedS = {
			name: 'Lens - Focus Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed setting',
					id: 'speed',
					default: 25,
					choices: e.ENUM_SPEED,
				},
			],
			callback: async (action) => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === action.options.speed)
				if (i > -1) {
					self.fSpeedIndex = i
				}

				self.fSpeed = e.ENUM_SPEED[self.fSpeedIndex].id
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}

		actions.fSpeedU = {
			name: 'Lens - Focus Speed Up',
			options: [],
			callback: async () => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.fSpeed)
				if (i > 0) {
					self.fSpeedIndex = i - 1
				}

				self.fSpeed = e.ENUM_SPEED[self.fSpeedIndex].id
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}

		actions.fSpeedD = {
			name: 'Lens - Focus Speed Down',
			options: [],
			callback: async (action) => {
				const i = e.ENUM_SPEED.findIndex((speed) => speed.id === self.fSpeed)
				if (i < 49) {
					self.fSpeedIndex = i + 1
				}

				self.fSpeed = e.ENUM_SPEED[self.fSpeedIndex].id
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
					default: '0',
					choices: [
						{ id: '0', label: 'Manual Focus' },
						{ id: '1', label: 'Auto Focus' },
					],
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'D1' + action.options.val)
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
				// await sendPTZ(self, 'I' + getNext(e.ENUM_IRIS, self.data.iris, +1).id) // no leading 0x!
				if (self.data.irisPosition + 0x1E < 0xAAA) {
					self.data.irisPosition += 0x1E
				} else {
					self.data.irisPosition = 0xAAA
				}
				await sendPTZ(self, 'AXI' + (0x555 + self.data.irisPosition).toString(16).toUpperCase().padStart(3, '0'))
			},
		}

		actions.irisD = {
			name: 'Exposure - Iris Down',
			options: [],
			callback: async (action) => {
				// await sendPTZ(self, 'I' + getNext(e.ENUM_IRIS, self.data.iris, -1).id) // no leading 0x!
				if (self.data.irisPosition - 0x1E > 0x000) {
					self.data.irisPosition -= 0x1E
				} else {
					self.data.irisPosition = 0x0
				}
				await sendPTZ(self, 'AXI' + (0x555 + self.data.irisPosition).toString(16).toUpperCase().padStart(3, '0'))
			},
		}

		actions.irisS = {
			name: 'Exposure - Set Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					default: e.ENUM_IRIS[0].id,
					choices: e.ENUM_IRIS,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'I' + action.options.val)
			},
		}
		actions.irisM = {
			name: 'Exposure - Iris Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Iris',
					id: 'val',
					default: '0',
					choices: e.ENUM_MAN_AUTO,
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'D3' + action.options.val)
			},
		}
	}

	if (SERIES.capabilities.gain.cmd) {
		actions.gainU = {
			name: 'Exposure - Gain Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.gain.cmd + ':' + getNext(SERIES.capabilities.gain.dropdown, self.data.gain, +1).id) // no leading 0x!
			},
		}

		actions.gainD = {
			name: 'Exposure - Gain Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.gain.cmd + ':' + getNext(SERIES.capabilities.gain.dropdown, self.data.gain, -1).id) // no leading 0x!
			},
		}

		actions.gainS = {
			name: 'Exposure - Set Gain',
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
					await sendCam(self, SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, +1).id) // no leading 0x!
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
					await sendCam(self, SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, -1).id) // no leading 0x!
				}
			},
		}

		if (SERIES.capabilities.shutter) {
			actions.shutS = {
				name: 'Exposure - Set Shutter Mode',
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
				if (self.data.masterPedValue + SERIES.capabilities.pedestal.step <= SERIES.capabilities.pedestal.limit) {
					self.data.masterPedValue += SERIES.capabilities.pedestal.step
				}
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' + (SERIES.capabilities.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.pedestal.hexlen, '0'))
			},
		}

		actions.pedD = {
			name: 'Exposure - Master Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.masterPedValue - SERIES.capabilities.pedestal.step <= SERIES.capabilities.pedestal.limit) {
					self.data.masterPedValue -= SERIES.capabilities.pedestal.step
				}
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' + (SERIES.capabilities.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.pedestal.hexlen, '0'))
			},
		}

		actions.pedS = {
			name: 'Exposure - Set Master Pedestal',
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
				self.data.masterPedValue = action.options.val
				await sendCam(self, SERIES.capabilities.pedestal.cmd + ':' + (SERIES.capabilities.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.pedestal.hexlen, '0'))
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
					default: '0',
					choices: SERIES.capabilities.whiteBalance.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OAW:' + action.options.val) // no leading 0x!
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
					getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature, +1).id) // no leading 0x!
			},
		}

		actions.colorTemperatureDown = {
			name: 'White Balance - Color Temperature Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, SERIES.capabilities.colorTemperature.index.cmd + ':' +
					getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature, -1).id) // no leading 0x!
			},
		}

		actions.colorTemperatureSet = {
			name: 'White Balance - Set Color Temperature',
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
				await sendCam(self, SERIES.capabilities.colorTemperature.index.cmd + ':' + action.options.val) // no leading 0x!
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
				name: 'White Balance - Set Color Temperature',
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
						parseInt(action.options.val).toString(16).toUpperCase().padStart(5, '0') + ':0')
				},
			}
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.red) {
		actions.pedRedU = {
			name: 'Color - Red Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue + SERIES.capabilities.colorPedestal.step <= SERIES.capabilities.colorPedestal.limit) {
					self.data.redPedValue += SERIES.capabilities.colorPedestal.step
				}
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}

		actions.pedRedD = {
			name: 'Color - Red Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue - SERIES.capabilities.colorPedestal.step <= SERIES.capabilities.colorPedestal.limit) {
					self.data.redPedValue -= SERIES.capabilities.colorPedestal.step
				}
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}

		actions.pedRedS = {
			name: 'Color - Set Red Pedestal',
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
				self.data.redPedValue = action.options.val
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.red + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.blue) {
		actions.pedBlueU = {
			name: 'Color - Blue Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue + SERIES.capabilities.colorPedestal.step <= SERIES.capabilities.colorPedestal.limit) {
					self.data.bluePedValue += SERIES.capabilities.colorPedestal.step
				}
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}

		actions.pedBlueD = {
			name: 'Color - Blue Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue - SERIES.capabilities.colorPedestal.step <= SERIES.capabilities.colorPedestal.limit) {
					self.data.bluePedValue -= SERIES.capabilities.colorPedestal.step
				}
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}

		actions.pedBlueS = {
			name: 'Color - Set Blue Pedestal',
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
				self.data.bluePedValue = action.options.val
				await sendCam(self, SERIES.capabilities.colorPedestal.cmd.blue + ':' + (SERIES.capabilities.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorPedestal.hexlen, '0'))
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.red) {
		actions.gainRedU = {
			name: 'Color - Red Gain Up',
			options: [],
			callback: async (action) => {
				if (self.data.redGainValue + SERIES.capabilities.colorGain.step <= SERIES.capabilities.colorGain.limit) {
					self.data.redGainValue += SERIES.capabilities.colorGain.step
				}
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.redGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}

		actions.gainRedD = {
			name: 'Color - Red Gain Down',
			options: [],
			callback: async (action) => {
				if (self.data.redGainValue - SERIES.capabilities.colorGain.step <= SERIES.capabilities.colorGain.limit) {
					self.data.redGainValue -= SERIES.capabilities.colorGain.step
				}
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.redGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}

		actions.gainRedS = {
			name: 'Color - Set Red Gain',
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
				self.data.redGainValue = action.options.val
				await sendCam(self, SERIES.capabilities.colorGain.cmd.red + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.redGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.blue) {
		actions.gainBlueU = {
			name: 'Color - Blue Gain Up',
			options: [],
			callback: async (action) => {
				if (self.data.blueGainValue + SERIES.capabilities.colorGain.step <= SERIES.capabilities.colorGain.limit) {
					self.data.blueGainValue += SERIES.capabilities.colorGain.step
				}
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.blueGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}

		actions.gainBlueD = {
			name: 'Color - Blue Gain Down',
			options: [],
			callback: async (action) => {
				if (self.data.blueGainValue - SERIES.capabilities.colorGain.step <= SERIES.capabilities.colorGain.limit) {
					self.data.blueGainValue -= SERIES.capabilities.colorGain.step
				}
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.blueGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}

		actions.gainBlueS = {
			name: 'Color - Set Blue Gain',
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
				self.data.blueGainValue = action.options.val
				await sendCam(self, SERIES.capabilities.colorGain.cmd.blue + ':' + (SERIES.capabilities.colorGain.offset +
					self.data.blueGainValue).toString(16).toUpperCase().padStart(SERIES.capabilities.colorGain.hexlen, '0'))
			},
		}
	}

	if (SERIES.capabilities.filter.cmd) {
		actions.filterU = {
			name: 'Exposure - ND Filter Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter, +1).id) // no leading 0x!
			},
		}

		actions.filterD = {
			name: 'Exposure - ND Filter Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter, -1).id) // no leading 0x!
			},
		}

		actions.filterS = {
			name: 'Exposure - Set ND Filter',
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
				await sendCam(self, 'OFT:' + action.options.val) // no leading 0x!
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
			name: 'Preset - Set Recall Scope',
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
			callback: async (action) => {
				await sendCam(self, 'OSE:71:' + action.options.val) // no leading 0x!
			},
		}
	}

	if (SERIES.capabilities.presetSpeed) {
		actions.speedPset = {
			name: 'Preset - Set Recall Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'speed',
					default: '000',
					choices: e.ENUM_PSSPEED,
				},
				{
					type: 'dropdown',
					label: 'Table',
					id: 'table',
					default: '0',
					choices: SERIES.capabilities.presetSpeed.dropdown,
				},
			],
			callback: async (action) => {
				if (SERIES.capabilities.presetTime) {
					await sendCam(self, 'OSJ:29:0')
				}
				await sendPTZ(self, 'PST' + action.options.table) // no leading 0x!
				await sendPTZ(self, 'UPVS' + action.options.speed) // no leading 0x!
			},
		}
	}

	if (SERIES.capabilities.presetTime) {
		actions.timePset = {
			name: 'Preset - Set Recall Time',
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
				await sendPTZ(self, 'UPVS' + parseInt(action.options.val).toString(16).toUpperCase().padStart(3, '0')) // no leading 0x!
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
					id: 'value',
					default: '0',
					choices: e.ENUM_OFF_ON,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSL:B6:' + action.options.value) // no leading 0x!
			},
		}

		actions.autotrackingStartStop = {
			name: 'Auto Tracking - Start/Stop',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'value',
					default: '0',
					choices: e.ENUM_STOP_START,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSL:BC:' + action.options.value) // no leading 0x!
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

	if (SERIES.capabilities.restart) {
		actions.restart = {
			name: 'System - Restart Camera',
			options: [],
			callback: async (action) => {
				await sendWeb(self, 'initial?cmd=reset&Randomnum=12345')
			},
		}
	}

	if (SERIES.capabilities.tally)  {
		if (SERIES.capabilities.tally2)  {
			actions.tally = {
				name: 'System - Red Tally',
				options: [
					{
						type: 'dropdown',
						label: 'Option',
						id: 'value',
						default: '1',
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendCam(self, 'TLR:' + action.options.value) // no leading 0x!
				},
			}
			actions.tally2 = {
				name: 'System - Green Tally',
				options: [
					{
						type: 'dropdown',
						label: 'Option',
						id: 'value',
						default: '1',
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendCam(self, 'TLG:' + action.options.value) // no leading 0x!
				},
			}
			if (SERIES.capabilities.tally3)  {
				actions.tally3 = {
					name: 'System - Yellow Tally',
					options: [
						{
							type: 'dropdown',
							label: 'Option',
							id: 'value',
							default: '1',
							choices: e.ENUM_OFF_ON,
						},
					],
					callback: async (action) => {
						await sendCam(self, 'TLY:' + action.options.value) // no leading 0x!
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
						id: 'value',
						default: '1',
						choices: e.ENUM_OFF_ON,
					},
				],
				callback: async (action) => {
					await sendPTZ(self, 'DA' + action.options.value) // no leading 0x!
				},
			}
		}
	}

	if (SERIES.capabilities.colorbar) {
		actions.colorbar = {
			name: 'System - Color Bar',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'value',
					default: '1',
					choices: e.ENUM_OFF_ON,
				},
			],
			callback: async (action) => {
				await sendCam(self, 'DCB' + action.options.value) // no leading 0x!
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
					id: 'position',
					default: '0',
					choices: [
						{ id: '0', label: 'Desktop' },
						{ id: '1', label: 'Hanging' },
					],
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'INS' + action.options.position)
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
					id: 'value',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Recording' },
						{ id: 'end', label: 'Stop Recording' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'sdctrl?save=' + action.options.value)
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
					id: 'value',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Streaming' },
						{ id: 'stop', label: 'Stop Streaming' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'srt_ctrl?cmd=' + action.options.value)
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
					id: 'value',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start Streaming' },
						{ id: 'stop', label: 'Stop Streaming' },
					],
				},
			],
			callback: async (action) => {
				await sendWeb(self, 'rtmp_ctrl?cmd=' + action.options.value)
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
