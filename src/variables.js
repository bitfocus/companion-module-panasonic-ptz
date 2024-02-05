import { getAndUpdateSeries, getLabel } from './common.js'
import { e } from './enum.js'

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
	variables.push({ variableId: 'mac', name: 'MAC address' })
	variables.push({ variableId: 'serial', name: 'Serial number' })
	variables.push({ variableId: 'title', name: 'Title of camera' })
	if (SERIES.capabilities.version) {
		variables.push({ variableId: 'version', name: 'Firmware Version' })
	}
	if (SERIES.capabilities.error) {
		variables.push({ variableId: 'error', name: 'Error Code' })
	}
	if (SERIES.capabilities.install) {
		variables.push({ variableId: 'installMode', name: 'Install Position' })
	}
	if (SERIES.capabilities.power) {
		variables.push({ variableId: 'power', name: 'Power Status' })
	}
	if (SERIES.capabilities.colorbar) {
		variables.push({ variableId: 'colorbar', name: 'Color Bar Status' })
	}
	if (SERIES.capabilities.tally) {
		variables.push({ variableId: 'tally', name: 'Red Tally Status' })
	}
	if (SERIES.capabilities.tally2) {
		variables.push({ variableId: 'tally2', name: 'Green Tally Status' })
	}
	if (SERIES.capabilities.tally3) {
		variables.push({ variableId: 'tally3', name: 'Yellow Tally Status' })
	}
	if (SERIES.capabilities.focusAuto) {
		variables.push({ variableId: 'focusMode', name: 'Focus Mode' })
	}
	if (SERIES.capabilities.whiteBalance) {
		variables.push({ variableId: 'whiteBalance', name: 'White Balance Mode' })
	}
	if (SERIES.capabilities.colorTemperature) {
		variables.push({ variableId: 'colorTemperature', name: 'Color Temperature' })
	}
	if (SERIES.capabilities.gain) {
		variables.push({ variableId: 'gain', name: 'Gain' })
	}
	if (SERIES.capabilities.preset) {
		variables.push({ variableId: 'presetScopeMode', name: 'Preset Recall Mode' })
		variables.push({ variableId: 'presetCompleted', name: 'Preset # Completed' })
		variables.push({ variableId: 'presetSelected', name: 'Preset # Selected' })
	}
	if (SERIES.capabilities.shutter) {
		variables.push({ variableId: 'shutter', name: 'Shutter Mode' })
	}
	if (SERIES.capabilities.shutter && SERIES.capabilities.shutter.dropdown === e.ENUM_SHUTTER_ADV) {
		variables.push({ variableId: 'shutterStep', name: 'Shutter Step' })
	}
	if (SERIES.capabilities.ois) {
		variables.push({ variableId: 'ois', name: 'O.I.S.' })
	}
	if (SERIES.capabilities.panTilt) {
		variables.push({ variableId: 'ptSpeedVar', name: 'Pan/Tilt Speed' })
		variables.push({ variableId: 'pSpeedVar', name: 'Pan Speed' })
		variables.push({ variableId: 'tSpeedVar', name: 'Tilt Speed' })
	}
	if (SERIES.capabilities.zoom) {
		variables.push({ variableId: 'zoomPosition', name: 'Zoom Position %' })
		variables.push({ variableId: 'zoomPositionBar', name: 'Zoom Position' })
		variables.push({ variableId: 'zSpeedVar', name: 'Zoom Speed' })
	}
	if (SERIES.capabilities.focus) {
		variables.push({ variableId: 'focusPosition', name: 'Focus Position %' })
		variables.push({ variableId: 'focusPositionBar', name: 'Focus Position' })
		variables.push({ variableId: 'fSpeedVar', name: 'Focus Speed' })
	}
	if (SERIES.capabilities.iris) {
		variables.push({ variableId: 'iris', name: 'Iris' })
		variables.push({ variableId: 'irisPosition', name: 'Iris Position %' })
		variables.push({ variableId: 'irisPositionBar', name: 'Iris Position' })
		variables.push({ variableId: 'irisFollowPosition', name: 'Iris Follow Position' })
	}
	if (SERIES.capabilities.irisAuto) {
		variables.push({ variableId: 'irisMode', name: 'Iris Mode' })
	}
	if (SERIES.capabilities.pedestal) {
		variables.push({ variableId: 'masterPed', name: 'Master Pedestal' })
	}
	if (SERIES.capabilities.colorGain) {
		variables.push({ variableId: 'redGain', name: 'Red Gain' })
		variables.push({ variableId: 'blueGain', name: 'Blue Gain' })
	}
	if (SERIES.capabilities.colorPedestal) {
		variables.push({ variableId: 'redPed', name: 'Red Pedestal' })
		variables.push({ variableId: 'bluePed', name: 'Blue Pedestal' })
	}
	if (SERIES.capabilities.presetSpeed) {
		variables.push({ variableId: 'presetSpeed', name: 'Recall Speed' })
		variables.push({ variableId: 'presetSpeedTable', name: 'Recall Speed Table' })
		variables.push({ variableId: 'presetSpeedUnit', name: 'Recall Speed Unit' })
	}

	return variables
}

