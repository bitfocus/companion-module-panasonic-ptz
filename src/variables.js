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

	variables.push({ name: 'series', label: 'Camera Series' })
	variables.push({ name: 'model', label: 'Model of camera' })
	variables.push({ name: 'name', label: 'Name of camera' })
	if (SERIES.variables.version) {
		variables.push({ name: 'version', label: 'Firmware Version' })
	}
	if (SERIES.variables.error) {
		variables.push({ name: 'error', label: 'PTZ Error Codes' })
	}
	if (SERIES.variables.ins) {
		variables.push({ name: 'ins', label: 'Install Position' })
	}
	if (SERIES.variables.power) {
		variables.push({ name: 'power', label: 'Power ON/OFF' })
	}
	if (SERIES.variables.tally) {
		variables.push({ name: 'tally', label: 'Tally ON/OFF' })
	}
	if (SERIES.variables.OAF) {
		variables.push({ name: 'OAF', label: 'Auto Focus Mode' })
	}
	if (SERIES.variables.iris) {
		variables.push({ name: 'irisMode', label: 'Auto Iris Mode' })
	}
	if (SERIES.variables.gainValue) {
		variables.push({ name: 'gainValue', label: 'Gain Value' })
	}
	if (SERIES.variables.preset) {
		variables.push({ name: 'presetMode', label: 'Preset Mode' })
	}
	variables.push({ name: 'ptSpeedVar', label: 'Pan/Tilt Speed' })
	variables.push({ name: 'zSpeedVar', label: 'Zoom Speed' })
	variables.push({ name: 'fSpeedVar', label: 'Focus Speed' })
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

	self.setVariableValues({
		series: self.data.series,
		model: self.data.model,
		name: self.data.name,
		version: self.data.version,
		error: self.data.error,
		ins: self.data.ins,
		power: self.data.power,
		tally: self.data.tally,
		OAF: self.data.oaf,
		irisMode: self.data.irisMode,
		gainValue: gainValue?.label,
		presetMode: self.data.recallModePset,
		ptSpeedVar: self.ptSpeed,
		zSpeedVar: self.zSpeed,
		fSpeedVar: self.fSpeed,
	})
}
