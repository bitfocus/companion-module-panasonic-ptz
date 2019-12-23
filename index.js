var instance_skel = require('../../instance_skel');
var debug;
var log;

var IRIS = [];
for (var i = 0; i < 100; ++i) {
	IRIS.push({ id: ('0' + i.toString(10)).substr(-2,2), label: 'Iris ' + i });
}

var FILTER = [
	{ id: '0', label: 'Through' },
	{ id: '1', label: '1/4' },
	{ id: '2', label: '1/16' },
	{ id: '3', label: '1/64' },
	{ id: '4', label: '1/8' },
	{ id: '8', label: 'AUTO' }
];

var SHUTTER = [
	{ id: '0', label: 'OFF' },
	{ id: '2', label: '1/60' },
	{ id: '3', label: '1/100' },
	{ id: '4', label: '1/120' },
	{ id: '5', label: '1/250' },
	{ id: '6', label: '1/500' },
	{ id: '7', label: '1/1000' },
	{ id: '8', label: '1/2000' },
	{ id: '9', label: '1/4000' },
	{ id: 'A', label: '1/10000' },
	{ id: 'B', label: 'Syncro Scan' },
	{ id: 'C', label: 'ELC' },
	{ id: 'D', label: '1/24' },
	{ id: 'E', label: '1/25' },
	{ id: 'F', label: '1/30' }
];

var PRESET = [];
for (var i = 0; i < 100; ++i) {
	PRESET.push({ id: ('0' + i.toString(10)).substr(-2,2), label: 'Preset ' + (i +1) });
}

var PEDESTAL = [];
for (var i = 0; i < 300; ++i) {
	PEDESTAL.push({ id: ('00' + i.toString(16)).substr(-3,3), label: 'Pedestal ' + i });
}

var PSSPEED = [
	{ id: 999, label: 'Speed (Fast)' },
	{ id: 975, label: 'Speed 30' },
	{ id: 950, label: 'Speed 29' },
	{ id: 925, label: 'Speed 28' },
	{ id: 900, label: 'Speed 27' },
	{ id: 875, label: 'Speed 26' },
	{ id: 850, label: 'Speed 25' },
	{ id: 825, label: 'Speed 24' },
	{ id: 800, label: 'Speed 23' },
	{ id: 775, label: 'Speed 22' },
	{ id: 750, label: 'Speed 21' },
	{ id: 725, label: 'Speed 20' },
	{ id: 700, label: 'Speed 19' },
	{ id: 675, label: 'Speed 18' },
	{ id: 650, label: 'Speed 17' },
	{ id: 625, label: 'Speed 16' },
	{ id: 600, label: 'Speed 15' },
	{ id: 575, label: 'Speed 14' },
	{ id: 550, label: 'Speed 13' },
	{ id: 525, label: 'Speed 12' },
	{ id: 500, label: 'Speed 11' },
	{ id: 475, label: 'Speed 10' },
	{ id: 450, label: 'Speed 09' },
	{ id: 425, label: 'Speed 08' },
	{ id: 400, label: 'Speed 07' },
	{ id: 375, label: 'Speed 06' },
	{ id: 350, label: 'Speed 05' },
	{ id: 325, label: 'Speed 04' },
	{ id: 300, label: 'Speed 03' },
	{ id: 275, label: 'Speed 02' },
	{ id: 250, label: 'Speed 01 (Slow)' }
];

