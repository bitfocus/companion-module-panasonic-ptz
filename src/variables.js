import { getAndUpdateSeries, getLabel } from './common.js'
import { e } from './enum.js'

// ##########################
// #### Define Variables ####
// ##########################
export function setVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const variables = []

	//variables.push({ variableId: 'series', name: 'Camera Series' })
	variables.push({ variableId: 'model', name: 'Model of camera' })
	//variables.push({ variableId: 'mac', name: 'MAC address' })
	//variables.push({ variableId: 'serial', name: 'Serial number' })
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
		if (SERIES.capabilities.tally2) {
			variables.push({ variableId: 'tally2', name: 'Green Tally Status' })
			if (SERIES.capabilities.tally3) {
				variables.push({ variableId: 'tally3', name: 'Yellow Tally Status' })
			}
		}
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
	if (SERIES.capabilities.filter) {
		variables.push({ variableId: 'filter', name: 'ND Filter' })
	}
	if (SERIES.capabilities.gain) {
		variables.push({ variableId: 'gain', name: 'Gain' })
	}
	if (SERIES.capabilities.preset) {
		variables.push({ variableId: 'presetScope', name: 'Preset Recall Scope' })
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
		variables.push({ variableId: 'ptSpeed', name: 'Pan/Tilt Speed' })
		variables.push({ variableId: 'pSpeed', name: 'Pan Speed' })
		variables.push({ variableId: 'tSpeed', name: 'Tilt Speed' })
		variables.push({ variableId: 'panPosition', name: 'Pan Position' })
		variables.push({ variableId: 'tiltPosition', name: 'Tilt Position' })
		variables.push({ variableId: 'panPositionDeg', name: 'Pan Position °' })
		variables.push({ variableId: 'tiltPositionDeg', name: 'Tilt Position °' })
	}
	if (SERIES.capabilities.zoom) {
		variables.push({ variableId: 'zoomPosition', name: 'Zoom Position' })
		variables.push({ variableId: 'zoomPositionPct', name: 'Zoom Position %' })
		variables.push({ variableId: 'zoomPositionBar', name: 'Zoom Position' })
		variables.push({ variableId: 'zSpeed', name: 'Zoom Speed' })
	}
	if (SERIES.capabilities.focus) {
		variables.push({ variableId: 'focusPosition', name: 'Focus Position' })
		variables.push({ variableId: 'focusPositionPct', name: 'Focus Position %' })
		variables.push({ variableId: 'focusPositionBar', name: 'Focus Position' })
		variables.push({ variableId: 'fSpeed', name: 'Focus Speed' })
	}
	if (SERIES.capabilities.iris) {
		//variables.push({ variableId: 'iris', name: 'Iris' })
		variables.push({ variableId: 'irisF', name: 'Iris F-Stop' })
		variables.push({ variableId: 'irisPosition', name: 'Iris Position' })
		variables.push({ variableId: 'irisPositionPct', name: 'Iris Position %' })
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
	}
	if (SERIES.capabilities.presetTime) {
		variables.push({ variableId: 'presetSpeedUnit', name: 'Recall Speed Unit' })
	}
	if (SERIES.capabilities.recordSD) {
		variables.push({ variableId: 'recording', name: 'Recording' })
		//variables.push({ variableId: 'recordingTime', name: 'Recording Time' })
	}
	if (SERIES.capabilities.streamRTMP) {
		variables.push({ variableId: 'streamingRTMP', name: 'RTMP Client Status' })
	}
	if (SERIES.capabilities.streamSRT) {
		variables.push({ variableId: 'streamingSRT', name: 'SRT Caller Status' })
	}
	if (SERIES.capabilities.streamTS) {
		variables.push({ variableId: 'streamingTS', name: 'MPEG-TS Output Status' })
	}

	return variables
}

