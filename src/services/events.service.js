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
        }
        ).catch((err) => {
            console.log(err);
        });
    

}

const editEvent = async (event) => {
    
        Event.updateOne({_id: new ObjectId(event.id)}, {
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            venue: event.venue,
            registrationLink: event.registrationLink,
        })
        .then((result) => {
            console.log(result);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
}

const deleteEvent = async (event_id) => {

    Event.deleteOne({_id: new ObjectId(event_id)})
    .then((result) => {
        console.log(result);
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}

module.exports = { addNewEvent, editEvent, deleteEvent }
