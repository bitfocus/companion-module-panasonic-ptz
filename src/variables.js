var { MODELS, SERIES_SPECS } = require('./models.js')

module.exports = {
	// ##########################
	// #### Define Variables ####
	// ##########################
	setVariables: function (i) {
		var self = i
		var variables = []
		var SERIES = {}

		// Set the model and series selected, if in auto, dettect what model is connected via TCP
		if (self.config.model === 'Auto') {
			self.data.model = self.data.modelTCP
		} else {
			self.data.model = self.config.model
		}

		if (self.data.model !== 'NaN') {
			self.data.series = MODELS.find((MODELS) => MODELS.id == self.data.model).series
		}

		// Find the specific commands for a given series
		if (
			self.data.series === 'Auto' ||
			self.data.series === 'Other' ||
			SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series) == undefined
		) {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')
		} else {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == self.data.series)
		}
		// console.log(SERIES);

		// console.log('variable set');
		// console.log(self.config.model);
		// console.log(self.data.model);
		// console.log(self.data.modelTCP);
		// console.log(self.data.series);

		variables.push({ name: 'series', label: 'Camera Series' })
		variables.push({ name: 'model', label: 'Model of camera' })
		variables.push({ name: 'name', label: 'Name of camera' })
		if (SERIES.variables.version == true) {
			variables.push({ name: 'version', label: 'Firmware Version' })
		}
		if (SERIES.variables.error == true) {
			variables.push({ name: 'error', label: 'PTZ Error Codes' })
		}
		if (SERIES.variables.ins == true) {
			variables.push({ name: 'ins', label: 'Install Position' })
		}
		if (SERIES.variables.power == true) {
			variables.push({ name: 'power', label: 'Power ON/OFF' })
		}
		if (SERIES.variables.tally == true) {
			variables.push({ name: 'tally', label: 'Tally ON/OFF' })
		}
		if (SERIES.variables.OAF == true) {
			variables.push({ name: 'OAF', label: 'Auto Focus Mode' })
		}
		if (SERIES.variables.iris == true) {
			variables.push({ name: 'irisMode', label: 'Auto Iris Mode' })
		}
		if (SERIES.variables.preset == true) {
			variables.push({ name: 'presetMode', label: 'Preset Mode' })
		}
		variables.push({ name: 'ptSpeedVar', label: 'Pan/Tilt Speed' })
		variables.push({ name: 'zSpeedVar', label: 'Zoom Speed' })
		variables.push({ name: 'fSpeedVar', label: 'Focus Speed' })
		return variables
	},

	// #########################
	// #### Check Variables ####
	// #########################
	checkVariables: function (i) {
		var self = i

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
		self.setVariable('presetMode', self.data.recallModePset)
		self.setVariable('ptSpeedVar', self.ptSpeed)
		self.setVariable('zSpeedVar', self.zSpeed)
		self.setVariable('fSpeedVar', self.fSpeed)
	},
}