var SPEED = [
	{ id: 49, label: 'Speed 49 (Fast)' },
	{ id: 48, label: 'Speed 48' },
	{ id: 47, label: 'Speed 47' },
	{ id: 46, label: 'Speed 46' },
	{ id: 45, label: 'Speed 45' },
	{ id: 44, label: 'Speed 44' },
	{ id: 43, label: 'Speed 43' },
	{ id: 42, label: 'Speed 42' },
	{ id: 41, label: 'Speed 41' },
	{ id: 40, label: 'Speed 40' },
	{ id: 39, label: 'Speed 39' },
	{ id: 38, label: 'Speed 38' },
	{ id: 37, label: 'Speed 37' },
	{ id: 36, label: 'Speed 36' },
	{ id: 35, label: 'Speed 35' },
	{ id: 34, label: 'Speed 34' },
	{ id: 33, label: 'Speed 33' },
	{ id: 32, label: 'Speed 32' },
	{ id: 31, label: 'Speed 31' },
	{ id: 30, label: 'Speed 30' },
	{ id: 29, label: 'Speed 29' },
	{ id: 28, label: 'Speed 28' },
	{ id: 27, label: 'Speed 27' },
	{ id: 26, label: 'Speed 26' },
	{ id: 25, label: 'Speed 25' },
	{ id: 24, label: 'Speed 24' },
	{ id: 23, label: 'Speed 23' },
	{ id: 22, label: 'Speed 22' },
	{ id: 21, label: 'Speed 21' },
	{ id: 20, label: 'Speed 20' },
	{ id: 19, label: 'Speed 19' },
	{ id: 18, label: 'Speed 18' },
	{ id: 17, label: 'Speed 17' },
	{ id: 16, label: 'Speed 16' },
	{ id: 15, label: 'Speed 15' },
	{ id: 14, label: 'Speed 14' },
	{ id: 13, label: 'Speed 13' },
	{ id: 12, label: 'Speed 12' },
	{ id: 11, label: 'Speed 11' },
	{ id: 10, label: 'Speed 10' },
	{ id: 9,  label: 'Speed 09' },
	{ id: 8,  label: 'Speed 08' },
	{ id: 7,  label: 'Speed 07' },
	{ id: 6,  label: 'Speed 06' },
	{ id: 5,  label: 'Speed 05' },
	{ id: 4,  label: 'Speed 04' },
	{ id: 3,  label: 'Speed 03' },
	{ id: 2,  label: 'Speed 02' },
	{ id: 1,  label: 'Speed 01 (Slow)' },
	{ id: 0,  label: 'Stop' }
];

var GAIN = [
	{ id: '08', label: '0dB' },
	{ id: '09', label: '1dB' },
	{ id: '0A', label: '2dB' },
	{ id: '0B', label: '3db' },
	{ id: '0C', label: '4dB' },
	{ id: '0D', label: '5dB' },
	{ id: '0E', label: '6dB' },
	{ id: '0F', label: '7dB' },
	{ id: '10', label: '8dB' },
	{ id: '11', label: '9dB' },
	{ id: '12', label: '10dB' },
	{ id: '13', label: '11dB' },
	{ id: '14', label: '12dB' },
	{ id: '15', label: '13dB' },
	{ id: '16', label: '14dB' },
	{ id: '17', label: '15dB' },
	{ id: '18', label: '16dB' },
	{ id: '19', label: '17dB' },
	{ id: '1A', label: '18dB' },
	{ id: '1B', label: '19dB' },
	{ id: '1C', label: '20dB' },
	{ id: '1D', label: '21dB' },
	{ id: '1E', label: '22dB' },
	{ id: '1F', label: '23dB' },
	{ id: '20', label: '24dB' },
	{ id: '21', label: '25dB' },
	{ id: '22', label: '26dB' },
	{ id: '23', label: '27dB' },
	{ id: '24', label: '28dB' },
	{ id: '25', label: '29dB' },
	{ id: '26', label: '30dB' },
	{ id: '27', label: '31dB' },
	{ id: '28', label: '32dB' },
	{ id: '29', label: '33dB' },
	{ id: '2A', label: '34dB' },
	{ id: '2B', label: '35dB' },
	{ id: '2C', label: '36dB' },
	{ id: '2D', label: '37dB' },
	{ id: '2E', label: '38dB' },
	{ id: '2F', label: '39dB' },
	{ id: '30', label: '40dB' },
	{ id: '31', label: '41dB' },
	{ id: '32', label: '42dB' },
	{ id: '33', label: '43dB' },
	{ id: '34', label: '44dB' },
	{ id: '35', label: '45dB' },
	{ id: '36', label: '46dB' },
	{ id: '37', label: '47dB' },
	{ id: '38', label: '48dB' },
	{ id: '80', label: 'Auto' }
];


