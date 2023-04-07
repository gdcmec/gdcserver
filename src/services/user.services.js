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

const getAttended = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM attended NATURAL JOIN users WHERE event_id = $1 ORDER BY created_at DESC", [event_id]);
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getFeedbacks = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM feedback NATURAL JOIN users WHERE event_id = $1 ORDER BY created_at DESC", [event_id]);
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

const getNonAttendees = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM interested WHERE user_id NOT IN (SELECT user_id FROM attended WHERE event_id = $1) ORDER by created_at ASC", [event_id])
        return result.rows;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addAttended = async (user_id, event_id , feedback) => {
    try{
        const first_event = await pool.query("SELECT first_event FROM users WHERE user_id = $1", [user_id])
        if(!first_event.rows[0].first_event){1
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

const removeAttended = async (user_id, event_id) => {
    try{
        await pool.query("DELETE FROM attended WHERE user_id = $1 AND event_id = $2",
            [user_id, event_id])
        const first_event = await pool.query("SELECT first_event FROM users WHERE user_id = $1", [user_id])
        if(first_event.rows[0].first_event == event_id){
            await pool.query("UPDATE users SET first_event = NULL WHERE user_id = $1", [user_id])
        }
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports = { getUserId, addUser, getInterested, getAttended, getFeedbacks, addInterested, getNonAttendees, addAttended, removeAttended }