import { MODELS } from './models.js'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value:
			"This module controls Panasonic PTZ cameras, you can find supported models in the dropdown below.<br/>If your camera isn't in the list below, feel free to try it anyway by option 'Other Cameras'.",
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
		value: "Please select the camera model or feel free to leave it on 'Auto Detect'.",
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
		label: 'Automatic local TCP port assignment',
		value: 'This will ignore the manual port selection and find a free port automatically',
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
		label: 'Manual local TCP port assignment',
		value: 'TCP Port (Default: 31004) only used when "Automatic TCP port assignment" is disabled',
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
