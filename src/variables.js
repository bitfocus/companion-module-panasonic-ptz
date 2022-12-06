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

	self.setVariable('series', self.data.series)
	self.setVariable('model', self.data.model)
	self.setVariable('name', self.data.name)
	self.setVariable('version', self.data.version)
	self.setVariable('error', self.data.error)
	self.setVariable('ins', self.data.ins)
	self.setVariable('power', self.data.power)
	self.setVariable('tally', self.data.tally)
	self.setVariable('OAF', self.data.oaf)
	self.setVariable('irisMode', self.data.irisMode)
	const gainValue = SERIES.actions.gain.dropdown.find((GAIN) => GAIN.id == self.data.gainValue)
	self.setVariable('gainValue', gainValue?.label)
	self.setVariable('presetMode', self.data.recallModePset)
	self.setVariable('ptSpeedVar', self.ptSpeed)
	self.setVariable('zSpeedVar', self.zSpeed)
	self.setVariable('fSpeedVar', self.fSpeed)
}
