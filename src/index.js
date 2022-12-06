import { runEntrypoint, InstanceBase, InstanceStatus } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getPresetDefinitions } from './presets.js'
import { setVariables, checkVariables } from './variables.js'
import { ConfigFields } from './config.js'
import * as net from 'net'
import got from 'got'

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
			this.log('error', 'Error from PTZ: ' + String(err))
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
			this.log('error', 'Error from PTZ: ' + String(err))

			this.updateStatus(InstanceStatus.Disconnected)
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

		this.updateStatus(InstanceStatus.Connecting)

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
					// TODO - TCP doesn't guarantee messages will be chunked sensibly. When it doesnt, this logic will breaks
					let str_raw = data.toString()
					str_raw = str_raw.split('\r\n') // Split Data in order to remove data before and after command
					let str = str_raw[1].trim() // remove new line, carage return and so on.
					if (this.config.debug) {
						this.log('info', 'Recived CMD: ' + String(str))
					}
					str = str.split(':') // Split Commands and data

					// Store Data
					this.storeData(str)

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
	getCameraInformation() {
		if (this.config.host) {
			const url = `http://${this.config.host}:${this.config.httpPort}/live/camdata.html`

			got
				.get(url)
				.then((response) => {
					if (response.body) {
						const lines = response.body.split('\r\n') // Split Data in order to remove data before and after command

						for (let line of lines) {
							// remove new line, carage return and so on.
							const str = line.trim().split(':') // Split Commands and data
							if (this.config.debug) {
								this.log('info', 'Recived CMD: ' + String(str))
							}
							// Store Data
							this.storeData(str)
						}

						this.checkVariables()
						this.checkFeedbacks()
					}
				})
				.catch((err) => {
					this.log('error', 'Error from PTZ: ' + String(err))
				})
		}
	}
	storeData(str) {
		if (str[0].substring(0, 3) === 'rER') {
			if (str[0] === 'rER00') {
				this.data.error = 'No Errors'
			} else {
				this.data.error = str[0]
			}
		}

		// Store Firmware Version (not supported for the AK-UB300.)
		if (str[0].substring(0, 4) === 'qSV3') {
			this.data.version = str[0].substring(4)
		}

		// Store Values from Events
		switch (str[0]) {
			case 'OID':
				this.data.modelTCP = str[1]
				// if a new model is detected or seected, re-initialise all actions, variable and feedbacks
				if (this.data.modelTCP !== this.data.model) {
					this.init_actions() // export actions
					this.init_presets()
					this.init_variables()
					this.checkVariables()
					this.init_feedbacks()
					this.checkFeedbacks()
				}
				break
			case 'TITLE':
				this.data.name = str[1]
				break
			case 'p1':
				this.data.power = 'ON'
				break
			case 'p0':
				this.data.power = 'OFF'
				break
			case 'TLR': // works on UE-XXX series for tally
				if (str[1] == '0') {
					this.data.tally = 'OFF'
				} else if (str[1] == '1') {
					this.data.tally = 'ON'
				}
				break
			case 'dA0':
				this.data.tally = 'OFF'
				break
			case 'dA1':
				this.data.tally = 'ON'
				break

			case 'iNS0':
				this.data.ins = 'Desktop'
				break
			case 'iNS1':
				this.data.ins = 'Hanging'
				break
			case 'OAF':
				if (str[1] == '0') {
					this.data.oaf = 'Manual'
				} else if (str[1] == '1') {
					this.data.oaf = 'Auto'
				}
				break
			case 'd30':
				this.data.irisMode = 'Manual'
				break
			case 'd31':
				this.data.irisMode = 'Auto'
				break
			case 'OSE': // All OSE:xx Commands
				if (str[1] == '71') {
					// OSE:71:
					if (str[2] == '0') {
						this.data.recallModePset = 'Mode A'
					} else if (str[2] == '1') {
						this.data.recallModePset = 'Mode B'
					} else if (str[2] == '2') {
						this.data.recallModePset = 'Mode C'
					}
				}
				break
			case 'OGU':
				this.data.gainValue = str[1].toString().replace('0x', '')
				break
			default:
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
			modelTCP: 'NaN',
			model: 'Auto',
			series: 'Auto',
			name: 'NaN',
			version: 'NaN',
			error: 'NaN',
			power: 'NaN',
			ins: 'NaN',
			tally: 'NaN',
			oaf: 'NaN',
			irisMode: 'NaN',
			recallModePset: 'NaN',
		}

		this.ptSpeed = 25
		this.ptSpeedIndex = 25
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
		this.shutVal = 0
		this.shutIndex = 0
		this.pedestalVal = '096'
		this.pedestalIndex = 150
		this.tcpPortSelected = 31004
		this.tcpPortOld = this.config.tcpPort || 31004

		this.config.host = this.config.host || ''
		this.config.httpPort = this.config.httpPort || 80
		this.config.tcpPort = this.config.tcpPort || 31004
		this.config.autoTCP = this.config.autoTCP || true
		this.config.model = this.config.model || 'Auto'
		this.config.debug = this.config.debug || false

		this.updateStatus(InstanceStatus.Connecting)
		this.getCameraInformation()
		this.init_tcp()
		this.init_actions() // export actions
		this.init_presets()
		this.init_variables()
		this.checkVariables()
		this.init_feedbacks()
		this.checkFeedbacks()
	}
	// Update module after a config change
	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.getCameraInformation()
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
