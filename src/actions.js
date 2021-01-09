var { MODELS, SERIES_SPECS } = require('./models.js');
const c = require('./choices.js');
const { data } = require('jquery');

// ########################
// #### Value Look Ups ####
// ########################
var CHOICES_IRIS = [];
for (var i = 0; i < 100; ++i) {
	CHOICES_IRIS.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Iris ' + i });
}

var CHOICES_PRESET = [];
for (var i = 0; i < 100; ++i) {
	CHOICES_PRESET.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Preset ' + (i + 1) });
}

module.exports = {

    // ######################
    // #### Send Actions ####
    // ######################

    sendPTZ: function (i, str) {
        var self = i;

        if (str !== undefined) {
            self.system.emit('rest_get', 'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_ptz?cmd=%23' + str + '&res=1', function (err, result) {
                console.log('http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_ptz?cmd=%23' + str + '&res=1')
                    if (!err) {
                    self.log('Error from PTZ: ' + result);
                    return;
                }
                // console.log("Result from REST:" + result);
            });
        }
    },

    sendCam: function (i, str) {
        var self = i;

        if (str !== undefined) {
            self.system.emit('rest_get', 'http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_cam?cmd=' + str + '&res=1', function (err, result) {
                console.log('http://' + self.config.host + ':' + self.config.httpPort + '/cgi-bin/aw_cam?cmd=' + str + '&res=1')
                    if (!err) {
                    self.log('Error from PTZ: ' + result);
                    return;
                }
                // console.log("Result from REST:" + result);
            });
        }
    },

    // ##########################
    // #### Instance Actions ####
    // ##########################
	setActions: function (i) {
        var self = i;
        var actions = {};
		var SERIES = {};
		var cmd = '';
        var n;
		var string;

        // Set the model and series selected, if in auto, dettect what model is connected via TCP
        if (self.config.model === 'Auto') {
            self.data.model = self.data.modelTCP;
        } else { self.data.model = self.config.model;}

        if (self.data.model !== 'NaN') {
            self.data.series = MODELS.find(MODELS => MODELS.id == self.data.model).series;
        }

        // Find the specific commands for a given series 
        if (self.data.series === 'Auto' || self.data.series === 'Other' || SERIES_SPECS.find(SERIES_SPECS => SERIES_SPECS.id == self.data.series) == undefined) {
            SERIES = SERIES_SPECS.find(SERIES_SPECS => SERIES_SPECS.id == 'Other');
        } else {
            SERIES = SERIES_SPECS.find(SERIES_SPECS => SERIES_SPECS.id == self.data.series);
        }
        var s = SERIES.actions;
        // console.log(SERIES);

		// ##########################
		// #### Pan/Tilt Actions ####
		// ##########################

		if (s.panTilt == true) {actions.left = { label: 'Pan/Tilt - Pan Left',
            callback: function(action, bank) {
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + '50';
                self.sendPTZ(cmd);
            }
        };}

        if (s.panTilt == true) {actions.right = { label: 'Pan/Tilt - Pan Right',
            callback: function(action, bank) {
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + '50';
                self.sendPTZ(cmd);
            }
        };}

        if (s.panTilt == true) {actions.up = { label: 'Pan/Tilt - Tilt Up',
            callback: function(action, bank) {
                cmd = 'PTS50' + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
            }        
        };}

        if (s.panTilt == true) {actions.down = { label: 'Pan/Tilt - Tilt Down',
            callback: function(action, bank) {
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS50' + string;
                self.sendPTZ(cmd);
            }    
        };}

        if (s.panTilt == true) {actions.upLeft = { label: 'Pan/Tilt - Up Left',
            callback: function(action, bank) {
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
            }
        };}

        if (s.panTilt == true) {actions.upRight = { label: 'Pan/Tilt - Up Right',
            callback: function(action, bank) {
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
            }
        };}

        if (s.panTilt == true) {actions.downLeft = { label: 'Pan/Tilt - Down Left',
            callback: function(action, bank) {
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + string;
                self.sendPTZ(cmd);
            }
        };}
        
        if (s.panTilt == true) {actions.downRight = { label: 'Pan/Tilt - Down Right',
            callback: function(action, bank) {
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + string;
                self.sendPTZ(cmd);
            }
        };}

        if (s.panTilt == true) {actions.stop = { label: 'Pan/Tilt - Stop',
            callback: function(action, bank) {
                cmd = 'PTS5050';
                self.sendPTZ(cmd);
            }
        };}
        
        if (s.panTilt == true) {actions.home = { label: 'Pan/Tilt - Home',    
            callback: function(action, bank) {
                cmd = 'APC7FFF7FFF';
                self.sendPTZ(cmd);
            }
        };}
        
        if (s.ptSpeed == true) {actions.ptSpeedS = {
            label: 'Pan/Tilt - Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: c.CHOICES_SPEED
                }
            ],
            callback: function(action, bank) {
                self.ptSpeed = action.options.speed;
                var idx = -1;
                for (var i = 0; i < c.CHOICES_SPEED.length; ++i) {
                    if (c.CHOICES_SPEED[i].id == self.ptSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.ptSpeedIndex = idx;
                }
                self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
            }
        };}

        if (s.ptSpeed == true) {actions.ptSpeedU = { label: 'Pan/Tilt - Speed Up',
            callback: function(action, bank) {
                if (self.ptSpeedIndex == 0) {
                    self.ptSpeedIndex = 0;
                }
                else if (self.ptSpeedIndex > 0) {
                    self.ptSpeedIndex--;
                }
                self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
            }
        };}

        if (s.ptSpeed == true) {actions.ptSpeedD = { label: 'Pan/Tilt - Speed Down',
            callback: function(action, bank) {
                if (self.ptSpeedIndex == c.CHOICES_SPEED.length) {
                    self.ptSpeedIndex = c.CHOICES_SPEED.length;
                }
                else if (self.ptSpeedIndex < c.CHOICES_SPEED.length) {
                    self.ptSpeedIndex++;
                }
                self.ptSpeed = c.CHOICES_SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
            }
        };}

		// ######################
		// #### Lens Actions ####
		// ######################

        if (s.zoom == true) {actions.zoomI = { label: 'Lens - Zoom In',
            callback: function(action, bank) {
                cmd = 'Z' + parseInt(50 + self.zSpeed);
                self.sendPTZ(cmd);
            }
        };}

        if (s.zoom == true) {actions.zoomO = { label: 'Lens - Zoom Out',
            callback: function(action, bank) {
                n = parseInt(50 - self.zSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'Z' + string;
                self.sendPTZ(cmd);
            }
        };}

        if (s.zoom == true) {actions.zoomS = { label: 'Lens - Zoom Stop',
            callback: function(action, bank) {
                cmd = 'Z50';
                self.sendPTZ(cmd);
            }
        };}

        if (s.zSpeed == true) {actions.zSpeedS = {
            label: 'Lens - Zoom Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: c.CHOICES_SPEED
                }
			],
			callback: function(action, bank) {
                self.zSpeed = action.options.speed;
                var idx = -1;
                for (var i = 0; i < c.CHOICES_SPEED.length; ++i) {
                    if (c.CHOICES_SPEED[i].id == self.zSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.zSpeedIndex = idx;
                }
                self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
            }
		};}
		
		if (s.zSpeed == true) {actions.zSpeedU = { label: 'Lens - Zoom Speed Up',
			callback: function(action, bank) {
                if (self.zSpeedIndex == 0) {
                    self.zSpeedIndex = 0;
                }
                else if (self.zSpeedIndex > 0) {
                    self.zSpeedIndex--;
                }
                self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
			}
		};}
		
		if (s.zSpeed == true) {actions.zSpeedD = { label: 'Lens - Zoom Speed Down',
			callback: function(action, bank) {
                if (self.zSpeedIndex == c.CHOICES_SPEED.length) {
                    self.zSpeedIndex = c.CHOICES_SPEED.length;
                }
                else if (self.zSpeedIndex < c.CHOICES_SPEED.length) {
                    self.zSpeedIndex++;
                }
                self.zSpeed = c.CHOICES_SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
			}
		};}
		
		if (s.focus == true) {actions.focusN = { label: 'Lens - Focus Near',
			callback: function(action, bank) {
                n = parseInt(50 - self.fSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'F' + string;
                self.sendPTZ(cmd);
			}
		};}
		
		if (s.focus == true) {actions.focusF = { label: 'Lens - Focus Far',
			callback: function(action, bank) {
				cmd = 'F' + parseInt(50 + self.fSpeed);
                self.sendPTZ(cmd);
			}
		};}
		
		if (s.focus == true) {actions.focusS = { label: 'Lens - Focus Stop',
			callback: function(action, bank) {
                self.fSpeed = action.options.speed;
                var idx = -1;
                for (var i = 0; i < c.CHOICES_SPEED.length; ++i) {
                    if (c.CHOICES_SPEED[i].id == self.fSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.fSpeedIndex = idx;
                }
                self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
			}
		};}
		
		if (s.fSpeed == true) {actions.fSpeedS = {
            label: 'Lens - Focus Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: c.CHOICES_SPEED
                }
			],
			callback: function(action, bank) {
				cmd = 'F50';
                self.sendPTZ(cmd);
			}
        };}

		if (s.fSpeed == true) {actions.fSpeedU = { label: 'Lens - Focus Speed Up',
			callback: function(action, bank) {
                if (self.fSpeedIndex == 0) {
                    self.fSpeedIndex = 0;
                }
                else if (self.fSpeedIndex > 0) {
                    self.fSpeedIndex--;
                }
                self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
			}
		};}
	
		if (s.fSpeed == true) {actions.fSpeedD = { label: 'Lens - Focus Speed Down',
			callback: function(action, bank) {
                if (self.fSpeedIndex == c.CHOICES_SPEED.length) {
                    self.fSpeedIndex = c.CHOICES_SPEED.length;
                }
                else if (self.fSpeedIndex < c.CHOICES_SPEED.length) {
                    self.fSpeedIndex++;
                }
                self.fSpeed = c.CHOICES_SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
			}
		};}
	
		if (s.OAF == true) {actions.focusM = {
            label: 'Lens - Focus Mode (Auto Focus)',
            options: [
                {
                    type: 'dropdown',
                    label: 'Auto / Manual Focus',
                    id: 'bol',
                    default: 0,
                    choices: [{ id: 0, label: 'Auto Focus' }, { id: 1, label: 'Manual Focus' }]
                }
			],
			callback: function(action, bank) {
                if (action.options.bol == 0) {
                    cmd = 'D10';
                }
                if (action.options.bol == 1) {
                    cmd = 'D11';
                }
                self.sendPTZ(cmd);
			}
        };}

		if (s.OTAF == true) {actions.focusOTAF = { label: 'Lens - Focus One Touch Auto (OTAF)',
			callback: function(action, bank) {
                cmd = 'OSE:69:1';
                self.sendCam(cmd);
			}
		};}

		// ##########################
		// #### Exposure Actions ####
		// ##########################

		if (s.iris == true) {actions.irisU = { label: 'Exposure - Iris Up',
			callback: function(action, bank) {
                if (self.irisIndex == CHOICES_IRIS.length) {
                    self.irisIndex = CHOICES_IRIS.length;
                }
                else if (self.irisIndex < CHOICES_IRIS.length) {
                    self.irisIndex++;
                }
                self.irisVal = CHOICES_IRIS[self.irisIndex].id;
                self.sendPTZ('I' + self.irisVal.toUpperCase());
			}
		};}
		
		if (s.iris == true) {actions.irisD = { label: 'Exposure - Iris Down',
			callback: function(action, bank) {
                if (self.irisIndex == 0) {
                    self.irisIndex = 0;
                }
                else if (self.irisIndex > 0) {
                    self.irisIndex--;
                }
                self.irisVal = CHOICES_IRIS[self.irisIndex].id;
                self.sendPTZ('I' + self.irisVal.toUpperCase());
			}
		};}
		
		if (s.iris == true) {actions.irisS = {
            label: 'Exposure - Set Iris',
            options: [
                {
                    type: 'dropdown',
                    label: 'Iris setting',
                    id: 'val',
                    choices: CHOICES_IRIS
                }
			],
			callback: function(action, bank) {
                self.sendPTZ('I' + action.options.val);
                self.irisVal = action.options.val;
                self.irisIndex = action.options.val;
			}
		};}
		
        if (s.iris == true) {actions.irisM = {
            label: 'Exposure - Iris Mode (Auto Iris)',
            options: [
                {
                    type: 'dropdown',
                    label: 'Auto / Manual Iris',
                    id: 'bol',
                    default: 0,
                    choices: [{ id: 0, label: 'Auto Iris' }, { id: 1, label: 'Manual Iris' }]
                }
            ],
			callback: function(action, bank) {
                if (action.options.bol == 0) {
                    cmd = 'D30';
                }
                if (action.options.bol == 1) {
                    cmd = 'D31';
                }
                self.sendPTZ(cmd);
			}
		};}

		if (s.gain.cmd) {actions.gainU = { label: 'Exposure - Gain Up',
			callback: function(action, bank) {
                if (self.gainIndex == s.gain.dropdown.length) {
                    self.gainIndex = s.gain.dropdown.length;
                }
                else if (self.gainIndex < s.gain.dropdown.length) {
                    self.gainIndex++;
                }
                self.gainVal = s.gain.dropdown[self.gainIndex].id
    
                cmd = s.gain.cmd + self.gainVal.toUpperCase();
                self.sendCam(cmd);
			}
		};}
	
		if (s.gain.cmd) {actions.gainD = { label: 'Exposure - Gain Down',
			callback: function(action, bank) {
                if (self.gainIndex == 0) {
                    self.gainIndex = 0;
                }
                else if (self.gainIndex > 0) {
                    self.gainIndex--;
                }
                self.gainVal = s.gain.dropdown[self.gainIndex].id
    
                cmd = s.gain.cmd + self.gainVal.toUpperCase();
                self.sendCam(cmd);
			}
		};}
	
		if (s.gain.cmd) {actions.gainS = {
            label: 'Exposure - Set Gain',
            options: [
                {
                    type: 'dropdown',
                    label: 'Gain setting',
                    id: 'val',
                    choices: s.gain.dropdown
                }
			],
			callback: function(action, bank) {
                cmd = s.gain.cmd + action.options.val;
                self.sendCam(cmd);
			}
		};}
		
		if (s.shut.cmd) {actions.shutU = { label: 'Exposure - Shutter Up',
			callback: function(action, bank) {
                if (self.shutIndex == s.shut.dropdown.length) {
                    self.shutIndex = s.shut.dropdown.length;
                }
                else if (self.shutIndex < s.shut.dropdown.length) {
                    self.shutIndex++;
                }
                self.shutVal = s.shut.dropdown[self.shutIndex].id

                cmd = s.shut.cmd + self.shutVal.toUpperCase();
                self.sendCam(cmd);
			}
		};}

		if (s.shut.cmd) {actions.shutD = { label: 'Exposure - Shutter Down',
			callback: function(action, bank) {
                if (self.shutIndex == 0) {
                    self.shutIndex = 0;
                }
                else if (self.shutIndex > 0) {
                    self.shutIndex--;
                }
                self.shutVal = s.shut.dropdown[self.shutIndex].id

                cmd = s.shut.cmd + self.shutVal.toUpperCase();
                self.sendCam(cmd);
			}
		};}
		
		if (s.shut.cmd) {actions.shutS = {
            label: 'Exposure - Set Shutter',
            options: [
                {
                    type: 'dropdown',
                    label: 'Shutter setting',
                    id: 'val',
                    choices: s.shut.dropdown
                }
			],
			callback: function(action, bank) {
                cmd = s.shut.cmd + action.options.val.toUpperCase();
                self.sendCam(cmd);
			}

        };}

		if (s.ped.cmd) {actions.pedU = { label: 'Exposure - Pedestal Up',
			callback: function(action, bank) {
				if (self.pedestalIndex == s.ped.dropdown.length) {
                    self.pedestalIndex = s.ped.dropdown.length;
                }
                else if (self.pedestalIndex < s.ped.dropdown.length) {
                    self.pedestalIndex++;
                }
                self.pedestalVal = s.ped.dropdown[self.pedestalIndex].id
    
                cmd = s.ped.cmd + self.pedestalVal.toUpperCase;
                self.sendCam(cmd);
			}
		};}

		if (s.ped.cmd) {actions.pedD = { label: 'Exposure - Pedestal Down',
			callback: function(action, bank) {
                if (self.pedestalIndex == 0) {
                    self.pedestalIndex = 0;
                }
                else if (self.pedestalIndex > 0) {
                    self.pedestalIndex--;
                }
                self.pedestalVal = s.ped.dropdown[self.pedestalIndex].id
    
                cmd = s.ped.cmd + self.pedestalVal.toUpperCase();
                self.sendCam(cmd);
			}
		};}
		
		if (s.ped.cmd) {actions.pedS = {
            label: 'Exposure - Set Pedestal',
            options: [
                {
                    type: 'dropdown',
                    label: 'Pedestal setting',
                    id: 'val',
                    choices: s.ped.dropdown
                }
			],
			callback: function(action, bank) {
                cmd = s.ped.cmd + action.options.val.toUpperCase();
                self.sendCam(cmd);
			}
        };}
		if (s.filter.cmd) {actions.filterU = { label: 'Exposure - ND Filter Up',
			callback: function(action, bank) {
                if (self.filterIndex == s.filter.dropdown.length) {
                    self.filterIndex = s.filter.dropdown.length;
                }
                else if (self.filterIndex < s.filter.dropdown.length) {
                    self.filterIndex++;
                }
                self.filterVal = s.filter.dropdown[self.filterIndex].id
    
                cmd = s.filter.cmd + self.filterVal;
                self.sendCam(cmd);
			}
		};}

		if (s.filter.cmd) {actions.filterD = { label: 'Exposure - ND Filter Down',
			callback: function(action, bank) {
				if (self.filterIndex == 0) {
					self.filterIndex = 0;
				}
				else if (self.filterIndex > 0) {
					self.filterIndex--;
				}
				self.filterVal = s.filter.dropdown[self.filterIndex].id

				cmd = s.filter.cmd + self.filterVal;
				self.sendCam(cmd);
			}
		};}
		
		if (s.filter.cmd) {actions.filterS = {
            label: 'Exposure - Set ND Filter',
            options: [
                {
                    type: 'dropdown',
                    label: 'ND Filter setting',
                    id: 'val',
                    choices: s.filter.dropdown
                }
			],
			callback: function(action, bank) {
                cmd = s.filter.dropdown + action.options.val;
                self.sendCam(cmd);
			}
        };}

		// #########################
		// #### Presets Actions ####
		// #########################

		if (s.preset == true) {actions.savePset = {
            label: 'Preset - Save',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset Nr.',
                    id: 'val',
                    choices: CHOICES_PRESET
                }
            ],
			callback: function(action, bank) {
                cmd = 'M' + action.options.val;
                self.sendPTZ(cmd);
			}
        };}
        if (s.preset == true) {actions.recallPset = {
            label: 'Preset - Recall',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset Nr.',
                    id: 'val',
                    choices: CHOICES_PRESET
                }
            ],
			callback: function(action, bank) {
				cmd = 'R' + action.options.val;
                self.sendPTZ(cmd);
			}
        };}
        if (s.speedPset == true) {actions.speedPset = {
            label: 'Preset - Drive Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 999,
                    choices: c.CHOICES_PSSPEED
                }
            ],
			callback: function(action, bank) {
                cmd = 'UPVS' + action.options.speed
                self.sendPTZ(cmd);
			}
        };}
        if (s.timePset == true) {actions.timePset = { // TODO: currently only works when in Time mode.
            label: 'Preset - Drive Time',
            options: [
                {
                    type: 'dropdown',
                    label: 'Time Secconds',
                    id: 'speed',
                    default: '001',
                    choices: c.CHOICES_PSTIME()
                }
            ],
			callback: function(action, bank) {
                cmd = 'UPVS' + action.options.speed
                self.sendPTZ(cmd);
			}
        };}

        if (s.timePset == true) {actions.modePset = { // TODO: currently only works when in Time mode.
            label: 'Preset - Drive Speed/Time Mode',
            options: [
                {
                    type: 'dropdown',
                    label: 'Select mode',
                    id: 'mode',
                    default: '0',
                    choices: [
                        {id: '0', label: 'Speed mode'},
                        {id: '1', label: 'Time mode'},
                    ]
                }
            ],
			callback: function(action, bank) {
                cmd = 'OSJ:29:' + action.options.mode
                self.sendCam(cmd);
			}
        };}

		// ########################
		// #### System Actions ####
		// ########################

		if (s.power == true) {actions.powerOff = { label: 'System - Power Off',
			callback: function(action, bank) {
                cmd = 'O0';
                self.sendPTZ(cmd);
			}
		};}

		if (s.power == true) {actions.powerOn = { label: 'System - Power On',
			callback: function(action, bank) {
                cmd = 'O1';
                self.sendPTZ(cmd);
			}
		};}

		if (s.tally == true) {actions.tallyOff = {label: 'System - Tally Off',
			callback: function(action, bank) {
                cmd = 'DA0';
                self.sendPTZ(cmd);
			}
		};}

		if (s.tally == true) {actions.tallyOn = {label: 'System - Tally On',
			callback: function(action, bank) {
                cmd = 'DA1';
                self.sendPTZ(cmd);
			}
		};}

		if (s.ins == true) {actions.insPosition = { 
            label: 'System - Installation position',
            options: [
                {
                    type: 'dropdown',
                    label: 'Position',
                    id: 'position',
                    default: 0,
                    choices: [
                        { id: '0', label: 'Desktop' },
                        { id: '1', label: 'Hanging' }
                    ]
                }
			],
			callback: function(action, bank) {
                cmd = 'INS' + action.options.position;
                self.sendPTZ(cmd);
			}
        };}

        return(actions);
    },

}