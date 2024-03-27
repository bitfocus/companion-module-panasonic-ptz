export async function pollCameraStatus(self) {
	if (self.SERIES.capabilities.poll.ptz) {
		for (let cmd of self.SERIES.capabilities.poll.ptz) {
			if (self.poll) await self.getPTZ(cmd)
			else return
			if (self.poll) await sleep(self.config.pollDelay)
			else return
		}
	}
	if (self.SERIES.capabilities.poll.cam) {
		for (let cmd of self.SERIES.capabilities.poll.cam) {
			if (self.poll) await self.getCam(cmd)
			else return
			if (self.poll) await sleep(self.config.pollDelay)
			else return
		}
	}
	if (self.SERIES.capabilities.poll.web) {
		for (let cmd of self.SERIES.capabilities.poll.web) {
			if (self.poll) await self.getWeb(cmd)
			else return
			if (self.poll) await sleep(self.config.pollDelay)
			else return
		}
	}
	pollCameraStatus(self)
}

export async function pullCameraStatus(self) {
	const pullall = {
		ptz: [
			'O', // Power
			'PE00', // Preset Entry 0
			'PE01', // Preset Entry 1
			'PE02', // Preset Entry 2
			'AXF', // Focus Position Control
			'AXI', // Iris Position Control
			'AXZ', // Zoom Position Control
			'GF', // Request Focus Position
			'GI', // Request Iris Position (+Mode)
			'GZ', // Request Zoom Position
			//'I', // Iris Position (1-99)
			//'D1', // Focus Mode
			//'D3', // Iris Mode
			'DA', // Tally
			'INS', // Installation Position
			//'LPC', // Lens Position Information Control
			'LPI', // Lens Position
			'PST', // Preset Speed Table
			'PTD', // Get Pan/Tilt/Zoom/Focus/Iris
			'PTG', // Get Gain/ColorTemp/Shutter/ND
			'PTV', // Get Pan/Tilt/Zoom/Focus/Iris
			'RER', // Latest Error Information
			'S', // Request Latest Recall Preset No.
			//'TAA', // Tally Infomation
			'UPVS', // Preset Speed
		],
		cam: [
			'QAF', // Focus Mode
			'QAW', // White Balance Mode
			'QBR', // Color Bar
			'QBI', // B Gain
			'QBP', // B Pedestal
			'QGB', // B Gain
			'QBD', // B Pedestal
			'QFT', // ND Filter
			'QGS', // Gain Select (UB300 only)
			'QGU', // Gain
			'QID', // Model Number
			'QIF', // Request Iris F No.
			'QIS', // OIS
			'QRI', // R Gain
			'QRP', // R Pedestal
			'QGR', // R Gain
			'QRD', // R Pedestal
			'QRS', // Iris Mode
			//'QRV', // Iris Control (0x0-0x3FF)
			'QSH', // Shutter
			'QSV', // Software Version
			'QTD', // T Pedestal
			'QTP', // T Pedestal
			'QLR', // R-Tally Control
			'QLG', // G-Tally Control
			'QLY', // Y-Tally Control
			'QSD:4F', // Iris Follow
			'QSD:B1', // Color Temperature (enumerated)
			'QSE:71', // Preset Scope
			'QSG:39', // R Gain
			'QSG:3A', // B Gain
			'QSG:4A', // Master Pedestal (UB300 only)
			'QSG:4C', // R Pedestal (UB300 only)
			'QSG:4D', // G Pedestal (UE160 only)
			'QSG:4E', // B Pedestal (UB300 only)
			'QSG:59', // Shutter SW
			'QSG:5A', // Shutter Mode
			'QSG:5D', // Shutter Speed (UB300 only)
			'QSI:18', // Request Zoom/Focus/Iris Position
			'QSI:19:0', // Software Version, System Version (UB300 only)
			'QSI:20', // Color Temperature
			'QSJ:03', // Shutter Mode
			'QSJ:06', // Shutter Step Value
			'QSJ:09', // Shutter Synchro Value
			'QSJ:0F', // Master Pedestal
			'QSJ:10', // G Pedestal
			'QSJ:29', // Preset Speed Unit
			'QSJ:5C', // Camera Title
			'QSJ:D2', // ND Filter Status
			'QSL:2A', // ATW
			'QSL:2B', // White Balance Mode
			'QSL:8B', // O.I.S.
			'QSL:8C', // O.I.S. Mode
			'QSL:99', // System Version
			'QSL:B6', // Auto Tracking Mode
			'QSL:B7', // Angle
			'QSL:BB', // Tracking Status
			'QSL:BC', // Tracking Start/Stop
		],
		web: ['get_state', 'get_rtmp_status', 'get_srt_status', 'get_ts_status'],
	}

	var pull = pullall
	//var pull = self.SERIES.pull

	if (pull) {
		if (pull.ptz) {
			for (let cmd of pull.ptz) {
				await self.getPTZ(cmd)
			}
		}
		if (pull.cam) {
			for (let cmd of pull.cam) {
				await self.getCam(cmd)
			}
		}
		if (pull.web) {
			for (let cmd of pull.web) {
				await self.getWeb(cmd)
			}
		}
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