// #########################
// #### Check Variables ####
// #########################
export function checkVariables(self) {
	const SERIES = getAndUpdateSeries(self)

	const colorbar = SERIES.capabilities.colorbar ? getLabel(e.ENUM_OFF_ON, self.data.colorbar) : null

	const colorTemperature = SERIES.capabilities.colorTemperature.index ? getLabel(SERIES.capabilities.colorTemperature.index.dropdown, self.data.colorTemperature) : null

	const error = SERIES.capabilities.error ? getLabel(e.ENUM_ERROR, self.data.error) : null

	const filter = SERIES.capabilities.filter ? getLabel(SERIES.capabilities.filter.dropdown, self.data.filter) : null

	const focusMode = SERIES.capabilities.focusAuto ? getLabel(e.ENUM_MAN_AUTO, self.data.focusMode) : null

	const gain = SERIES.capabilities.gain ? getLabel(SERIES.capabilities.gain.dropdown, self.data.gain) : null

	const installMode = SERIES.capabilities.install ? getLabel(e.ENUM_INSTALL_POSITION, self.data.installMode) : null

	//const iris = SERIES.capabilities.iris
	//	? getLabel(e.ENUM_IRIS, self.data.iris) : null

	const irisMode = SERIES.capabilities.irisAuto ? getLabel(e.ENUM_MAN_AUTO, self.data.irisMode) : null

	const ois = SERIES.capabilities.ois ? getLabel(SERIES.capabilities.ois.dropdown, self.data.ois) : null

	const power = SERIES.capabilities.power ? getLabel(e.ENUM_OFF_ON, self.data.power) : null

	const presetScope = SERIES.capabilities.preset ? getLabel(e.ENUM_PRESET_SCOPE, self.data.presetScope) : null

	const presetSpeed = SERIES.capabilities.presetSpeed ? getLabel(e.ENUM_PRESET_SPEED_TIME, self.data.presetSpeed) : null

	const presetSpeedTable = SERIES.capabilities.presetSpeed ? getLabel(SERIES.capabilities.presetSpeed.dropdown, self.data.presetSpeedTable) : null

	const presetSpeedUnit = SERIES.capabilities.presetTime ? getLabel(e.ENUM_PSSPEED_UNIT, self.data.presetSpeedUnit) : null

	const rtmp = SERIES.capabilities.streamRTMP ? getLabel(e.ENUM_OFF_ON, self.data.rtmp) : null

	const shutter = SERIES.capabilities.shutter ? getLabel(SERIES.capabilities.shutter.dropdown, self.data.shutter) : null

	const srt = SERIES.capabilities.streamSRT ? getLabel(e.ENUM_OFF_ON, self.data.srt) : null

	const tally = SERIES.capabilities.tally ? getLabel(e.ENUM_OFF_ON, self.data.tally) : null

	const tally2 = SERIES.capabilities.tally2 ? getLabel(e.ENUM_OFF_ON, self.data.tally2) : null

	const tally3 = SERIES.capabilities.tally3 ? getLabel(e.ENUM_OFF_ON, self.data.tally3) : null

	const ts = SERIES.capabilities.streamTS ? getLabel(e.ENUM_OFF_ON, self.data.ts) : null

	const whiteBalance = SERIES.capabilities.whiteBalance ? getLabel(SERIES.capabilities.whiteBalance.dropdown, self.data.whiteBalance) : null

	const progressBar = (pct, width = 20, start = '', end = '') => {
		if (pct && pct >= 0 && pct <= 100) {
			const flr = Math.floor((pct * width) / 100)
			return start + '.'.repeat(flr) + '|' + '.'.repeat(width - flr) + end
			//return start + ("|").repeat(flr).padEnd(width, ".") + end
		}
		return '---'
	}

	const normalizePct = (val, low = 0, high = 100, limit = false, fractionDigits = 0) => {
		if (limit) {
			val = val < low ? low : val
			val = val > high ? high : val
		}
		return val < low || val > high ? null : (((val - low) / (high - low)) * 100).toFixed(fractionDigits)
	}
	/* 
	const norm = (val, low = 0, high = 100) => {
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 2) - 1
	}

	const normS = (val, low = -100, high = 100) => {
		return (val < low || val > high) ? null : (((val - low) / (high - low)) * 2) - 1
	}
 */
	self.setVariableValues({
		//series: self.data.series,
		model: self.data.model,
		//mac: self.data.mac,
		//serial: self.data.serial,
		title: self.data.title,
		version: self.data.version,

		recording: self.data.recording,

		presetSelected: self.data.presetSelectedIdx ? (self.data.presetSelectedIdx + 1).toString() : null,
		presetCompleted: self.data.presetCompletedIdx ? (self.data.presetCompletedIdx + 1).toString() : null,

		panPosition: self.data.panPosition,
		tiltPosition: self.data.tiltPosition,
		panPositionDeg: (-self.data.panPosition * (29.7 / 3600)).toFixed(1),
		tiltPositionDeg: (-self.data.tiltPosition * (29.7 / 3600)).toFixed(1),
		focusPosition: self.data.focusPosition,
		irisPosition: self.data.irisPosition,
		irisFollowPosition: self.data.irisFollowPosition,
		zoomPosition: self.data.zoomPosition,
		focusPositionPct: normalizePct(self.data.focusPosition, 0x0, 0xaaa, false),
		irisPositionPct: normalizePct(self.data.irisPosition, 0x0, 0xaaa, false),
		zoomPositionPct: normalizePct(self.data.zoomPosition, 0x0, 0xaaa, false, 1),
		zoomPositionBar: progressBar(normalizePct(self.data.zoomPosition, 0x0, 0xaaa), 10, 'W', 'T'),
		focusPositionBar: progressBar(normalizePct(self.data.focusPosition, 0x0, 0xaaa), 10, 'N', 'F'),
		irisPositionBar: progressBar(normalizePct(self.data.irisPosition, 0x0, 0xaaa), 10, 'C', 'O'),

		redGain: self.data.redGainValue,
		blueGain: self.data.blueGainValue,
		redPed: self.data.redPedValue,
		bluePed: self.data.bluePedValue,
		masterPed: self.data.masterPedValue,

		irisF: self.data.irisLabel,
		//recordingTime: self.data.recordingTime,
		shutterStep: self.data.shutterStepLabel,

		colorTemperature: self.data.colorTempLabel ? self.data.colorTempLabel : colorTemperature,

		colorbar: colorbar,
		error: error,
		filter: filter,
		focusMode: focusMode,
		gain: gain,
		installMode: installMode,
		//iris: iris,
		irisMode: irisMode,
		ois: ois,
		power: power,
		presetScope: presetScope,
		presetSpeed: presetSpeed,
		presetSpeedTable: presetSpeedTable,
		presetSpeedUnit: presetSpeedUnit,
		shutter: shutter,
		streamingRTMP: rtmp,
		streamingSRT: srt,
		streamingTS: ts,
		tally: tally,
		tally2: tally2,
		tally3: tally3,
		whiteBalance: whiteBalance,

		ptSpeed: self.ptSpeed,
		pSpeed: self.pSpeed,
		tSpeed: self.tSpeed,
		zSpeed: self.zSpeed,
		fSpeed: self.fSpeed,
	})
}
