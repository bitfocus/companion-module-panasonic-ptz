/* eslint-disable no-unused-vars */
import { e } from './enum.js'
import { getAndUpdateSeries } from './common.js'
import got from 'got'

// ######################
// #### Send Actions ####
// ######################

export async function sendPTZ(self, str) {
	if (str) {
		const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/aw_ptz?cmd=%23${str}&res=1`
		if (self.config.debug) {
			self.log('debug', `Sending : ${url}`)
		}

		try {
			const response = await got.get(url)

			if (response.body) {
				const lines = response.body.trim().split('\r\n') // Split Data in order to remove data before and after command

				for (let line of lines) {
					// remove new line, carage return and so on.
					const str = line.trim().split(':') // Split Commands and data
					if (self.config.debug) {
						self.log('info', 'Received Response: ' + String(str))
					}
					// Store Data
					self.parseStatus(str)
				}

				self.checkVariables()
				self.checkFeedbacks()
			}

			//console.log("Result from REST:" + result.data);
		} catch (err) {
			throw new Error(`Action failed: ${url}`)
		}
	}
}

export async function sendCam(self, str) {
	if (str) {
		const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/aw_cam?cmd=${str}&res=1`

		if (self.config.debug) {
			self.log('debug', `Sending : ${url}`)
		}

		try {
			const response = await got.get(url)

			// console.log("Result from REST:" + result.data);
		} catch (err) {
			throw new Error(`Action failed: ${url}`)
		}
	}
}

