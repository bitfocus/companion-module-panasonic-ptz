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
		variables.push({ variableId: 'OAF', name: 'Auto Focus Mode' })
	}
	if (SERIES.variables.whiteBalance) {
		variables.push({ variableId: 'whiteBalance', name: 'White Balance Mode' })
	}
	if (SERIES.variables.colorTemperature) {
		variables.push({ variableId: 'colorTemperature', name: 'Color Temperature' })
	}
	if (SERIES.variables.iris) {
		variables.push({ variableId: 'irisMode', name: 'Auto Iris Mode' })
	}
	if (SERIES.variables.gainValue) {
		variables.push({ variableId: 'gainValue', name: 'Gain Value' })
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
	variables.push({ variableId: 'irisF', name: 'Iris F No' })
	return variables
}

// #########################
// #### Check Variables ####
// #########################
export function checkVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const gainValue = SERIES.actions.gain
		? SERIES.actions.gain.dropdown.find((GAIN) => GAIN.id == self.data.gainValue)
		: null

	const colorTemperature = SERIES.actions.colorTemperature
		? SERIES.actions.colorTemperature.dropdown.find((colorTemperature) => colorTemperature.id == self.data.colorTemperature)
		: null

	const whiteBalance = SERIES.actions.whiteBalance
		? SERIES.actions.whiteBalance.dropdown.find((whiteBalance) => whiteBalance.id == self.data.whiteBalance)
		: null

	const progressBar = (pct, width = 20, start = '', end = '') => {
		if (pct && pct >= 0 && pct <= 100) {
			const flr = Math.floor(pct * width / 100)
			return start + (".").repeat(flr) + ("|") + (".").repeat(width-flr) + end
			//return start + ("|").repeat(flr).padEnd(width, ".") + end
		}
		return '---'
	}

	const normalizePct = (val, low = 0, high = 100, limit = false) => {
		if (limit) {
			val = (val < low) ? low : val
			val = (val > high) ? high : val
		}
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 100).toFixed(2)
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
		OAF: self.data.oaf,
		whiteBalance: whiteBalance?.label,
		colorTemperature: colorTemperature?.label,
		irisMode: self.data.irisMode,
		gainValue: gainValue?.label,
		presetMode: self.data.recallModePset,
		ptSpeedVar: self.ptSpeed,
		pSpeedVar: self.pSpeed,
		tSpeedVar: self.tSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
		zoomPosition: normalizePct(self.data.zoomPosition, 0x555, 0xFFF),
		focusPosition: normalizePct(self.data.focusPosition, 0x555, 0xFFF),
		irisPosition: normalizePct(self.data.irisPosition, 0x555, 0xFFF),
		zoomPositionBar: progressBar(normalizePct(self.data.zoomPosition, 0x555, 0xFFF), 14, 'W', 'T'),
		focusPositionBar: progressBar(normalizePct(self.data.focusPosition, 0x555, 0xFFF), 14, 'N', 'F'),
		irisPositionBar: progressBar(normalizePct(self.data.irisPosition, 0x555, 0xFFF), 14, 'C', 'O'),
		irisF: 'F'+(self.data.irisF / 10).toFixed(1),
		lastPresetCompleted: (self.data.lastPresetCompleted + 1).toString(),
	})
}
