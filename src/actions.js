/* eslint-disable no-unused-vars */
import { e } from './enum.js'
import { getAndUpdateSeries, getNext, getNextValue, toHexString } from './common.js'

const SPEED_OFFSET = 50
const SPEED_MIN = 0
const SPEED_MAX = 49
const SPEED_DEFAULT = 25

const ACTION_SET = 's'
const ACTION_TOGGLE = 't'
const ACTION_STOP = 0
const ACTION_HOLD = 0
const ACTION_RAISE = 1
const ACTION_LOWER = -1
const ACTION_UP = 1
const ACTION_DOWN = -1
const ACTION_INC = 1
const ACTION_DEC = -1
const ACTION_NEXT = 1
const ACTION_PREV = -1

const liveSpeed = {
	id: 'liveSpeed',
	type: 'checkbox',
	label: 'Adjust the velocity on speed change',
	default: false
}

const speedOperation = {
	type: 'dropdown',
	label: 'Speed Change',
	id: 'op',
	default: ACTION_SET,
	choices: [
		{ id: ACTION_SET, label: 'Set Speed' },
		{ id: ACTION_RAISE, label: 'Raise Speed' },
		{ id: ACTION_LOWER, label: 'Lower Speed' },
	],
}

const speedSetting = {
	type: 'number',
	label: 'Speed setting',
	id: 'set',
	default: SPEED_DEFAULT,
	min: SPEED_MIN,
	max: SPEED_MAX,
	required: true,
	range: true,
	isVisible: ((options) => options.op === ACTION_SET)
}

function btnMove(label_inc = '⬆', label_dec = '⬇') {
	return [
		{
			type: 'dropdown',
			label: 'Direction',
			id: 'dir',
			default: ACTION_STOP,
			choices: [
				{ id: ACTION_STOP, label: 'Stop' },
				{ id: ACTION_INC, label: label_inc },
				{ id: ACTION_DEC, label: label_dec },
			],
		},
		liveSpeed,
	]
}

function btnSetToggle(choices, label = 'Setting', def = 0) {
	return [
		{
			type: 'dropdown',
			label: 'Action',
			id: 'op',
			default: ACTION_SET,
			choices: [
				{ id: ACTION_SET, label: 'Set' },
				{ id: ACTION_TOGGLE, label: 'Toggle' },
			],
		},
		{
			type: 'dropdown',
			label: label,
			id: 'set',
			default: choices[def].id,
			choices: choices,
			isVisible: ((options) => options.op === ACTION_SET)
		},
	]
}

function btnSetToggleNextPrev(choices, label = 'Setting', def = 0) {
	return [
		{
			type: 'dropdown',
			label: 'Action',
			id: 'op',
			default: ACTION_SET,
			choices: [
				{ id: ACTION_SET, label: 'Set' },
				{ id: ACTION_TOGGLE, label: 'Toggle' },
				{ id: ACTION_NEXT, label: 'Next' },
				{ id: ACTION_PREV, label: 'Previous' },
			],
		},
		{
			type: 'dropdown',
			label: label,
			id: 'set',
			default: choices[def].id,
			choices: choices,
			isVisible: ((options) => options.op === ACTION_SET)
		},
	]
}