export async function sendWeb(self, str) {
	// Currently Only for web commands that don't requre Admin rights

	if (str) {
		const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/${str}`

		if (self.config.debug) {
			self.log('debug', `Sending : ${url}`)
		}

		try {
			const response = await got.get(url)

			// console.log("Result from REST:" + result.data);
		} catch (err) {
			throw new Error(`Action failed: ${url}`)
		}
	}
}

// ##########################
// #### Instance Actions ####
// ##########################
export function getActionDefinitions(self) {
	const actions = {}

	const SERIES = getAndUpdateSeries(self)

	const seriesCaps = SERIES.capabilities

	// ##########################
	// #### Pan/Tilt Actions ####
	// ##########################

	if (seriesCaps.panTilt) {
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

	if (seriesCaps.ptSpeed) {
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

	if (seriesCaps.zoom) {
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

	if (seriesCaps.zSpeed) {
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

	if (seriesCaps.focus) {
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

	if (seriesCaps.fSpeed) {
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

	if (seriesCaps.focusAuto) {
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

	if (seriesCaps.focusPushAuto) {
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

	if (seriesCaps.iris) {
		actions.irisU = {
			name: 'Exposure - Iris Up',
			options: [],
			callback: async (action) => {
				if (self.irisIndex == e.ENUM_IRIS.length) {
					self.irisIndex = e.ENUM_IRIS.length
				} else if (self.irisIndex < e.ENUM_IRIS.length) {
					self.irisIndex++
				}
				self.irisVal = e.ENUM_IRIS[self.irisIndex].id
				await sendPTZ(self, 'I' + self.irisVal)
			},
		}

		actions.irisD = {
			name: 'Exposure - Iris Down',
			options: [],
			callback: async (action) => {
				if (self.irisIndex == 0) {
					self.irisIndex = 0
				} else if (self.irisIndex > 0) {
					self.irisIndex--
				}
				self.irisVal = e.ENUM_IRIS[self.irisIndex].id
				await sendPTZ(self, 'I' + self.irisVal)
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
				self.irisVal = action.options.val
				self.irisIndex = action.options.val
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
					choices: [
						{ id: '0', label: 'Manual Iris' },
						{ id: '1', label: 'Auto Iris' },
					],
				},
			],
			callback: async (action) => {
				await sendPTZ(self, 'D3' + action.options.val)
			},
		}
	}

	if (seriesCaps.gain.cmd) {
		actions.gainU = {
			name: 'Exposure - Gain Up',
			options: [],
			callback: async (action) => {
				const index = seriesCaps.gain.dropdown.findIndex((GAIN) => GAIN.id == self.data.gain)
				if (index !== -1) {
					self.gainIndex = index
				}

				if (self.gainIndex == seriesCaps.gain.dropdown.length) {
					self.gainIndex = seriesCaps.gain.dropdown.length
				} else if (self.gainIndex < seriesCaps.gain.dropdown.length) {
					self.gainIndex++
				}
				self.gainVal = seriesCaps.gain.dropdown[self.gainIndex].id

				await sendCam(self, seriesCaps.gain.cmd + self.gainVal)
			},
		}

		actions.gainD = {
			name: 'Exposure - Gain Down',
			options: [],
			callback: async (action) => {
				let index = seriesCaps.gain.dropdown.findIndex((GAIN) => GAIN.id == self.data.gain)
				if (index !== -1) {
					self.gainIndex = index
				}

				if (self.gainIndex == 0) {
					self.gainIndex = 0
				} else if (self.gainIndex > 0) {
					self.gainIndex--
				}
				self.gainVal = seriesCaps.gain.dropdown[self.gainIndex].id

				await sendCam(self, seriesCaps.gain.cmd + self.gainVal)
			},
		}

		actions.gainS = {
			name: 'Exposure - Set Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					default: seriesCaps.gain.dropdown[0].id,
					choices: seriesCaps.gain.dropdown,
				},
			],
			callback: async (action) => {
				await sendCam(self, seriesCaps.gain.cmd + action.options.val)
			},
		}
	}

	if (seriesCaps.shutter) {
		actions.shutU = {
			name: 'Exposure - Shutter Up',
			options: [],
			callback: async (action) => {
				if (seriesCaps.shutter.inc) {
					await sendCam(self, seriesCaps.shutter.inc + ':0x01')
				} else {				
					if (self.shutterIndex == seriesCaps.shutter.dropdown.length) {
						self.shutterIndex = seriesCaps.shutter.dropdown.length
					} else if (self.shutterIndex < seriesCaps.shutter.dropdown.length) {
						self.shutterIndex++
					}
					self.shutterVal = seriesCaps.shutter.dropdown[self.shutterIndex].id

					await sendCam(self, seriesCaps.shutter.cmd + self.shutterVal)
				}
			},
		}

		actions.shutD = {
			name: 'Exposure - Shutter Down',
			options: [],
			callback: async (action) => {
				if (seriesCaps.shutter.dec) {
					await sendCam(self, seriesCaps.shutter.dec + ':0x01')
				} else {
					if (self.shutterIndex == 0) {
						self.shutterIndex = 0
					} else if (self.shutterIndex > 0) {
						self.shutterIndex--
					}
					self.shutterVal = seriesCaps.shutter.dropdown[self.shutterIndex].id

					await sendCam(self, seriesCaps.shutter.cmd + self.shutterVal)
				}
			},
		}

		if (seriesCaps.shutter) {
			actions.shutS = {
				name: 'Exposure - Set Shutter Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter setting',
						id: 'val',
						default: seriesCaps.shutter.dropdown[0].id,
						choices: seriesCaps.shutter.dropdown,
					},
				],
				callback: async (action) => {
					if (seriesCaps.shutter.dropdown === e.ENUM_SHUTTER_ADV) {
						await sendCam(self, 'OSJ:03:0x' + action.options.val)
					} else {
						await sendCam(self, seriesCaps.shutter.cmd + action.options.val)
					}
				},
			}
		}
	}

	if (seriesCaps.pedestal.cmd) {
		actions.pedU = {
			name: 'Exposure - Master Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.data.masterPedValue + seriesCaps.pedestal.step <= seriesCaps.pedestal.limit) {
					self.data.masterPedValue += seriesCaps.pedestal.step
				}
				await sendCam(self, seriesCaps.pedestal.cmd + ':' + (seriesCaps.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(seriesCaps.pedestal.hexlen, 0))
			},
		}

		actions.pedD = {
			name: 'Exposure - Master Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.masterPedValue - seriesCaps.pedestal.step <= seriesCaps.pedestal.limit) {
					self.data.masterPedValue -= seriesCaps.pedestal.step
				}
				await sendCam(self, seriesCaps.pedestal.cmd + ':' + (seriesCaps.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(seriesCaps.pedestal.hexlen, 0))
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
					min: -seriesCaps.pedestal.limit,
					max: +seriesCaps.pedestal.limit,
					step: seriesCaps.pedestal.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.data.masterPedValue = action.options.val
				await sendCam(self, seriesCaps.pedestal.cmd + ':' + (seriesCaps.pedestal.offset +
					self.data.masterPedValue).toString(16).toUpperCase().padStart(seriesCaps.pedestal.hexlen, 0))
			},
		}
	}

	if (seriesCaps.whiteBalance) {
		actions.whiteBalanceMode = {
			name: 'White Balance - Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Select Mode',
					id: 'val',
					default: '0',
					choices: e.ENUM_WHITEBALANCE_SET,
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

	if (seriesCaps.colorTemperature && seriesCaps.colorTemperature.index) { 
		actions.colorTemperatureUp = {
			name: 'White Balance - Color Temperature Up',
			options: [],
			callback: async (action) => {
				if (self.colorTemperatureIndex == seriesCaps.colorTemperature.dropdown.length) {
					self.colorTemperatureIndex = seriesCaps.colorTemperature.dropdown.length
				} else if (self.colorTemperatureIndex < seriesCaps.colorTemperature.dropdown.length) {
					self.colorTemperatureIndex++
				}
				self.colorTemperatureValue = seriesCaps.colorTemperature.dropdown[self.colorTemperatureIndex].id

				await sendCam(self, seriesCaps.colorTemperature.index.cmd + ':' + self.colorTemperatureValue)
			},
		}

		actions.colorTemperatureDown = {
			name: 'White Balance - Color Temperature Down',
			options: [],
			callback: async (action) => {
				if (self.colorTemperatureIndex == 0) {
					self.colorTemperatureIndex = 0
				} else if (self.colorTemperatureIndex > 0) {
					self.colorTemperatureIndex--
				}
				self.colorTemperatureValue = seriesCaps.colorTemperature.dropdown[self.colorTemperatureIndex].id

				await sendCam(self, seriesCaps.colorTemperature.index.cmd + ':' + self.colorTemperatureValue)
			},
		}

		actions.colorTemperatureSet = {
			name: 'White Balance - Set Color Temperature',
			options: [
				{
					type: 'dropdown',
					label: 'Color Temperature',
					id: 'val',
					default: seriesCaps.colorTemperature.dropdown[0].id,
					choices: seriesCaps.colorTemperature.dropdown,
				},
			],
			callback: async (action) => {
				let id = action.options.val;
				let index = seriesCaps.colorTemperature.dropdown.findIndex((colorTemperature) => colorTemperature.id == id);

				self.colorTemperatureIndex = index;
				self.colorTemperatureValue = id;

				await sendCam(self, seriesCaps.colorTemperature.index.cmd + ':' + id)
			},
		}
	}

	if (seriesCaps.colorTemp && seriesCaps.colorTemp.advanced) { 
		actions.colorTemperatureUp = {
			name: 'White Balance - Color Temperature Up',
			options: [],
			callback: async (action) => {
				await sendCam(self, seriesCaps.colorTemp.advanced.inc + ':0x1')
			},
		}

		actions.colorTemperatureDown = {
			name: 'White Balance - Color Temperature Down',
			options: [],
			callback: async (action) => {
				await sendCam(self, seriesCaps.colorTemp.advanced.dec + ':0x1')
			},
		}

		actions.colorTemperatureSet = {
			name: 'White Balance - Set Color Temperature',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Color Temperature [K]',
					default: 3200,
					min: seriesCaps.colorTemp.advanced.min,
					max: seriesCaps.colorTemp.advanced.max,
					step: 20,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				await sendCam(self, seriesCaps.colorTemp.advanced.val + ':' + parseInt(action.options.val).toString(16).toUpperCase().padStart(5, 0) + ':0')
			},
		}
	}

	if (seriesCaps.colorPedestal && seriesCaps.colorPedestal.cmd.red) {
		actions.pedRedU = {
			name: 'Color - Red Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue + seriesCaps.colorPedestal.step <= seriesCaps.colorPedestal.limit) {
					self.data.redPedValue += seriesCaps.colorPedestal.step
				}
				await sendCam(self, seriesCaps.colorPedestal.cmd.red + ':' + (seriesCaps.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
			},
		}

		actions.pedRedD = {
			name: 'Color - Red Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue - seriesCaps.colorPedestal.step <= seriesCaps.colorPedestal.limit) {
					self.data.redPedValue -= seriesCaps.colorPedestal.step
				}
				await sendCam(self, seriesCaps.colorPedestal.cmd.red + ':' + (seriesCaps.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
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
					min: -seriesCaps.colorPedestal.limit,
					max: +seriesCaps.colorPedestal.limit,
					step: seriesCaps.colorPedestal.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.data.redPedValue = action.options.val
				await sendCam(self, seriesCaps.colorPedestal.cmd.red + ':' + (seriesCaps.colorPedestal.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
			},
		}
	}

	if (seriesCaps.colorPedestal && seriesCaps.colorPedestal.cmd.blue) {
		actions.pedBlueU = {
			name: 'Color - Blue Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue + seriesCaps.colorPedestal.step <= seriesCaps.colorPedestal.limit) {
					self.data.bluePedValue += seriesCaps.colorPedestal.step
				}
				await sendCam(self, seriesCaps.colorPedestal.cmd.blue + ':' + (seriesCaps.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
			},
		}

		actions.pedBlueD = {
			name: 'Color - Blue Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue - seriesCaps.colorPedestal.step <= seriesCaps.colorPedestal.limit) {
					self.data.bluePedValue -= seriesCaps.colorPedestal.step
				}
				await sendCam(self, seriesCaps.colorPedestal.cmd.blue + ':' + (seriesCaps.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
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
					min: -seriesCaps.colorPedestal.limit,
					max: +seriesCaps.colorPedestal.limit,
					step: seriesCaps.colorPedestal.step,
					requiblue: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.data.bluePedValue = action.options.val
				await sendCam(self, seriesCaps.colorPedestal.cmd.blue + ':' + (seriesCaps.colorPedestal.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorPedestal.hexlen, 0))
			},
		}
	}

	if (seriesCaps.colorGain && seriesCaps.colorGain.cmd.red) {
		actions.pedRedU = {
			name: 'Color - Red Gain Up',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue + seriesCaps.colorGain.step <= seriesCaps.colorGain.limit) {
					self.data.redPedValue += seriesCaps.colorGain.step
				}
				await sendCam(self, seriesCaps.colorGain.cmd.red + ':' + (seriesCaps.colorGain.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}

		actions.pedRedD = {
			name: 'Color - Red Gain Down',
			options: [],
			callback: async (action) => {
				if (self.data.redPedValue - seriesCaps.colorGain.step <= seriesCaps.colorGain.limit) {
					self.data.redPedValue -= seriesCaps.colorGain.step
				}
				await sendCam(self, seriesCaps.colorGain.cmd.red + ':' + (seriesCaps.colorGain.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}

		actions.pedRedS = {
			name: 'Color - Set Red Gain',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -seriesCaps.colorGain.limit,
					max: +seriesCaps.colorGain.limit,
					step: seriesCaps.colorGain.step,
					required: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.data.redPedValue = action.options.val
				await sendCam(self, seriesCaps.colorGain.cmd.red + ':' + (seriesCaps.colorGain.offset +
					self.data.redPedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}
	}

	if (seriesCaps.colorGain && seriesCaps.colorGain.cmd.blue) {
		actions.pedBlueU = {
			name: 'Color - Blue Gain Up',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue + seriesCaps.colorGain.step <= seriesCaps.colorGain.limit) {
					self.data.bluePedValue += seriesCaps.colorGain.step
				}
				await sendCam(self, seriesCaps.colorGain.cmd.blue + ':' + (seriesCaps.colorGain.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}

		actions.pedBlueD = {
			name: 'Color - Blue Gain Down',
			options: [],
			callback: async (action) => {
				if (self.data.bluePedValue - seriesCaps.colorGain.step <= seriesCaps.colorGain.limit) {
					self.data.bluePedValue -= seriesCaps.colorGain.step
				}
				await sendCam(self, seriesCaps.colorGain.cmd.blue + ':' + (seriesCaps.colorGain.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}

		actions.pedBlueS = {
			name: 'Color - Set Blue Gain',
			options: [
				{
					id: 'val',
					type: 'number',
					label: 'Level',
					default: 0,
					min: -seriesCaps.colorGain.limit,
					max: +seriesCaps.colorGain.limit,
					step: seriesCaps.colorGain.step,
					requiblue: true,
					range: true,
				},
			],
			callback: async (action) => {
				self.data.bluePedValue = action.options.val
				await sendCam(self, seriesCaps.colorGain.cmd.blue + ':' + (seriesCaps.colorGain.offset +
					self.data.bluePedValue).toString(16).toUpperCase().padStart(seriesCaps.colorGain.hexlen, 0))
			},
		}
	}

	if (seriesCaps.filter.cmd) {
		actions.filterU = {
			name: 'Exposure - ND Filter Up',
			options: [],
			callback: async (action) => {
				if (self.filterIndex == seriesCaps.filter.dropdown.length) {
					self.filterIndex = seriesCaps.filter.dropdown.length
				} else if (self.filterIndex < seriesCaps.filter.dropdown.length) {
					self.filterIndex++
				}
				self.filterVal = seriesCaps.filter.dropdown[self.filterIndex].id

				await sendCam(self, 'OFT:' + self.filterVal)
			},
		}

		actions.filterD = {
			name: 'Exposure - ND Filter Down',
			options: [],
			callback: async (action) => {
				if (self.filterIndex == 0) {
					self.filterIndex = 0
				} else if (self.filterIndex > 0) {
					self.filterIndex--
				}
				self.filterVal = seriesCaps.filter.dropdown[self.filterIndex].id

				await sendCam(self, 'OFT:' + self.filterVal)
			},
		}

		actions.filterS = {
			name: 'Exposure - Set ND Filter',
			options: [
				{
					type: 'dropdown',
					label: 'ND Filter setting',
					id: 'val',
					default: seriesCaps.filter.dropdown[0].id,
					choices: seriesCaps.filter.dropdown,
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

	if (seriesCaps.preset) {
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
				await sendCam(self, 'OSE:71:' + action.options.val)
			},
		}
	}

	if (seriesCaps.presetSpeed) {
		actions.speedPset = {
			name: 'Preset - Set Recall Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'val',
					default: '999',
					choices: e.ENUM_PSSPEED,
				},
			],
			callback: async (action) => {
				if (seriesCaps.presetTime) {
					await sendCam(self, 'OSJ:29:0')
				}
				await sendPTZ(self, 'UPVS' + action.options.val)
			},
		}
	}

	if (seriesCaps.presetTime) {
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
				await sendPTZ(self, 'UPVS' + parseInt(action.options.val).toString(16).toUpperCase().padStart(3, 0))
			},
		}
	}

	// ##############################
	// #### Autotracking Actions ####
	// ##############################

	if (seriesCaps.trackingAuto) {
		actions.autotrackingOff = {
			name: 'Auto Tracking Mode Off',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OSL:B6:0')
			},
		}

		actions.autotrackingOn = {
			name: 'Auto Tracking Mode On',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OSL:B6:1')
			},
		}

		actions.autotrackingStartStop = {
			name: 'Auto Tracking - Start/Stop',
			options: [
				{
					type: 'dropdown',
					label: 'Option',
					id: 'value',
					default: 0,
					choices: [
						{ id: '0', label: 'Stop' },
						{ id: '1', label: 'Start' },
					],
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OSL:BC:' + action.options.value)
			},
		}
	}

	// ########################
	// #### System Actions ####
	// ########################

	if (seriesCaps.power) {
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

	if (seriesCaps.tally)  {
		if (seriesCaps.tally2)  {
			actions.tallyOff = {
				name: 'System - Red Tally Off',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'TLR:0')
				},
			}
			actions.tallyOn = {
				name: 'System - Red Tally On',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'TLR:1')
				},
			}
			actions.tally2Off = {
				name: 'System - Green Tally Off',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'TLG:0')
				},
			}
			actions.tally2On = {
				name: 'System - Green Tally On',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'TLG:1')
				},
			}
			if (seriesCaps.tally3)  {
				actions.tally3Off = {
					name: 'System - Yellow Tally Off',
					options: [],
					callback: async (action) => {
						await sendCam(self, 'TLY:0')
					},
				}
				actions.tally3On = {
					name: 'System - Yellow Tally On',
					options: [],
					callback: async (action) => {
						await sendCam(self, 'TLY:1')
					},
				}
			}
		} else { // Use legacy PTZ Tally
			actions.tallyOff = {
				name: 'System - Tally Off',
				options: [],
				callback: async (action) => {
					await sendPTZ(self, 'DA0')
				},
			}
			actions.tallyOn = {
				name: 'System - Tally On',
				options: [],
				callback: async (action) => {
					await sendPTZ(self, 'DA1')
				},
			}
		}
	}

	if (seriesCaps.colorbar) {
		actions.colorbarOff = {
			name: 'System - Color Bar Off',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'DCB:0')
			},
		}

		actions.colorbarOn = {
			name: 'System - Color Bar On',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'DCB:1')
			},
		}
	}

	if (seriesCaps.install) {
		actions.insPosition = {
			name: 'System - Installation Position',
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
			callback: async (action) => {
				await sendPTZ(self, 'INS' + action.options.position)
			},
		}
	}

	if (seriesCaps.recordSD) {
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

	if (seriesCaps.streamSRT) {
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

	if (seriesCaps.streamRTMP) {
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
