const {pool} = require('../config/postgres');

const {getAttendees , getAbsentees} = require('./user.services')

const addNewEvent = async (event) => {

        let newEvent = null
        try{

            newEvent = await pool.query("INSERT INTO events (title, description, date, time, venue, registration_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [event.title, event.description, event.date, event.time, event.venue, event.registration_link])
        }
        catch(err){
            console.log(err);
            return false;
        }
        return newEvent.rows;
            
}

const editEvent = async (event) => {
    
    let updatedEvent
    try {
    updatedEvent = await pool.query("UPDATE events SET title = $1, description = $2, date = $3, time = $4, venue = $5, registration_link = $6 WHERE event_id = $7 RETURNING *", [event.title, event.description, event.date, event.time, event.venue, event.registration_link, event.event_id])
} catch (error) {
        console.log(error);
        return false
}
    return updatedEvent.rows[0];    
}
const deleteEvent = async (event_id) => {

    try{
    await pool.query("DELETE FROM events WHERE event_id = $1", [event_id])
    return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
const getEvents = async () => {

    let events = null
    try{
    events = await pool.query("SELECT * FROM events")
    }
    catch(err){
        console.log(err);
        return false;
    }
    return events.rows;
}

const getNumbers = async (event_id) => {

    const interestedNo = (await pool.query("SELECT COUNT(*) FROM interested WHERE event_id = $1", [event_id])).rows[0].count;
    const attendedNo = (await pool.query("SELECT COUNT(*) FROM attended WHERE event_id = $1", [event_id])).rows[0].count;
    const notAttendedNo = interestedNo - attendedNo;
    return {interestedNo, attendedNo, notAttendedNo}
}

const getParticipants = async (event_id) => {

 try   {
    const attendees = await getAttendees(event_id);
    const absentees = await getAbsentees(event_id);
    return {attendees, absentees}

}

catch(err){
    console.log("error in getParticipants",err);
    return false;
}
}

    

module.exports = { addNewEvent, editEvent, deleteEvent , getEvents , getNumbers ,getParticipants}
