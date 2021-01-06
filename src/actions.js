
// ########################
// #### Value Look Ups ####
// ########################
var IRIS = [];
for (var i = 0; i < 100; ++i) {
	IRIS.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Iris ' + i });
}

var FILTER = [
	{ id: '0', label: 'Through' },
	{ id: '1', label: '1/4' },
	{ id: '2', label: '1/16' },
	{ id: '3', label: '1/64' },
	{ id: '4', label: '1/8' },
	{ id: '8', label: 'AUTO' }
];

var SHUTTER = [
	{ id: '0', label: 'OFF' },
	{ id: '2', label: '1/60' },
	{ id: '3', label: '1/100' },
	{ id: '4', label: '1/120' },
	{ id: '5', label: '1/250' },
	{ id: '6', label: '1/500' },
	{ id: '7', label: '1/1000' },
	{ id: '8', label: '1/2000' },
	{ id: '9', label: '1/4000' },
	{ id: 'A', label: '1/10000' },
	{ id: 'B', label: 'Syncro Scan' },
	{ id: 'C', label: 'ELC' },
	{ id: 'D', label: '1/24' },
	{ id: 'E', label: '1/25' },
	{ id: 'F', label: '1/30' }
];

var PRESET = [];
for (var i = 0; i < 100; ++i) {
	PRESET.push({ id: ('0' + i.toString(10)).substr(-2, 2), label: 'Preset ' + (i + 1) });
}

var PEDESTAL = [];
for (var i = 0; i < 300; ++i) {
	PEDESTAL.push({ id: ('00' + i.toString(16)).substr(-3, 3), label: 'Pedestal ' + i });
}

var PSSPEED = [
	{ id: 999, label: 'Speed (Fast)' },
	{ id: 975, label: 'Speed 30' },
	{ id: 950, label: 'Speed 29' },
	{ id: 925, label: 'Speed 28' },
	{ id: 900, label: 'Speed 27' },
	{ id: 875, label: 'Speed 26' },
	{ id: 850, label: 'Speed 25' },
	{ id: 825, label: 'Speed 24' },
	{ id: 800, label: 'Speed 23' },
	{ id: 775, label: 'Speed 22' },
	{ id: 750, label: 'Speed 21' },
	{ id: 725, label: 'Speed 20' },
	{ id: 700, label: 'Speed 19' },
	{ id: 675, label: 'Speed 18' },
	{ id: 650, label: 'Speed 17' },
	{ id: 625, label: 'Speed 16' },
	{ id: 600, label: 'Speed 15' },
	{ id: 575, label: 'Speed 14' },
	{ id: 550, label: 'Speed 13' },
	{ id: 525, label: 'Speed 12' },
	{ id: 500, label: 'Speed 11' },
	{ id: 475, label: 'Speed 10' },
	{ id: 450, label: 'Speed 09' },
	{ id: 425, label: 'Speed 08' },
	{ id: 400, label: 'Speed 07' },
	{ id: 375, label: 'Speed 06' },
	{ id: 350, label: 'Speed 05' },
	{ id: 325, label: 'Speed 04' },
	{ id: 300, label: 'Speed 03' },
	{ id: 275, label: 'Speed 02' },
	{ id: 250, label: 'Speed 01 (Slow)' }
];

var SPEED = [
	{ id: 49, label: 'Speed 49 (Fast)' },
	{ id: 48, label: 'Speed 48' },
	{ id: 47, label: 'Speed 47' },
	{ id: 46, label: 'Speed 46' },
	{ id: 45, label: 'Speed 45' },
	{ id: 44, label: 'Speed 44' },
	{ id: 43, label: 'Speed 43' },
	{ id: 42, label: 'Speed 42' },
	{ id: 41, label: 'Speed 41' },
	{ id: 40, label: 'Speed 40' },
	{ id: 39, label: 'Speed 39' },
	{ id: 38, label: 'Speed 38' },
	{ id: 37, label: 'Speed 37' },
	{ id: 36, label: 'Speed 36' },
	{ id: 35, label: 'Speed 35' },
	{ id: 34, label: 'Speed 34' },
	{ id: 33, label: 'Speed 33' },
	{ id: 32, label: 'Speed 32' },
	{ id: 31, label: 'Speed 31' },
	{ id: 30, label: 'Speed 30' },
	{ id: 29, label: 'Speed 29' },
	{ id: 28, label: 'Speed 28' },
	{ id: 27, label: 'Speed 27' },
	{ id: 26, label: 'Speed 26' },
	{ id: 25, label: 'Speed 25' },
	{ id: 24, label: 'Speed 24' },
	{ id: 23, label: 'Speed 23' },
	{ id: 22, label: 'Speed 22' },
	{ id: 21, label: 'Speed 21' },
	{ id: 20, label: 'Speed 20' },
	{ id: 19, label: 'Speed 19' },
	{ id: 18, label: 'Speed 18' },
	{ id: 17, label: 'Speed 17' },
	{ id: 16, label: 'Speed 16' },
	{ id: 15, label: 'Speed 15' },
	{ id: 14, label: 'Speed 14' },
	{ id: 13, label: 'Speed 13' },
	{ id: 12, label: 'Speed 12' },
	{ id: 11, label: 'Speed 11' },
	{ id: 10, label: 'Speed 10' },
	{ id: 9, label: 'Speed 09' },
	{ id: 8, label: 'Speed 08' },
	{ id: 7, label: 'Speed 07' },
	{ id: 6, label: 'Speed 06' },
	{ id: 5, label: 'Speed 05' },
	{ id: 4, label: 'Speed 04' },
	{ id: 3, label: 'Speed 03' },
	{ id: 2, label: 'Speed 02' },
	{ id: 1, label: 'Speed 01 (Slow)' },
	{ id: 0, label: 'Stop' }
];

