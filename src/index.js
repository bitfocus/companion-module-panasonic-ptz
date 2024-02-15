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
import { getAndUpdateSeries } from './common.js'

// ########################
// #### Instance setup ####
// ########################
class PanasonicPTZInstance extends InstanceBase {
	async unsubscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=stop&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', `Update Notification Unsubcribe Request: ${url}`)
		}

		try {
			await got.get(url, { timeout: { request: 250 } } )

			this.log('info', 'un-subscribed: ' + url)
		} catch (err) {
			this.log('error', 'Error on unsubscribe: ' + String(err))
		}
	}

	async subscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=start&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', `Update Notification Subscribe Request: ${url}`)
		}

		try {
			await got.get(url, { timeout: { request: 250 } } )

			this.log('info', 'subscribed: ' + url)

			this.updateStatus(InstanceStatus.Ok)
		} catch (err) {
			this.log('error', 'Error on subscribe: ' + String(err))
			
			this.updateStatus(InstanceStatus.UnknownWarning, 'Update subscription failed')
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
					this.updateStatus(InstanceStatus.Disconnected)
				})

				// common error handler
				socket.on('error', () => {
					this.clients.splice(this.clients.indexOf(socket), 1)
					this.log('error', 'Update notification channel errored/died: ' + socket.name)
					this.updateStatus(InstanceStatus.Disconnected)
				})

				socket.name = socket.remoteAddress + ':' + socket.remotePort
				tcpPortOld = socket.address().port
				this.tcpPortOld = tcpPortOld
				this.clients.push(socket)

				// Receive data from the client.
				socket.on('data', (data) => {
					// TODO - TCP doesn't guarantee messages will be chunked sensibly. When it doesnt, this logic will break

					// Data layout in buffer: [22 Bytes][2 Bytes][4 Bytes][CR][LF]>>>DATA<<<[CR][LF]*optional Bytes*[24 Bytes]
					// Convert binary buffer to string, split data in order to remove binary data before and after command
					const str = data.toString().split('\r\n', 3)[1]

					if (this.config.debug) {
						this.log('info', 'Received Update: ' + str)
					}

					this.parseUpdate(str.split(':'))

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
					this.log('error', 'TCP server error: ' + String(err))
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

	async getCameraInfo() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/getinfo?FILE=1`

			if (this.config.debug) {
				this.log('info', `getinfo Request : ${url}`)
			}

			try {
				const response = await got.get(url, { timeout: { request: 250 } } )
				if (response.body) {
					const lines = response.body.trim().split('\r\n')

					for (let line of lines) {
						let str = line.trim()
						if (this.config.debug) {
							this.log('info', 'Received INFO: ' + str)
						}

						str = str.split('=')
						switch (str[0]) {
							case 'MAC':
								this.data.mac = str[1]
								break
							case 'SERIAL':
								this.data.serial = str[1]
								break
							case 'VERSION':
								this.data.version = str[1]
								break
							case 'NAME':
								this.data.modelINFO = str[1]
								this.log('info', 'Detected Camera Model: ' + this.data.modelINFO)
								// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
								if (this.data.modelINFO !== this.data.model) {
									this.reInitAll()
								}
								break
						}
					}

					this.checkVariables()
					this.checkFeedbacks()

					this.updateStatus(InstanceStatus.Ok)
				}
			} catch (err) {
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('error', 'Error checking basic communication and receiving model: ' + String(err))
			}
		}
	}

	async getCameraTitle() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/get_basic`

			if (this.config.debug) {
				this.log('info', `get_basic Request : ${url}`)
			}

			try {
				const response = await got.get(url, { timeout: { request: 250 } } )
				if (response.body) {
					const lines = response.body.trim().split('\r\n')

					for (let line of lines) {
						let str = line.trim()
						if (this.config.debug) {
							this.log('info', 'Received BASIC: ' + str)
						}

						str = str.split('=')

						if (str[0] === 'cam_title') {
							this.data.title = str[1]
						}
					}

					this.checkVariables()

					this.updateStatus(InstanceStatus.Ok)
				}
			} catch (err) {
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('error', 'Error checking basic communication and receiving title: ' + String(err))
			}
		}
	}

	async getCameraStatus() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/live/camdata.html`

			if (this.config.debug) {
				this.log('info', `camdata Request: ${url}`)
			}

			try {
				const response = await got.get(url, { timeout: { request: 250 } } )
				if (response.body) {
					const lines = response.body.trim().split('\r\n')

					for (let line of lines) {
						const str = line.trim()

						if (this.config.debug) {
							this.log('info', 'Received Initial Status: ' + str)
						}

						this.parseUpdate(str.split(':'))
					}

					this.checkVariables()
					this.checkFeedbacks()

					this.updateStatus(InstanceStatus.Ok)
				}
			}
			catch (err) {
				this.log('error', 'Error requesting inital status from PTZ: ' + String(err))
			}
		}
	}

	queryCameraStatus() {
		// Basic protocol
		// /cgi-bin/get_basic
		// /cgi-bin/model_serial
		// /cgi-bin/get_capability

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

		// Streaming (Encoder Mode AVC/HEVC)
		// /cgi-bin/get_stream_mode
		// /cgi-bin/set_stream_mode

		// Snapshot
		// /cgi-bin/view.cgi?action=snapshot

		// Thumbnails
		// /cgi-bin/get_preset_thumbnail?preset_number=X

		const poll = {
			ptz: [
				//'O', // Power*
				//'PE00', // Preset Entry 0
				//'PE01', // Preset Entry 1
				//'PE02', // Preset Entry 2
				//'AXF', // Focus Position Control*
				//'AXI', // Iris Position Control*
				//'AXZ', // Zoom Position Control
				'GF', // Request Focus Position*
				'GI', // Request Iris Position (+Mode)*
				'GZ', // Request Zoom Position*
				'I', // Iris Position (1-99)*
				//'D1', // Focus Mode*
				//'D3', // Iris Mode*
				//'DA', // Tally*
				//'INS', // Installation Position
				//'LPC', // Lens Position Information Control
				//'LPI', // Lens Position
				//'PST', // Preset Speed Table
				//'PTD', // Get Pan/Tilt/Zoom/Focus/Iris
				//'PTG', // Get Gain/ColorTemp/Shutter/ND
				//'PTV', // Get Pan/Tilt/Zoom/Focus/Iris
				//'RER', // Latest Error Information
				//'S', // Request Latest Recall Preset No.
				//'TAA', // Tally Infomation
				//'UPVS', // Preset Speed
			],
			cam: [
				'QAF', // Focus Mode*
				'QAW', // White Balance Mode*
				'QBR', // Color Bar*
				//'QBI', // B Gain*
				'QBP', // B Pedestal*
				//'QGB', // B Gain
				//'QBD', // B Pedestal
				'QFT', // ND Filter*
				//'QGS', // Gain Select (UB300 only)
				'QGU', // Gain*
				'QID', // Model Number*
				//'QIF', // Request Iris F No.
				'QIS', // OIS*
				//'QRI', // R Gain*
				'QRP', // R Pedestal*
				//'QGR', // R Gain
				//'QRD', // R Pedestal
				'QRS', // Iris Mode*
				//'QRV', // Iris Control (0x0-0x3FF)*
				//'QSH', // Shutter
				//'QSV', // Software Version
				//'QTD', // T Pedestal
				//'QTP', // T Pedestal
				'QLR', // R-Tally Control*
				'QLG', // G-Tally Control*
				//'QLY', // Y-Tally Control
				'QSD:4F', // Iris Follow*
				//'QSD:B1', // Color Temperature (enumerated)
				//'QSE:71', // Preset Scope
				'QSG:39', // R Gain*
				'QSG:3A', // B Gain*
				//'QSG:4A', // Master Pedestal (UB300 only)
				//'QSG:4C', // R Pedestal (UB300 only)
				//'QSG:4D', // G Pedestal (UE160 only) 
				//'QSG:4E', // B Pedestal (UB300 only)
				//'QSG:59', // Shutter SW
				//'QSG:5A', // Shutter Mode
				//'QSG:5D', // Shutter Speed (UB300 only)
				//'QSI:18', // Request Zoom/Focus/Iris Position
				//'QSI:19:0', // Software Version, System Version (UB300 only)
				'QSI:20', // Color Temperature*
				//'QSJ:03', // Shutter Mode
				//'QSJ:06', // Shutter Step Value
				//'QSJ:09', // Shutter Synchro Value
				'QSJ:0F', // Master Pedestal*
				'QSJ:10', // G Pedestal*
				//'QSJ:29', // Preset Speed Unit
				//'QSJ:5C', // Camera Title
				//'QSJ:D2', // ND Filter Status
				//'QSL:2A', // ATW
				//'QSL:2B', // White Balance Mode
				//'QSL:8B', // O.I.S.
				//'QSL:8C', // O.I.S. Mode
				//'QSL:99', // System Version
				//'QSL:B6', // Auto Tracking Mode
				//'QSL:B7', // Angle
				//'QSL:BB', // Tracking Status
				//'QSL:BC', // Tracking Start/Stop
			],
			web: [
				'get_state',
				'get_rtmp_status',
				'get_srt_status',
				'get_ts_status',
			]
		}

		const SERIES = getAndUpdateSeries(this)

		if (SERIES.capabilities.poll) {
			if (SERIES.capabilities.poll.ptz) {
				for (let cmd of SERIES.capabilities.poll.ptz) this.getPTZ(cmd)
			}
			if (SERIES.capabilities.poll.cam) {
				for (let cmd of SERIES.capabilities.poll.cam) this.getCam(cmd)
			}
			if (SERIES.capabilities.poll.web) {
				for (let cmd of SERIES.capabilities.poll.web) this.getWeb(cmd)
			}
		}
	}

	getPTZ(cmd) {
		if (cmd) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/aw_ptz?cmd=%23${cmd}&res=1`
			if (this.config.debug) {
				this.log('info', `PTZ Request: ${url}`)
			}

			got.get(url, { timeout: { request: 250 } } )
			.then((response) => {
				if (response.body) {
					const str = response.body.trim()
	
					if (this.config.debug) {
						this.log('info', 'Received PTZ query response: ' + str)
					}
	
					this.parseUpdate(str.split(':'))

					this.checkVariables()
					this.checkFeedbacks()
				}
			})
			.catch((err) => {
				this.log('error', 'Error requesting status from PTZ: ' + String(err))
			})
		}
	}
	
	getCam(cmd) {
		if (cmd) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/aw_cam?cmd=${cmd}&res=1`
	
			if (this.config.debug) {
				this.log('info', `Cam Request: ${url}`)
			}
	
			got.get(url, { timeout: { request: 250 } } )
			.then((response) => {
				if (response.body) {
					const str = response.body.trim()
	
					if (this.config.debug) {
						this.log('info', 'Received Cam query response: ' + str)
					}
	
					this.parseUpdate(str.split(':'))

					this.checkVariables()
					this.checkFeedbacks()
				}
			})
			.catch((err) => {
				this.log('error', 'Error requesting status from Cam: ' + String(err))
			})
		}
	}
	
	// Currently only for web commands that don't require admin rights
	getWeb(cmd) {
		if (cmd) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/${cmd}`
	
			if (this.config.debug) {
				this.log('info', `Web Request: ${url}`)
			}
	
			got.get(url, { timeout: { request: 250 } } )
			.then((response) => {
				if (response.body) {
					const lines = response.body.trim().split('\r\n')

					for (let line of lines) {
						const str = line.trim()
	
						if (this.config.debug) {
							this.log('info', 'Received Web Command Response [' + cmd + ']: ' + str)
						}
	
						this.parseWeb(str.split('='), cmd)
					}

					this.checkVariables()
					this.checkFeedbacks()
				}
			})
			.catch((err) => {
				this.log('error', 'Error requesting status from Web [' + cmd + ']: ' + String(err))
			})
		}
	}

	parseUpdate(str) {
		// Store Values from Events
		if (str[0].substring(0, 3) === 'rER') {
			str[0] === 'rER00'
				? (this.data.errorLabel = 'No Error')
				: (this.data.errorLabel = str[0].substring(1))
		}

		if (str[0].substring(0, 1) === 'g') {
			switch (str[0].substring(1, 2)) {
				// ToDo: handle "---" on power off
				case 'z': this.data.zoomPosition = parseInt(str[0].substring(2, 5), 16) - 0x555; break
				case 'f': this.data.focusPosition = parseInt(str[0].substring(2, 5), 16) - 0x555; break
				case 'i':
					this.data.irisPosition = parseInt(str[0].substring(2, 5), 16) - 0x555
					this.data.irisMode = str[0].substring(5, 6)
					break
			}
		}
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

		if (str[0].substring(0, 2) === 'iC') {
			this.data.iris = str[0].substring(2)
		}

		if (str[0].substring(0, 1) === 'q') {
			const q = str[0].match(/q(\d\d)/)
			if (q) {
				this.data.presetCompletedIdx = parseInt(q[1])
			}
		}

		if (str[0].substring(0, 1) === 's') {
			const s = str[0].match(/s(\d\d)/)
			if (s) {
				this.data.presetSelectedIdx = parseInt(s[1])
			}
		}

		if (str[0].substring(0, 2) === 'pE') {
			switch (str[0].substring(2, 4)) {
				case '00': 
					this.data.presetEntries0 = parseInt(str[0].substring(4), 16).toString(2).padStart(40, 0).split("").reverse()
					break
				case '01':
					this.data.presetEntries1 = parseInt(str[0].substring(4), 16).toString(2).padStart(40, 0).split("").reverse()
					break
				case '02':
					this.data.presetEntries2 = parseInt(str[0].substring(4), 16).toString(2).padStart(20, 0).split("").reverse()
					break
			}
			this.data.presetEntries = this.data.presetEntries0.concat(this.data.presetEntries1.concat(this.data.presetEntries2))
		}

		if (str[0].substring(0, 3) === 'pST') {
			this.data.presetSpeedTable = str[0].substring(3)
		}

		if (str[0].substring(0, 4) === 'uPVS') {
			this.data.presetSpeed = str[0].substring(4)
		}

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
				this.data.installMode = '0'
				break
			case 'iNS1':
				this.data.installMode = '1'
				break
			case 'd10':
				this.data.focusMode = '0'
				break
			case 'd11':
				this.data.focusMode = '1'
				break
			case 'd30':
				this.data.irisMode = '0'
				break
			case 'd31':
				this.data.irisMode = '1'
				break
			case 'DCB':
			case 'OBR':
				this.data.colorbar = str[1] === '1' ? 'ON' : 'OFF'
				break
			case 'OID':
				this.data.modelTCP = str[1]
				// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
				if (this.data.modelTCP !== this.data.model) {
					this.reInitAll()
				}
				break
			case 'OLR':
			case 'TLR':
				this.data.tally = str[1] === '1' ? 'ON' : 'OFF'
				break
			case 'OLG':
			case 'TLG':
				this.data.tally2 = str[1] === '1' ? 'ON' : 'OFF'
				break
			case 'OLY':
			case 'TLY':
				this.data.tally3 = str[1] === '1' ? 'ON' : 'OFF'
				break
			case 'OAF':
				this.data.focusMode = str[1]
				break
			case 'OAW':
				this.data.whiteBalance = str[1]
				break
			case 'OIF':
				this.data.irisLabel =
					str[1] === 'FF'
						? 'CLOSE'
						: 'F/' + (parseInt(str[1], 16) / 10).toFixed(1)
				break
			case 'OIS':
				this.data.ois = str[1]
				break
			case 'OSD':
				switch (str[1]) {
					case 'B1': this.data.colorTemperature = str[2].replace('0x', ''); break
					case '4F': this.data.irisFollowPosition = parseInt(str[2], 16); break
				}
				break
			case 'OSI':
				switch (str[1]) {
					case '18':
						this.data.zoomPosition = parseInt(str[2], 16) - 0x555
						this.data.focusPosition = parseInt(str[3], 16) - 0x555
						this.data.irisPosition = parseInt(str[4], 16) - 0x555
						break
					case '20': this.data.colorTempLabel = parseInt(str[2].substring(0, 5), 16).toString() + 'K'; break // VAR
					// case 'D2': this.data.filter = str[2]; break // UB300's additional "Intelligent ND Filter"
				}
				break
			case 'OSH':
				this.data.shutter = str[1].replace('0x', '')
				break
			case 'OFT':
				this.data.filter = str[1]
				break
			case 'OSE':
				if (str[1] === '71') {
					this.data.presetScope = str[2]
				}
				break
			case 'OSG':
				switch (str[1]) {
					case '39': this.data.redGainValue = parseInt(str[2], 16) - 0x800; break
					case '3A': this.data.blueGainValue = parseInt(str[2], 16) - 0x800; break
					case '4A': this.data.masterPedValue = parseInt(str[2], 16) - 0x80; break
					case '4C': this.data.redPedValue = parseInt(str[2], 16) - 0x800; break
					case '4D': this.data.greenPedValue = parseInt(str[2], 16) - 0x800; break
					case '4E': this.data.bluePedValue = parseInt(str[2], 16) - 0x800; break
					//case '5D': this.data.shutterStepLabel = str[2].replace('0x', ''); break // UB300 special case
				}
				break
			case 'OSJ':
				switch (str[1]) {
					case '03': this.data.shutter = str[2].replace('0x', ''); break
					case '06': this.data.shutterStepLabel = '1/' + parseInt(str[2], 16).toString(); break
					case '0F': this.data.masterPedValue = parseInt(str[2], 16) - 0x800; break
					case '10': this.data.greenPedValue = parseInt(str[2], 16) - 0x96; break
					case '29': this.data.presetSpeedUnit = str[2]; break
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
				this.data.gain = str[1].replace('0x', '').padStart(2, '0')
				break
			case 'ORS':
				this.data.irisMode = str[1]
				break
			case 'OTD':
				this.data.masterPedValue = parseInt(str[1], 16) - 0x1e
				break
			case 'OTP':
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
				this.data.title = str[1]
				break
		}
	}

	parseWeb(str, cmd) {
		switch (cmd) {
			case 'get_rtmp_status':
				if (str[0] === 'status') this.data.rtmp = str[1] === '1'
				break
			case 'get_srt_status':
				if (str[0] === 'status') this.data.srt = str[1] === '1'
				break
			case 'get_ts_status':
				if (str[0] === 'status') this.data.ts = str[1] === '1'
				break				
			case 'get_state':
				switch (str[0]) {
					case 'rec': this.data.recording = str[1].toUpperCase(); break
					case 'rec_counter': this.data.recordingTime = str[1]; break
				}
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

			mac: null,
			serial: null,
			title: null,
			version: null,

			// booleans
			autotracking: null,
			colorbar: null,
			power: null,
			recording: null,
			rtmp: null,
			srt: null,
			ts: null,
			tally: null,
			tally2: null,
			tally3: null,

			// unresolved enums
			autotrackingAngle: null,
			colorTemperature: null,
			filter: null,
			focusMode: null,
			gain: null,
			installMode: null,
			iris: null,
			irisMode: null,
			ois: null,
			presetScope: null,
			presetSpeed: null,
			presetSpeedTable: null,
			presetSpeedUnit: '0',
			shutter: null,
			whiteBalance: null,

			// numeric index
			presetSelectedIdx: null,
			presetCompletedIdx: null,

			// numeric unsigned values
			focusPosition: null,
			irisPosition: null,
			irisFollowPosition: null,
			zoomPosition: null,

			// numeric signed values
			redGainValue: 0,
			blueGainValue: 0,
			redPedValue: 0,
			bluePedValue: 0,
			greenPedValue: 0,
			masterPedValue: 0,

			// other strings
			autotrackingStatusLabel: null,
			colorTempLabel: null,
			errorLabel: null,
			irisLabel: null,
			shutterStepLabel: null,
			recordingTime: null,

			// arrays
			presetEntries0: Array(40),
			presetEntries1: Array(40),
			presetEntries2: Array(20),
			presetEntries: Array(100),
		}

		this.ptSpeed = 25
		this.pSpeed = 25
		this.tSpeed = 25
		this.zSpeed = 25
		this.fSpeed = 25
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
		this.getCameraTitle()
		this.getCameraStatus()
		//this.updateStatus(InstanceStatus.Ok)
		
		this.reInitAll()

		this.speedChangeEmitter = new EventEmitter()
	}

	// Update module after a config change
	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.getCameraInfo()
		this.getCameraTitle()
		this.getCameraStatus()
		//this.updateStatus(InstanceStatus.Ok)
	}

	reInitAll() {
		this.init_actions() // export actions
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()

		this.queryCameraStatus()
		this.init_tcp()
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
