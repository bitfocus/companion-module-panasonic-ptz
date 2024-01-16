import { getAndUpdateSeries } from './common.js'

// ##########################
// #### Define Variables ####
// ##########################
export function setVariables(self) {
	const SERIES = getAndUpdateSeries(self)
	// console.log(SERIES);

	// console.log('variable set');
	// console.log(self.config.model);
	// console.log(self.data.model);
	// console.log(self.data.modelTCP);
	// console.log(self.data.series);
	const variables = []

	variables.push({ variableId: 'series', name: 'Camera Series' })
	variables.push({ variableId: 'model', name: 'Model of camera' })
	variables.push({ variableId: 'name', name: 'Name of camera' })
	if (SERIES.variables.version) {
		variables.push({ variableId: 'version', name: 'Firmware Version' })
	}
	if (SERIES.variables.error) {
		variables.push({ variableId: 'error', name: 'PTZ Error Codes' })
	}
	if (SERIES.variables.ins) {
		variables.push({ variableId: 'ins', name: 'Install Position' })
	}
	if (SERIES.variables.power) {
		variables.push({ variableId: 'power', name: 'Power ON/OFF' })
	}
	if (SERIES.variables.colorbar) {
		variables.push({ variableId: 'colorbar', name: 'Color Bar ON/OFF' })
	}
	if (SERIES.variables.tally) {
		variables.push({ variableId: 'tally', name: 'Red Tally ON/OFF' })
	}
	if (SERIES.variables.tally2) {
		variables.push({ variableId: 'tally2', name: 'Green Tally ON/OFF' })
	}
	if (SERIES.variables.OAF) {
		variables.push({ variableId: 'autoFocus', name: 'Auto Focus Mode' })
	}
	if (SERIES.variables.whiteBalance) {
		variables.push({ variableId: 'whiteBalance', name: 'White Balance Mode' })
	}
	if (SERIES.variables.colorTemperature) {
		variables.push({ variableId: 'colorTemperature', name: 'Color Temperature' })
	}
	if (SERIES.variables.irisMode) {
		variables.push({ variableId: 'irisMode', name: 'Auto Iris Mode' })
	}
	if (SERIES.variables.gain) {
		variables.push({ variableId: 'gain', name: 'Gain Value' })
	}
	if (SERIES.variables.preset) {
		variables.push({ variableId: 'presetMode', name: 'Preset Mode' })
		variables.push({ variableId: 'lastPresetCompleted', name: 'Last Preset Completed' })
	}
	variables.push({ variableId: 'ptSpeedVar', name: 'Pan/Tilt Speed' })
	variables.push({ variableId: 'pSpeedVar', name: 'Pan Speed' })
	variables.push({ variableId: 'tSpeedVar', name: 'Tilt Speed' })
	variables.push({ variableId: 'zSpeedVar', name: 'Zoom Speed' })
	variables.push({ variableId: 'fSpeedVar', name: 'Focus Speed' })
	variables.push({ variableId: 'zoomPosition', name: 'Zoom Position %' })
	variables.push({ variableId: 'focusPosition', name: 'Focus Position %' })
	variables.push({ variableId: 'irisPosition', name: 'Iris Position %' })
	variables.push({ variableId: 'zoomPositionBar', name: 'Zoom Position' })
	variables.push({ variableId: 'focusPositionBar', name: 'Focus Position' })
	variables.push({ variableId: 'irisPositionBar', name: 'Iris Position' })
	variables.push({ variableId: 'irisValue', name: 'Iris F No' })
	variables.push({ variableId: 'masterPed', name: 'Master Pedestal' })
	variables.push({ variableId: 'redPed', name: 'Red Pedestal' })
	variables.push({ variableId: 'bluePed', name: 'Blue Pedestal' })
	variables.push({ variableId: 'redGain', name: 'Red Gain' })
	variables.push({ variableId: 'blueGain', name: 'Blue Gain' })
	variables.push({ variableId: 'shutterMode', name: 'Shutter Mode' })
	variables.push({ variableId: 'shutterValue', name: 'Shutter Value' })
	variables.push({ variableId: 'oisMode', name: 'O.I.S. Mode' })

	return variables
}

// #########################
// #### Check Variables ####
// #########################
export function checkVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const gain = SERIES.actions.gain
		? SERIES.actions.gain.dropdown.find((GAIN) => GAIN.id == self.data.gain)
		: null

	const shutter = SERIES.actions.shut
		? SERIES.actions.shut.dropdown.find((SHUT) => SHUT.id == self.data.shutterMode)
		: null

	const colorTemperature = SERIES.actions.colorTemperature
		? SERIES.actions.colorTemperature.dropdown.find((colorTemperature) => colorTemperature.id == self.data.colorTemperature)
		: null

	const whiteBalance = SERIES.actions.whiteBalance
		? SERIES.actions.whiteBalance.dropdown.find((whiteBalance) => whiteBalance.id == self.data.whiteBalanceMode)
		: null

	const progressBar = (pct, width = 20, start = '', end = '') => {
		if (pct && pct >= 0 && pct <= 100) {
			const flr = Math.floor(pct * width / 100)
			return start + (".").repeat(flr) + ("|") + (".").repeat(width-flr) + end
			//return start + ("|").repeat(flr).padEnd(width, ".") + end
		}
		return '---'
	}

	const normalizePct = (val, low = 0, high = 100, limit = false, fractionDigits = 0) => {
		if (limit) {
			val = (val < low) ? low : val
			val = (val > high) ? high : val
		}
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 100).toFixed(fractionDigits)
	}

	const norm = (val, low = 0, high = 100) => {
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 2) - 1
	}

	const normS = (val, low = -100, high = 100) => {
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 2) - 1
	}

	self.setVariableValues({
		series: self.data.series,
		model: self.data.model,
		name: self.data.name,
		version: self.data.version,
		error: self.data.error,
		ins: self.data.ins,
		power: self.data.power,
		colorbar: self.data.colorbar,
		tally: self.data.tally,
		tally2: self.data.tally2,
		autoFocus: self.data.autoFocus,
		whiteBalance: whiteBalance?.label,
		//colorTemperature: self.data.colorTemperature,
		colorTemperature: colorTemperature?.label,
		irisMode: self.data.irisMode,
		gain: gain?.label,
		presetMode: self.data.recallModePset,
		ptSpeedVar: self.ptSpeed,
		pSpeedVar: self.pSpeed,
		tSpeedVar: self.tSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
		zoomPosition: normalizePct(self.data.zoomPosition, 0x555, 0xFFF, false, 1),
		focusPosition: normalizePct(self.data.focusPosition, 0x555, 0xFFF, false, 0),
		irisPosition: normalizePct(self.data.irisPosition, 0x555, 0xFFF,false, 0),
		zoomPositionBar: progressBar(normalizePct(self.data.zoomPosition, 0x555, 0xFFF), 14, 'W', 'T'),
		focusPositionBar: progressBar(normalizePct(self.data.focusPosition, 0x555, 0xFFF), 14, 'N', 'F'),
		irisPositionBar: progressBar(normalizePct(self.data.irisPosition, 0x555, 0xFFF), 14, 'C', 'O'),
		irisValue: 'F'+(self.data.irisValue / 10).toFixed(1),
		masterPed: self.data.masterPed,
		redPed: self.data.redPed,
		bluePed: self.data.bluePed,
		redGain: self.data.redGain,
		blueGain: self.data.blueGain,
		lastPresetCompleted: (self.data.lastPresetCompleted + 1).toString(),
		shutterMode: shutter?.label,
		shutterValue: self.data.shutterValue,
		oisMode: self.data.oisMode,
	})
}
