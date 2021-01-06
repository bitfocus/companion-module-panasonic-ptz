module.exports = {

    // ##########################
    // #### Define Feedbacks ####
    // ##########################
	setFeedbacks: function (i) {
        var self = i;
        var feedbacks = {};
    
        const foregroundColor = {
            type: 'colorpicker',
            label: 'Foreground color',
            id: 'fg',
            default: self.rgb(255, 255, 255) // White
        };
    
        const backgroundColorGreen = {
            type: 'colorpicker',
            label: 'Background color',
            id: 'bg',
            default: self.rgb(0, 255, 0) // Green
        };
    
        const backgroundColorRed = {
            type: 'colorpicker',
            label: 'Background color ON',
            id: 'bg',
            default: self.rgb(255, 0, 0) // Red
        };
    
        const backgroundColorOrange = {
            type: 'colorpicker',
            label: 'Background color Pulse',
            id: 'bg',
            default: self.rgb(255, 102, 0) // Orange
        };
    
        feedbacks.powerState = {
            label: 'System - Power State',
            description: 'Indicate if PTZ is ON or OFF',
            options: [
                {
                    type: 'dropdown',
                    label: 'Indicate in X State',
                    id: 'option',
                    default: '1',
                    choices: [
                        { id: '0', label: 'OFF' },
                        { id: '1', label: 'ON' },
                    ]
                },
                foregroundColor, 
                backgroundColorRed
            ],
            callback: function(feedback, bank) {
                var opt = feedback.options;
                switch (opt.option) {
                    case '0': if (self.data.power === 'OFF') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                    case '1': if (self.data.power === 'ON') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                    default: break;
                }        
            }
        };
    
        feedbacks.insState = {
            label: 'System - Install Position',
            description: 'Indicate if PTZ is on Desktop or Hanging',
            options: [
                {
                    type: 'dropdown',
                    label: 'Indicate in X position',
                    id: 'option',
                    default: '1',
                    choices: [
                        { id: '0', label: 'Desktop' },
                        { id: '1', label: 'Hanging' },
                    ]
                },
                foregroundColor, 
                backgroundColorRed
            ],
            callback: function(feedback, bank) {
                var opt = feedback.options;
                switch (opt.option) {
                    case '0': if (self.data.ins === 'Desktop') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                    case '1': if (self.data.ins === 'Hanging') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                    default: break;
                }
            }
        };
    
        if (self.data.series !== 'AK-UB300') {
            feedbacks.autoFocus = {
                label: 'Lens - Auto Focus State',
                description: 'Indicate if Autofocus is ON or OFF',
                options: [
                    {
                        type: 'dropdown',
                        label: 'Indicate in X State',
                        id: 'option',
                        default: '1',
                        choices: [
                            { id: '0', label: 'Manual' },
                            { id: '1', label: 'Auto' },
                        ]
                    },
                    foregroundColor, 
                    backgroundColorRed
                ],
                callback: function(feedback, bank) {
                    var opt = feedback.options;
                    switch (opt.option) {
                        case '0': if (self.data.oaf === 'Manual') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                        case '1': if (self.data.oaf === 'Auto') { return { color: opt.fg, bgcolor: opt.bg }; } break;
                        default: break;
                    }
                }    
            };	
        }
        return(feedbacks);
    }
}