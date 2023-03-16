const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Event = require('../models/EventModel');
const addNewEvent = async (event) => {
  await Event.create({
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    venue: event.venue,
    registrationLink: event.registrationLink,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const editEvent = async (event) => {
  let updatedEvent;
  try {
    updatedEvent = await Event.findByIdAndUpdate(
      { _id: new ObjectId(event.id) },
      {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        registrationLink: event.registrationLink,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  return updatedEvent;
};
const deleteEvent = async (event_id) => {
  Event.deleteOne({ _id: new ObjectId(event_id) })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getEvents = async () => {
  const events = await Event.find().sort({ date: -1 });
  return events;
};

module.exports = { addNewEvent, editEvent, deleteEvent, getEvents };