function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	return self;
}



instance.prototype.tallyOnListener = function (label, variable, value) {
	const self = this;
	const { tallyOnEnabled, tallyOnVariable, tallyOnValue } = self.config;

	if (!tallyOnEnabled || `${label}:${variable}` !== tallyOnVariable) {
		return;
	}

	self.system.emit('variable_parse', tallyOnValue, (parsedValue) => {
		debug('variable changed... updating tally', { label, variable, value, parsedValue });
		self.system.emit('action_run', {
			action: (value === parsedValue ? 'tallyOn' : 'tallyOff'),
			instance: self.id
		});
	});
}

instance.prototype.setupEventListeners = function () {
	const self = this;

	if (self.config.tallyOnEnabled && self.config.tallyOnVariable) {
		if (!self.activeTallyOnListener) {
			self.activeTallyOnListener = self.tallyOnListener.bind(self);
			self.system.on('variable_changed', self.activeTallyOnListener);
		}
	} else if (self.activeTallyOnListener) {
		self.system.removeListener('variable_changed', self.activeTallyOnListener);
		delete self.activeTallyOnListener;
	}
}

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;
	self.ptSpeed = 25;
	self.ptSpeedIndex = 25;
	self.zSpeed = 25;
	self.zSpeedIndex = 25;
	self.fSpeed = 25;
	self.fSpeedIndex = 25;
	self.gainVal = '08';
	self.gainIndex = 0;
	self.irisVal = 50;
	self.irisIndex = 50;
	self.filterVal = 0;
	self.filterIndex = 0;
	self.shutVal = 0;
	self.shutIndex = 0
	self.pedestalVal = '096'
	self.pedestalIndex = 150
	self.status(self.STATUS_UNKNOWN);
	self.actions(); // export actions
	self.init_presets();
	self.init_variables();
	self.setupEventListeners();
}

