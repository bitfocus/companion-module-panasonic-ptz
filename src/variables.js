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
		variables.push({ variableId: 'error', name: 'Error Code' })
	}
	if (SERIES.variables.ins) {
		variables.push({ variableId: 'installMode', name: 'Install Position' })
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
	if (SERIES.variables.tally3) {
		variables.push({ variableId: 'tally3', name: 'Yellow Tally ON/OFF' })
	}
	if (SERIES.variables.OAF) {
		variables.push({ variableId: 'focusMode', name: 'Focus Mode' })
	}
	if (SERIES.variables.whiteBalance) {
		variables.push({ variableId: 'whiteBalance', name: 'White Balance Mode' })
	}
	if (SERIES.variables.colorTemperature) {
		variables.push({ variableId: 'colorTemperature', name: 'Color Temperature' })
	}
	if (SERIES.variables.irisMode) {
		variables.push({ variableId: 'irisMode', name: 'Iris Mode' })
	}
	if (SERIES.variables.gain) {
		variables.push({ variableId: 'gain', name: 'Gain' })
	}
	if (SERIES.variables.preset) {
		variables.push({ variableId: 'presetRecallMode', name: 'Preset Recall Mode' })
		variables.push({ variableId: 'presetCompleted', name: 'Preset # Completed' })
		variables.push({ variableId: 'presetSelected', name: 'Preset # Selected' })
	}
	variables.push({ variableId: 'zoomPosition', name: 'Zoom Position %' })
	variables.push({ variableId: 'focusPosition', name: 'Focus Position %' })
	variables.push({ variableId: 'irisPosition', name: 'Iris Position %' })
	variables.push({ variableId: 'zoomPositionBar', name: 'Zoom Position' })
	variables.push({ variableId: 'focusPositionBar', name: 'Focus Position' })
	variables.push({ variableId: 'irisPositionBar', name: 'Iris Position' })
	variables.push({ variableId: 'masterPed', name: 'Master Pedestal' })
	variables.push({ variableId: 'redPed', name: 'Red Pedestal' })
	variables.push({ variableId: 'bluePed', name: 'Blue Pedestal' })
	variables.push({ variableId: 'redGain', name: 'Red Gain' })
	variables.push({ variableId: 'blueGain', name: 'Blue Gain' })
	variables.push({ variableId: 'shutter', name: 'Shutter Mode' })
	variables.push({ variableId: 'ois', name: 'O.I.S.' })
	variables.push({ variableId: 'iris', name: 'Iris' })
	variables.push({ variableId: 'shutterStep', name: 'Shutter Step' })
	variables.push({ variableId: 'ptSpeedVar', name: 'Pan/Tilt Speed' })
	variables.push({ variableId: 'pSpeedVar', name: 'Pan Speed' })
	variables.push({ variableId: 'tSpeedVar', name: 'Tilt Speed' })
	variables.push({ variableId: 'zSpeedVar', name: 'Zoom Speed' })
	variables.push({ variableId: 'fSpeedVar', name: 'Focus Speed' })

	return variables
}

// #########################
// #### Check Variables ####
// #########################
export function checkVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const colorTemperature = SERIES.actions.colorTemperature
		? SERIES.actions.colorTemperature.dropdown.find((CTEMP) => CTEMP.id == self.data.colorTemperature)
		: null

	const gain = SERIES.actions.gain
		? SERIES.actions.gain.dropdown.find((GAIN) => GAIN.id == self.data.gain)
		: null

	const ois = SERIES.actions.ois
		? SERIES.actions.ois.dropdown.find((OIS) => OIS.id == self.data.ois)
		: null

	const shutter = SERIES.actions.shut
		? SERIES.actions.shut.dropdown.find((SHUTTER) => SHUTTER.id == self.data.shutter)
		: null

	const whiteBalance = SERIES.actions.whiteBalance
		? SERIES.actions.whiteBalance.dropdown.find((WB) => WB.id == self.data.whiteBalance)
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

		power: self.data.power,
		colorbar: self.data.colorbar,
		tally: self.data.tally,
		tally2: self.data.tally2,
		tally3: self.data.tally3,

		focusMode: self.data.focusMode,
		installMode: self.data.installMode,
		irisMode: self.data.irisMode,
		presetRecallMode: self.data.presetRecallMode,

		presetSelected: (self.data.presetSelectedIdx + 1).toString(),
		presetCompleted: (self.data.presetCompletedIdx + 1).toString(),

		zoomPosition: normalizePct(self.data.zoomPosition, 0x0, 0xAAA, false, 1),
		focusPosition: normalizePct(self.data.focusPosition, 0x0, 0xAAA, false),
		irisPosition: normalizePct(self.data.irisPosition, 0x0, 0xAAA, false),
		zoomPositionBar: progressBar(normalizePct(self.data.zoomPosition, 0x0, 0xAAA), 14, 'W', 'T'),
		focusPositionBar: progressBar(normalizePct(self.data.focusPosition, 0x0, 0xAAA), 14, 'N', 'F'),
		irisPositionBar: progressBar(normalizePct(self.data.irisPosition, 0x0, 0xAAA), 14, 'C', 'O'),

		redGain: self.data.redGainValue,
		blueGain: self.data.blueGainValue,
		redPed: self.data.redPedValue,
		bluePed: self.data.bluePedValue,
		masterPed: self.data.masterPedValue,
		
		error: self.data.errorLabel,
		iris: self.data.irisLabel,
		shutterStep: self.data.shutterStepLabel,

		colorTemperature: self.data.colorTempLabel?self.data.colorTempLabel:colorTemperature?.label,

		gain: gain?.label,
		ois: ois?.label,
		shutter: shutter?.label,
		whiteBalance: whiteBalance?.label,

		ptSpeedVar: self.ptSpeed,
		pSpeedVar: self.pSpeed,
		tSpeedVar: self.tSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
	})
}
