module.exports = {
    
    setPresets: function(i) {
        var self = i;
        var presets = [
            {
                category: 'Pan/Tilt',
                label: 'UP',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_UP,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'up',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'DOWN',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_DOWN,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'down',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'LEFT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_LEFT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'left',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'RIGHT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_RIGHT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'right',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'UP RIGHT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_UP_RIGHT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'upRight',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'UP LEFT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_UP_LEFT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'upLeft',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'DOWN LEFT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_DOWN_LEFT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'downLeft',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'DOWN RIGHT',
                bank: {
                    style: 'png',
                    text: '',
                    png64: self.ICON_DOWN_RIGHT,
                    pngalignment: 'center:center',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'downRight',
                    }
                ],
                release_actions: [
                    {
                        action: 'stop',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'Home',
                bank: {
                    style: 'text',
                    text: 'HOME',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'home',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'Speed Up',
                bank: {
                    style: 'text',
                    text: 'SPEED\\nUP\\n$(HE120:ptSpeedVar)',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'ptSpeedU',
                    }
                ]
            },
            {
                category: 'Pan/Tilt',
                label: 'Speed Down',
                bank: {
                    style: 'text',
                    text: 'SPEED\\nDOWN\\n$(HE120:ptSpeedVar)',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'ptSpeedD',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Zoom In',
                bank: {
                    style: 'text',
                    text: 'ZOOM\\nIN',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'zoomI',
                    }
                ],
                release_actions: [
                    {
                        action: 'zoomS',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Zoom Out',
                bank: {
                    style: 'text',
                    text: 'ZOOM\\nOUT',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'zoomO',
                    }
                ],
                release_actions: [
                    {
                        action: 'zoomS',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Zoom Speed Up',
                bank: {
                    style: 'text',
                    text: 'ZOOM\\nSPEED\\nUP\\n$(HE120:zSpeedVar)',
                    size: '7',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'zSpeedU',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Zoom Speed Down',
                bank: {
                    style: 'text',
                    text: 'ZOOM\\nSPEED\\nDOWN\\n$(HE120:zSpeedVar)',
                    size: '7',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'zSpeedD',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Focus Near',
                bank: {
                    style: 'text',
                    text: 'FOCUS\\nNEAR',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'focusN',
                    }
                ],
                release_actions: [
                    {
                        action: 'focusS',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Focus Far',
                bank: {
                    style: 'text',
                    text: 'FOCUS\\nFAR',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'focusF',
                    }
                ],
                release_actions: [
                    {
                        action: 'focusS',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Focus Speed Up',
                bank: {
                    style: 'text',
                    text: 'FOCUS\\nSPEED\\nUP\\n$(HE120:fSpeedVar)',
                    size: '7',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'fSpeedU',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'focusM Speed Down',
                bank: {
                    style: 'text',
                    text: 'FOCUS\\nSPEED\\nDOWN\\n$(HE120:fSpeedVar)',
                    size: '7',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0)
                },
                actions: [
                    {
                        action: 'fSpeedD',
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'Auto Focus',
                bank: {
                    style: 'text',
                    text: 'AUTO\\nFOCUS',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                    latch: true
                },
                actions: [
                    {
                        action: 'focusM',
                        options: {
                            bol: 0,
                        }
                    }
                ],
                release_actions: [
                    {
                        action: 'focusM',
                        options: {
                            bol: 1,
                        }
                    }
                ]
            },
            {
                category: 'Lens',
                label: 'One Touch Focus',
                bank: {
                    style: 'text',
                    text: 'OTAF\\nFOCUS',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0,0,0),
                },
                actions: [
                    {
                        action: 'focusOTAF',
                        options: {
                            bol: 0,
                        }
                    }
                ],
            },
            {
                category: 'Exposure',
                label: 'Gain Up',
                bank: {
                    style: 'text',
                    text: 'GAIN\\nUP',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'gainU',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Gain Down',
                bank: {
                    style: 'text',
                    text: 'GAIN\\nDOWN',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'gainD',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Iris Up',
                bank: {
                    style: 'text',
                    text: 'IRIS\\nUP',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'irisU',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Iris Down',
                bank: {
                    style: 'text',
                    text: 'IRIS\\nDOWN',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'irisD',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Shutter Up',
                bank: {
                    style: 'text',
                    text: 'Shut\\nUP',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'shutU',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Shutter Down',
                bank: {
                    style: 'text',
                    text: 'Shut\\nDOWN',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'shutD',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Pedestal Up',
                bank: {
                    style: 'text',
                    text: 'Pedestal\\nUP',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'pedU',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Pedestal Down',
                bank: {
                    style: 'text',
                    text: 'Pedestal\\nDOWN',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'pedD',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Filter Up',
                bank: {
                    style: 'text',
                    text: 'Filter\\nUP',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'filterU',
                    }
                ]
            },
            {
                category: 'Exposure',
                label: 'Filter Down',
                bank: {
                    style: 'text',
                    text: 'Filter\\nDOWN',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'filterD',
                    }
                ]
            },
            {
                category: 'System',
                label: 'Power Off',
                bank: {
                    style: 'text',
                    text: 'Power\\nOff',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'powerOff',
                    }
                ]
            },
            {
                category: 'System',
                label: 'Power On',
                bank: {
                    style: 'text',
                    text: 'Power\\nOn',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'powerOn',
                    }
                ]
            },
            {
                category: 'System',
                label: 'INS Desktop',
                bank: {
                    style: 'text',
                    text: 'INS\\nDesk',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'insPosition',
                        options: {
                            position: 0,
                        }
                    }
                ]
            },
            {
                category: 'System',
                label: 'INS Hanging',
                bank: {
                    style: 'text',
                    text: 'INS\\nHang',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'insPosition',
                        options: {
                            position: 1,
                        }
                    }
                ]
            },
            {
                category: 'System',
                label: 'Tally Off',
                bank: {
                    style: 'text',
                    text: 'Tally\\nOff',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'tallyOff',
                    }
                ]
            },
            {
                category: 'System',
                label: 'Tally On',
                bank: {
                    style: 'text',
                    text: 'Tally\\nOn',
                    size: '18',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'tallyOn',
                    }
                ]
            },
            {
                category: 'Recall Preset',
                label: 'Set Recall Speed',
                bank: {
                    style: 'text',
                    text: 'Set\\nRecall\\nSpeed',
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'speedPset',
                    }
                ]
            },
        ];
    
        var save;
        for (save = 0; save < 100; save++) {
            presets.push({
                category: 'Save Preset',
                label: 'Save Preset ' + parseInt(save + 1),
                bank: {
                    style: 'text',
                    text: 'SAVE\\nPSET\\n' + parseInt(save + 1),
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'savePset',
                        options: {
                            val: ('0' + save.toString(10).toUpperCase()).substr(-2, 2),
                        }
                    }
                ]
            });
        }
    
        var recall;
        for (recall = 0; recall < 100; recall++) {
            presets.push({
                category: 'Recall Preset',
                label: 'Recall Preset ' + parseInt(recall + 1),
                bank: {
                    style: 'text',
                    text: 'Recall\\nPSET\\n' + parseInt(recall + 1),
                    size: '14',
                    color: '16777215',
                    bgcolor: self.rgb(0, 0, 0),
                },
                actions: [
                    {
                        action: 'recallPset',
                        options: {
                            val: ('0' + recall.toString(10).toUpperCase()).substr(-2, 2),
                        }
                    }
                ]
            });
        }
        return(presets);
    }
}