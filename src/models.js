import { c } from './choices.js'

export const MODELS = [
	{ id: 'Auto', series: 'Auto', label: 'Auto Detect' },
	{ id: 'AW-HE2', series: 'AW-HE2', label: 'AW-HE2' },
	{ id: 'AW-HE35', series: 'HE40', label: 'AW-HE35' },
	{ id: 'AW-HE38', series: 'HE40', label: 'AW-HE48' },
	{ id: 'AW-HE40', series: 'HE40', label: 'AW-HE40' },
	{ id: 'AW-HE42', series: 'HE42', label: 'AW-HE42' },
	{ id: 'AW-HE48', series: 'HE40', label: 'AW-HE48' },
	{ id: 'AW-HE50', series: 'AW-HE50', label: 'AW-HE50' },
	{ id: 'AW-HE58', series: 'HE40', label: 'AW-HE58' },
	{ id: 'AW-HE60', series: 'AW-HE60', label: 'AW-HE60' },
	{ id: 'AW-HE65', series: 'HE40', label: 'AW-HE65' },
	{ id: 'AW-HE68', series: 'HE42', label: 'AW-HE68' },
	{ id: 'AW-HE70', series: 'HE40', label: 'AW-HE70' },
	{ id: 'AW-HE75', series: 'HE42', label: 'AW-HE75' },
	{ id: 'AW-HE120', series: 'AW-HE120', label: 'AW-HE120' },
	{ id: 'AW-HE130', series: 'AW-HE130', label: 'AW-HE130' },
	{ id: 'AW-HR140', series: 'AW-HR140', label: 'AW-HR140' },
	{ id: 'AW-HN38', series: 'HE40', label: 'AW-HN38' },
	{ id: 'AW-HN40', series: 'HE40', label: 'AW-HN40' },
	{ id: 'AW-HN65', series: 'HE40', label: 'AW-HN65' },
	{ id: 'AW-HN70', series: 'HE40', label: 'AW-HN70' },
	{ id: 'AW-UE4', series: 'AW-UE4', label: 'AW-UE4' },
	{ id: 'AW-UE63', series: 'UE70', label: 'AW-UE63' },
	{ id: 'AW-UE65', series: 'UE70', label: 'AW-UE65' },
	{ id: 'AW-UE70', series: 'UE70', label: 'AW-UE70' },
	{ id: 'AW-UE100', series: 'UE150', label: 'AW-UE100' },
	{ id: 'AW-UE150', series: 'UE150', label: 'AW-UE150' },
	{ id: 'AW-UE155', series: 'UE150', label: 'AW-UE155' },
	{ id: 'AW-UN70', series: 'UE70', label: 'AW-UN70' },
	{ id: 'AW-UN145', series: 'UE150', label: 'AW-UN145' },
	{ id: 'AW-HEF5', series: 'AW-HEF5', label: 'AW-HEF5' },
	{ id: 'AW-SFU01', series: 'AW-SFU01', label: 'AW-SFU01' },
	{ id: 'AK-UB300', series: 'AK-UB300', label: 'AK-UB300' },
	{ id: 'Other', series: 'Other', label: 'Other Cameras' },
]

// list of all Series:
// Other
// HE40
// HE42
// UE70
// UE150
// AW-HE2
// AW-HE50
// AW-HE60
// AW-HE120
// AW-HE130
// AW-HR140
// AW-HEF5
// AW-UE4
// AW-SHU01
// AK-UB300

