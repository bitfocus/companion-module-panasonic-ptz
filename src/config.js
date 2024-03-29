import { MODELS } from './models.js'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value:
			"This module controls Panasonic PTZ cameras, you can find supported models in the dropdown below.<br/>If your camera isn't in the list below, feel free to try it anyway the option 'Other Cameras'.",
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Camera IP',
		width: 4,
		// regex: Regex.IP
	},
	{
		type: 'number',
		id: 'httpPort',
		label: 'HTTP Port (Default: 80)',
		width: 3,
		default: 80,
		min: 1,
		max: 65535,
	},
	{
		type: 'static-text',
		id: 'dummy1',
		width: 12,
		label: ' ',
		value: ' ',
	},
	{
		type: 'static-text',
		id: 'modelInfo',
		width: 12,
		label: 'Camera Model',
		value: 'Please Select the camera model or feel free to leave it on auto.',
	},
	{
		type: 'dropdown',
		id: 'model',
		label: 'Select Your Camera Model',
		width: 6,
		default: 'Auto',
		choices: MODELS,
		minChoicesForSearch: 5,
	},
	{
		type: 'static-text',
		id: 'dummy2',
		width: 12,
		label: ' ',
		value: ' ',
	},
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Tally On (Basic)',
		value:
			'Support for Tally On is no longer possible. Instead you can set this up as a trigger, and get additional control',
	},
	{
		type: 'static-text',
		id: 'dummy3',
		width: 12,
		label: ' ',
		value: ' ',
	},
	{
		type: 'static-text',
		id: 'Info',
		width: 12,
		label: 'Other Settings',
		value:
			'These setting can be left on the default values and should give you a consistent setup, but they are there for you to use if need be.',
	},

	{
		type: 'checkbox',
		id: 'autoTCP',
		width: 1,
		label: 'Enable',
		default: true,
	},
	{
		type: 'static-text',
		id: 'autoTCPInfo',
		width: 4,
		label: 'Auto TCP',
		value: 'This will ignore the port selected and find a port Automaticly',
	},
	{
		type: 'number',
		id: 'tcpPort',
		label: 'TCP Port',
		width: 3,
		default: 31004,
		min: 1,
		max: 65535,
	},
	{
		type: 'static-text',
		id: 'manualTCPInfo',
		width: 4,
		label: 'Manual TCP Port',
		value: 'TCP Port (Default: 31004) only used when "Auto TCP" is OFF/Disabled',
	},
	{
		type: 'checkbox',
		id: 'debug',
		width: 1,
		label: 'Enable',
		default: false,
	},
	{
		type: 'static-text',
		id: 'debugInfo',
		width: 11,
		label: 'Enable Debug To Log Window',
		value:
			'Requires Companion to be restarted. But this will allow you the see what is being sent from the module and what is being received from the camera.',
	},
]
