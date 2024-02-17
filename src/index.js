import { runEntrypoint, InstanceBase, InstanceStatus } from '@companion-module/base'
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
import { parseUpdate, parseWeb } from './parser.js'
import { pollCameraStatus, initCameraStatus } from './polling.js'

// ########################
// #### Instance setup ####
// ########################
class PanasonicPTZInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async unsubscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=stop&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', 'TCP unsubscription request: ' + url)
		}

		try {
			await got.get(url, { timeout: { request: 1000 } } )

			this.log('info', 'un-subscribed: ' + url)
		} catch (err) {
			this.log('error', 'Error on TCP unsubscribe: ' + String(err))
		}
	}

	async subscribeTCPEvents(port) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/event?connect=start&my_port=${port}&uid=0`

		if (this.config.debug) {
			this.log('debug', 'TCP subscription request: ' + url)
		}

		try {
			await got.get(url, { timeout: { request: 1000 } } )

			this.log('info', 'subscribed: ' + url)

			//this.updateStatus(InstanceStatus.Ok)
		} catch (err) {
			this.log('error', 'Error on subscribe: ' + String(err))
			
			//this.updateStatus(InstanceStatus.UnknownWarning, 'TCP subscription failed')
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
					//this.updateStatus(InstanceStatus.Disconnected)
				})

				// common error handler
				socket.on('error', () => {
					this.clients.splice(this.clients.indexOf(socket), 1)
					this.log('error', 'Update notification channel errored/died: ' + socket.name)
					//this.updateStatus(InstanceStatus.Disconnected)
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

					parseUpdate(this, str.split(':'))

					// Update Variables and Feedbacks
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

	getCameraInfo() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/getinfo?FILE=1`

			if (this.config.debug) {
				this.log('info', 'getinfo Request: ' + url)
			}

			got.get(url, { timeout: { request: 1000 } } )
			.then((response) => {
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

					this.updateStatus(InstanceStatus.Ok)
				}
			})
			.catch((err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('error', 'Error checking basic communication and receiving model: ' + String(err))
			})
		}
	}

	getCameraTitle() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/get_basic`

			if (this.config.debug) {
				this.log('info', 'get_basic Request: ' + url)
			}

			got.get(url, { timeout: { request: 1000 } } )
			.then((response) => {
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
			})
			.catch((err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure)
				this.log('error', 'Error checking basic communication and receiving title: ' + String(err))
			})
		}
	}

	getCameraStatus() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/live/camdata.html`

			if (this.config.debug) {
				this.log('info', 'camdata Request: ' + url)
			}

			got.get(url, { timeout: { request: 1000 } } )
			.then((response) => {
				if (response.body) {
					const lines = response.body.trim().split('\r\n')

					for (let line of lines) {
						const str = line.trim()

						if (this.config.debug) {
							this.log('info', 'Received Initial Status: ' + str)
						}

						parseUpdate(this, str.split(':'))
					}

					this.checkVariables()
					this.checkFeedbacks()

					this.updateStatus(InstanceStatus.Ok)
				}
			})
			.catch((err) => {
				this.log('error', 'Error requesting inital status from PTZ: ' + String(err))
			})
		}
	}

	async getPTZ(cmd) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/aw_ptz?cmd=%23${cmd}&res=1`
		if (this.config.debug) {
			this.log('info', 'PTZ Request: ' + url)
		}

		try {
			const response = await got.get(url)
			if (response.body) {
				const str = response.body.trim()

				if (this.config.debug) {
					this.log('info', 'Received PTZ query response: ' + str)
				}

				parseUpdate(this, str.split(':'))

				this.checkVariables()
				this.checkFeedbacks()
			}
		} catch (err) {
			this.log('error', 'Error requesting status from PTZ: ' + String(err))
		}
	}
	
	async getCam(cmd) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/aw_cam?cmd=${cmd}&res=1`

		if (this.config.debug) {
			this.log('info', 'Cam Request: ' + url)
		}

		try {
			const response = await got.get(url)
			if (response.body) {
				const str = response.body.trim()

				if (this.config.debug) {
					this.log('info', 'Received Cam query response: ' + str)
				}

				parseUpdate(this, str.split(':'))

				this.checkVariables()
				this.checkFeedbacks()
			}
		} catch (err) {
			this.log('error', 'Error requesting status from Cam: ' + String(err))
		}
	}
	
	// Currently only for web commands that don't require admin rights
	async getWeb(cmd) {
		const url = `http://${this.config.host}:${this.config.httpPort}/cgi-bin/${cmd}`

		if (this.config.debug) {
			this.log('info', 'Web Request: ' + url)
		}

		try {
			const response = await got.get(url)
			if (response.body) {
				const lines = response.body.trim().split('\r\n')

				for (let line of lines) {
					const str = line.trim()

					if (this.config.debug) {
						this.log('info', 'Received Web Command Response [' + cmd + ']: ' + str)
					}

					parseWeb(this, str.split('='), cmd)
				}

				this.checkVariables()
				this.checkFeedbacks()
			}
		} catch (err) {
			this.log('error', 'Error requesting status from Web [' + cmd + ']: ' + String(err))
		}
	}

	// When module gets deleted
	async destroy() {
		this.polling = false
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
			modelINFO: '',
			modelTCP: '',

			model: 'Auto',
			series: null,

			mac: null,
			serial: null,
			title: null,
			version: null,

			// booleans
			recording: null,

			// unresolved enums
			autotracking: null,
			autotrackingAngle: null,
			colorbar: null,
			colorTemperature: null,
			filter: null,
			focusMode: null,
			gain: null,
			installMode: null,
			iris: null,
			irisMode: null,
			ois: null,
			power: null,
			presetScope: null,
			presetSpeed: null,
			presetSpeedTable: null,
			presetSpeedUnit: '0',
			rtmp: null,
			sdInserted: null,
			sd2Inserted: null,
			shutter: null,
			srt: null,
			ts: null,
			tally: null,
			tally2: null,
			tally3: null,
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
			//greenPedValue: 0,
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

		this.config.host.length > 0 ? this.reInitAll() : this.updateStatus(InstanceStatus.BadConfig)

		this.speedChangeEmitter = new EventEmitter()
	}

	// Update module after a config change
	async configUpdated(config) {
		this.config = config
		this.reInitAll()
	}

	initCameraConnection() {
		this.updateStatus(InstanceStatus.Connecting, this.config.host + ':' + this.config.httpPort)
		this.getCameraInfo()
	}

	// Requests inital status and setup status push or pull
	initCameraStatus() {
		this.getCameraTitle() // pull camera title
		initCameraStatus(this) // initial pull all (if available on model)
		if (this.SERIES.capabilities.subscription) {
			//this.getCameraStatus() // initial bulk get all (if available on model)
			this.init_tcp() // setup tcp push updates (if available on model)
			this.getPTZ('LPC1') // enable Lens Position	Information updates
		}
		if (this.SERIES.capabilities.poll) {
			this.polling = true
			pollCameraStatus(this) // enable explicit pulls (if defined on model)
		} else {
			this.polling = false
		}
	}

	// needed on initial module init using initial config data, after config change and automatic model change
	// requires knowledge of model!
	reInitAll() {
		this.SERIES = getAndUpdateSeries(this)

		this.initCameraConnection()
		this.initCameraStatus()

		this.init_actions()
		this.init_presets()
		this.init_variables()
		//this.checkVariables()
		this.init_feedbacks()
		//this.checkFeedbacks()
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

	// Update Values
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
