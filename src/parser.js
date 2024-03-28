export function parseUpdate(self, str) {
	if (str[0].substring(0, 3) === 'rER') {
		self.data.error = str[0].substring(3)
	}

	if (str[0].substring(0, 1) === 'g') {
		switch (str[0].substring(1, 2)) {
			// ToDo: handle "---" on power off
			case 'z':
				self.data.zoomPosition = parseInt(str[0].substring(2, 5), 16) - 0x555
				break
			case 'f':
				self.data.focusPosition = parseInt(str[0].substring(2, 5), 16) - 0x555
				break
			case 'i':
				self.data.irisPosition = parseInt(str[0].substring(2, 5), 16) - 0x555
				self.data.irisMode = str[0].substring(5, 6)
				break
		}
	}
	if (str[0].substring(0, 3) === 'aPC') {
		self.data.panPosition = parseInt(str[0].substring(3, 7), 16) - 0x8000
		self.data.tiltPosition = parseInt(str[0].substring(7, 11), 16) - 0x8000
	}
	if (str[0].substring(0, 2) === 'ax') {
		switch (str[0].substring(2, 3)) {
			case 'z':
				self.data.zoomPosition = parseInt(str[0].substring(3), 16) - 0x555
				break
			case 'f':
				self.data.focusPosition = parseInt(str[0].substring(3), 16) - 0x555
				break
			case 'i':
				self.data.irisPosition = parseInt(str[0].substring(3), 16) - 0x555
				break
		}
	}
	if (str[0].substring(0, 3) === 'lPI') {
		self.data.zoomPosition = parseInt(str[0].substring(3, 6), 16) - 0x555
		self.data.focusPosition = parseInt(str[0].substring(6, 9), 16) - 0x555
		self.data.irisPosition = parseInt(str[0].substring(9, 12), 16) - 0x555
	}

	//if (str[0].substring(0, 2) === 'iC') {
	//    self.data.iris2 = str[0].substring(2)
	//}

	if (str[0].substring(0, 1) === 'q') {
		const q = str[0].match(/q(\d\d)/)
		if (q) {
			const i = parseInt(q[1])
			self.data.presetCompletedIdx = self.data.presetEntries[i] === '1' ? i : null
		}
	}

	if (str[0].substring(0, 1) === 's') {
		const s = str[0].match(/s(\d\d)/)
		if (s) {
			const i = parseInt(s[1])
			self.data.presetSelectedIdx = self.data.presetEntries[i] === '1' ? i : null
		}
	}

	if (str[0].substring(0, 2) === 'pE') {
		switch (str[0].substring(2, 4)) {
			case '00':
				self.data.presetEntries0 = parseInt(str[0].substring(4), 16).toString(2).padStart(40, 0).split('').reverse()
				self.data.presetEntries0.forEach((p, i) => (p === '1' ? self.getThumbnail(i) : (self.data.presetThumbnails[i] = undefined)))
				break
			case '01':
				self.data.presetEntries1 = parseInt(str[0].substring(4), 16).toString(2).padStart(40, 0).split('').reverse()
				self.data.presetEntries1.forEach((p, i) => (p === '1' ? self.getThumbnail(i + 40) : (self.data.presetThumbnails[i + 40] = undefined)))
				break
			case '02':
				self.data.presetEntries2 = parseInt(str[0].substring(4), 16).toString(2).padStart(20, 0).split('').reverse()
				self.data.presetEntries2.forEach((p, i) => (p === '1' ? self.getThumbnail(i + 80) : (self.data.presetThumbnails[i + 80] = undefined)))
				break
		}

		self.data.presetEntries = self.data.presetEntries0.concat(self.data.presetEntries1.concat(self.data.presetEntries2))

		if (self.data.presetSelectedIdx) {
			if (self.data.presetEntries[self.data.presetSelectedIdx] === '0') {
				self.data.presetSelectedIdx = null
			}
		}
		if (self.data.presetCompletedIdx) {
			if (self.data.presetEntries[self.data.presetCompletedIdx] === '0') {
				self.data.presetCompletedIdx = null
			}
		}
	}

	if (str[0].substring(0, 3) === 'pST') {
		self.data.presetSpeedTable = str[0].substring(3)
	}

	if (str[0].substring(0, 4) === 'uPVS') {
		self.data.presetSpeed = str[0].substring(4)
	}

	switch (str[0]) {
		case 'dA0':
			self.data.tally = '0'
			break
		case 'dA1':
			self.data.tally = '1'
			break
		case 'p0':
			self.data.power = '0'
			break
		case 'p1':
			self.data.power = '1'
			break
		case 'iNS0':
			self.data.installMode = '0'
			break
		case 'iNS1':
			self.data.installMode = '1'
			break
		case 'd10':
			self.data.focusMode = '0'
			break
		case 'd11':
			self.data.focusMode = '1'
			break
		case 'd30':
			self.data.irisMode = '0'
			break
		case 'd31':
			self.data.irisMode = '1'
			break
		case 'DCB':
		case 'OBR':
			self.data.colorbar = str[1]
			break
		case 'OID':
			self.data.modelAuto = str[1]
			// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
			if (self.data.modelAuto !== self.data.model) {
				self.log('info', 'Detected Camera Model: ' + self.data.modelAuto)
				//self.reInitAll()
			}
			break
		case 'OLR':
		case 'TLR':
			self.data.tally = str[1]
			break
		case 'OLG':
		case 'TLG':
			self.data.tally2 = str[1]
			break
		case 'OLY':
		case 'TLY':
			self.data.tally3 = str[1]
			break
		case 'OAF':
			self.data.focusMode = str[1]
			break
		case 'OAW':
			self.data.whiteBalance = str[1]
			break
		case 'OIF':
			self.data.irisLabel = str[1] === 'FF' ? 'CLOSE' : 'F/' + (parseInt(str[1], 16) / 10).toFixed(1)
			break
		case 'OIS':
			self.data.ois = str[1]
			break
		case 'OSD':
			switch (str[1]) {
				case 'B1':
					self.data.colorTemperature = str[2].replace('0x', '')
					break
				case '4F':
					self.data.irisFollowPosition = parseInt(str[2], 16)
					break
			}
			break
		case 'OSI':
			switch (str[1]) {
				case '18':
					self.data.zoomPosition = parseInt(str[2], 16) - 0x555
					self.data.focusPosition = parseInt(str[3], 16) - 0x555
					self.data.irisPosition = parseInt(str[4], 16) - 0x555
					break
				case '20':
					self.data.colorTempLabel = parseInt(str[2].substring(0, 5), 16).toString() + 'K'
					break // VAR
				// case 'D2': self.data.filter = str[2]; break // UB300's additional "Intelligent ND Filter"
			}
			break
		case 'OSH':
			self.data.shutter = str[1].replace('0x', '')
			break
		case 'OSV':
			self.data.version = str[1]
			break
		case 'OFT':
			self.data.filter = str[1]
			break
		case 'OSE':
			if (str[1] === '71') {
				self.data.presetScope = str[2]
			}
			break
		case 'OSG':
			switch (str[1]) {
				case '39':
					self.data.redGainValue = parseInt(str[2], 16) - 0x800
					break
				case '3A':
					self.data.blueGainValue = parseInt(str[2], 16) - 0x800
					break
				case '4A':
					self.data.masterPedValue = parseInt(str[2], 16) - 0x80
					break
				case '4C':
					self.data.redPedValue = parseInt(str[2], 16) - 0x800
					break
				//case '4D': self.data.greenPedValue = parseInt(str[2], 16) - 0x800; break
				case '4E':
					self.data.bluePedValue = parseInt(str[2], 16) - 0x800
					break
				//case '5D': self.data.shutterStepLabel = str[2].replace('0x', ''); break // UB300 special case
			}
			break
		case 'OSJ':
			switch (str[1]) {
				case '03':
					self.data.shutter = str[2].replace('0x', '')
					break
				case '06':
					self.data.shutterStepLabel = '1/' + parseInt(str[2], 16).toString()
					break
				case '0F':
					self.data.masterPedValue = parseInt(str[2], 16) - 0x800
					break
				//case '10': self.data.greenPedValue = parseInt(str[2], 16) - 0x96; break
				case '29':
					self.data.presetSpeedUnit = str[2]
					break
				//case '3C': break; // Preset Name / Preset Thumbnail Counter
				case '4A':
					self.data.colorTempLabel = parseInt(str[2], 16).toString() + 'K'
					break // AWB A/B
				//case '4B': self.data.redGainValue = parseInt(str[2], 16) - 0x800; break // AWB A/B
				//case '4C': self.data.blueGainValue = parseInt(str[2], 16) - 0x800; break // AWB A/B
				case 'D2':
					self.data.filter = str[2]
					break
			}
			break
		case 'OSL':
			switch (str[1]) {
				case 'B6':
					self.data.autotracking = str[2]
					break // Auto Tracking Mode
				case 'B7':
					self.data.autotrackingAngle = str[2]
					break // Angle
				case 'BB':
					switch (str[2]) {
						case '0':
							self.data.autotrackingStatusLabel = 'Not Tracking'
							break
						case '1':
							self.data.autotrackingStatusLabel = 'Tracking'
							break
						case '2':
							self.data.autotrackingStatusLabel = 'Lost'
							break
					}
					break
				case 'BC':
					self.data.tracking = str[2]
					break // Tracking Start/Stop
			}
			break
		case 'OGS':
		case 'OGU':
			self.data.gain = str[1].replace('0x', '').padStart(2, '0')
			break
		case 'ORS':
			self.data.irisMode = str[1]
			break
		case 'OTD':
			self.data.masterPedValue = parseInt(str[1], 16) - 0x1e
			break
		case 'OTP':
			self.data.masterPedValue = parseInt(str[1], 16) - 0x96
			break
		case 'ORG':
			self.data.redGainValue = parseInt(str[1], 16) - 0x1e
			break
		case 'OBG':
			self.data.blueGainValue = parseInt(str[1], 16) - 0x1e
			break
		case 'ORI':
			self.data.redGainValue = parseInt(str[1], 16) - 0x96
			break
		case 'OBI':
			self.data.blueGainValue = parseInt(str[1], 16) - 0x96
			break
		case 'ORP':
			self.data.redPedValue = parseInt(str[1], 16) - 0x96
			break
		case 'OBP':
			self.data.bluePedValue = parseInt(str[1], 16) - 0x96
			break
		case 'TITLE':
			self.data.title = str[1]
			break
	}
}

