const {addAttendedSheetController , addExpectedSheetController , runAttendedDataController , runInterestedDataController , getSheetIdController} = require('../controller/link.controller');


const router = require('express').Router();

router.post('/add-attended/:id', addAttendedSheetController);

router.post('/add-registration/:id', addExpectedSheetController);

router.post('/run-attendance/:id', runAttendedDataController);

router.post('/run-registration/:id', runInterestedDataController);

router.get('/get-sheets/:id', getSheetIdController);

module.exports = router;