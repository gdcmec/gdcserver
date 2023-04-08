const {pool}  = require('../config/postgres');

const getUserId = async (email) => {

    try{
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return result.rows[0].user_id;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getUsers = async () => {
    try{
        const result = await pool.query("SELECT user_id , name , email , pnumber , class , year , title , users.created_at FROM users , events where first_event = event_id ORDER BY users.created_at ASC");
        console.log(result.rows);
        return result.rows;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addUser = async (user) => {
    
        try{
        const newUser = await pool.query("INSERT INTO users (name, email , pnumber,class,year) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
            [user.name, user.email, user.pnumber, user.class, user.year]) 
        return newUser.rows[0].user_id;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

const getInterested = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM interested NATURAL JOIN users WHERE event_id = $1 ORDER BY created_at DESC", [event_id]);
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getAttendees = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM attended INNER JOIN users USING (user_id) WHERE event_id = $1 ORDER BY attended.created_at DESC", [event_id]);
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getFeedbacks = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM feedback INNER JOIN  users USING (user_id) WHERE event_id = $1 ORDER BY created_at DESC", [event_id]);
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addInterested = async (user_id, event_id) => {
    try{
        const exists = await pool.query("SELECT * FROM interested WHERE user_id = $1 AND event_id = $2", [user_id, event_id]);
        if(exists.rows.length > 0){
            return exists.rows[0];
        }
        const result = await pool.query("INSERT INTO interested (user_id, event_id) VALUES ($1, $2) RETURNING *",
            [user_id, event_id])
        return result.rows[0];
        
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getAbsentees = async (event_id) => {
    try{
        const result = await pool.query(" SELECT * FROM users , interested WHERE users.user_id = interested.user_id AND interested.event_id = $1 AND interested.user_id NOT IN (SELECT user_id FROM attended WHERE event_id = $1) ORDER BY interested.created_at ASC", [event_id]);
        return result.rows;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addAttendee = async (event_id ,user_id, feedback) => {
    try{
        if(!feedback)
            feedback = {rating: null, feedback: null};
        const first_event = await pool.query("SELECT first_event FROM users WHERE user_id = $1", [user_id])
        console.log(first_event.rows);
        if(!first_event.rows[0].first_event){
            await pool.query("UPDATE users SET first_event = $1 WHERE user_id = $2", [event_id, user_id])
        }

        const result = await pool.query("INSERT INTO attended (user_id, event_id , rating,feedback) VALUES ( $1, $2, $3, $4) ON CONFLICT (user_id, event_id) DO UPDATE SET rating = $3, feedback = $4 RETURNING *",
       [user_id, event_id, feedback.rating , feedback.feedback])
        return result.rows[0];

    }

    catch(err){
        console.log(err);
        return false;
    }
}

const deleteAttendee = async (event_id, user_id) => {
    try{
        await pool.query("DELETE FROM attended WHERE user_id = $1 AND event_id = $2",
            [user_id, event_id])
        const first_event = await pool.query("SELECT first_event FROM users WHERE user_id = $1", [user_id]);
        if(first_event.rows[0].first_event === event_id){
            await pool.query("UPDATE users SET first_event = NULL WHERE user_id = $1", [user_id])
        }
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const deleteUser = async (user_id) => {
    try{
        await pool.query("DELETE FROM users WHERE user_id = $1", [user_id])
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getUserEvents = async (user_id) => {
    try{
        const attended = await pool.query("SELECT * FROM attended , events WHERE attended.event_id = events.event_id AND user_id = $1", [user_id]); // natural join didnt work :(
        const absent = await pool.query("SELECT * FROM interested ,events WHERE interested.event_id = events.event_id AND user_id = $1 AND interested.event_id NOT IN (SELECT event_id FROM attended WHERE user_id = $1)", [user_id]);
        return {attended: attended.rows, absent: absent.rows};

    }
    catch(err){
        console.log(err);
        return false;
    }

}

const editUser = async (user) => {
    try{
        const result = await pool.query("UPDATE users SET name = $1, email = $2, pnumber = $3, class = $4, year = $5 WHERE user_id = $6 RETURNING *",
            [user.name, user.email, user.pnumber, user.class, user.year, user.user_id])
        return result.rows[0];
    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports = { getUserId,getUsers,editUser,getUserEvents,addUser,deleteUser, getInterested, getAttendees, getFeedbacks, addInterested, getAbsentees, addAttendee , deleteAttendee }