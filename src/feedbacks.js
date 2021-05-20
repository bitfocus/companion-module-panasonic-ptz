var { MODELS, SERIES_SPECS } = require('./models.js')

module.exports = {
	// ##########################
	// #### Define Feedbacks ####
	// ##########################
	setFeedbacks: function (i) {
		var self = i
		var feedbacks = {}
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

		const foregroundColor = self.rgb(255, 255, 255) // White
		const backgroundColorRed = self.rgb(255, 0, 0) // Red
		const backgroundColorGreen = self.rgb(0, 255, 0) // Green
		const backgroundColorOrange = self.rgb(255, 102, 0) // Orange

		if (SERIES.feedbacks.powerState == true) {
			feedbacks.powerState = {
				type: 'boolean',
				label: 'System - Power State',
				description: 'Indicate if PTZ is ON or OFF',
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Indicate in X State',
						id: 'option',
						default: '1',
						choices: [
							{ id: '0', label: 'OFF' },
							{ id: '1', label: 'ON' },
						],
					},
				],
				callback: function (feedback, bank) {
					var opt = feedback.options
					switch (opt.option) {
						case '0':
							if (self.data.power === 'OFF') {
								return true
							}
							break
						case '1':
							if (self.data.power === 'ON') {
								return true
							}
							break
						default:
							break
					}
					return false
				},
			}
		}

		if (SERIES.feedbacks.tallyState == true) {
			feedbacks.tallyState = {
				type: 'boolean',
				label: 'System - Tally State',
				description: 'Indicate if Tally is ON or OFF',
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Indicate in X State',
						id: 'option',
						default: '1',
						choices: [
							{ id: '0', label: 'OFF' },
							{ id: '1', label: 'ON' },
						],
					},
				],
				callback: function (feedback, bank) {
					var opt = feedback.options
					switch (opt.option) {
						case '0':
							if (self.data.tally === 'OFF') {
								return true
							}
							break
						case '1':
							if (self.data.tally === 'ON') {
								return true
							}
							break
						default:
							break
					}
					return false
				},
			}
		}

		if (SERIES.feedbacks.insState == true) {
			feedbacks.insState = {
				type: 'boolean',
				label: 'System - Install Position',
				description: 'Indicate if PTZ is on Desktop or Hanging',
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Indicate in X position',
						id: 'option',
						default: '1',
						choices: [
							{ id: '0', label: 'Desktop' },
							{ id: '1', label: 'Hanging' },
						],
					},
				],
				callback: function (feedback, bank) {
					var opt = feedback.options
					switch (opt.option) {
						case '0':
							if (self.data.ins === 'Desktop') {
								return true
							}
							break
						case '1':
							if (self.data.ins === 'Hanging') {
								return true
							}
							break
						default:
							break
					}
					return false
				},
			}
		}

		if (SERIES.feedbacks.autoFocus == true) {
			feedbacks.autoFocus = {
				type: 'boolean',
				label: 'Lens - Auto Focus State',
				description: 'Indicate if Auto focus is ON or OFF',
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Indicate in X State',
						id: 'option',
						default: '1',
						choices: [
							{ id: '0', label: 'Manual' },
							{ id: '1', label: 'Auto' },
						],
					},
				],
				callback: function (feedback, bank) {
					var opt = feedback.options
					switch (opt.option) {
						case '0':
							if (self.data.oaf === 'Manual') {
								return true
							}
							break
						case '1':
							if (self.data.oaf === 'Auto') {
								return true
							}
							break
						default:
							break
					}
					return false
				},
			}
		}

		if (SERIES.feedbacks.autoIris == true) {
			feedbacks.autoIris = {
				type: 'boolean',
				label: 'Lens - Auto Iris State',
				description: 'Indicate if Auto iris is ON or OFF',
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
				options: [
					{
						type: 'dropdown',
						label: 'Indicate in X State',
						id: 'option',
						default: '1',
						choices: [
							{ id: '0', label: 'Manual' },
							{ id: '1', label: 'Auto' },
						],
					},
				],
				callback: function (feedback, bank) {
					var opt = feedback.options
					switch (opt.option) {
						case '0':
							if (self.data.irisMode === 'Manual') {
								return true
							}
							break
						case '1':
							if (self.data.irisMode === 'Auto') {
								return true
							}
							break
						default:
							break
					}
					return false
				},
			}
		}

		return feedbacks
	},
}
