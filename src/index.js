import { runEntrypoint, InstanceBase } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getPresetDefinitions } from './presets.js'
import { setVariables, checkVariables } from './variables.js'
import { ConfigFields } from './config.js'

var net = require('net')

// ########################
// #### Instance setup ####
// ########################
class PanasonicPTZInstance extends InstanceBase {
	init_tcp() {
		var self = this
		self.clients = []
		var tcpPortSelected = self.tcpPortSelected || 31004
		var tcpPortOld = self.tcpPortOld || 31004

		// Remove old TCP Server and close all connections
		if (self.server !== undefined) {
			// Stop getting Status Updates
			self.system.emit(
				'rest_get',
				'http://' +
					self.config.host +
					':' +
					self.config.httpPort +
					'/cgi-bin/event?connect=stop&my_port=' +
					tcpPortOld +
					'&uid=0',
				function (err, result) {
					if (err) {
						self.debug('Error from PTZ: ' + String(err))
						self.log('error', 'Error from PTZ: ' + String(err))
						return
					}
					if (('data', result.response.req)) {
						self.debug(
							'un-subscribed: ' +
								'http://' +
								self.config.host +
								':' +
								self.config.httpPort +
								'/cgi-bin/event?connect=stop&my_port=' +
								tcpPortOld +
								'&uid=0'
						)
						if (self.config.debug === true) {
							self.log(
								'warn',
								'un-subscribed: ' +
									'http://' +
									self.config.host +
									':' +
									self.config.httpPort +
									'/cgi-bin/event?connect=stop&my_port=' +
									tcpPortOld +
									'&uid=0'
							)
						}
						self.status(self.STATUS_OK)
					}
				}
			)

			// Close and delete server
			self.server.close()
			delete self.server
		}

		self.status(self.STATE_WARNING, 'Connecting')

		if (self.config.host) {
			// Create a new TCP server.
			self.server = net.createServer(function (socket) {
				// When the client requests to end the TCP connection with the server, the server ends the connection.
				socket.on('end', function () {
					self.clients.splice(self.clients.indexOf(socket), 1)
				})

				// common error handler
				socket.on('error', function () {
					self.clients.splice(self.clients.indexOf(socket), 1)
					self.debug('PTZ errored/died: ' + socket.name)
					if (self.config.debug == true) {
						self.log('error', 'PTZ errored/died: ' + socket.name)
					}
				})

				socket.name = socket.remoteAddress + ':' + socket.remotePort
				tcpPortOld = socket.address().port
				self.tcpPortOld = tcpPortOld
				self.clients.push(socket)

				// Receive data from the client.
				socket.on('data', function (data) {
					let str_raw = String(data)
					str_raw = str_raw.split('\r\n') // Split Data in order to remove data before and after command
					let str = str_raw[1].trim() // remove new line, carage return and so on.
					self.debug('TCP Recived from PTZ: ' + str) // Debug Recived data
					if (self.config.debug == true) {
						self.log('info', 'Recived CMD: ' + String(str))
					}
					str = str.split(':') // Split Commands and data

					// Store Data
					self.storeData(str)

					// Update Varibles and Feedbacks
					self.checkVariables()
					self.checkFeedbacks()
				})
			})

			// common error handler
			self.server.on('error', function (err) {
				// Catch uncaught Exception"EADDRINUSE" error that orcures if the port is already in use
				if (err.code === 'EADDRINUSE') {
					self.debug('TCP error: ' + err)
					// self.log('error', "TCP error: " + String(err));
					self.log('error', 'TCP error: Please use another TCP port, ' + tcpPortSelected + ' is already in use')
					self.log('error', 'TCP error: The TCP port must be unique between instances')
					self.log('error', 'TCP error: Please change it and click apply in ALL PTZ instances')
					self.status(self.STATUS_ERROR)

					// Cancel the subscription of info from the PTZ
					self.system.emit(
						'rest_get',
						'http://' +
							self.config.host +
							':' +
							self.config.httpPort +
							'/cgi-bin/event?connect=stop&my_port=' +
							tcpPortSelected +
							'&uid=0',
						function (err, result) {
							if (err) {
								self.log('error', 'Error from PTZ: ' + err)
								return
							}
							if (('data', result.response.req)) {
								if (self.config.debug === true) {
									self.log(
										'warn',
										'un-subscribed: ' +
											'http://' +
											self.config.host +
											':' +
											self.config.httpPort +
											'/cgi-bin/event?connect=stop&my_port=' +
											tcpPortOld +
											'&uid=0'
									)
								}
								self.status(self.STATUS_OK)
							}
						}
					)
				} else {
					self.debug('TCP error: ' + err)
					if (self.config.debug == true) {
						self.log('error', 'TCP error: ' + String(err))
					}
				}
			})

			// Listens for a client to make a connection request.
			try {
				self.debug('Trying to listen to TCP from PTZ')

				if (self.config.autoTCP == true) {
					self.server.listen(0)
				} else {
					self.server.listen(self.config.tcpPort)
				}
				tcpPortSelected = self.server.address().port
				self.tcpPortSelected = tcpPortSelected

				self.debug('Server listening for PTZ updates on localhost:' + tcpPortSelected)
				if (self.config.debug == true) {
					self.log('warn', 'Listening for PTZ updates on localhost:' + tcpPortSelected)
				}

				// Subscibe to updates from PTZ
				self.system.emit(
					'rest_get',
					'http://' +
						self.config.host +
						':' +
						self.config.httpPort +
						'/cgi-bin/event?connect=start&my_port=' +
						tcpPortSelected +
						'&uid=0',
					function (err, result) {
						self.debug(
							'subscribed: ' +
								'http://' +
								self.config.host +
								':' +
								self.config.httpPort +
								'/cgi-bin/event?connect=start&my_port=' +
								tcpPortSelected +
								'&uid=0'
						)
						if (self.config.debug == true) {
							self.log(
								'warn',
								'subscribed: ' +
									'http://' +
									self.config.host +
									':' +
									self.config.httpPort +
									'/cgi-bin/event?connect=start&my_port=' +
									tcpPortSelected +
									'&uid=0'
							)
						}
						if (err) {
							self.log('error', 'Error from PTZ: ' + String(err))
							return
						}
						if (('data', result.response.req)) {
							self.status(self.STATUS_OK)
						}
					}
				)
			} catch (err) {
				self.debug("Couldn't bind to TCP port " + tcpPortSelected + ' on localhost: ' + String(err))
				if (self.config.debug == true) {
					self.log('error', "Couldn't bind to TCP port " + tcpPortSelected + ' on localhost: ' + String(err))
				}
				self.status(self.STATUS_ERROR)
			}

			// Catch uncaught Exception errors that orcure
			// process.on('uncaughtException', function (err) {
			// 	debug(err)
			// 	console.log(err)
			// 	// process.exit(1)
			// })
		}

		return self
	}
	getCameraInformation() {
		var self = this

		if (self.config.host) {
			self.system.emit(
				'rest_get',
				'http://' + self.config.host + ':' + self.config.httpPort + '/live/camdata.html',
				function (err, result) {
					// If there was an Error
					if (err) {
						self.log('error', 'Error from PTZ: ' + String(err))
						return
					}

					// If We get a responce, store the values
					if (('data', result.response.req)) {
						var str_raw = String(result.data)
						var str = {}

						str_raw = str_raw.split('\r\n') // Split Data in order to remove data before and after command

						for (var i in str_raw) {
							str = str_raw[i].trim() // remove new line, carage return and so on.
							str = str.split(':') // Split Commands and data
							self.debug('HTTP Recived from PTZ: ' + str_raw[i]) // Debug Recived data
							if (self.config.debug == true) {
								self.log('info', 'Recived CMD: ' + String(str_raw[i]))
							}
							// Store Data
							self.storeData(str)
						}

						self.checkVariables()
						self.checkFeedbacks()
					}
				}
			)
		}
	}
	storeData(str) {
		var self = this

		if (str[0].substring(0, 3) === 'rER') {
			if (str[0] === 'rER00') {
				self.data.error = 'No Errors'
			} else {
				self.data.error = str[0]
			}
		}

		// Store Firmware Version (not supported for the AK-UB300.)
		if (str[0].substring(0, 4) === 'qSV3') {
			self.data.version = str[0].substring(4)
		}

		// Store Values from Events
		switch (str[0]) {
			case 'OID':
				self.data.modelTCP = str[1]
				// if a new model is detected or seected, re-initialise all actions, variable and feedbacks
				if (self.data.modelTCP !== self.data.model) {
					self.init_actions() // export actions
					self.init_presets()
					self.init_variables()
					self.checkVariables()
					self.init_feedbacks()
					self.checkFeedbacks()
				}
				break
			case 'TITLE':
				self.data.name = str[1]
				break
			case 'p1':
				self.data.power = 'ON'
				break
			case 'p0':
				self.data.power = 'OFF'
				break
			case 'TLR': // works on UE-XXX series for tally
				if (str[1] == '0') {
					self.data.tally = 'OFF'
				} else if (str[1] == '1') {
					self.data.tally = 'ON'
				}
				break
			case 'dA0':
				self.data.tally = 'OFF'
				break
			case 'dA1':
				self.data.tally = 'ON'
				break

			case 'iNS0':
				self.data.ins = 'Desktop'
				break
			case 'iNS1':
				self.data.ins = 'Hanging'
				break
			case 'OAF':
				if (str[1] == '0') {
					self.data.oaf = 'Manual'
				} else if (str[1] == '1') {
					self.data.oaf = 'Auto'
				}
				break
			case 'd30':
				self.data.irisMode = 'Manual'
				break
			case 'd31':
				self.data.irisMode = 'Auto'
				break
			case 'OSE': // All OSE:xx Commands
				if (str[1] == '71') {
					// OSE:71:
					if (str[2] == '0') {
						self.data.recallModePset = 'Mode A'
					} else if (str[2] == '1') {
						self.data.recallModePset = 'Mode B'
					} else if (str[2] == '2') {
						self.data.recallModePset = 'Mode C'
					}
				}
				break
			case 'OGU':
				self.data.gainValue = str[1].toString().replace('0x', '')
				break
			default:
				break
		}
	}
	// When module gets deleted
	destroy() {
		var self = this

		// Remove TCP Server and close all connections
		if (self.server !== undefined) {
			// Stop getting Status Updates
			self.system.emit(
				'rest_get',
				'http://' +
					self.config.host +
					':' +
					self.config.httpPort +
					'/cgi-bin/event?connect=stop&my_port=' +
					self.tcpPortSelected +
					'&uid=0',
				function (err, result) {
					if (err) {
						self.log('error', 'Error from PTZ: ' + err)
						return
					}
					if (('data', result.response.req)) {
						self.status(self.STATUS_OK)
					}
				}
			)

			// Close and delete server
			self.server.close()
			delete self.server
		}
	}
	// Initalize module
	init() {
		var self = this

		self.data = {
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

		self.ptSpeed = 25
		self.ptSpeedIndex = 25
		self.zSpeed = 25
		self.zSpeedIndex = 25
		self.fSpeed = 25
		self.fSpeedIndex = 25
		self.gainVal = '08'
		self.gainIndex = 0
		self.irisVal = 50
		self.irisIndex = 50
		self.filterVal = 0
		self.filterIndex = 0
		self.shutVal = 0
		self.shutIndex = 0
		self.pedestalVal = '096'
		self.pedestalIndex = 150
		self.tcpPortSelected = 31004
		self.tcpPortOld = this.config.tcpPort || 31004

		self.config.host = this.config.host || ''
		self.config.httpPort = this.config.httpPort || 80
		self.config.tcpPort = this.config.tcpPort || 31004
		self.config.autoTCP = this.config.autoTCP
		self.config.model = this.config.model || 'Auto'
		self.config.debug = this.config.debug || false

		self.status(self.STATUS_WARNING, 'connecting')
		self.getCameraInformation()
		self.init_tcp()
		self.init_actions() // export actions
		self.init_presets()
		self.init_variables()
		self.checkVariables()
		self.init_feedbacks()
		self.checkFeedbacks()
	}
	// Update module after a config change
	updateConfig(config) {
		var self = this
		self.config = config
		self.status(self.STATUS_UNKNOWN)
		self.getCameraInformation()
		self.init_tcp()
		self.init_actions() // export actions
		self.init_presets()
		self.init_variables()
		self.checkVariables()
		self.init_feedbacks()
		self.checkFeedbacks()
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
		this.setActions(getActionDefinitions(this))
	}
}

runEntrypoint(PanasonicPTZInstance, UpgradeScripts)
