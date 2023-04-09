const { pool } = require('../config/postgres');
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const addAdmin = async (username, password) => {
    try {
        await pool.query("INSERT INTO admins (username, password) VALUES ($1, $2)", [username, password])
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const removeAdmin = async (id) => {
    try {
        await pool.query("DELETE FROM admins WHERE id = $1", [id]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getAdmin = async (username) => {
    try {
        const result = await pool.query("SELECT id, username FROM admins WHERE username = $1", [username])
        return result.rows[0]
    } catch (err) {
        console.log(err)
        return null
    }
}

const exists = async (username) => {
    try {
        const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const validate = async (username, password) => {
    if (!await exists(username)) {
        return false
    }
    try {
        const admin_password = await pool.query("SELECT password FROM admins WHERE username = $1", [username])
        const result = await bcrypt.compare(password, admin_password.rows[0].password)
        return result
    } catch (err) {
        console.log(err)
        return false
    }
}

const createAdminToken = (admin) => {
    const access_token = sign(
        admin,
        process.env.SECRET_KEY
    )
    return access_token
}

module.exports = { addAdmin, removeAdmin, exists, getAdmin, createAdminToken, validate };