const {pool} = require("../config/postgres");

const editAbout = async (aboutUs) => {
    try {
        const query =`
            UPDATE aboutus SET title = $1, description = $2 WHERE id = $3 RETURNING *;
        `
        const result = await pool.query(query, [aboutUs.title, aboutUs.description, aboutUs.id])
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const getAbout = async () => {  
    try {
        const result = await pool.query("SELECT * FROM aboutus ORDER BY priority ASC")
        return {
            what : result.rows[0],
            why : result.rows[1],
            how : result.rows[2]
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const AddTechStack = async (techStack) => {
    try {
        const result = await pool.query("INSERT INTO techstack (title,description) VALUES ($1,$2) RETURNING *", [techStack.title , techStack.description])
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const editTechStack = async (techStack) => {
    try {
        const result = await pool.query("UPDATE techstack SET title = $1, description = $2 WHERE id = $3 RETURNING *", [techStack.title, techStack.description, techStack.id])
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deleteTechStack = async (id) => {
    try {
        const result = await pool.query("DELETE FROM techstack WHERE id = $1", [id])
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const getTechStack = async () => {
    try {
        const result = await pool.query("SELECT * FROM techstack")
        return result.rows;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    editAbout,
    getAbout,
    AddTechStack,
    editTechStack,
    deleteTechStack,
    getTechStack
}