instance.prototype.updateConfig = function(config) {
	var self = this;
	self.config = config;
	self.status(self.STATUS_UNKNOWN);
	self.setupEventListeners();
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;

	const dynamicVariableChoices = [];
	self.system.emit('variable_get_definitions', (definitions) =>
		Object.entries(definitions).forEach(([instanceLabel, variables]) =>
			variables.forEach((variable) =>
				dynamicVariableChoices.push({
					id: `${instanceLabel}:${variable.name}`,
					label: `${instanceLabel}:${variable.name}`
				})
			)
		)
	);

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls Panasonic PTZ cameras'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Camera IP',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'text',
			id: 'tallyOnInfo',
			width: 12,
			label: 'Tally On',
			value: 'Set camera tally ON when the instance variable equals the value'
		},
		{
			type: 'checkbox',
			id: 'tallyOnEnabled',
			width: 1,
			label: 'Enable',
			default: true
		},
		{
			type: 'dropdown',
			id: 'tallyOnVariable',
			label: 'Tally On Variable',
			width: 6,
			tooltip: 'The instance label and variable name',
			choices: dynamicVariableChoices,
			minChoicesForSearch: 5
		},
		{
			type: 'textinput',
			id: 'tallyOnValue',
			label: 'Tally On Value',
			width: 5,
			tooltip: 'When the variable equals this value, the camera tally light will be turned on.  Also supports dynamic variable references.  For example, $(atem:short_1)'
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	if (self.activeTallyOnListener) {
		self.system.removeListener('variable_changed', self.activeTallyOnListener);
		delete self.activeTallyOnListener;
	}
}

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [
		{
			category: 'Pan/Tilt',
			label: 'UP',
			bank: {
				style: 'png',
				text: '',
				png64: image_up,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,255)
			},
			actions: [
				{
					action: 'up',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN',
			bank: {
				style: 'png',
				text: '',
				png64: image_down,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'down',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'left',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'right',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'UP RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'upRight',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'UP LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'upLeft',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_left,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'downLeft',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'DOWN RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_right,
				pngalignment: 'center:center',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'downRight',
				}
			],
			release_actions: [
				{
					action: 'stop',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Home',
			bank: {
				style: 'text',
				text: 'HOME',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'home',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Speed Up',
			bank: {
				style: 'text',
				text: 'SPEED\\nUP\\n$(HE120:ptSpeedVar)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'ptSpeedU',
				}
			]
		},
		{
			category: 'Pan/Tilt',
			label: 'Speed Down',
			bank: {
				style: 'text',
				text: 'SPEED\\nDOWN\\n$(HE120:ptSpeedVar)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'ptSpeedD',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom In',
			bank: {
				style: 'text',
				text: 'ZOOM\\nIN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zoomI',
				}
			],
			release_actions: [
				{
					action: 'zoomS',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom Out',
			bank: {
				style: 'text',
				text: 'ZOOM\\nOUT',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zoomO',
				}
			],
			release_actions: [
				{
					action: 'zoomS',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom Speed Up',
			bank: {
				style: 'text',
				text: 'ZOOM\\nSPEED\\nUP\\n$(HE120:zSpeedVar)',
				size: '7',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zSpeedU',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Zoom Speed Down',
			bank: {
				style: 'text',
				text: 'ZOOM\\nSPEED\\nDOWN\\n$(HE120:zSpeedVar)',
				size: '7',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'zSpeedD',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Focus Near',
			bank: {
				style: 'text',
				text: 'FOCUS\\nNEAR',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'focusN',
				}
			],
			release_actions: [
				{
					action: 'focusS',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Focus Far',
			bank: {
				style: 'text',
				text: 'FOCUS\\nFAR',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'focusF',
				}
			],
			release_actions: [
				{
					action: 'focusS',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Focus Speed Up',
			bank: {
				style: 'text',
				text: 'FOCUS\\nSPEED\\nUP\\n$(HE120:fSpeedVar)',
				size: '7',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'fSpeedU',
				}
			]
		},
		{
			category: 'Lens',
			label: 'focusM Speed Down',
			bank: {
				style: 'text',
				text: 'FOCUS\\nSPEED\\nDOWN\\n$(HE120:fSpeedVar)',
				size: '7',
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
		},
			actions: [
				{
					action: 'fSpeedD',
				}
			]
		},
		{
			category: 'Lens',
			label: 'Auto Focus',
			bank: {
				style: 'text',
				text: 'AUTO\\nFOCUS',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
				latch: true
			},
			actions: [
				{
					action: 'focusM',
					options: {
						bol: 0,
					}
				}
			],
			release_actions: [
				{
					action: 'focusM',
					options: {
						bol: 1,
					}
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Gain Up',
			bank: {
				style: 'text',
				text: 'GAIN\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainU',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Gain Down',
			bank: {
				style: 'text',
				text: 'GAIN\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'gainD',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Iris Up',
			bank: {
				style: 'text',
				text: 'IRIS\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'irisU',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Iris Down',
			bank: {
				style: 'text',
				text: 'IRIS\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'irisD',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Shutter Up',
			bank: {
				style: 'text',
				text: 'Shut\\nUP',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'shutU',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Shutter Down',
			bank: {
				style: 'text',
				text: 'Shut\\nDOWN',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'shutD',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Pedestal Up',
			bank: {
				style: 'text',
				text: 'Pedestal\\nUP',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'pedU',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Pedestal Down',
			bank: {
				style: 'text',
				text: 'Pedestal\\nDOWN',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'pedD',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Filter Up',
			bank: {
				style: 'text',
				text: 'Filter\\nUP',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'filterU',
				}
			]
		},
		{
			category: 'Exposure',
			label: 'Filter Down',
			bank: {
				style: 'text',
				text: 'Filter\\nDOWN',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'filterD',
				}
			]
		},
		{
			category: 'Power/Tally',
			label: 'Power Off',
			bank: {
				style: 'text',
				text: 'Power\\nOff',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'powerOff',
				}
			]
		},
		{
			category: 'Power/Tally',
			label: 'Power On',
			bank: {
				style: 'text',
				text: 'Power\\nOn',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'powerOn',
				}
			]
		},
		{
			category: 'Power/Tally',
			label: 'Tally Off',
			bank: {
				style: 'text',
				text: 'Tally\\nOff',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'tallyOff',
				}
			]
		},
		{
			category: 'Power/Tally',
			label: 'Tally On',
			bank: {
				style: 'text',
				text: 'Tally\\nOn',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'tallyOn',
				}
			]
		},
		{
			category: 'Recall Preset',
			label: 'Set Recall Speed',
			bank: {
				style: 'text',
				text: 'Set\\nRecall\\nSpeed',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'speedPset',
				}
			]
		},
	];

	var save;
	for (save = 0; save < 100; save++) {
		presets.push({
			category: 'Save Preset',
			label: 'Save Preset '+ parseInt(save+1) ,
			bank: {
				style: 'text',
				text: 'SAVE\\nPSET\\n' + parseInt(save+1) ,
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'savePset',
					options: {
						val: ('0' + save.toString(10).toUpperCase()).substr(-2,2),
					}
				}
			]
		});
	}

	var recall;
	for (recall = 0; recall < 100; recall++) {
		presets.push({
			category: 'Recall Preset',
			label: 'Recall Preset '+ parseInt(recall+1) ,
			bank: {
				style: 'text',
				text: 'Recall\\nPSET\\n' + parseInt(recall+1) ,
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0,0,0),
			},
			actions: [
				{
					action: 'recallPset',
					options: {
						val: ('0' + recall.toString(10).toUpperCase()).substr(-2,2),
					}
				}
			]
		});
	}

	self.setPresetDefinitions(presets);
};

instance.prototype.init_variables = function() {
	var self = this;
	var variables = [];
	variables.push({ name: 'ptSpeedVar', label: 'Pan/Tilt Speed' });
	variables.push({ name: 'zSpeedVar',  label: 'Zoom Speed' });
	variables.push({ name: 'fSpeedVar',  label: 'Focus Speed' });
	self.setVariableDefinitions(variables);
};

instance.prototype.actions = function(system) {
	var self = this;

	self.system.emit('instance_actions', self.id, {
		'left':           { label: 'Pan Left' },
		'right':          { label: 'Pan Right' },
		'up':             { label: 'Tilt Up' },
		'down':           { label: 'Tilt Down' },
		'upLeft':         { label: 'Up Left' },
		'upRight':        { label: 'Up Right' },
		'downLeft':       { label: 'Down Left' },
		'downRight':      { label: 'Down Right' },
		'stop':           { label: 'P/T Stop' },
		'home':           { label: 'P/T Home' },
		'powerOff':       { label: 'Power Off' },
		'powerOn':        { label: 'Power On' },
		'ptSpeedS':       {
			label: 'P/T Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					choices: SPEED
				}
			]
		},
		'ptSpeedU':       { label: 'P/T Speed Up'},
		'ptSpeedD':       { label: 'P/T Speed Down'},
		'tallyOff':       { label: 'Tally Off' },
		'tallyOn':        { label: 'Tally On' },
		'zoomI':          { label: 'Zoom In' },
		'zoomO':          { label: 'Zoom Out' },
		'zoomS':          { label: 'Zoom Stop' },
		'zSpeedU':        { label: 'Zoom Speed Up'},
		'zSpeedD':        { label: 'Zoom Speed Down'},
		'focusN':         { label: 'Focus Near' },
		'focusF':         { label: 'Focus Far' },
		'focusS':         { label: 'Focus Stop' },
		'fSpeedU':        { label: 'Focus Speed Up'},
		'fSpeedD':        { label: 'Focus Speed Down'},
		'focusM':         {
			label: 'Focus Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Auto / Manual Focus',
					id: 'bol',
					choices: [ { id: '0', label: 'Auto Focus' }, { id: '1', label: 'Manual Focus' } ]
				}
			]
		},
		'irisU':          { label: 'Iris Up' },
		'irisD':          { label: 'Iris Down' },
		'irisS':          {
			label: 'Set Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					choices: IRIS
				}
			]
		},
		'gainU':          { label: 'Gain Up' },
		'gainD':          { label: 'Gain Down' },
		'gainS':          {
			label: 'Set Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					choices: GAIN
				}
			]
		},
		'shutU':          { label: 'Shutter Up' },
		'shutD':          { label: 'Shutter Down' },
		'shutS':          {
			label: 'Set Shutter',
			options: [
				{
					type: 'dropdown',
					label: 'Shutter setting',
					id: 'val',
					choices: SHUTTER
				}
			]
		},
		'pedU':           { label: 'Pedestal Up' },
		'pedD':           { label: 'Pedestal Down' },
		'pedS':           {
			label: 'Set Pedestal',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					choices: PEDESTAL
				}
			]
		},
		'filterU':        { label: 'Filter Up' },
		'filterD':        { label: 'Filter Down' },
		'filterS':        {
			label: 'Set Filter',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					choices: FILTER
				}
			]
		},
		'savePset':       {
			label: 'Save Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					choices: PRESET
				}
			]
		},
		'recallPset':     {
			label: 'Recall Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					choices: PRESET
				}
			]
		},
		'speedPset':      {
			label: 'Preset Drive Speed',
			options: [
				{
					type: 'dropdown',
					label: 'speed setting',
					id: 'speed',
					choices: PSSPEED
				}
			]
		}
	});
}


