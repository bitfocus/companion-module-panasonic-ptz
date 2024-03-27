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
	if (SERIES.variables.tally) {
		variables.push({ variableId: 'tally', name: 'Red Tally ON/OFF' })
	}
	if (SERIES.variables.tally2) {
		variables.push({ variableId: 'tally2', name: 'Green Tally ON/OFF' })
	}
	if (SERIES.variables.OAF) {
		variables.push({ variableId: 'OAF', name: 'Auto Focus Mode' })
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
	if (SERIES.variables.redGainValue) {
		variables.push({ variableId: 'redGainValue', 'name': 'Red Gain Value' })
	}
	if (SERIES.variables.blueGainValue) {
		variables.push({ variableId: 'blueGainValue', 'name': 'Blue Gain Value' })
	}
	if (SERIES.variables.preset) {
		variables.push({ variableId: 'presetMode', name: 'Preset Mode' })
	}
	if (SERIES.variables.whiteBalanceMode) {
		variables.push({ variableId: 'whiteBalanceMode', name: 'White Balance Mode' })
	}
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

	const gainValue = SERIES.actions.gain
		? SERIES.actions.gain.dropdown.find((GAIN) => GAIN.id == self.data.gainValue)
		: null

	const redGainValue = SERIES.actions.redGain
		? SERIES.actions.redGain.dropdown.find((REDGAIN) => REDGAIN.id == self.data.redGainValue)
		: null

	const blueGainValue = SERIES.actions.blueGain
		? SERIES.actions.blueGain.dropdown.find((BLUEGAIN) => BLUEGAIN.id == self.data.blueGainValue)
		: null

	const colorTemperature = SERIES.actions.colorTemperature
		? SERIES.actions.colorTemperature.dropdown.find((colorTemperature) => colorTemperature.id == self.data.colorTemperature)
		: null

	const whiteBalanceModeValue = SERIES.actions.whiteBalanceMode
		? SERIES.actions.whiteBalanceMode.dropdown.find((WBM) => WBM.id == self.data.whiteBalanceModeValue)
		: null



	self.setVariableValues({
		series: self.data.series,
		model: self.data.model,
		name: self.data.name,
		version: self.data.version,
		error: self.data.error,
		ins: self.data.ins,
		power: self.data.power,
		tally: self.data.tally,
		tally2: self.data.tally2,
		OAF: self.data.oaf,
		colorTemperature: colorTemperature?.label,
		irisMode: self.data.irisMode,
		gainValue: gainValue?.label,
		redGainValue: redGainValue?.label,
		blueGainValue: blueGainValue?.label,
		whiteBalanceMode: whiteBalanceModeValue?.label,
		presetMode: self.data.recallModePset,
		ptSpeedVar: self.ptSpeed,
		pSpeedVar: self.pSpeed,
		tSpeedVar: self.tSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
	})
}
