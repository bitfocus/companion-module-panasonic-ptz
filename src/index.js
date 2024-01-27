import {
	runEntrypoint,
	InstanceBase,
	InstanceStatus,
} from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getPresetDefinitions } from './presets.js'
import { setVariables, checkVariables } from './variables.js'
import { ConfigFields } from './config.js'
import * as net from 'net'
import got from 'got'
import EventEmitter from 'events'

// ########################
// #### Instance setup ####
// ########################
class PanasonicPTZInstance extends InstanceBase {
	async unsubscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=stop&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', `Sending : ${url}`)
		}

		try {
			await got.get(url)

			this.log('info', 'un-subscribed: ' + url)
		} catch (err) {
			this.log('error', 'Error from PTZ on unsubscribe: ' + String(err))
		}
	}

	async subscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=start&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', `Sending : ${url}`)
		}

		try {
			await got.get(url)

			this.log('info', 'subscribed: ' + url)

			this.updateStatus(InstanceStatus.Ok)
		} catch (err) {
			this.log('error', 'Error from PTZ on subscribe: ' + String(err))

			//this.updateStatus(InstanceStatus.UnknownWarning, 'Subscription unsuccessful')
		}
	}

	init_tcp() {
		this.clients = []
		var tcpPortSelected = this.tcpPortSelected || 31004
		var tcpPortOld = this.tcpPortOld || 31004

		// Remove old TCP Server and close all connections
		if (this.server) {
			// Stop getting Status Updates
			this.unsubscribeTCPEvents(tcpPortOld).catch(() => null)

			// Close and delete server
			this.server.close()
			delete this.server
		}

		if (this.config.host) {
			// Create a new TCP server.
			this.server = net.createServer((socket) => {
				// When the client requests to end the TCP connection with the server, the server ends the connection.
				socket.on('end', () => {
					this.clients.splice(this.clients.indexOf(socket), 1)
				})

				// common error handler
				socket.on('error', () => {
					this.clients.splice(this.clients.indexOf(socket), 1)
					this.log('error', 'PTZ errored/died: ' + socket.name)
				})

				socket.name = socket.remoteAddress + ':' + socket.remotePort
				tcpPortOld = socket.address().port
				this.tcpPortOld = tcpPortOld
				this.clients.push(socket)

				// Receive data from the client.
				socket.on('data', (data) => {
					// TODO - TCP doesn't guarantee messages will be chunked sensibly. When it doesnt, this logic will break
					let str_raw = data.toString()
					str_raw = str_raw.split('\r\n') // Split Data in order to remove data before and after command
					let str = str_raw[1].trim() // remove new line, carage return and so on.
					if (this.config.debug) {
						this.log('info', 'Received TCP: ' + String(str))
					}
					str = str.split(':') // Split Commands and data

					// Store Data
					this.parseStatus(str)

					// Update Varibles and Feedbacks
					this.checkVariables()
					this.checkFeedbacks()
				})
			})

			// common error handler
			this.server.on('error', (err) => {
				// Catch uncaught Exception"EADDRINUSE" error that orcures if the port is already in use
				if (err.code === 'EADDRINUSE') {
					// self.log('error', "TCP error: " + String(err));
					this.log('error', 'TCP error: Please use another TCP port, ' + tcpPortSelected + ' is already in use')
					this.log('error', 'TCP error: The TCP port must be unique between instances')
					this.log('error', 'TCP error: Please change it and click apply in ALL PTZ instances')
					this.updateStatus(InstanceStatus.UnknownError, 'TCP Port in use')

					// Cancel the subscription of info from the PTZ
					this.unsubscribeTCPEvents(tcpPortSelected).catch(() => null)
				} else {
					this.log('error', 'TCP error: ' + String(err))
				}
			})

			// Listens for a client to make a connection request.
			try {
				this.log('debug', 'Trying to listen to TCP from PTZ')

				if (this.config.autoTCP) {
					this.server.listen(0)
				} else {
					this.server.listen(this.config.tcpPort)
				}
				tcpPortSelected = this.server.address().port
				this.tcpPortSelected = tcpPortSelected

				this.log('info', 'Listening for PTZ updates on localhost:' + tcpPortSelected)

				// Subscibe to updates from PTZ
				this.subscribeTCPEvents(tcpPortSelected)
			} catch (err) {
				this.log('error', "Couldn't bind to TCP port " + tcpPortSelected + ' on localhost: ' + String(err))
				this.updateStatus(InstanceStatus.UnknownError, 'TCP Port failure')
			}

			// Catch uncaught Exception errors that orcure
			// process.on('uncaughtException',  (err) => {
			// 	debug(err)
			// 	console.log(err)
			// 	// process.exit(1)
			// })
		}

		return this
	}
	getCameraInfo() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/getinfo?FILE=1`

			// ToDo:
			// Basic protocol
			// /cgi-bin/get_basic
			// /cgi-bin/model_serial

			// Restart
			// /cgi-bin/initial?cmd=reset&Randomnum=12345

			// SD Card Recording
			// /cgi-bin/get_state
			// /cgi-bin/sdctrl

			// Stream RTMP
			// /cgi-bin/get_rtmp_status
			// /cgi-bin/rtmp_ctrl
			// /cgi-bin/get_rtmp_param

			// Stream SRT
			// /cgi-bin/get_srt_status
			// /cgi-bin/srt_ctrl
			// /cgi-bin/get_srt_info

			// Stream TS
			// /cgi-bin/get_ts_status
			// /cgi-bin/ts_ctrl
			// /cgi-bin/get_ts_udp_info

			// Stream RTSP
			// /cgi-bin/get_rtsp

			// Streaming
			// /cgi-bin/get_stream_mode
			// /cgi-bin/set_stream_mode

			// Snapshot
			// /cgi-bin/view.cgi?action=snapshot

			// Thumbnails
			// /cgi-bin/get_preset_thumbnail?preset_number=X

			if (this.config.debug) {
				this.log('debug', `Sending : ${url}`)
			}

			got.get(url)
				.then((response) => {
					this.updateStatus(InstanceStatus.Ok)

					if (response.body) {
						const lines = response.body.trim().split('\r\n') // Split Data in order to remove data before and after command

						for (let line of lines) {
							// remove new line, carage return and so on.
							const str = line.trim().split('=') // Split keys and values
							if (this.config.debug) {
								this.log('info', 'Received INFO: ' + String(str))
							}
							// Store Data
							this.parseInfo(str)
						}

						this.checkVariables()
						this.checkFeedbacks()
					}
				})
				.catch((err) => {
					this.log('error', 'Error checking basic communication and receiving model info from PTZ: ' + String(err))
					this.updateStatus(InstanceStatus.ConnectionFailure)
				})
		}
	}
	parseInfo(str) {
		// Store Values from Events
		switch (str[0]) {
			case 'VERSION':
				this.data.version = str[1]
				break
			case 'NAME':
				this.data.modelINFO = str[1]
				this.log(
					'info',
					'Detected Camera Model: ' + this.data.modelINFO
				)
				// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
				if (this.data.modelINFO !== this.data.model) {
					this.init_actions() // export actions
					this.init_presets()
					this.init_variables()
					this.checkVariables()
					this.init_feedbacks()
					this.checkFeedbacks()
				}
				break
			default:
				break
		}
	}
	getCameraStatus() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/live/camdata.html`

			if (this.config.debug) {
				this.log('debug', `Sending : ${url}`)
			}

			got.get(url)
				.then((response) => {
					if (response.body) {
						const lines = response.body.trim().split('\r\n') // Split Data in order to remove data before and after command

						for (let line of lines) {
							// remove new line, carage return and so on.
							const str = line.trim().split(':') // Split Commands and data
							if (this.config.debug) {
								this.log('info', 'Received Status: ' + String(str))
							}
							// Store Data
							this.parseStatus(str)
						}

						this.checkVariables()
						this.checkFeedbacks()
					}
				})
				.catch((err) => {
					this.log('error', 'Error requesting inital status from PTZ: ' + String(err))
				})
		}
	}
	parseStatus(str) {
		if (str[0].substring(0, 3) === 'rER') {
			str[0] === 'rER00'
				? (this.data.errorLabel = 'No Error')
				: (this.data.errorLabel = str[0].substring(1))
		}

		// Lens Position Information
		if (str[0].substring(0, 2) === 'ax') {
			switch (str[0].substring(2, 3)) {
				case 'z': this.data.zoomPosition = parseInt(str[0].substring(3), 16) - 0x555; break
				case 'f': this.data.focusPosition = parseInt(str[0].substring(3), 16) - 0x555; break
				case 'i': this.data.irisPosition = parseInt(str[0].substring(3), 16) - 0x555; break
			}
		}
		if (str[0].substring(0, 3) === 'lPI') {
			this.data.zoomPosition = parseInt(str[0].substring(3, 6), 16) - 0x555
			this.data.focusPosition = parseInt(str[0].substring(6, 9), 16) - 0x555
			this.data.irisPosition = parseInt(str[0].substring(9, 12), 16) - 0x555
		}

		if (str[0].substring(0, 1) === 'q') {
			const q = str[0].match(/q(\d\d)/)
			if (q) {
				this.data.presetCompletedIdx = parseInt(q[1])
			}

			if (str[0].substring(0, 4) === 'qSV3') {
				this.data.version = str[0].substring(4)
			}
		}

		if (str[0].substring(0, 1) === 's') {
			const s = str[0].match(/s(\d\d)/)
			if (s) {
				this.data.presetSelectedIdx = parseInt(s[1])
			}
		}

		// Store Values from Events
		switch (str[0]) {
			case 'dA0': // Legacy (red) Tally Off
				this.data.tally = 'OFF'
				break
			case 'dA1': // Legacy (red) Tally On
				this.data.tally = 'ON'
				break
			case 'p0':
				this.data.power = 'OFF'
				break
			case 'p1':
				this.data.power = 'ON'
				break
			case 'iNS0':
				this.data.installMode = 'Desktop'
				break
			case 'iNS1':
				this.data.installMode = 'Hanging'
				break
			case 'd30':
				this.data.irisMode = 'Manual'
				break
			case 'd31':
				this.data.irisMode = 'Auto'
				break
			case 'DCB':
			case 'OBR':
				this.data.colorbar = str[1] == '1' ? 'ON' : 'OFF'
				break
			case 'OID':
				this.data.modelTCP = str[1]
				// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
				if (this.data.modelTCP !== this.data.model) {
					this.init_actions() // export actions
					this.init_presets()
					this.init_variables()
					this.checkVariables()
					this.init_feedbacks()
					this.checkFeedbacks()
				}
				break
			case 'TLR': // Tally Red
				this.data.tally = str[1] == '1' ? 'ON' : 'OFF'
				break
			case 'TLG': // Tally Green
				this.data.tally2 = str[1] == '1' ? 'ON' : 'OFF'
				break
			case 'TLY': // Tally Yellow
				this.data.tally3 = str[1] == '1' ? 'ON' : 'OFF'
				break
			case 'OAF':
				this.data.focusMode = str[1] == '1' ? 'Auto' : 'Manual'
				break
			case 'OAW':
				this.data.whiteBalance = str[1]
				break
			case 'OIF':
				this.data.irisLabel =
					str[1] == 'FF'
						? 'CLOSE'
						: 'F' + (parseInt(str[1], 16) / 10).toFixed(1)
				break
			case 'OIS':
				this.data.ois = str[1]
				break
			case 'OSD':
				switch (str[1]) {
					case 'B1': this.data.colorTemperature = str[2].substring(2); break
					case '4F': this.data.irisFollow = parseInt(str[2], 16); break
				}
				break
			case 'OSI':
				switch (str[1]) {
					case '20': this.data.colorTempLabel = parseInt(str[2], 16).toString() + 'K'; break // VAR
					// case 'D2': this.data.filter = str[2]; break // UB300's additional "Intelligent ND Filter"
				}
				break
			case 'OSH':
				this.data.shutter = str[1].substring(2)
				break
			case 'OFT':
				this.data.filter = str[1]
				break
			case 'OSE':
				if (str[1] == '71') {
					switch (str[2]) {
						case '0': this.data.presetRecallMode = 'Mode A'; break
						case '1': this.data.presetRecallMode = 'Mode B'; break
						case '2': this.data.presetRecallMode = 'Mode C'; break
					}
				}
				break
			case 'OSG':
				switch (str[1]) {
					case '39': this.data.redGainValue = parseInt(str[2], 16) - 0x800; break
					case '3A': this.data.blueGainValue = parseInt(str[2], 16) - 0x800; break
					case '4C': this.data.redPedValue = parseInt(str[2], 16) - 0x800; break
					case '4D': this.data.greenPedValue = parseInt(str[2], 16) - 0x800; break
					case '4E': this.data.bluePedValue = parseInt(str[2], 16) - 0x800; break
					//case '5D': this.data.shutterStepLabel = str[2].substring(2); break // UB300 special case
				}
				break
			case 'OSJ':
				switch (str[1]) {
					case '03': this.data.shutter = str[2].substring(2); break
					case '06': this.data.shutterStepLabel = '1/' + parseInt(str[2], 16).toString(); break
					case '10': this.data.greenPedValue = parseInt(str[2], 16) - 0x96; break
					case '0F': this.data.masterPedValue = parseInt(str[2], 16) - 0x800; break
					case '4A': this.data.colorTempLabel = parseInt(str[2], 16).toString() + 'K'; break // AWB A/B
					//case '4B': this.data.redGainValue = parseInt(str[2], 16) - 0x800; break // AWB A/B
					//case '4C': this.data.blueGainValue = parseInt(str[2], 16) - 0x800; break // AWB A/B
					case 'D2': this.data.filter = str[2]; break
				}
				break
			case 'OSL':
				switch (str[1]) {
					case 'B6': this.data.autotracking = str[2]; break // Auto Tracking Mode
					case 'B7': this.data.autotrackingAngle = str[2]; break // Angle
					case 'BB':
						switch (str[2]) {
							case '0': this.data.autotrackingStatusLabel = 'Not Tracking'; break
							case '1': this.data.autotrackingStatusLabel = 'Tracking'; break
							case '2': this.data.autotrackingStatusLabel = 'Lost'; break
						}
						break
				}
				break
			case 'OGS':
			case 'OGU':
				this.data.gain = str[1].substring(2)
				break
			case 'ORS':
				this.data.irisMode = str[1] == '1' ? 'Auto' : 'Manual'
				break
			case 'OTD':
				this.data.masterPedValue = parseInt(str[1], 16) - 0x96
				break
			case 'ORG':
				this.data.redGainValue = parseInt(str[1], 16) - 0x1e
				break
			case 'OBG':
				this.data.blueGainValue = parseInt(str[1], 16) - 0x1e
				break
			case 'ORI':
				this.data.redGainValue = parseInt(str[1], 16) - 0x96
				break
			case 'OBI':
				this.data.blueGainValue = parseInt(str[1], 16) - 0x96
				break
			case 'ORP':
				this.data.redPedValue = parseInt(str[1], 16) - 0x96
				break
			case 'OBP':
				this.data.bluePedValue = parseInt(str[1], 16) - 0x96
				break
			case 'TITLE':
				this.data.name = str[1]
				break
		}
	}
	// When module gets deleted
	async destroy() {
		// Remove TCP Server and close all connections
		if (this.server) {
			// Stop getting Status Updates
			await this.unsubscribeTCPEvents(this.tcpPortSelected)

			// Close and delete server
			this.server.close()
			delete this.server
		}
	}
	// Initalize module
	async init(config) {
		this.config = config

		this.data = {
			debug: false,
			modelINFO: null,
			modelTCP: null,

			model: 'Auto',
			series: 'Auto',
			name: null,
			version: null,

			// booleans
			autotracking: null,
			colorbar: null,
			power: null,
			tally: null,
			tally2: null,
			tally3: null,

			// unresolved enums
			autotrackingAngle: null,
			colorTemperature: null,
			filter: null,
			gain: null,
			ois: null,
			shutter: null,
			whiteBalance: null,

			// numeric index
			presetSelectedIdx: null,
			presetCompletedIdx: null,

			// numeric unsigned value
			focusPosition: null,
			irisPosition: null,
			irisFollowPosition: null,
			zoomPosition: null,

			// numeric signed value
			redGainValue: null,
			blueGainValue: null,
			redPedValue: null,
			bluePedValue: null,
			greenPedValue: null,
			masterPedValue: null,

			// decoded enums (as string)
			focusMode: null,
			installMode: null,
			irisMode: null,
			presetRecallMode: null,

			// other strings
			autotrackingStatusLabel: null,
			colorTempLabel: null,
			errorLabel: null,
			irisLabel: null,
			shutterStepLabel: null,
		}

		this.ptSpeed = 25
		this.ptSpeedIndex = 25
		this.pSpeed = 25
		this.pSpeedIndex = 25
		this.tSpeed = 25
		this.tSpeedIndex = 25
		this.zSpeed = 25
		this.zSpeedIndex = 25
		this.fSpeed = 25
		this.fSpeedIndex = 25
		this.gainVal = '08'
		this.gainIndex = 0
		this.irisVal = 50
		this.irisIndex = 50
		this.filterVal = 0
		this.filterIndex = 0
		this.shutterVal = 0
		this.shutterIndex = 0
		this.pedestalVal = '096'
		this.pedestalIndex = 150
		this.colorTemperatureValue = '000'
		this.colorTemperatureIndex = 0
		this.tcpPortSelected = 31004
		this.tcpPortOld = this.config.tcpPort || 31004

		this.config.host = this.config.host || ''
		this.config.httpPort = this.config.httpPort || 80
		this.config.tcpPort = this.config.tcpPort || 31004
		this.config.autoTCP = this.config.autoTCP || true
		this.config.model = this.config.model || 'Auto'
		this.config.debug = this.config.debug || false

		this.updateStatus(InstanceStatus.Connecting)
		this.getCameraInfo()
		this.getCameraStatus()
		this.init_tcp()
		this.init_actions() // export actions
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()

		this.speedChangeEmitter = new EventEmitter()
	}
	// Update module after a config change
	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.getCameraInfo()
		this.getCameraStatus()
		this.init_tcp()
		this.init_actions() // export actions
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()
	}

	// Return config fields for web config
	getConfigFields() {
		return ConfigFields
	}

	// ##########################
	// #### Instance Presets ####
	// ##########################
	init_presets() {
		this.setPresetDefinitions(getPresetDefinitions(this))
	}
	// ############################
	// #### Instance Variables ####
	// ############################
	init_variables() {
		this.setVariableDefinitions(setVariables(this))
	}
	// Setup Initial Values
	checkVariables() {
		checkVariables(this)
	}
	// ############################
	// #### Instance Feedbacks ####
	// ############################
	init_feedbacks() {
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
	}

	init_actions() {
		this.setActionDefinitions(getActionDefinitions(this))
	}
}

runEntrypoint(PanasonicPTZInstance, UpgradeScripts)
