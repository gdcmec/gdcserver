const {pool} = require('../config/postgres');

const addNewMember = async (memberDetails) => {

    try{
    const member = await pool.query("INSERT INTO members (name, position) VALUES ($1, $2) RETURNING member_id",
        [memberDetails.name, memberDetails.position])
    
    const id = member.rows[0].member_id;

    const photo_url = `${process.env.SUPABASE_STORAGE_URL}/members/${id}.jpg`

    await pool.query("UPDATE members SET photo_url = $1 WHERE member_id = $2 RETURNING *",
        [photo_url, id])
    return id
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const editMember = async (memberDetails) => {
    
    try{
     const result = await pool.query("UPDATE members SET name = $1,  position = $2 WHERE member_id = $3 RETURNING *",
        [memberDetails.name, memberDetails.position, memberDetails.member_id])
    return result.rows[0];
}
catch(err){
    console.log(err);
    return false;
}
}

const deleteMember = async (member_id) => {

    try{
        await pool.query("DELETE FROM members WHERE member_id = $1", [member_id])
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }

}

const getMembers = async () => {

        try{
        const members = await pool.query("SELECT * FROM members")
        return members.rows;
        }
        catch(err){
            console.log(err);
            return false;
        }

}

const getDetails = async (member_id) => {

    try{
        const member = await pool.query("SELECT * FROM members WHERE member_id = $1", [member_id])
        return member.rows[0];
    }
    catch(err){
        console.log(err);
        return false;
    }

}
module.exports = { addNewMember, editMember, deleteMember , getMembers , getDetails }