export const SERIES_SPECS = [
	{
		// Includes all Actions / Variabels / Feedbacks
		id: 'Other',
		variables: {
			version: true, // If a camera sends a package every minute with the firmware version (qSV3)
			error: true, // Camera can return Error messages when actions fail (rER)
			ins: true, // Install position (iNS0 or iNS1)
			power: true, // Power State (p1 or p0)
			tally: true, // Tally State (TLR:1 or TLR:0)
			OAF: true, // Has Auto Focus (OAF:1 or OAF:0)
			iris: true, // Has Auto Iris (d30 or d31)
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true, // Power State (p1 or p0)
			tallyState: true, // Tally State (TLR:1 or TLR:0)
			insState: true, // Install position (iNS0 or iNS1)
			autoFocus: true, // Has Auto Focus (OAF:1 or OAF:0)
			autoIris: true, // Has Auto Iris (d30 or d31)
			preset: true,
		},
		actions: {
			panTilt: true, // Has Pan/Tilt Support (PTSxx)
			ptSpeed: true, // Internal Speed Options
			zoom: true, // Has Zoom Support (Zxx)
			zSpeed: true, // Internal Speed Options
			focus: true, // Has Focus Support (Fxx)
			fSpeed: true, // Internal Speed Options
			OAF: true, // Has Auto Focus Support (D10 or D11)
			OTAF: true, // Has One Touch Auto Focus Support (OSE:69:1)
			iris: true, // Has Iris Support (manual and auto) (Ixx)
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_OTHER() }, // Has Gain Support
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_OTHER }, // Has Shutter Support
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_OTHER() }, // Has Pedistal Support
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_OTHER() }, // Has ND Filter Support
			preset: true, // Can Save and Recall Presets (Mxxx or Rxxx)
			speedPset: true, // Has Preset Recall Speed Control (UPVSxx)
			timePset: true, // Has Preset Recall Time Control (UPVSxx or OSJ:29:xx)
			power: true, // Has Power Control (O0 or O1)
			tally: true, // Has Red Tally Light Control (DA1 or DA0)
			ins: true, // Has Install Position Control (INSx)
			sdCard: true, // Has SD Card Recording Control (sdctrl?save=start or sdctrl?save=end)
		},
	},

	{
		// Specific for the HE40 Series
		id: 'HE40',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE40 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE40() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE40() },
			filter: false,
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: true,
		},
	},

	{
		// Specific for the HE42 Series
		id: 'HE42',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE42() },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE42() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE42() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_HE42() },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: true,
		},
	},

	{
		// Specific for the UE70 Series
		id: 'UE70',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_UE70() },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_UE70() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_UE70() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_UE70 },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: true,
		},
	},

	{
		// Specific for the UE150 Series
		id: 'UE150',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_UE150() },
			shut: false, // TODO: Add it's own shutter "OSJ:06:"
			ped: false, // TODO: Add it's own Pedestal "OSJ:0F:"
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_UE150() },
			preset: true,
			speedPset: true,
			timePset: true,
			power: true,
			ins: true,
			tally: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HE2 Camera
		id: 'AW-HE2', // A lot has been turned off since it will need custop setups for this camera, can be added if requested
		variables: {
			version: true,
			error: true,
			ins: false,
			power: true,
			tally: true,
			OAF: false,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: false,
			autoFocus: false,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: false,
			fSpeed: false,
			OAF: false,
			OTAF: false,
			iris: true, // Might not work correctly (Auto/Manual should work though)
			gain: false,
			shut: false,
			ped: false,
			filter: false,
			preset: true,
			speedPset: false,
			timePset: false,
			power: true,
			tally: true,
			ins: false,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HE50 Camera
		id: 'AW-HE50',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE50 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE50 },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE50() },
			filter: false,
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HE60 Camera
		id: 'AW-HE60',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE60() },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE60() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE60() },
			filter: false,
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HE120 Camera
		id: 'AW-HE120',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE120 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE120 },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE120() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_HE120 },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HE130 Camera
		id: 'AW-HE130',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE130 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE130 },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE130() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_HE130 },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HR140 Camera
		id: 'AW-HR140',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HR140 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HR140() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HR140() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_HR140() },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-HEF5 Camera
		id: 'AW-HEF5',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_HE50 },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_HE50 },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_HE50() },
			filter: true,
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-UE4 Camera
		id: 'AW-UE4', // A lot has been turned off since it will need custop setups for this camera, can be added if requested
		variables: {
			version: false,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: false,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: false,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: false,
			OTAF: false,
			iris: true, // Might not work correctly (Auto/Manual should work though)
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_UE4 },
			shut: { cmd: 'OSJ:06:', dropdown: c.CHOICES_SHUTTER_UE4 },
			ped: false,
			filter: false,
			preset: true,
			speedPset: false,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AW-SHU01 Camera
		id: 'AW-SHU01',
		variables: {
			version: true,
			error: true,
			ins: true,
			power: true,
			tally: true,
			OAF: true,
			iris: true,
			gainValue: true,
			preset: true,
		},
		feedbacks: {
			powerState: true,
			tallyState: true,
			insState: true,
			autoFocus: true,
			autoIris: true,
			preset: true,
		},
		actions: {
			panTilt: true,
			ptSpeed: true,
			zoom: true,
			zSpeed: true,
			focus: true,
			fSpeed: true,
			OAF: true,
			OTAF: true,
			iris: true,
			gain: { cmd: 'OGU:', dropdown: c.CHOICES_GAIN_UE70() },
			shut: { cmd: 'OSH:', dropdown: c.CHOICES_SHUTTER_UE70() },
			ped: { cmd: 'OTP:', dropdown: c.CHOICES_PEDESTAL_UE70() },
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_UE70 },
			preset: true,
			speedPset: true,
			timePset: false,
			power: true,
			tally: true,
			ins: true,
			sdCard: false,
		},
	},

	{
		// Specific for the AK-UB300 Camera
		id: 'AK-UB300',
		variables: {
			version: false,
			error: true,
			power: true,
			ins: false,
			OAF: false,
			iris: false,
			preset: false,
		},
		feedbacks: {
			powerState: true,
			insState: false,
			autoFocus: false,
			autoIris: false,
			preset: false,
		},
		actions: {
			panTilt: false,
			ptSpeed: false,
			zoom: false,
			zSpeed: false,
			focus: false,
			fSpeed: false,
			OAF: false,
			OTAF: false,
			iris: false,
			gain: { cmd: 'OGS:', dropdown: c.CHOICES_GAIN_UB300 },
			shut: { cmd: 'OSG:5D:', dropdown: c.CHOICES_SHUTTER_UB300 },
			ped: false, // TODO: Add UB300 Pedestal "OSG:4A:"
			filter: { cmd: 'OFT:', dropdown: c.CHOICES_FILTER_UB300 },
			preset: false,
			speedPset: false,
			timePset: false,
			power: false,
			ins: false,
			tally: false,
			sdCard: false,
		},
	},
]
