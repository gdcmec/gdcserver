const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({


    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    date: {
            type: Date,
        // type: Date,       ???
    },
    time:{
        type: String,
        // type: Time,      ???
    },
    regestationLink : {
        type: String,
        // required: true
    },
    venue: {
        type: String,
        // required: true
    }
    




}
);

module.exports = Event = mongoose.model('event',EventSchema);

