const {pool}  = require('../config/postgres');

const getUser = async (email) => {

    try{
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return user.rows[0].user_id;

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
        const result = await pool.query("SELECT * FROM interested NATURAL JOIN users WHERE event_id = $1", [event_id])
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getAttended = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM attended NATURAL JOIN users WHERE event_id = $1", [event_id])
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getFeedbacks = async (event_id) => {
    try{
        const result = await pool.query("SELECT * FROM feedback NATURAL JOIN users WHERE event_id = $1", [event_id])
        return result.rows;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addInterested = async (user_id, event_id) => {
    try{
        const user_id = await getUser(email);
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
        const result = await pool.query("SELECT * FROM interested WHERE user_id NOT IN (SELECT user_id FROM attended WHERE event_id = $1)", [event_id])
        return result.rows;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addAttended = async (user_id, event_id) => {
    try{
        const result = await pool.query("INSERT INTO attended (user_id, event_id) VALUES ($1, $2) RETURNING *",
            [user_id, event_id])
        return result.rows[0];
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const removeAttended = async (user_id, event_id) => {
    try{
        const result = await pool.query("DELETE FROM attended WHERE user_id = $1 AND event_id = $2",
            [user_id, event_id])
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

con
