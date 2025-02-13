/* eslint-disable no-unused-vars */
import { c } from './choices.js'
import { getAndUpdateSeries } from './common.js'
import got from 'got'

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

export async function sendPTZ(self, str) {
	if (str) {
		const url = `http://${self.config.host}:${self.config.httpPort}/cgi-bin/aw_ptz?cmd=%23${str}&res=1`
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

	const seriesActions = SERIES.actions

	// ##########################
	// #### Pan/Tilt Actions ####
	// ##########################

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
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
	}

	if (seriesActions.panTilt) {
		actions.stop = {
			name: 'Pan/Tilt - Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'PTS5050')
				if (self.speedChangeEmitter.listenerCount('ptSpeed')) self.speedChangeEmitter.removeAllListeners('ptSpeed')
			},
		}
	}

	if (seriesActions.panTilt) {
		actions.home = {
			name: 'Pan/Tilt - Home',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'APC7FFF7FFF')
			},
		}
	}

	if (seriesActions.ptSpeed) {
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
					choices: c.CHOICES_SPEED,
					isVisible: ((options) => options.advanced ? false : true)
				},
				{
					type: 'dropdown',
					label: 'Pan speed setting',
					id: 'pSpeed',
					default: 25,
					choices: c.CHOICES_SPEED,
					isVisible: ((options) => options.advanced ? true : false)
				},
				{
					type: 'dropdown',
					label: 'Tilt speed setting',
					id: 'tSpeed',
					default: 25,
					choices: c.CHOICES_SPEED,
					isVisible: ((options) => options.advanced ? true : false)
				},
			],
			callback: async (action) => {
				if (action.options.advanced === false) {
					const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === action.options.speed)

					if (i > -1) self.ptSpeedIndex = i
					self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
					self.pSpeed = self.ptSpeed
					self.tSpeed = self.ptSpeed
				} else {
					const j = c.CHOICES_SPEED.findIndex((speed) => speed.id === action.options.pSpeed)
					const k = c.CHOICES_SPEED.findIndex((speed) => speed.id === action.options.tSpeed)

					if (j > -1) self.pSpeedIndex = j
					if (k > -1) self.tSpeedIndex = k
					self.pSpeed = c.CHOICES_SPEED[self.pSpeedIndex].id
					self.tSpeed = c.CHOICES_SPEED[self.tSpeedIndex].id
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
	}

	if (seriesActions.ptSpeed) {
		actions.ptSpeedU = {
			name: 'Pan/Tilt - Speed Up',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.ptSpeed)
				if (i > 0) {
					self.ptSpeedIndex = i - 1
				}

				self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
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
	}

	if (seriesActions.ptSpeed) {
		actions.pSpeedU = {
			name: 'Pan/Tilt - Pan - Speed Up',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.pSpeed)
				if (i > 0) {
					self.pSpeedIndex = i - 1
				}

				self.pSpeed = c.CHOICES_SPEED[self.pSpeedIndex].id
				if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed
				self.setVariableValues({
					pSpeedVar: self.pSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.tSpeedU = {
			name: 'Pan/Tilt - Tilt - Speed Up',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.tSpeed)
				if (i > 0) {
					self.tSpeedIndex = i - 1
				}

				self.tSpeed = c.CHOICES_SPEED[self.tSpeedIndex].id
				if (self.tSpeed === self.pSpeed) self.ptSpeed = self.tSpeed
				self.setVariableValues({
					tSpeedVar: self.tSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.ptSpeedD = {
			name: 'Pan/Tilt - Speed Down',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.ptSpeed)
				if (i < 49) {
					self.ptSpeedIndex = i + 1
				}

				self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
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
	}

	if (seriesActions.ptSpeed) {
		actions.pSpeedD = {
			name: 'Pan/Tilt - Pan - Speed Down',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.pSpeed)
				if (i < 49) {
					self.pSpeedIndex = i + 1
				}

				self.pSpeed = c.CHOICES_SPEED[self.pSpeedIndex].id
				if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed
				self.setVariableValues({
					pSpeedVar: self.pSpeed,
					ptSpeedVar: self.ptSpeed,
				})
				self.speedChangeEmitter.emit('ptSpeed')
			},
		}
	}

	if (seriesActions.ptSpeed) {
		actions.tSpeedD = {
			name: 'Pan/Tilt - Tilt - Speed Down',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.tSpeed)
				if (i < 49) {
					self.tSpeedIndex = i + 1
				}

				self.tSpeed = c.CHOICES_SPEED[self.tSpeedIndex].id
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

	if (seriesActions.zoom) {
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
	}

	if (seriesActions.zoom) {
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
	}

	if (seriesActions.zoom) {
		actions.zoomS = {
			name: 'Lens - Zoom Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'Z50')
				if (self.speedChangeEmitter.listenerCount('zSpeed')) self.speedChangeEmitter.removeAllListeners('zSpeed')
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedS = {
			name: 'Lens - Zoom Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed setting',
					id: 'speed',
					default: 25,
					choices: c.CHOICES_SPEED,
				},
			],
			callback: async (action) => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === action.options.speed)
				if (i > -1) {
					self.zSpeedIndex = i
				}

				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedU = {
			name: 'Lens - Zoom Speed Up',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.zSpeed)
				if (i > 0) {
					self.zSpeedIndex = i - 1
				}

				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}
	}

	if (seriesActions.zSpeed) {
		actions.zSpeedD = {
			name: 'Lens - Zoom Speed Down',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.zSpeed)
				if (i < 49) {
					self.zSpeedIndex = i + 1
				}

				self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}
	}

	if (seriesActions.focus) {
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
	}

	if (seriesActions.focus) {
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
	}

	if (seriesActions.focus) {
		actions.focusS = {
			name: 'Lens - Focus Stop',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'F50')
				if (self.speedChangeEmitter.listenerCount('fSpeed')) self.speedChangeEmitter.removeAllListeners('fSpeed')
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedS = {
			name: 'Lens - Focus Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed setting',
					id: 'speed',
					default: 25,
					choices: c.CHOICES_SPEED,
				},
			],
			callback: async (action) => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === action.options.speed)
				if (i > -1) {
					self.fSpeedIndex = i
				}

				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedU = {
			name: 'Lens - Focus Speed Up',
			options: [],
			callback: async () => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.fSpeed)
				if (i > 0) {
					self.fSpeedIndex = i - 1
				}

				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}
	}

	if (seriesActions.fSpeed) {
		actions.fSpeedD = {
			name: 'Lens - Focus Speed Down',
			options: [],
			callback: async (action) => {
				const i = c.CHOICES_SPEED.findIndex((speed) => speed.id === self.fSpeed)
				if (i < 49) {
					self.fSpeedIndex = i + 1
				}

				self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
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
			callback: async (action) => {
				await sendPTZ(self, action.options.bol == 0 ? 'D11' : 'D10')
			},
		}
	}

	if (seriesActions.OTAF) {
		actions.focusOTAF = {
			name: 'Lens - Focus One Touch Auto (OTAF)',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'OSE:69:1')
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
			callback: async (action) => {
				if (self.irisIndex == CHOICES_IRIS.length) {
					self.irisIndex = CHOICES_IRIS.length
				} else if (self.irisIndex < CHOICES_IRIS.length) {
					self.irisIndex++
				}
				self.irisVal = CHOICES_IRIS[self.irisIndex].id
				await sendPTZ(self, 'I' + self.irisVal.toUpperCase())
			},
		}
	}

	if (seriesActions.iris) {
		actions.irisD = {
			name: 'Exposure - Iris Down',
			options: [],
			callback: async (action) => {
				if (self.irisIndex == 0) {
					self.irisIndex = 0
				} else if (self.irisIndex > 0) {
					self.irisIndex--
				}
				self.irisVal = CHOICES_IRIS[self.irisIndex].id
				await sendPTZ(self, 'I' + self.irisVal.toUpperCase())
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
			callback: async (action) => {
				await sendPTZ(self, 'I' + action.options.val)
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
			callback: async (action) => {
				await sendPTZ(self, action.options.bol == 0 ? 'D30' : 'D31')
			},
		}
	}

	if (seriesActions.gain.cmd) {
		actions.gainU = {
			name: 'Exposure - Gain Up',
			options: [],
			callback: async (action) => {
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

				await sendCam(self, seriesActions.gain.cmd + self.gainVal.toUpperCase())
			},
		}
	}

	if (seriesActions.gain.cmd) {
		actions.gainD = {
			name: 'Exposure - Gain Down',
			options: [],
			callback: async (action) => {
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

				await sendCam(self, seriesActions.gain.cmd + self.gainVal.toUpperCase())
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
			callback: async (action) => {
				await sendCam(self, seriesActions.gain.cmd + action.options.val)
			},
		}
	}

	if (seriesActions.shut.cmd) {
		actions.shutU = {
			name: 'Exposure - Shutter Up',
			options: [],
			callback: async (action) => {
				if (self.shutIndex == seriesActions.shut.dropdown.length) {
					self.shutIndex = seriesActions.shut.dropdown.length
				} else if (self.shutIndex < seriesActions.shut.dropdown.length) {
					self.shutIndex++
				}
				self.shutVal = seriesActions.shut.dropdown[self.shutIndex].id

				await sendCam(self, seriesActions.shut.cmd + self.shutVal.toUpperCase())
			},
		}
	}

	if (seriesActions.shut.cmd) {
		actions.shutD = {
			name: 'Exposure - Shutter Down',
			options: [],
			callback: async (action) => {
				if (self.shutIndex == 0) {
					self.shutIndex = 0
				} else if (self.shutIndex > 0) {
					self.shutIndex--
				}
				self.shutVal = seriesActions.shut.dropdown[self.shutIndex].id

				await sendCam(self, seriesActions.shut.cmd + self.shutVal.toUpperCase())
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
			callback: async (action) => {
				await sendCam(self, seriesActions.shut.cmd + action.options.val.toUpperCase())
			},
		}
	}

	if (seriesActions.ped.cmd) {
		actions.pedU = {
			name: 'Exposure - Pedestal Up',
			options: [],
			callback: async (action) => {
				if (self.pedestalIndex == seriesActions.ped.dropdown.length) {
					self.pedestalIndex = seriesActions.ped.dropdown.length
				} else if (self.pedestalIndex < seriesActions.ped.dropdown.length) {
					self.pedestalIndex++
				}
				self.pedestalVal = seriesActions.ped.dropdown[self.pedestalIndex].id

				await sendCam(self, seriesActions.ped.cmd + self.pedestalVal.toUpperCase())
			},
		}
	}

	if (seriesActions.ped.cmd) {
		actions.pedD = {
			name: 'Exposure - Pedestal Down',
			options: [],
			callback: async (action) => {
				if (self.pedestalIndex == 0) {
					self.pedestalIndex = 0
				} else if (self.pedestalIndex > 0) {
					self.pedestalIndex--
				}
				self.pedestalVal = seriesActions.ped.dropdown[self.pedestalIndex].id

				await sendCam(self, seriesActions.ped.cmd + self.pedestalVal.toUpperCase())
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
			callback: async (action) => {
				await sendCam(self, seriesActions.ped.cmd + action.options.val.toUpperCase())
			},
		}
	}

	if (seriesActions.colorTemperature) { 
		actions.colorTemperatureUp = {
			name: 'Color Temperature Up',
			options: [],
			callback: async (action) => {
				if (self.colorTemperatureIndex == seriesActions.colorTemperature.dropdown.length) {
					self.colorTemperatureIndex = seriesActions.colorTemperature.dropdown.length
				} else if (self.colorTemperatureIndex < seriesActions.colorTemperature.dropdown.length) {
					self.colorTemperatureIndex++
				}
				self.colorTemperatureValue = seriesActions.colorTemperature.dropdown[self.colorTemperatureIndex].id

				await sendCam(self, seriesActions.colorTemperature.cmd + self.colorTemperatureValue.toUpperCase())
			},
		}
	}
	
	if (seriesActions.colorTemperature) {
		actions.colorTemperatureDown = {
			name: 'Color Temperature Down',
			options: [],
			callback: async (action) => {
				if (self.colorTemperatureIndex == 0) {
					self.colorTemperatureIndex = 0
				} else if (self.colorTemperatureIndex > 0) {
					self.colorTemperatureIndex--
				}
				self.colorTemperatureValue = seriesActions.colorTemperature.dropdown[self.colorTemperatureIndex].id

				await sendCam(self, seriesActions.colorTemperature.cmd + self.colorTemperatureValue.toUpperCase())
			},
		}
	}

	if (seriesActions.colorTemperature) {
		actions.colorTemperatureSet = {
			name: 'Set Color Temperature',
			options: [
				{
					type: 'dropdown',
					label: 'Color Temperature',
					id: 'val',
					default: seriesActions.colorTemperature.dropdown[0].id,
					choices: seriesActions.colorTemperature.dropdown,
				},
			],
			callback: async (action) => {
				
				let id = action.options.val.toUpperCase();
				let index = seriesActions.colorTemperature.dropdown.findIndex((colorTemperature) => colorTemperature.id == id);

				self.colorTemperatureIndex = index;
				self.colorTemperatureValue = id;

				await sendCam(self, seriesActions.colorTemperature.cmd + id)
			},
		}
	}

	if (seriesActions.filter.cmd) {
		actions.filterU = {
			name: 'Exposure - ND Filter Up',
			options: [],
			callback: async (action) => {
				if (self.filterIndex == seriesActions.filter.dropdown.length) {
					self.filterIndex = seriesActions.filter.dropdown.length
				} else if (self.filterIndex < seriesActions.filter.dropdown.length) {
					self.filterIndex++
				}
				self.filterVal = seriesActions.filter.dropdown[self.filterIndex].id

				await sendCam(self, seriesActions.filter.cmd + self.filterVal)
			},
		}
	}

	if (seriesActions.filter.cmd) {
		actions.filterD = {
			name: 'Exposure - ND Filter Down',
			options: [],
			callback: async (action) => {
				if (self.filterIndex == 0) {
					self.filterIndex = 0
				} else if (self.filterIndex > 0) {
					self.filterIndex--
				}
				self.filterVal = seriesActions.filter.dropdown[self.filterIndex].id

				await sendCam(self, seriesActions.filter.cmd + self.filterVal)
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
			callback: async (action) => {
				await sendCam(self, seriesActions.filter.dropdown + action.options.val)
			},
		}
	}

	if (seriesActions.sceneSelect) {
		actions.sceneSelect = {
			name: 'Scene - Select',
			options: [
				{
					type: 'dropdown',
					label: 'Scene',
					id: 'scene',
					default: 1,
					choices: [
						{ id: 1, label: 'Scene 1' },
						{ id: 2, label: 'Scene 2' },
						{ id: 3, label: 'Scene 3' },
						{ id: 4, label: 'Scene 4' },
					],
				}
			],
			callback: async (action) => {
				await sendCam(self, 'XSF:' + action.options.scene)
			},
		}
	}
	
	if (seriesActions.whiteBalanceMode) {
		actions.sceneSet = {
			name: 'White Balance - Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: '0',
					choices: [
						{ id: '0', label: 'Auto'},
						{ id: '1', label: 'A' },
						{ id: '2', label: 'B' },
					],
				},
			],
			callback: async (action) => {
				await sendCam(self, 'OAW:' + action.options.mode)
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
			callback: async (action) => {
				await sendPTZ(self, 'M' + action.options.val)
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
			callback: async (action) => {
				await sendPTZ(self, 'R' + action.options.val)
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
			callback: async (action) => {
				await sendCam(self, 'OSE:71:' + action.options.val)
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
			callback: async (action) => {
				await sendPTZ(self, 'UPVS' + action.options.speed)
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
			callback: async (action) => {
				await sendPTZ(self, 'UPVS' + action.options.speed)
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
			callback: async (action) => {
				await sendCam(self, 'OSJ:29:' + action.options.mode)
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
			callback: async (action) => {
				await sendPTZ(self, 'O0')
			},
		}
	}

	if (seriesActions.power) {
		actions.powerOn = {
			name: 'System - Power On',
			options: [],
			callback: async (action) => {
				await sendPTZ(self, 'O1')
			},
		}
	}

	if (seriesActions.tally)  {
		if (seriesActions.tally2)  {
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
			callback: async (action) => {
				await sendPTZ(self, 'INS' + action.options.position)
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
			callback: async (action) => {
				await sendWeb(self, 'sdctrl?save=' + action.options.value)
			},
		}
	}

	if (seriesActions.colorBars) {
		actions.colorBarsOn = {
			name: 'Color Bars - Enable',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'DCB:1');
			},
		}
		actions.colorBarsOff = {
			name: 'Color Bars - Disable',
			options: [],
			callback: async (action) => {
				await sendCam(self, 'DCB:0');
			},
		}
		if (seriesActions.colorBarsSetup) {
			actions.colorBarSetupsOn = {
				name: 'Color Bars - Setup On (7.5IRE)',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'DCS:1');
				},
			}
			actions.colorBarsSetupOff = {
				name: 'Color Bars - Setup Off (0.0IRE)',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'DCS:0');
				},
			}
		}
		if (seriesActions.colorBarsTitle) {
			actions.colorBarsTitleOn = {
				name: 'Color Bars - Title On',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'OSD:BE:1');
				},
			}
			actions.colorBarsTitleOff = {
				name: 'Color Bars - Title Off',
				options: [],
				callback: async (action) => {
					await sendCam(self, 'OSD:BE:0');
				},
			}
		}
		if (seriesActions.colorBarsTone) {
			actions.colorBarsTone = {
				name: 'Color Bars - Tone',
				options: [
					{
						type: 'dropdown',
						label: 'Tone',
						id: 'tone',
						default: 0,
						choices: [
							{ id: '0h', label: 'Off' },
							{ id: '1h', label: 'Low' },
							{ id: '2h', label: 'Normal' },
						],
					},
				],
				callback: async (action) => {
					await sendCam(self, 'OSJ:27:' + action.options.tone);
				},
			}
		}
		if (seriesActions.colorBarsType) {
			actions.colorBarsType = {
				name: 'Color Bars - Type',
				options: [
					{
						type: 'dropdown',
						label: 'Type',
						id: 'type',
						default: 1,
						choices: [
							{ id: '1', label: 'Type 1' },
							{ id: '0', label: 'Type 2' },
						],
					},
				],
				callback: async (action) => {
					await sendCam(self, 'OSD:BA:' + action.options.type);
				},
			}
		}
	}

	return actions
}
