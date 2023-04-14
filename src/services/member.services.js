const {pool} = require('../config/postgres');

const addNewMember = async (memberDetails) => {

    try{
    const team_id = await getTeamId(memberDetails.team_name);
    
    const member = await pool.query("INSERT INTO members (name, position , team_id , class , year) VALUES ($1, $2 , $3 , $4 ,$5) RETURNING member_id",
        [memberDetails.name, memberDetails.position , team_id , memberDetails.class , memberDetails.year])
    
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
     
     const team_id = await getTeamId(memberDetails.team_name);
     const result = await pool.query("UPDATE members SET name = $1, position = $2 , class = $4 , year = $5 , team_id = $6 WHERE member_id = $3 RETURNING *",
        [memberDetails.name, memberDetails.position, memberDetails.member_id , memberDetails.class , memberDetails.year , team_id])
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

const getTeamMembers = async (team_id) => {
       
    try{ 
        const members = await pool.query("SELECT * FROM members WHERE team_id = $1", [team_id])
        return members.rows;
    }
    catch(err){
        console.log("eerror at team " ,err);
        return false;
    }

}


const getSectionMembers = async () => {

    try{
        const res = await pool.query("SELECT * FROM teams")
        const teams = res.rows;
        let sections = []
        for (let i = 0; i < teams.length; i++) {

            const members = await getTeamMembers(teams[i].team_id)
            if(!members)
                return false;
            sections.push({
                section: teams[i].team_name,
                members: members
            })
        }
        return sections;
    }
    catch(err){
        console.log("error here" , err);
        return false;
    }

}


const getDetails = async (member_id) => {

    try{
        const member = await pool.query("SELECT * FROM members , teams WHERE member_id = $1 AND members.team_id = teams.team_id ", [member_id])
        return member.rows[0];
    }
    catch(err){
        console.log(err);
        return false;
    }

}

const getTeamId = async (teamName) => {
    try{
        const team = await pool.query("SELECT team_id FROM teams WHERE team_name = $1", [teamName])
        return team.rows[0].team_id;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
     
module.exports = { addNewMember, editMember, deleteMember , getMembers , getDetails , getSectionMembers }