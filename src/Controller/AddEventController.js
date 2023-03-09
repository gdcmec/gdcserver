
const addNewEvent = require("../services/events.service").addNewEvent

const addNewEventController = async (req, res) => {
    const event = req.body.event
    await addNewEvent(event)
    res.send("Event added")
    }

module.exports = addNewEventController;
