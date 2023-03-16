const { addNewEvent, editEvent, deleteEvent, getEvents } = require('../services/events.service');

const addNewEventController = async (req, res) => {
  const event = req.body.event;
  await addNewEvent(event);
  res.send('Event added');
};

const editEventController = async (req, res) => {
  const event = req.body.event;
  await editEvent(event);
  res.send('Event edited');
};

const deleteEventController = async (req, res) => {
  const event_id = req.body.event_id;
  await deleteEvent(event_id);
  res.send('Event deleted');
};

const getEventsController = async (req, res) => {
  const events = await getEvents();
  res.status(200).json(events);
};

module.exports = { addNewEventController, editEventController, deleteEventController, getEventsController };
