var { CHOICES_FILTER, CHOICES_SHUTTER, CHOICES_PSSPEED, CHOICES_SPEED, CHOICES_GAIN } = require('./choices.js');
var { MODELS, SERIES_SPECS } = require('./models.js');

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

var CHOICES_PEDESTAL = [];
for (var i = 0; i < 300; ++i) {
	CHOICES_PEDESTAL.push({ id: ('00' + i.toString(16)).substr(-3, 3), label: 'Pedestal ' + i });
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

    // ########################
    // #### Create Actions ####
    // ########################
	setActions: function (i) {
        var self = i;
        var actions = {};
        var SERIES = {};

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
        // console.log(SERIES);
    
        // Pan/Tilt
        if (SERIES.actions.panTilt == true) {actions.left = { label: 'Pan/Tilt - Pan Left' };}
        if (SERIES.actions.panTilt == true) {actions.right = { label: 'Pan/Tilt - Pan Right' };}
        if (SERIES.actions.panTilt == true) {actions.up = { label: 'Pan/Tilt - Tilt Up' };}
        if (SERIES.actions.panTilt == true) {actions.down = { label: 'Pan/Tilt - Tilt Down' };}
        if (SERIES.actions.panTilt == true) {actions.upLeft = { label: 'Pan/Tilt - Up Left' };}
        if (SERIES.actions.panTilt == true) {actions.upRight = { label: 'Pan/Tilt - Up Right' };}
        if (SERIES.actions.panTilt == true) {actions.downLeft = { label: 'Pan/Tilt - Down Left' };}
        if (SERIES.actions.panTilt == true) {actions.downRight = { label: 'Pan/Tilt - Down Right' };}
        if (SERIES.actions.panTilt == true) {actions.stop = { label: 'Pan/Tilt - Stop' };}
        if (SERIES.actions.panTilt == true) {actions.home = { label: 'Pan/Tilt - Home' };}
        if (SERIES.actions.ptSpeed == true) {actions.ptSpeedS = {
            label: 'Pan/Tilt - Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: CHOICES_SPEED
                }
            ]
        };}
        if (SERIES.actions.ptSpeed == true) {actions.ptSpeedU = { label: 'Pan/Tilt - Speed Up' };}
        if (SERIES.actions.ptSpeed == true) {actions.ptSpeedD = { label: 'Pan/Tilt - Speed Down' };}

        // Lens
        if (SERIES.actions.zoom == true) {actions.zoomI = { label: 'Lens - Zoom In' };}
        if (SERIES.actions.zoom == true) {actions.zoomO = { label: 'Lens - Zoom Out' };}
        if (SERIES.actions.zoom == true) {actions.zoomS = { label: 'Lens - Zoom Stop' };}
        if (SERIES.actions.zSpeed == true) {actions.zSpeedS = {
            label: 'Lens - Zoom Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: CHOICES_SPEED
                }
            ]
        };}
        if (SERIES.actions.zSpeed == true) {actions.zSpeedU = { label: 'Lens - Zoom Speed Up' };}
        if (SERIES.actions.zSpeed == true) {actions.zSpeedD = { label: 'Lens - Zoom Speed Down' };}
        if (SERIES.actions.focus == true) {actions.focusN = { label: 'Lens - Focus Near' };}
        if (SERIES.actions.focus == true) {actions.focusF = { label: 'Lens - Focus Far' };}
        if (SERIES.actions.focus == true) {actions.focusS = { label: 'Lens - Focus Stop' };}
        if (SERIES.actions.fSpeed == true) {actions.fSpeedS = {
            label: 'Lens - Focus Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 25,
                    choices: CHOICES_SPEED
                }
            ]
        };}
        if (SERIES.actions.fSpeed == true) {actions.fSpeedU = { label: 'Lens - Focus Speed Up' };}
        if (SERIES.actions.fSpeed == true) {actions.fSpeedD = { label: 'Lens - Focus Speed Down' };}
        if (SERIES.actions.OAF == true) {actions.focusM = {
            label: 'Lens - Focus Mode (Auto Focus)',
            options: [
                {
                    type: 'dropdown',
                    label: 'Auto / Manual Focus',
                    id: 'bol',
                    default: 0,
                    choices: [{ id: 0, label: 'Auto Focus' }, { id: 1, label: 'Manual Focus' }]
                }
            ]
        };}
        if (SERIES.actions.OAF == true) {actions.focusOTAF = { label: 'Lens - Focus One Touch Auto (OTAF)' };}
        
        // Exposure
        if (SERIES.actions.iris == true) {actions.irisU = { label: 'Exposure - Iris Up' };}
        if (SERIES.actions.iris == true) {actions.irisD = { label: 'Exposure - Iris Down' };}
        if (SERIES.actions.iris == true) {actions.irisS = {
            label: 'Exposure - Set Iris',
            options: [
                {
                    type: 'dropdown',
                    label: 'Iris setting',
                    id: 'val',
                    choices: CHOICES_IRIS
                }
            ]
        };}
        if (SERIES.actions.gain == true) {actions.gainU = { label: 'Exposure - Gain Up' };}
        if (SERIES.actions.gain == true) {actions.gainD = { label: 'Exposure - Gain Down' };}
        if (SERIES.actions.gain == true) {actions.gainS = {
            label: 'Exposure - Set Gain',
            options: [
                {
                    type: 'dropdown',
                    label: 'Gain setting',
                    id: 'val',
                    choices: CHOICES_GAIN
                }
            ]
        };}
        if (SERIES.actions.shut == true) {actions.shutU = { label: 'Exposure - Shutter Up' };}
        if (SERIES.actions.shut == true) {actions.shutD = { label: 'Exposure - Shutter Down' };}
        if (SERIES.actions.shut == true) {actions.shutS = {
            label: 'Exposure - Set Shutter',
            options: [
                {
                    type: 'dropdown',
                    label: 'Shutter setting',
                    id: 'val',
                    choices: CHOICES_SHUTTER
                }
            ]
        };}
        if (SERIES.actions.ped == true) {actions.pedU = { label: 'Exposure - Pedestal Up' };}
        if (SERIES.actions.ped == true) {actions.pedD = { label: 'Exposure - Pedestal Down' };}
        if (SERIES.actions.ped == true) {actions.pedS = {
            label: 'Exposure - Set Pedestal',
            options: [
                {
                    type: 'dropdown',
                    label: 'Iris setting',
                    id: 'val',
                    choices: CHOICES_PEDESTAL
                }
            ]
        };}
        if (SERIES.actions.filter == true) {actions.filterU = { label: 'Exposure - Filter Up' };}
        if (SERIES.actions.filter == true) {actions.filterD = { label: 'Exposure - Filter Down' };}
        if (SERIES.actions.filter == true) {actions.filterS = {
            label: 'Exposure - Set Filter',
            options: [
                {
                    type: 'dropdown',
                    label: 'Iris setting',
                    id: 'val',
                    choices: CHOICES_FILTER
                }
            ]
        };}

        // Presets
        if (SERIES.actions.preset == true) {actions.savePset = {
            label: 'Preset - Save',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset Nr.',
                    id: 'val',
                    choices: CHOICES_PRESET
                }
            ]
        };}
        if (SERIES.actions.preset == true) {actions.recallPset = {
            label: 'Preset - Recall',
            options: [
                {
                    type: 'dropdown',
                    label: 'Preset Nr.',
                    id: 'val',
                    choices: CHOICES_PRESET
                }
            ]
        };}
        if (SERIES.actions.speedPset == true) {actions.speedPset = {
            label: 'Preset - Drive Speed',
            options: [
                {
                    type: 'dropdown',
                    label: 'speed setting',
                    id: 'speed',
                    default: 999,
                    choices: CHOICES_PSSPEED
                }
            ]
        };}

        // System
        if (SERIES.actions.power == true) {actions.powerOff = { label: 'System - Power Off' };}
        if (SERIES.actions.power == true) {actions.powerOn = { label: 'System - Power On' };}
        if (SERIES.actions.tally == true) {actions.tallyOff = {label: 'System - Tally Off'};}
        if (SERIES.actions.tally == true) {actions.tallyOn = {label: 'System - Tally On'};}
        if (SERIES.actions.ins == true) {actions.insPosition = { 
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
            ]
        };}

        return(actions);
    },

    // #########################
    // #### Execute Actions ####
    // #########################
    setAction: function (i, action) {
        var self = i;
        var opt = action.options;
        var cmd = '';
        var n;
        var string;
    
        switch (action.action) {
    
            case 'left':
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + '50';
                self.sendPTZ(cmd);
                break;
    
            case 'right':
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + '50';
                self.sendPTZ(cmd);
                break;
    
            case 'up':
                cmd = 'PTS50' + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
                break;
    
            case 'down':
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS50' + string;
                self.sendPTZ(cmd);
                break;
    
            case 'upLeft':
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
                break;
    
            case 'upRight':
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + parseInt(50 + self.ptSpeed);
                self.sendPTZ(cmd);
                break;
    
            case 'downLeft':
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + string + string;
                self.sendPTZ(cmd);
                break;
    
            case 'downRight':
                n = parseInt(50 - self.ptSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'PTS' + parseInt(50 + self.ptSpeed) + string;
                self.sendPTZ(cmd);
                break;
    
            case 'stop':
                cmd = 'PTS5050';
                self.sendPTZ(cmd);
                break;
    
            case 'home':
                cmd = 'APC7FFF7FFF';
                self.sendPTZ(cmd);
                break;

            case 'ptSpeedS':
                self.ptSpeed = opt.speed;
                var idx = -1;
                for (var i = 0; i < SPEED.length; ++i) {
                    if (SPEED[i].id == self.ptSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.ptSpeedIndex = idx;
                }
                self.ptSpeed = SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
                break;
    
            case 'ptSpeedU':
                if (self.ptSpeedIndex == 0) {
                    self.ptSpeedIndex = 0;
                }
                else if (self.ptSpeedIndex > 0) {
                    self.ptSpeedIndex--;
                }
                self.ptSpeed = SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
                break;
    
            case 'ptSpeedD':
                if (self.ptSpeedIndex == 49) {
                    self.ptSpeedIndex = 49;
                }
                else if (self.ptSpeedIndex < 49) {
                    self.ptSpeedIndex++;
                }
                self.ptSpeed = SPEED[self.ptSpeedIndex].id
                self.setVariable('ptSpeedVar', self.ptSpeed);
                break;
                    
            case 'zoomI':
                cmd = 'Z' + parseInt(50 + self.zSpeed);
                self.sendPTZ(cmd);
                break;
    
            case 'zoomO':
                n = parseInt(50 - self.zSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'Z' + string;
                self.sendPTZ(cmd);
                break;
        
            case 'zoomS':
                cmd = 'Z50';
                self.sendPTZ(cmd);
                break;
    
            case 'zSpeedS':
                self.zSpeed = opt.speed;
                var idx = -1;
                for (var i = 0; i < SPEED.length; ++i) {
                    if (SPEED[i].id == self.zSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.zSpeedIndex = idx;
                }
                self.zSpeed = SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
                break;
    
            case 'zSpeedU':
                if (self.zSpeedIndex == 0) {
                    self.zSpeedIndex = 0;
                }
                else if (self.zSpeedIndex > 0) {
                    self.zSpeedIndex--;
                }
                self.zSpeed = SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
                break;

            case 'zSpeedD':
                if (self.zSpeedIndex == 49) {
                    self.zSpeedIndex = 49;
                }
                else if (self.zSpeedIndex < 49) {
                    self.zSpeedIndex++;
                }
                self.zSpeed = SPEED[self.zSpeedIndex].id
                self.setVariable('zSpeedVar', self.zSpeed);
                break;
        
            case 'focusN':
                n = parseInt(50 - self.fSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'F' + string;
                self.sendPTZ(cmd);
                break;
    
            case 'focusF':
                cmd = 'F' + parseInt(50 + self.fSpeed);
                self.sendPTZ(cmd);
                break;
    
            case 'fSpeedS':
                self.fSpeed = opt.speed;
                var idx = -1;
                for (var i = 0; i < SPEED.length; ++i) {
                    if (SPEED[i].id == self.fSpeed) {
                        idx = i;
                        break;
                    }
                }
                if (idx > -1) {
                    self.fSpeedIndex = idx;
                }
                self.fSpeed = SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
                break;
    
            case 'fSpeedU':
                if (self.fSpeedIndex == 0) {
                    self.fSpeedIndex = 0;
                }
                else if (self.fSpeedIndex > 0) {
                    self.fSpeedIndex--;
                }
                self.fSpeed = SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
                break;

            case 'fSpeedD':
                if (self.fSpeedIndex == 49) {
                    self.fSpeedIndex = 49;
                }
                else if (self.fSpeedIndex < 49) {
                    self.fSpeedIndex++;
                }
                self.fSpeed = SPEED[self.fSpeedIndex].id
                self.setVariable('fSpeedVar', self.fSpeed);
                break;
        
            case 'focusS':
                cmd = 'F50';
                self.sendPTZ(cmd);
                break;
    
            case 'focusM':
                if (opt.bol == 0) {
                    cmd = 'D10';
                }
                if (opt.bol == 1) {
                    cmd = 'D11';
                }
                self.sendPTZ(cmd);
                break;
    
            case 'focusOTAF':
                cmd = 'OSE:69:1';
                self.sendCam(cmd);
                break;
    
            case 'irisU':
                if (self.irisIndex == 99) {
                    self.irisIndex = 99;
                }
                else if (self.irisIndex < 99) {
                    self.irisIndex++;
                }
                self.irisVal = IRIS[self.irisIndex].id;
                self.sendPTZ('I' + self.irisVal.toUpperCase());
                break;
    
            case 'irisD':
                if (self.irisIndex == 0) {
                    self.irisIndex = 0;
                }
                else if (self.irisIndex > 0) {
                    self.irisIndex--;
                }
                self.irisVal = IRIS[self.irisIndex].id;
                self.sendPTZ('I' + self.irisVal.toUpperCase());
                break;
    
            case 'irisS':
                self.sendPTZ('I' + opt.val);
                self.irisVal = opt.val;
                self.irisIndex = opt.val;
                break;
    
            case 'gainU':
                if (self.gainIndex == 49) {
                    self.gainIndex = 49;
                }
                else if (self.gainIndex < 49) {
                    self.gainIndex++;
                }
                self.gainVal = GAIN[self.gainIndex].id
    
                cmd = 'OGU:' + self.gainVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
            case 'gainD':
                if (self.gainIndex == 0) {
                    self.gainIndex = 0;
                }
                else if (self.gainIndex > 0) {
                    self.gainIndex--;
                }
                self.gainVal = GAIN[self.gainIndex].id
    
                cmd = 'OGU:' + self.gainVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
    
            case 'gainS':
                cmd = 'OGU:' + opt.val;
                self.sendCam(cmd);
                break;
    
            case 'shutU':
                if (self.shutIndex == 14) {
                    self.shutIndex = 14;
                }
                else if (self.shutIndex < 14) {
                    self.shutIndex++;
                }
                self.shutVal = SHUTTER[self.shutIndex].id
    
                cmd = 'OSH:' + self.shutVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
            case 'shutD':
                if (self.shutIndex == 0) {
                    self.shutIndex = 0;
                }
                else if (self.shutIndex > 0) {
                    self.shutIndex--;
                }
                self.shutVal = SHUTTER[self.shutIndex].id
    
                cmd = 'OSH:' + self.shutVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
            case 'shutS':
                cmd = 'OSH:' + opt.val.toUpperCase();
                self.sendCam(cmd);
                break;
    
            case 'pedU':
                if (self.pedestalIndex == 299) {
                    self.pedestalIndex = 299;
                }
                else if (self.pedestalIndex < 299) {
                    self.pedestalIndex++;
                }
                self.pedestalVal = PEDESTAL[self.pedestalIndex].id
    
                cmd = 'OTP:' + self.pedestalVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
            case 'pedD':
                if (self.pedestalIndex == 0) {
                    self.pedestalIndex = 0;
                }
                else if (self.pedestalIndex > 0) {
                    self.pedestalIndex--;
                }
                self.pedestalVal = PEDESTAL[self.pedestalIndex].id
    
                cmd = 'OTP:' + self.pedestalVal.toUpperCase();
                self.sendCam(cmd);
                break;
    
    
            case 'pedS':
                cmd = 'OTP:' + opt.val.toUpperCase();
                self.sendCam(cmd);
                break;
 
            case 'filterU':
                if (self.filterIndex == 5) {
                    self.filterIndex = 5;
                }
                else if (self.filterIndex < 5) {
                    self.filterIndex++;
                }
                self.filterVal = FILTER[self.filterIndex].id
    
                cmd = 'OFT:' + self.filterVal;
                self.sendCam(cmd);
                break;
    
            case 'filterD':
                if (self.filterIndex == 0) {
                    self.filterIndex = 0;
                }
                else if (self.filterIndex > 0) {
                    self.filterIndex--;
                }
                self.filterVal = FILTER[self.filterIndex].id
    
                cmd = 'OFT:' + self.filterVal;
                self.sendCam(cmd);
                break;
    
    
            case 'filterS':
                cmd = 'OFT:' + opt.val;
                self.sendCam(cmd);
                break;
       
            case 'savePset':
                cmd = 'M' + opt.val;
                self.sendPTZ(cmd);
                break;
    
            case 'recallPset':
                cmd = 'R' + opt.val;
                self.sendPTZ(cmd);
                break;
    
            case 'speedPset':
                cmd = 'UPVS' + opt.speed
                self.sendPTZ(cmd);
                break;

            case 'powerOff':
                cmd = 'O0';
                self.sendPTZ(cmd);
                break;
    
            case 'powerOn':
                cmd = 'O1';
                self.sendPTZ(cmd);
                break;
            
            case 'tallyOff':
                cmd = 'DA0';
                self.sendPTZ(cmd);
                break;
    
            case 'tallyOn':
                cmd = 'DA1';
                self.sendPTZ(cmd);
                break;

            case 'insPosition':
                cmd = 'INS' + opt.position;
                self.sendPTZ(cmd);
                break;
        }    
    }
}