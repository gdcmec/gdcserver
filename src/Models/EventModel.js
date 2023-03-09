const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    date: {
        // type: Date,
    },
    regestationLink : {
        type: String,
        // required: true
    },
    }
);

module.exports = Event = mongoose.model('event',EventSchema);

