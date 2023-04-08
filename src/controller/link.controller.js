const {addAttendedBulk , addInterestedBulk , addAttendedSheet , addExpectedSheet , getSheetId} = require('../services/link.services');

const runInterestedDataController = async (req, res) => {

        const event_id = req.params.id;
        const sheetId = req.body.sheet_id;

        const result = await addInterestedBulk(sheetId, event_id);
        if(!result)
            res.status(500).json({
                success: false,
                message: "Interested not added",
            });
        else
            res.status(200).json({
                success: true,
                message: "Interested added",
            });
    }

const runAttendedDataController = async (req, res) => {

        const event_id = req.params.id;
        const sheetId = req.body.sheet_id;

        const result = await addAttendedBulk(sheetId,event_id);
        if(!result)
            res.status(500).json({
                success: false,
                message: "Attended not added",
            });
        else
            res.status(200).json({
                success: true,
                message: "Attended added",
            });
    }

const addAttendedSheetController = async (req, res) => {
    
            const event_id = req.params.id;
            const sheetId = req.body.sheet_id;
    
            const result = await addAttendedSheet(sheetId,event_id);
            if(!result)
                res.status(500).json({
                    success: false,
                    message: "Attended not added",
                });
            else
                res.status(200).json({
                    success: true,
                    message: "Attended added",
                });
        }

const addExpectedSheetController = async (req, res) => {
        
                const event_id = req.params.id;
                const sheetId = req.body.sheet_id;
        
                const result = await addExpectedSheet(sheetId,event_id);
                if(!result)
                    res.status(500).json({
                        success: false,
                        message: "Expected not added",
                    });
                else
                    res.status(200).json({
                        success: true,
                        message: "Expected added",
                    });
            }
const getSheetIdController = async (req, res) => {
               const event_id = req.params.id;
                const sheets = await getSheetId(event_id);
                if(!sheets)
                    res.status(500).json({
                        success: false,
                        message: "Sheets not found",
                    });
                else
                    res.status(200).json({
                        success: true,
                        attended : sheets.attended,
                        expected : sheets.expected
                    });
            }



module.exports = {
    runAttendedDataController,
    runInterestedDataController,
    addAttendedSheetController,
    addExpectedSheetController,
    getSheetIdController
};