var GAIN = [
	{ id: '08', label: '0dB' },
	{ id: '09', label: '1dB' },
	{ id: '0A', label: '2dB' },
	{ id: '0B', label: '3db' },
	{ id: '0C', label: '4dB' },
	{ id: '0D', label: '5dB' },
	{ id: '0E', label: '6dB' },
	{ id: '0F', label: '7dB' },
	{ id: '10', label: '8dB' },
	{ id: '11', label: '9dB' },
	{ id: '12', label: '10dB' },
	{ id: '13', label: '11dB' },
	{ id: '14', label: '12dB' },
	{ id: '15', label: '13dB' },
	{ id: '16', label: '14dB' },
	{ id: '17', label: '15dB' },
	{ id: '18', label: '16dB' },
	{ id: '19', label: '17dB' },
	{ id: '1A', label: '18dB' },
	{ id: '1B', label: '19dB' },
	{ id: '1C', label: '20dB' },
	{ id: '1D', label: '21dB' },
	{ id: '1E', label: '22dB' },
	{ id: '1F', label: '23dB' },
	{ id: '20', label: '24dB' },
	{ id: '21', label: '25dB' },
	{ id: '22', label: '26dB' },
	{ id: '23', label: '27dB' },
	{ id: '24', label: '28dB' },
	{ id: '25', label: '29dB' },
	{ id: '26', label: '30dB' },
	{ id: '27', label: '31dB' },
	{ id: '28', label: '32dB' },
	{ id: '29', label: '33dB' },
	{ id: '2A', label: '34dB' },
	{ id: '2B', label: '35dB' },
	{ id: '2C', label: '36dB' },
	{ id: '2D', label: '37dB' },
	{ id: '2E', label: '38dB' },
	{ id: '2F', label: '39dB' },
	{ id: '30', label: '40dB' },
	{ id: '31', label: '41dB' },
	{ id: '32', label: '42dB' },
	{ id: '33', label: '43dB' },
	{ id: '34', label: '44dB' },
	{ id: '35', label: '45dB' },
	{ id: '36', label: '46dB' },
	{ id: '37', label: '47dB' },
	{ id: '38', label: '48dB' },
	{ id: '80', label: 'Auto' }
];

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
    
        var actions = {
            'left': { label: 'Pan/Tilt - Pan Left' },
            'right': { label: 'Pan/Tilt - Pan Right' },
            'up': { label: 'Pan/Tilt - Tilt Up' },
            'down': { label: 'Pan/Tilt - Tilt Down' },
            'upLeft': { label: 'Pan/Tilt - Up Left' },
            'upRight': { label: 'Pan/Tilt - Up Right' },
            'downLeft': { label: 'Pan/Tilt - Down Left' },
            'downRight': { label: 'Pan/Tilt - Down Right' },
            'stop': { label: 'Pan/Tilt - P/T Stop' },
            'home': { label: 'Pan/Tilt - P/T Home' },
            'powerOff': { label: 'System - Power Off' },
            'powerOn': { label: 'System - Power On' },
            'insPosition': { 
                label: 'System - Installation position',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Position',
                        id: 'position',
                        default: 0,
                        choices: [
                            { id: '0', label: 'Desktop' },
                            { id: '1', label: 'Hanging' },
                        ]
                    }
                ]
            },
            'ptSpeedS': {
                label: 'Pan/Tilt - P/T Speed',
                options: [
                    {
                        type: 'dropdown',
                        label: 'speed setting',
                        id: 'speed',
                        default: 25,
                        choices: SPEED
                    }
                ]
            },
            'ptSpeedU': { label: 'Pan/Tilt - P/T Speed Up' },
            'ptSpeedD': { label: 'Pan/Tilt - P/T Speed Down' },
            'tallyOff': { label: 'System - Tally Off' },
            'tallyOn': { label: 'System - Tally On' },
            'zoomI': { label: 'Lens - Zoom In' },
            'zoomO': { label: 'Lens - Zoom Out' },
            'zoomS': { label: 'Lens - Zoom Stop' },
            'zSpeedS': {
                label: 'Lens - Zoom Speed',
                options: [
                    {
                        type: 'dropdown',
                        label: 'speed setting',
                        id: 'speed',
                        default: 25,
                        choices: SPEED
                    }
                ]
            },
            'zSpeedU': { label: 'Lens - Zoom Speed Up' },
            'zSpeedD': { label: 'Lens - Zoom Speed Down' },
            'focusN': { label: 'Lens - Focus Near' },
            'focusF': { label: 'Lens - Focus Far' },
            'focusS': { label: 'Lens - Focus Stop' },
            'fSpeedS': {
                label: 'Lens - Focus Speed',
                options: [
                    {
                        type: 'dropdown',
                        label: 'speed setting',
                        id: 'speed',
                        default: 25,
                        choices: SPEED
                    }
                ]
            },
            'fSpeedU': { label: 'Lens - Focus Speed Up' },
            'fSpeedD': { label: 'Lens - Focus Speed Down' },
            'focusM': {
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
            },
            'focusOTAF': { label: 'Lens - Focus One Touch Auto (OTAF)' },
            'irisU': { label: 'Exposure - Iris Up' },
            'irisD': { label: 'Exposure - Iris Down' },
            'irisS': {
                label: 'Exposure - Set Iris',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Iris setting',
                        id: 'val',
                        choices: IRIS
                    }
                ]
            },
            'gainU': { label: 'Exposure - Gain Up' },
            'gainD': { label: 'Exposure - Gain Down' },
            'gainS': {
                label: 'Exposure - Set Gain',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Gain setting',
                        id: 'val',
                        choices: GAIN
                    }
                ]
            },
            'shutU': { label: 'Exposure - Shutter Up' },
            'shutD': { label: 'Exposure - Shutter Down' },
            'shutS': {
                label: 'Exposure - Set Shutter',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Shutter setting',
                        id: 'val',
                        choices: SHUTTER
                    }
                ]
            },
            'pedU': { label: 'Exposure - Pedestal Up' },
            'pedD': { label: 'Exposure - Pedestal Down' },
            'pedS': {
                label: 'Exposure - Set Pedestal',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Iris setting',
                        id: 'val',
                        choices: PEDESTAL
                    }
                ]
            },
            'filterU': { label: 'Exposure - Filter Up' },
            'filterD': { label: 'Exposure - Filter Down' },
            'filterS': {
                label: 'Exposure - Set Filter',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Iris setting',
                        id: 'val',
                        choices: FILTER
                    }
                ]
            },
            'savePset': {
                label: 'Preset - Save',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Preset Nr.',
                        id: 'val',
                        choices: PRESET
                    }
                ]
            },
            'recallPset': {
                label: 'Preset - Recall',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Preset Nr.',
                        id: 'val',
                        choices: PRESET
                    }
                ]
            },
            'speedPset': {
                label: 'Preset - Drive Speed',
                options: [
                    {
                        type: 'dropdown',
                        label: 'speed setting',
                        id: 'speed',
                        default: 999,
                        choices: PSSPEED
                    }
                ]
            }
        };
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
    
            case 'powerOff':
                cmd = 'O0';
                self.sendPTZ(cmd);
                break;
    
            case 'powerOn':
                cmd = 'O1';
                self.sendPTZ(cmd);
                break;
    
            case 'insPosition':
                cmd = 'INS' + opt.position;
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
    
            case 'tallyOff':
                cmd = 'DA0';
                self.sendPTZ(cmd);
                break;
    
            case 'tallyOn':
                cmd = 'DA1';
                self.sendPTZ(cmd);
                break;
    
            case 'zoomO':
                n = parseInt(50 - self.zSpeed);
                string = '' + (n < 10 ? "0" + n : n)
                cmd = 'Z' + string;
                self.sendPTZ(cmd);
                break;
    
            case 'zoomI':
                cmd = 'Z' + parseInt(50 + self.zSpeed);
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
    
        }    
    }
}