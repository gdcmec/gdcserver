
const {addNewEvent, editEvent , deleteEvent , getEvents , getParticipants } = require("../services/events.service")
const {addAttendee , deleteAttendee} = require("../services/user.services")

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

const addAttendeeController = async (req, res) => {
    const event_id = req.params.id
    const user_id = req.body.user_id
    const added = await addAttendee(event_id, user_id)
    if(added)
        res.status(200).json({success : true})
    else
        res.status(500).json({success : false})
}

const deleteAttendeeController = async (req, res) => {
    const event_id = req.params.id
    const user_id = req.body.user_id
    const deleted = await deleteAttendee(user_id, event_id)
    if(deleted)
        res.status(200).json({success : true})
    else
        res.status(500).json({success : false})
}

const getParticipantsController = async (req, res) => {
    const event_id = req.params.id
    const participants = await getParticipants(event_id)
    if(participants)
        res.status(200).json({success : true , participants : participants})
    else
        res.status(500).json({success : false})

}



module.exports = {addNewEventController , editEventController , deleteEventController , getEventsController , getNumbersController , addAttendeeController , deleteAttendeeController , getParticipantsController};