function btnSetIncDecStep(label = 'Value', def, min, max, step = 1) {
	return [
		{
			type: 'dropdown',
			label: 'Action',
			id: 'op',
			default: ACTION_SET,
			choices: [
				{ id: ACTION_SET, label: 'Set' },
				{ id: ACTION_INC, label: 'Increase' },
				{ id: ACTION_DEC, label: 'Decrease' },
			],
		},
		{
			id: 'set',
			type: 'number',
			label: label,
			default: def,
			min: min,
			max: max,
			step: step,
			required: true,
			range: true,
			isVisible: ((options) => options.op === ACTION_SET)
		},
		{
			id: 'step',
			type: 'number',
			label: 'Step size',
			default: step,
			min: 1,
			max: max-min,
			required: true,
			isVisible: ((options) => options.op !== ACTION_SET)
		},
	]
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

	// ##########################
	// #### Pan/Tilt Actions ####
	// ##########################

	if (SERIES.capabilities.panTilt) {
		actions.ptMove = {
			name: 'Pan/Tilt - Move',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'dir',
					default: ACTION_STOP,
					choices: [
						{ id: ACTION_STOP, label: 'Stop' },
						{ id: '21', label: '➡ Right' }, // +
						{ id: '01', label: '⬅ Left' }, // -
						{ id: '12', label: '⬆ Up' }, // +
						{ id: '10', label: '⬇ Down' }, // -
						{ id: '22', label: '⬈ Up Right' }, // ++
						{ id: '02', label: '⬉ Up Left' }, // -+
						{ id: '00', label: '⬋ Down Left' }, // --
						{ id: '20', label: '⬊ Up Right' }, // +-
					],
				},
				liveSpeed,
			],
			callback: async (action) => {
				if (action.options.dir === ACTION_STOP) {
					await self.getPTZ(speedCmdPT(SPEED_OFFSET, SPEED_OFFSET))
					if (self.speedChangeEmitter.listenerCount('ptSpeed')) self.speedChangeEmitter.removeAllListeners('ptSpeed')
				} else {
					let arr = Array.from(action.options.dir)
					let pan = parseInt(arr[0]) - 1; let tilt = parseInt(arr[1]) - 1
					await self.getPTZ(speedCmdPT(pan * self.ptSpeed + SPEED_OFFSET, tilt * self.ptSpeed + SPEED_OFFSET))
					if (action.options.liveSpeed) {
						self.speedChangeEmitter.removeAllListeners('ptSpeed').then(
							self.speedChangeEmitter.on('ptSpeed', async () => {
								await self.getPTZ(speedCmdPT(pan * self.ptSpeed + SPEED_OFFSET, tilt * self.ptSpeed + SPEED_OFFSET))
							})
						)
					}
				}
			},
		}

		actions.home = {
			name: 'Pan/Tilt - Home Position',
			options: [],
			callback: async (action) => {
				await self.getPTZ('APC80008000')
			},
		}

		actions.ptSpeed = {
			name: 'Pan/Tilt - Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Scope',
					id: 'scope',
					default: 'pt',
					choices: [
						{ id: 'pt', label: 'Pan/Tilt' },
						{ id: 'p', label: 'Pan only' },
						{ id: 't', label: 'Tilt only' },
					],
				},	
				speedOperation,
				speedSetting,
			],
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					switch (action.options.scope) {
						case 'pt':
							self.ptSpeed = action.options.speed
							self.pSpeed = self.ptSpeed
							self.tSpeed = self.ptSpeed
							break
						case 'p': self.pSpeed = action.options.speed; break
						case 't': self.tSpeed = action.options.speed; break
					}
				} else {
					switch (action.options.scope) {
						case 'pt':
							self.ptSpeed = getNextValue(self.ptSpeed, SPEED_MIN, SPEED_MAX, action.options.op)
							self.pSpeed = self.ptSpeed
							self.tSpeed = self.ptSpeed
							break
						case 'p': self.pSpeed = getNextValue(self.pSpeed, SPEED_MIN, SPEED_MAX, action.options.op); break
						case 't': self.tSpeed = getNextValue(self.tSpeed, SPEED_MIN, SPEED_MAX, action.options.op); break
					}
				}

				if (self.pSpeed === self.tSpeed) self.ptSpeed = self.pSpeed

				self.setVariableValues({
					ptSpeedVar: self.ptSpeed,
					pSpeedVar: self.pSpeed,
					tSpeedVar: self.tSpeed,
				})

				self.speedChangeEmitter.emit('ptSpeed')
			},
		}
	}

	// ######################
	// #### Lens Actions ####
	// ######################

	if (SERIES.capabilities.zoom) {
		actions.zoom = {
			name: 'Lens - Zoom',
			options: btnMove('⬆ In', '⬇ Out'),
			callback: async (action) => {
				await self.getPTZ('Z' + speedCmd(action.options.op * self.zSpeed + SPEED_OFFSET))

				if (self.speedChangeEmitter.listenerCount('zSpeed')) self.speedChangeEmitter.removeAllListeners('zSpeed')

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.on('zSpeed', async () => {
						await self.getPTZ('Z' + speedCmd(action.options.op * self.zSpeed + SPEED_OFFSET))
					})
				}
			},
		}

		actions.zSpeedS = {
			name: 'Lens - Zoom Speed',
			options: [
				speedOperation,
				speedSetting,
			],
			callback: async (action) => {
				self.zSpeed = action.options.op !== ACTION_SET
					? getNextValue(self.zSpeed, SPEED_MIN, SPEED_MAX, action.options.op)
					: action.options.speed
				self.setVariableValues({ zSpeedVar: self.zSpeed })
				self.speedChangeEmitter.emit('zSpeed')
			},
		}
	}

	if (SERIES.capabilities.focus) {
		actions.focusN = {
			name: 'Lens - Focus Adjust',
			options: btnMove('⬆ Far', '⬇ Near'),
			callback: async (action) => {
				await self.getPTZ('F' + speedCmd(action.options.op * self.fSpeed + SPEED_OFFSET))

				if (self.speedChangeEmitter.listenerCount('fSpeed')) self.speedChangeEmitter.removeAllListeners('fSpeed')

				if (action.options.liveSpeed) {
					self.speedChangeEmitter.on('fSpeed', async () => {
						await self.getPTZ('F' + speedCmd(action.options.op * self.fSpeed + SPEED_OFFSET))
					})
				}
			},
		}

		actions.fSpeed = {
			name: 'Lens - Focus Speed',
			options: [
				speedOperation,
				speedSetting,
			],
			callback: async (action) => {
				self.fSpeed = action.options.op !== ACTION_SET
					? getNextValue(self.fSpeed, SPEED_MIN, SPEED_MAX, action.options.op)
					: action.options.speed
				self.setVariableValues({ fSpeedVar: self.fSpeed })
				self.speedChangeEmitter.emit('fSpeed')
			},
		}
	}

	if (SERIES.capabilities.focusAuto) {
		actions.focusM = {
			name: 'Lens - Focus Mode',
			options: btnSetToggle(e.ENUM_MAN_AUTO),
			callback: async (action) => {
				action.options.op === ACTION_SET
					? await self.getCam('OAF:' + action.options.set)
					: await self.getCam('OAF:' + getNext(e.ENUM_MAN_AUTO, self.data.focusAuto, 1, true))
			},
		}
	}

	if (SERIES.capabilities.focusPushAuto) {
		actions.focusOTAF = {
			name: 'Lens - Focus Push Auto',
			options: [],
			callback: async (action) => {
				await self.getCam('OSE:69:1')
			},
		}
	}

	// ##########################
	// #### Exposure Actions ####
	// ##########################

	if (SERIES.capabilities.iris) {
		actions.iris = {
			name: 'Exposure - Iris',
			options: btnSetIncDecStep('Iris setting', 0x555, 0x0, 0xAAA, 0x1E),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getPTZ('AXI' + toHexString(0x555 + action.options.set, 3))
				} else {
					const val = getNextValue(self.data.irisPosition, 0x0, 0xAAA, action.options.op * 0x1E)
					await self.getPTZ('AXI' + toHexString(0x555 + val, 3))
				}
			},
		}

		actions.irisMode = {
			name: 'Exposure - Iris Mode',
			options: btnSetToggle(e.ENUM_MAN_AUTO),
			callback: async (action) => {
				action.option.op === ACTION_SET
					? await self.getCam('ORS:' + action.options.set)
					: await self.getCam('ORS:' + getNext(e.ENUM_MAN_AUTO, self.data.irisMode, 1, true).id)
			},
		}
	}

	if (SERIES.capabilities.gain.cmd) {
		actions.gain = {
			name: 'Exposure - Gain',
			options: btnSetToggleNextPrev(SERIES.capabilities.gain.dropdown),
			callback: async (action) => {
				const cmd = SERIES.capabilities.gain.cmd + ':'
				switch (action.options.op) {
					case ACTION_SET: await self.getCam(cmd + action.options.set); break
					case ACTION_TOGGLE: await self.getCam(cmd + getNext(SERIES.capabilities.gain.dropdown, self.data.gain).id); break
					default: await self.getCam(cmd + getNext(SERIES.capabilities.gain.dropdown, self.data.gain, action.options.op, false).id); break
				}
			},
		}
	}

	if (SERIES.capabilities.shutter) {
		actions.shutU = {
			name: 'Exposure - Shutter Up',
			options: [],
			callback: async (action) => {
				if (SERIES.capabilities.shutter.inc) {
					await self.getCam(SERIES.capabilities.shutter.inc + ':0x01')
				} else {				
					await self.getCam(SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, +1).id)
				}
			},
		}

		actions.shutD = {
			name: 'Exposure - Shutter Down',
			options: [],
			callback: async (action) => {
				if (SERIES.capabilities.shutter.dec) {
					await self.getCam(SERIES.capabilities.shutter.dec + ':0x01')
				} else {
					await self.getCam(SERIES.capabilities.shutter.cmd + ':' + getNext(SERIES.capabilities.shutter.dropdown, self.data.shutter, -1).id)
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
					await self.getCam(SERIES.capabilities.shutter.cmd + ':' + action.options.val)
				},
			}
		}
	}

	if (SERIES.capabilities.pedestal.cmd) {
		actions.ped = {
			name: 'Exposure - Master Pedestal',
			options: btnSetIncDecStep('Level', 0, -SERIES.capabilities.pedestal.limit, +SERIES.capabilities.pedestal.limit, SERIES.capabilities.pedestal.step),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getCam(SERIES.capabilities.pedestal.cmd + ':' +
					toHexString(SERIES.capabilities.pedestal.offset + action.options.val, SERIES.capabilities.pedestal.hexlen))
				} else {
					const val = getNextValue(self.data.masterPedValue,
						-SERIES.capabilities.pedestal.limit, +SERIES.capabilities.pedestal.limit,
						action.options.op * SERIES.capabilities.pedestal.step)
					await self.getCam(SERIES.capabilities.pedestal.cmd + ':' +
						toHexString(SERIES.capabilities.pedestal.offset + val, SERIES.capabilities.pedestal.hexlen))
				}
			},
		}
	}

	if (SERIES.capabilities.whiteBalance) {
		actions.whiteBalanceMode = {
			name: 'White Balance - Mode',
			options: btnSetToggleNextPrev(SERIES.capabilities.whiteBalance.dropdown),
			callback: async (action) => {
				switch (action.options.op) {
					case ACTION_SET: await self.getCam('OAW:' + action.options.set); break
					case ACTION_TOGGLE: await self.getCam('OAW:' + getNext(SERIES.capabilities.whiteBalance.dropdown, self.data.whiteBalance).id); break
					default: await self.getCam('OAW:' + getNext(SERIES.capabilities.whiteBalance.dropdown, self.data.whiteBalance, action.options.op, false).id); break
				}
			},
		}

		actions.whiteBalanceExecAWB = {
			name: 'White Balance - Execute AWC/AWB',
			options: [],
			callback: async (action) => {
				await self.getCam('OWS')
			},
		}

		actions.whiteBalanceExecABB = {
			name: 'White Balance - Execute ABC/ABB',
			options: [],
			callback: async (action) => {
				await self.getCam('OAS')
			},
		}
	}

	if (SERIES.capabilities.colorTemperature && SERIES.capabilities.colorTemperature.index) { 
		actions.colorTemperature = {
			name: 'White Balance - Color Temperature',
			options: btnSetToggleNextPrev(SERIES.capabilities.colorTemperature.index.dropdown),
			callback: async (action) => {
				const cmd = SERIES.capabilities.colorTemperature.index.cmd + ':'
				switch (action.options.op) {
					case ACTION_SET: await self.getCam(cmd + action.options.set); break
					case ACTION_TOGGLE: await self.getCam(cmd + getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature).id); break
					default: await self.getCam(cmd + getNext(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature, action.options.op, false).id); break
				}
			},
		}
	}

	if (SERIES.capabilities.colorTemperature && SERIES.capabilities.colorTemperature.advanced) { 
		if (SERIES.capabilities.colorTemperature.advanced.set) {
			actions.colorTemperature = {
				name: 'White Balance - Color Temperature',
				options: btnSetIncDecStep('Color Temperature [K]', 3200, SERIES.capabilities.colorTemperature.advanced.min, SERIES.capabilities.colorTemperature.advanced.max, 20),
				callback: async (action) => {
					switch (action.options.op) {
						case ACTION_SET: await self.getCam(SERIES.capabilities.colorTemperature.advanced.set + ':' + toHexString(action.options.set, 5) + ':0'); break
						case ACTION_INC: await self.getCam(SERIES.capabilities.colorTemperature.advanced.inc + ':1'); break
						case ACTION_DEC: await self.getCam(SERIES.capabilities.colorTemperature.advanced.dec + ':1'); break
					}
				},
			}
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.red) {
		actions.pedRed = {
			name: 'Color - Red Pedestal',
			options: btnSetIncDecStep('Level', 0, -SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit, SERIES.capabilities.colorPedestal.step),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getCam(SERIES.capabilities.colorPedestal.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + action.options.set, SERIES.capabilities.colorPedestal.hexlen))
				} else {
					const val = getNextValue(self.data.redPedValue,
						-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
						action.options.op * SERIES.capabilities.colorPedestal.step)
					await self.getCam(SERIES.capabilities.colorPedestal.cmd.red + ':' +
						toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
				}
			},
		}
	}

	if (SERIES.capabilities.colorPedestal && SERIES.capabilities.colorPedestal.cmd.blue) {
		actions.pedBlue = {
			name: 'Color - Blue Pedestal',
			options: btnSetIncDecStep('Level', 0, -SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit, SERIES.capabilities.colorPedestal.step),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getCam(SERIES.capabilities.colorPedestal.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorPedestal.offset + action.options.set, SERIES.capabilities.colorPedestal.hexlen))
				} else {
					const val = getNextValue(self.data.bluePedValue,
						-SERIES.capabilities.colorPedestal.limit, +SERIES.capabilities.colorPedestal.limit,
						action.options.op * SERIES.capabilities.colorPedestal.step)
					await self.getCam(SERIES.capabilities.colorPedestal.cmd.blue + ':' +
						toHexString(SERIES.capabilities.colorPedestal.offset + val, SERIES.capabilities.colorPedestal.hexlen))
				}
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.red) {
		actions.gainRed = {
			name: 'Color - Red Gain',
			options: btnSetIncDecStep('Level', 0, -SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit, SERIES.capabilities.colorGain.step),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getCam(SERIES.capabilities.colorGain.cmd.red + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + action.options.set, SERIES.capabilities.colorGain.hexlen))
				} else {
					const val = getNextValue(self.data.redGainValue,
						-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
						action.options.op * SERIES.capabilities.colorGain.step)
					await self.getCam(SERIES.capabilities.colorGain.cmd.red + ':' +
						toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
				}
			},
		}
	}

	if (SERIES.capabilities.colorGain && SERIES.capabilities.colorGain.cmd.blue) {
		actions.gainBlue = {
			name: 'Color - Blue Gain',
			options: btnSetIncDecStep('Level', 0, -SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit, SERIES.capabilities.colorGain.step),
			callback: async (action) => {
				if (action.options.op === ACTION_SET) {
					await self.getCam(SERIES.capabilities.colorGain.cmd.blue + ':' +
					toHexString(SERIES.capabilities.colorGain.offset + action.options.set, SERIES.capabilities.colorGain.hexlen))
				} else {
					const val = getNextValue(self.data.blueGainValue,
						-SERIES.capabilities.colorGain.limit, +SERIES.capabilities.colorGain.limit,
						action.options.op * SERIES.capabilities.colorGain.step)
					await self.getCam(SERIES.capabilities.colorGain.cmd.blue + ':' +
						toHexString(SERIES.capabilities.colorGain.offset + val, SERIES.capabilities.colorGain.hexlen))
				}
			},
		}
	}

	if (SERIES.capabilities.filter) {
		actions.filter = {
			name: 'Exposure - ND Filter',
			options: btnSetToggleNextPrev(SERIES.capabilities.filter.dropdown),
			callback: async (action) => {
				switch (action.options.op) {
					case ACTION_SET: await self.getCam('OFT:' + action.options.set); break
					case ACTION_TOGGLE: await self.getCam('OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter).id); break
					default: await self.getCam('OFT:' + getNext(SERIES.capabilities.filter.dropdown, self.data.filter, action.options.op, false).id); break
				}
			},
		}
	}

	// ########################
	// #### Preset Actions ####
	// ########################

	if (SERIES.capabilities.preset) {
		actions.presetMem = {
			name: 'Preset - Memory Operation',
			options: [
				{
					type: 'dropdown',
					label: 'Action',
					id: 'op',
					default: e.ENUM_PRESET[0].id,
					choices: [
						{ id: 'R', label: 'Recall' },
						{ id: 'M', label: 'Save' },
						{ id: 'C', label: 'Clear' },
					],
				},
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					default: e.ENUM_PRESET[0].id,
					choices: e.ENUM_PRESET,
				},
			],
			callback: async (action) => {
				await self.getPTZ(action.options.op + action.options.val)
			},
		}

		actions.presetRecallMode = {
			name: 'Preset - Recall Scope',
			options: btnSetToggleNextPrev(e.ENUM_PRESET_SCOPE, 'Preset Recall Scope'),
			callback: async (action) => {
				switch (action.options.op) {
					case ACTION_SET: await self.getCam('OSE:71:' + action.options.set); break
					case ACTION_TOGGLE: await self.getCam('OSE:71:' + getNext(e.ENUM_PRESET_SCOPE, self.data.presetScope).id); break
					default: await self.getCam('OSE:71:' + getNext(e.ENUM_PRESET_SCOPE, self.data.presetScope, action.options.op, false).id); break
				}				
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
				if (SERIES.capabilities.presetTime) await self.getCam('OSJ:29:' + (s?'0':'1'))
				if (s) await self.getPTZ('PST' + action.options.table)
				await self.getPTZ('UPVS' + action.options.speed)
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
				await self.getCam('OSJ:29:1')
				await self.getPTZ('UPVS' + toHexString(action.options.val, 3))
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
				await self.getCam('OSL:B6:' + action.options.val)
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
				await self.getCam('OSL:BC:' + action.options.val)
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
				await self.getPTZ('O0')
			},
		}

		actions.powerOn = {
			name: 'System - Power On',
			options: [],
			callback: async (action) => {
				await self.getPTZ('O1')
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
				await self.getWeb('initial?cmd=reset&Randomnum=0123456789ABCDEF')
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
					await self.getCam('TLR:' + action.options.val)
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
					await self.getCam('TLG:' + action.options.val)
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
						await self.getCam('TLY:' + action.options.val)
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
					await self.getPTZ('DA' + action.options.val)
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
				await self.getCam('OIS:' + action.options.val)
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
				await self.getCam('DCB:' + action.options.val)
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
				await self.getPTZ('INS' + action.options.val)
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
				await self.getWeb('sdctrl?save=' + action.options.val)
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
				await self.getWeb('srt_ctrl?cmd=' + action.options.val)
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
				await self.getWeb('rtmp_ctrl?cmd=' + action.options.val)
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
				case '0': await self.getCam(action.options.cmd); break
				case '1': await self.getPTZ(action.options.cmd); break
				case '2': await self.getWeb(action.options.cmd); break
			}
		},
	}

	return actions
}