instance.prototype.sendPTZ = function(str) {
	var self = this;

		if (str !== undefined) {
				self.system.emit('rest_get', 'http://' + self.config.host + '/cgi-bin/aw_ptz?cmd=%23' + str +'&res=1',function (err, data, response) {
					if (!err) {
							self.log('Error from PTZ: ' + result);
							return;
							}
						//console.log("Result from REST: ", result);
						});
			}
	debug('PTZ Command =',str)
};

instance.prototype.sendCam = function(str) {
	var self = this;

		if (str !== undefined) {
				self.system.emit('rest_get', 'http://' + self.config.host + '/cgi-bin/aw_cam?cmd=' + str +'&res=1',function (err, data, response) {
					if (!err) {
							self.log('Error from PTZ: ' + result);
							return;
							}
						//console.log("Result from REST: ", result);
						});
			}
	debug('CAM Command =',str)
};


instance.prototype.action = function(action) {
	var self = this;
	var opt = action.options;
	var cmd = '';
	var n;
	var string;

	switch (action.action) {

		case 'left':
			n = parseInt(50 - self.ptSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'PTS'+ string +'50';
			self.sendPTZ(cmd);
			break;

		case 'right':
			cmd = 'PTS' + parseInt(50+self.ptSpeed) +'50';
			self.sendPTZ(cmd);
			break;

		case 'up':
			cmd = 'PTS50'+ parseInt(50+self.ptSpeed);
			self.sendPTZ(cmd);
			break;

		case 'down':
			n = parseInt(50 - self.ptSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'PTS50' + string;
			self.sendPTZ(cmd);
			break;

		case 'upLeft':
			n = parseInt(50 - self.ptSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'PTS'+ string + parseInt(50 + self.ptSpeed);
			self.sendPTZ(cmd);
			break;

		case 'upRight':
			cmd = 'PTS' + parseInt(50 + self.ptSpeed) + parseInt(50 + self.ptSpeed);
			self.sendPTZ(cmd);
			break;

		case 'downLeft':
			n = parseInt(50 - self.ptSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'PTS' + string + string;
			self.sendPTZ(cmd);
			break;

		case 'downRight':
			n = parseInt(50 - self.ptSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'PTS' + parseInt(50 + self.ptSpeed) + string;
			self.sendPTZ(cmd);
			break;

		case 'stop':
			cmd = 'PTS5050';
			self.sendPTZ(cmd);
			break;

		case 'home':
			cmd = 'APC7FFF7FFF';
			self.sendPTZ(cmd);
			break;

		case 'powerOff':
			cmd = 'O0';
			self.sendPTZ(cmd);
			break;

		case 'powerOn':
			cmd = 'O1';
			self.sendPTZ(cmd);
			break;

		case 'ptSpeedS':
			self.ptSpeed = opt.speed;
			var idx = -1;
			for (var i = 0; i < SPEED.length; ++i) {
				if (SPEED[i].id == self.ptSpeed) {
					idx = i;
					break;
				}
			}
			if (idx > -1) {
				self.ptSpeedIndex = idx;
			}
			self.setVariable('ptSpeedVar', self.ptSpeed);
			break;

		case 'ptSpeedD':
			if (self.ptSpeedIndex == 49) {
				self.ptSpeedIndex = 49;
			}
			else if (self.ptSpeedIndex < 49) {
				self.ptSpeedIndex ++;
			}
			self.ptSpeed = SPEED[self.ptSpeedIndex].id
			self.setVariable('ptSpeedVar', self.ptSpeed);
			break;

		case 'ptSpeedU':
			if (self.ptSpeedIndex == 0) {
				self.ptSpeedIndex = 0;
			}
			else if (self.ptSpeedIndex > 0) {
				self.ptSpeedIndex--;
			}
			self.ptSpeed = SPEED[self.ptSpeedIndex].id
			self.setVariable('ptSpeedVar', self.ptSpeed);
			break;

		case 'tallyOff':
			cmd = 'DA0';
			self.sendPTZ(cmd);
			break;

		case 'tallyOn':
			cmd = 'DA1';
			self.sendPTZ(cmd);
			break;

		case 'zoomO':
			n = parseInt(50 - self.zSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'Z' + string;
			self.sendPTZ(cmd);
			break;

		case 'zoomI':
			cmd = 'Z' + parseInt(50 +self.zSpeed);
			self.sendPTZ(cmd);
			break;

		case 'zoomS':
			cmd = 'Z50';
			self.sendPTZ(cmd);
			break;

		case 'zSpeedD':
			if (self.zSpeedIndex == 49) {
				self.zSpeedIndex = 49;
			}
			else if (self.zSpeedIndex < 49) {
				self.zSpeedIndex ++;
			}
			self.zSpeed = SPEED[self.zSpeedIndex].id
			self.setVariable('zSpeedVar', self.zSpeed);
			break;

		case 'zSpeedU':
			if (self.zSpeedIndex == 0) {
				self.zSpeedIndex = 0;
			}
			else if (self.zSpeedIndex > 0) {
				self.zSpeedIndex--;
			}
			self.zSpeed = SPEED[self.zSpeedIndex].id
			self.setVariable('zSpeedVar', self.zSpeed);
			break;

		case 'focusN':
			n = parseInt(50 - self.fSpeed);
			string = '' + (n < 10 ? "0"+n : n)
			cmd = 'F' + string;
			self.sendPTZ(cmd);
			break;

		case 'focusF':
			cmd = 'F' + parseInt(50 +self.fSpeed);
			self.sendPTZ(cmd);
			break;

		case 'fSpeedD':
			if (self.fSpeedIndex == 49) {
				self.fSpeedIndex = 49;
			}
			else if (self.fSpeedIndex < 49) {
				self.fSpeedIndex ++;
			}
			self.fSpeed = SPEED[self.fSpeedIndex].id
			self.setVariable('fSpeedVar', self.fSpeed);
			break;

		case 'fSpeedU':
			if (self.fSpeedIndex == 0) {
				self.fSpeedIndex = 0;
			}
			else if (self.fSpeedIndex > 0) {
				self.fSpeedIndex--;
			}
			self.fSpeed = SPEED[self.fSpeedIndex].id
			self.setVariable('fSpeedVar', self.fSpeed);
			break;

		case 'focusS':
			cmd = 'F50';
			self.sendPTZ(cmd);
			break;

		case 'focusM':
			if (opt.bol == 0){
				cmd = 'D10';
			}
			if (opt.bol == 1){
				cmd = 'D11';
			}
			self.sendPTZ(cmd);
			break;

		case 'irisU':
			if (self.irisIndex == 99) {
				self.irisIndex = 99;
			}
			else if (self.irisIndex < 99) {
				self.irisIndex ++;
			}
			self.irisVal = IRIS[self.irisIndex].id;
			self.sendPTZ('I' + self.irisVal.toUpperCase());
			break;

		case 'irisD':
			if (self.irisIndex == 0) {
				self.irisIndex = 0;
			}
			else if (self.irisIndex > 0) {
				self.irisIndex--;
			}
			self.irisVal = IRIS[self.irisIndex].id;
			self.sendPTZ('I' + self.irisVal.toUpperCase());
			break;

		case 'irisS':
			self.sendPTZ('I' + opt.val);
			self.irisVal = opt.val;
			self.irisIndex = opt.val;
			break;

		case 'gainU':
			if (self.gainIndex == 49) {
				self.gainIndex = 49;
			}
			else if (self.gainIndex < 49) {
				self.gainIndex ++;
			}
			self.gainVal = GAIN[self.gainIndex].id

			cmd = 'OGU:' + self.gainVal.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'gainD':
			if (self.gainIndex == 0) {
				self.gainIndex = 0;
			}
			else if (self.gainIndex > 0) {
				self.gainIndex--;
			}
			self.gainVal = GAIN[self.gainIndex].id

			cmd = 'OGU:' + self.gainVal.toUpperCase();
			self.sendCam(cmd);
			break;


		case 'gainS':
			cmd = 'OGU:' + opt.val;
			self.sendCam(cmd);
			break;

		case 'shutU':
			if (self.shutIndex == 14) {
				self.shutIndex = 14;
			}
			else if (self.shutIndex < 14) {
				self.shutIndex ++;
			}
			self.shutVal = SHUTTER[self.shutIndex].id

			cmd = 'OSH:' + self.shutVal.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'shutD':
			if (self.shutIndex == 0) {
				self.shutIndex = 0;
			}
			else if (self.shutIndex > 0) {
				self.shutIndex--;
			}
			self.shutVal = SHUTTER[self.shutIndex].id

			cmd = 'OSH:' + self.shutVal.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'shutS':
			cmd = 'OSH:' + opt.val.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'filterU':
			if (self.filterIndex == 5) {
				self.filterIndex = 5;
			}
			else if (self.filterIndex < 5) {
				self.filterIndex ++;
			}
			self.filterVal = FILTER[self.filterIndex].id

			cmd = 'OFT:' + self.filterVal;
			self.sendCam(cmd);
			debug(self.filterVal);
			break;

		case 'filterD':
			if (self.filterIndex == 0) {
				self.filterIndex = 0;
			}
			else if (self.filterIndex > 0) {
				self.filterIndex--;
			}
			self.filterVal = FILTER[self.filterIndex].id

			cmd = 'OFT:' + self.filterVal;
			self.sendCam(cmd);
			debug(self.filterVal);
			break;


		case 'filterS':
			cmd = 'OFT:' + opt.val;
			self.sendCam(cmd);
			break;

		case 'pedU':
			if (self.pedestalIndex == 299) {
				self.pedestalIndex = 299;
			}
			else if (self.pedestalIndex < 299) {
				self.pedestalIndex ++;
			}
			self.pedestalVal = PEDESTAL[self.pedestalIndex].id

			cmd = 'OTP:' + self.pedestalVal.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'pedD':
			if (self.pedestalIndex == 0) {
				self.pedestalIndex = 0;
			}
			else if (self.pedestalIndex > 0) {
				self.pedestalIndex--;
			}
			self.pedestalVal = PEDESTAL[self.pedestalIndex].id

			cmd = 'OTP:' + self.pedestalVal.toUpperCase();
			self.sendCam(cmd);
			break;


		case 'pedS':
			cmd = 'OTP:' + opt.val.toUpperCase();
			self.sendCam(cmd);
			break;

		case 'savePset':
			cmd ='M' + opt.val;
			self.sendPTZ(cmd);
			break;

		case 'recallPset':
			cmd ='R' + opt.val ;
			self.sendPTZ(cmd);
			break;

		case 'speedPset':
			cmd ='UPVS' + opt.speed
			self.sendPTZ(cmd);
			break;

	}


};

instance_skel.extendedBy(instance);

 // Variables for Base64 image data do not edit
var image_up = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg==';

var image_down = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC';

var image_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC';

var image_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg==';

var image_up_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII=';

var image_down_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/ii7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg==';

var image_up_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII=';

var image_down_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC';

exports = module.exports = instance;
