const express = require('express');
const {
  addNewEventController,
  editEventController,
  deleteEventController,
  getEventsController,
} = require('../controller/event.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Events');
});

router.post('/new', addNewEventController);

router.post('/edit', editEventController);

router.post('/delete', deleteEventController);

router.get('/get', getEventsController);
module.exports = router;