export function parseWeb(self, str, cmd) {
	switch (cmd) {
		case 'get_basic':
			if (str[0] === 'cam_title') self.data.title = str[1]
			break
		case 'get_rtmp_status':
			if (str[0] === 'status') self.data.rtmp = str[1]
			break
		case 'get_srt_status':
			if (str[0] === 'status') self.data.srt = str[1]
			break
		case 'get_ts_status':
			if (str[0] === 'status') self.data.ts = str[1]
			break
		case 'get_state':
			switch (str[0]) {
				case 'rec':
					self.data.recording = str[1] === 'on'
					break
				//case 'rec_counter': self.data.recordingTime = str[1]; break
				case 'sd_insert':
					self.data.sdInserted = str[1] === 'on'
					break
				case 'sd2_insert':
					self.data.sd2Inserted = str[1] === 'on'
					break
			}
			break
		case 'getinfo?FILE=1':
			switch (str[0]) {
				case 'MAC':
					self.data.mac = str[1]
					break
				case 'SERIAL':
					self.data.serial = str[1]
					break
				case 'VERSION':
					self.data.version = str[1]
					break
				case 'NAME':
					self.data.modelAuto = str[1]
					// if a new model is detected or selected, re-initialise all actions, variables and feedbacks
					if (self.data.modelAuto !== self.data.model) {
						self.log('info', 'Detected Camera Model: ' + self.data.modelAuto)
						//self.reInitAll()
					}
					break
			}
			break
	}
}
