const {pool} = require('../config/postgres');
const supabase = require('../config/supabase.config');

const {getAttendees , getAbsentees} = require('./user.services')

const addNewEvent = async (event) => {

        try{

            const newEvent = await pool.query("INSERT INTO events (title, description, date, time, venue, registration_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING event_id", [event.title, event.description, event.date, event.time, event.venue, event.registration_link])
         
            const event_id = newEvent.rows[0].event_id;
            
            const poster_url = `${process.env.SUPABASE_STORAGE_URL}/events/${event_id}/poster.jpg`

            const result = await pool.query("UPDATE events SET poster_url = $1 WHERE event_id = $2 RETURNING *", [poster_url, event_id])
            return result.rows[0];


        }
        catch(err){
            console.log(err);
            return false;
        }
            
}

const editEvent = async (event) => {
    
    let updatedEvent
    try {
    updatedEvent = await pool.query("UPDATE events SET title = $1, description = $2, date = $3, time = $4, venue = $5, registration_link = $6 WHERE event_id = $7 RETURNING *", [event.title, event.description, event.date, event.time, event.venue, event.registration_link, event.event_id])
    await pool.query("UPDATE sheets SET expected_sheet_id = $1 WHERE event_id = $2", [event.sheet_id, event.event_id])
} catch (error) {
        console.log(error);
        return false
}
    return updatedEvent.rows[0];    
}
const deleteEvent = async (event_id) => {

    try{
    let res = await deleteEventParticipants(event_id);
    res = await deleteEventGallery(event_id);
    res = await pool.query("DELETE FROM events WHERE event_id = $1", [event_id])
    return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
  
const getEvents = async () => { //to be deleted

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

const getEventHeaders = async () => {
    let eventHeaders = null
    try{
    eventHeaders = await pool.query("SELECT events.event_id, events.title, events.date, events.time, events.venue,events.poster_url, events.description ,COUNT(interested.event_id) as interested_count FROM events LEFT JOIN interested ON interested.event_id = events.event_id GROUP BY events.event_id")
    
}
    catch(err){
        console.log(err);
        return false;
    }
    return eventHeaders.rows;
}

const getEventDetails = async (event_id) => {
    try{
    const eventDetails = await pool.query("SELECT * FROM events WHERE event_id = $1", [event_id])
    const galleryUrls = await pool.query("SELECT * FROM event_gallery WHERE event_id = $1", [event_id])
    const numbers = await getNumbers(event_id);
    const participants = await getParticipants(event_id);
    return {details : eventDetails.rows[0], numbers, participants , galleryUrls : galleryUrls.rows}
    }
    catch(err){
        console.log(err);
        return false;
    }
}



const getNumbers = async (event_id) => {

    const expected = (await pool.query("SELECT COUNT(*) FROM interested WHERE event_id = $1", [event_id])).rows[0].count;
    const attended = (await pool.query("SELECT COUNT(*) FROM attended WHERE event_id = $1", [event_id])).rows[0].count;
    const absentees = expected - attended;
    return {expected, attended, absentees}
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

const uploadGallery = async (event_id, imageNames) => {

    try{
    const gallery = imageNames.map(imageName => `${process.env.SUPABASE_STORAGE_URL}/events/${event_id}/gallery/${imageName}`)
    for(let i = 0; i < gallery.length; i++){
        await pool.query("INSERT INTO event_gallery (event_id, image_url , image_name) VALUES ($1, $2 , $3)", [event_id, gallery[i] , imageNames[i]])
    }
    const galleryUrls = await getGallery(event_id);
    return galleryUrls;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getGallery = async (event_id) => {
     
    try{
    const gallery = await pool.query("SELECT image_url , id FROM event_gallery WHERE event_id = $1", [event_id])
    return gallery.rows;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const deleteImage = async (id , name) => {
try{
    const res = await pool.query("DELETE FROM event_gallery WHERE id = $1 RETURNING event_id , image_name", [id])
    await supabase.storage.from('events').remove([`${res.rows[0].event_id}/gallery/${res.rows[0].image_name}`])
    return true;
} 
catch(err){
    console.log(err);
    return false;
}
}

const deleteEventParticipants = async (event_id) => {
         console.log("\n\n\n\n\ deleting participants \n\n\n\n\n");
        await pool.query("UPDATE users SET first_event = NULL WHERE first_event = $1", [event_id])
        await pool.query("DELETE FROM interested WHERE event_id = $1", [event_id])
        await pool.query("DELETE FROM attended WHERE event_id = $1", [event_id])
        await pool.query("DELETE FROM sheets WHERE event_id = $1", [event_id])
        console.log("deleted participants");
        return true;
    
}

const deleteEventGallery = async (event_id) => {

        console.log("\n\n\n\n\ deleting gallery \n\n\n\n\n");
        const res = await pool.query("DELETE FROM event_gallery WHERE event_id = $1", [event_id])
        console.log("deleted gallery");
        return true;
}


module.exports = { deleteImage ,addNewEvent, editEvent, deleteEvent , getEvents , getNumbers ,getParticipants , getAttendees , getAbsentees , getEventHeaders , getEventDetails , uploadGallery , getGallery }
