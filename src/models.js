module.exports = {
    
    MODELS: [
        { id: 'Auto', series: 'Auto', label: 'Auto Detect'},
        { id: 'AW-HE35', series: 'HE40', label: 'AW-HE35' },
        { id: 'AW-HE38', series: 'HE40', label: 'AW-HE48' },
        { id: 'AW-HE40', series: 'HE40', label: 'AW-HE40' },
        { id: 'AW-HE42', series: 'HE42', label: 'AW-HE42' },
        { id: 'AW-HE48', series: 'HE40', label: 'AW-HE48' },
        { id: 'AW-HE50', series: 'AW-HE50', label: 'AW-HE50' },
        { id: 'AW-HE58', series: 'HE40', label: 'AW-HE58' },
        { id: 'AW-HE60', series: 'AW-HE60', label: 'AW-HE60' },
        { id: 'AW-HE65', series: 'HE40', label: 'AW-HE65' },
        { id: 'AW-HE68', series: 'HE42', label: 'AW-HE68' },
        { id: 'AW-HE70', series: 'HE40', label: 'AW-HE70' },
        { id: 'AW-HE75', series: 'HE42', label: 'AW-HE75' },
        { id: 'AW-HE120', series: 'AW-HE120', label: 'AW-HE120' },
        { id: 'AW-HE130', series: 'AW-HE130', label: 'AW-HE130' },
        { id: 'AW-HR140', series: 'AW-HR140', label: 'AW-HR140' },
        { id: 'AW-HN38', series: 'HE40', label: 'AW-HN38' },
        { id: 'AW-HN40', series: 'HE40', label: 'AW-HN40' },
        { id: 'AW-HN65', series: 'HE40', label: 'AW-HN65' },
        { id: 'AW-HN70', series: 'HE40', label: 'AW-HN70' },
        { id: 'AW-UE63', series: 'UE70', label: 'AW-UE63' },
        { id: 'AW-UE65', series: 'UE70', label: 'AW-UE65' },
        { id: 'AW-UE70', series: 'UE70', label: 'AW-UE70' },
        { id: 'AW-UE150', series: 'UE150', label: 'AW-UE150' },
        { id: 'AW-UE155', series: 'UE150', label: 'AW-UE155' },
        { id: 'AW-UN70', series: 'UE70', label: 'AW-UN70' },
        { id: 'AW-UN145', series: 'UE150', label: 'AW-UN145' },
        { id: 'AW-HEF5', series: 'AW-HEF5', label: 'AW-HEF5' },
        { id: 'AW-SHU01', series: 'AW-SFU01', label: 'AW-SFU01' },
        { id: 'AK-UB300', series: 'AK-UB300', label: 'AK-UB300' },
        { id: 'Other', series: 'Other', label: 'Other Cameras' },
    ],


    // list of all Series:
    // Other
    // HE40
    // HE42
    // UE70
    // UE150
    // AW-HE50
    // AW-HE60
    // AW-HE120
    // AW-HE130
    // AW-HE140
    // AW-HEF5
    // AW-SHU01
    // AK-UB300

    SERIES_SPECS: [
        {   // Includes all Actions / Variabels / Feedbacks
            id: 'Other', 
            variables: {
                version: true,
                error: true,
                ins: true,
                power: true,
                tally: true,
                OAF: true,
            },
            feedbacks: {
                powerState: true,
                tallyState: true,
                insState: true,
                autoFocus: true,
            }, 
            actions: {
                panTilt: true,
                ptSpeed: true,
                zoom: true,
                zSpeed: true,
                focus: true,
                fSpeed: true,
                OAF: true,
                iris: true,
                gain: true,
                shut: true,
                ped: true,
                filter: true,
                preset: true,
                speedPset: true,
                power: true,
                tally: true,
                ins: true,
            }
        },

        // {   // // Specific for the UE150 Series
        //     id: 'UE150', 
        //     variables: {
        //         version: true,
        //         error: true,
        //         power: true,
        //         ins: true,
        //         OAF: true,
        //     },
        //     feedbacks: {
        //         powerState: true,
        //         insState: true,
        //         autoFocus: true,
        //     }, 
        //     actions: {
        //         panTilt: true,
        //         ptSpeed: true,
        //         zoom: true,
        //         zSpeed: true,
        //         focus: true,
        //         fSpeed: true,
        //         OAF: true,
        //         iris: true,
        //         gain: true,
        //         shut: true,
        //         ped: true,
        //         filter: true,
        //         preset: true,
        //         speedPset: true,
        //         power: true,
        //         ins: true,
        //         tally: true,
        //     }
        // },

        {   // Specific for the AK-UB300
            id: 'AK-UB300', 
            variables: {
                version: false,
                error: true,
                power: true,
                ins: true,
                OAF: false,
            },
            feedbacks: {
                powerState: true,
                insState: true,
                autoFocus: false,
            }, 
            actions: {
                panTilt: true,
                ptSpeed: true,
                zoom: true,
                zSpeed: true,
                focus: true,
                fSpeed: true,
                OAF: false,
                iris: true,
                gain: true,
                shut: true,
                ped: true,
                filter: true,
                preset: true,
                speedPset: true,
                power: true,
                ins: true,
                tally: true,
            }
        }
    ]
}