
const {addNewEvent, editEvent , deleteImage,deleteEvent , getEventHeaders , getEventDetails , getParticipants, getNumbers, getGallery , uploadGallery } = require("../services/events.service")
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

const getEventHeadersController = async (req, res) => {
    const events = await getEventHeaders()
    if (!events)
        res.status(500).json({success : false , message : "Events not found"})
    res.status(200).json({success : true , events :events})
}

const getEventDetailsController = async (req, res) => {
    console.log("got eevntsDetails request");
    const id = req.params.id
    console.log(id);
    const event = await getEventDetails(id)

    if (!event)
        res.status(500).json({success : false , message : "Event not found"})
    res.status(200).json({success : true , event :event})
}



const getNumbersController = async (req, res) => {
    const event_id = req.params.id
    const participantsData = await getNumbers(event_id)
    res.status(200).json(participantsData)
}

const addAttendeeController = async (req, res) => {

    console.log("got request for add attendee");
    const event_id = req.params.id
    const user_id = req.body.user_id
    const feedback = req.body.feedback

    const added = await addAttendee(event_id, user_id , feedback)
    if(added)
        res.status(200).json({success : true})
    else
        res.status(500).json({success : false})
}

const deleteAttendeeController = async (req, res) => {
    const event_id = req.params.id
    const user_id = req.body.user_id
    const deleted = await deleteAttendee(event_id, user_id)
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

const uploadGalleryController = async (req, res) => {
    const event_id = req.params.id
    const images = req.body.images
    const uploaded = await uploadGallery(event_id, images)
    console.log("uploaded details " ,uploaded);
    if(uploaded)
        res.status(200).json({success : true , urls : uploaded})
    else
        res.status(500).json({success : false})
}

const deleteImageController = async (req, res) => {
    const event_id = req.params.id

    const deleted = await deleteImage(event_id)
    if(deleted)
        res.status(200).json({success : true})
    else
        res.status(500).json({success : false})
}

const getGalleryController = async (req, res) => {
    const event_id = req.params.id
    const gallery = await getGallery(event_id)
    if(gallery)
        res.status(200).json({success : true , gallery : gallery})
    else
        res.status(500).json({success : false})
}





module.exports = {addNewEventController ,getGalleryController,deleteImageController, editEventController , deleteEventController  , getNumbersController , addAttendeeController , deleteAttendeeController , getParticipantsController , getEventHeadersController , getEventDetailsController , uploadGalleryController};
