
const {addNewEvent, editEvent , deleteEvent , getEvents , getParticipantsData} = require("../services/events.service")

const addNewEventController = async (req, res) => {
    const event = req.body.event
    const newEvent = await addNewEvent(event)
    if(newEvent == null)
        res.status(500).json({success : false , message : "Event not added"})
    else
        res.
        status(200).
        json({success : true , newEvent : newEvent})


    }

const editEventController = async (req, res) => {
    console.log("got request");
    console.log(req.body);
    const event = req.body.event
    const updatedEvent = await editEvent(event)
    if(updatedEvent == null)
        res.status(500).json({success : false , message : "Event not edited"})
    else
    res.status(200).json({success : true , updatedEvent : updatedEvent})

}
const deleteEventController = async (req, res) => {
    const id = req.params.id
    console.log(id);
    await deleteEvent(id)
    res.send("Event deleted")
}

const getEventsController = async (req, res) => {
    const events = await getEvents()
    res.status(200).json(events)
}

const getNumbersController = async (req, res) => {
    const event_id = req.params.id
    const participantsData = await getParticipantsData(event_id)
    res.status(200).json(participantsData)
}




module.exports = {addNewEventController , editEventController , deleteEventController , getEventsController , getNumbersController};