// #########################
// #### Check Variables ####
// #########################
export function checkVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const colorTemperature = SERIES.capabilities.colorTemperature.index
		? getLabel(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature) : null

	const gain = SERIES.capabilities.gain
		? getLabel(SERIES.capabilities.gain.dropdown, self.data.gain) : null

	const ois = SERIES.capabilities.ois
		? getLabel(SERIES.capabilities.ois.dropdown, self.data.ois) : null

	const presetSpeed = SERIES.capabilities.presetSpeed
		? getLabel(e.ENUM_PSSPEED, self.data.presetSpeed) : null

	const presetSpeedTable = SERIES.capabilities.presetSpeed
		? getLabel(SERIES.capabilities.presetSpeed.dropdown, self.data.presetSpeedTable) : null

	const presetSpeedUnit = SERIES.capabilities.presetSpeed
		? getLabel(e.ENUM_PSSPEED_UNIT, self.data.presetSpeedUnit) : null

	const shutter = SERIES.capabilities.shutter
		? getLabel(SERIES.capabilities.shutter.dropdown, self.data.shutter) : null

	const whiteBalance = SERIES.capabilities.whiteBalance
		? getLabel(SERIES.capabilities.whiteBalance.dropdown, self.data.whiteBalance) : null

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
		mac: self.data.mac,
		serial: self.data.serial,
		title: self.data.title,
		version: self.data.version,

		power: self.data.power,
		colorbar: self.data.colorbar,
		tally: self.data.tally,
		tally2: self.data.tally2,
		tally3: self.data.tally3,

		focusMode: self.data.focusMode,
		installMode: self.data.installMode,
		irisMode: self.data.irisMode,
		presetScopeMode: self.data.presetScopeMode,

		presetSelected: (self.data.presetSelectedIdx + 1).toString(),
		presetCompleted: (self.data.presetCompletedIdx + 1).toString(),

		zoomPosition: normalizePct(self.data.zoomPosition, 0x0, 0xAAA, false, 1),
		focusPosition: normalizePct(self.data.focusPosition, 0x0, 0xAAA, false),
		irisPosition: normalizePct(self.data.irisPosition, 0x0, 0xAAA, false),
		zoomPositionBar: progressBar(normalizePct(self.data.zoomPosition, 0x0, 0xAAA), 10, 'W', 'T'),
		focusPositionBar: progressBar(normalizePct(self.data.focusPosition, 0x0, 0xAAA), 10, 'N', 'F'),
		irisPositionBar: progressBar(normalizePct(self.data.irisPosition, 0x0, 0xAAA), 10, 'C', 'O'),
		irisFollowPosition: self.data.irisFollowPosition,

		redGain: self.data.redGainValue,
		blueGain: self.data.blueGainValue,
		redPed: self.data.redPedValue,
		bluePed: self.data.bluePedValue,
		masterPed: self.data.masterPedValue,
		
		error: self.data.errorLabel,
		iris: self.data.irisLabel,
		shutterStep: self.data.shutterStepLabel,

		colorTemperature: self.data.colorTempLabel?self.data.colorTempLabel:colorTemperature,

		gain: gain,
		ois: ois,
		presetSpeed: presetSpeed,
		presetSpeedTable: presetSpeedTable,
		presetSpeedUnit: presetSpeedUnit,
		shutter: shutter,
		whiteBalance: whiteBalance,

		ptSpeedVar: self.ptSpeed,
		pSpeedVar: self.pSpeed,
		tSpeedVar: self.tSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
	})
}
