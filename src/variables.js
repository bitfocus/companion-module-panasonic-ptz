var { MODELS } = require('./models.js');

module.exports = {

    // ##########################
    // #### Define Variables ####
    // ##########################
    setVariables: function (i) {
        var self = i;
        var variables = [];

        // Set the model and series selected, if in auto, dettect what model is connected via TCP
        if (self.config.model === 'Auto') {
            self.data.model = self.data.modelTCP;
        } else { self.data.model = self.config.model;}

        if (self.data.model !== 'NaN') {
            self.data.series = MODELS.find(MODELS => MODELS.id == self.data.model).series;
        }
        
        // console.log('variable set');
        // console.log(self.config.model);
        // console.log(self.data.model);
        // console.log(self.data.modelTCP);
        // console.log(self.data.series);

        variables.push({ name: 'series', label: 'Camera Series' });
        variables.push({ name: 'model', label: 'Model of camera' });
        variables.push({ name: 'name', label: 'Name of camera' });
        if (self.data.series !== 'AK-UB300') {variables.push({ name: 'version', label: 'Firmware Version' });}
        variables.push({ name: 'error', label: 'PTZ Error Codes' });
        variables.push({ name: 'power', label: 'Power ON/OFF' });
        variables.push({ name: 'ins', label: 'Install Position' });
        if (self.data.series !== 'AK-UB300') {variables.push({ name: 'OAF', label: 'Auto Focus Mode' });}
        variables.push({ name: 'ptSpeedVar', label: 'Pan/Tilt Speed' });
        variables.push({ name: 'zSpeedVar', label: 'Zoom Speed' });
        variables.push({ name: 'fSpeedVar', label: 'Focus Speed' });
        return variables;
    },

    // #########################
    // #### Check Variables ####
    // #########################
    checkVariables: function (i) {
        var self = i;

        self.setVariable('series', self.data.series); 	
        self.setVariable('model', self.data.model); 	
        self.setVariable('name', self.data.name);
        self.setVariable('version', self.data.version);
        self.setVariable('error', self.data.error);
        self.setVariable('power', self.data.power);
        self.setVariable('ins', self.data.ins);
        self.setVariable('OAF', self.data.oaf);
        self.setVariable('ptSpeedVar', self.ptSpeed);
        self.setVariable('zSpeedVar', self.zSpeed);
        self.setVariable('fSpeedVar', self.fSpeed);    
    }
}