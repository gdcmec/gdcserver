const bcrypt = require('bcrypt');
const { addAdmin, removeAdmin, exists, validate, createAdminToken, getAdmin } = require('../services/admins.services');
const { daysToMilliSeconds } = require('../utils/auth_utils')
const { verify } = require('jsonwebtoken')

const adminLoginController = async (req, res) => {
    const { username, password } = req.body.credentials
    if (!await exists(username)) {
        res.status(500).send({ success: false, message: 'Username does not exist!' })
        return
    }
    if (!await validate(username, password)) {
        res.status(500).send({ success: false, message: 'Incorrect password!' })
        return
    }
    const access_token = createAdminToken(await getAdmin(username))
    res.cookie("access-token", access_token, {
        maxAge: daysToMilliSeconds(3),
        httpOnly: true,
    })
    res.status(200).send({ success: true, message: 'Logged In' })
}

const adminRegisterController = async (req, res) => {
    const { username, password } = req.body.credentials
    if (await exists(username)) {
        res.status(500).send({ success: false, message: 'Username already exists' })
        return;
    }
    const hashed_password = await bcrypt.hash(password, 10);
    if (await addAdmin(username, hashed_password)) {
        const access_token = createAdminToken(await getAdmin(username))
        res.cookie("access-token", access_token, {
            maxAge: daysToMilliSeconds(3),
            httpOnly: true,
        })
        res.status(200).send({ success: true, message: 'Admin successfully registered' })
        return;
    }
    res.status(500).send({ success: false, message: 'Admin registration failed!' });
}

const getAdminController = async (req, res) => {
    if (!req.authenticated) {
        res.status(500).send({ success: false, message: 'Not authenticated!' })
        return
    }
    const decoded_token = verify(req.cookies["access-token"], process.env.SECRET_KEY)
    res.status(200).send({ success: true, message: { id: decoded_token.id, username: decoded_token.username } })
}

const adminLogoutController = async (req, res) => {
    if (!req.authenticated) {
        res.status(500).send({ success: false, message: 'Not authenticated!' })
        return
    }
    res.clearCookie("access-token")
    res.status(200).send({ success: true, message: 'Logged out' })
}

const adminRemoveController = async (req, res) => {
    if (!req.authenticated) {
        res.status(500).send({ success: false, message: 'Not authenticated!' })
        return
    }
    const decoded_token = verify(req.cookies["access-token"], process.env.SECRET_KEY)
    const admin_id = decoded_token.id
    if (await removeAdmin(admin_id)) {
        res.clearCookie("access-token")
        res.status(200).send({ success: true, message: "Admin removed successfully" });
        return
    }
    res.status(500).send({ success: false, message: "Admin removal failed!" });
}

const adminAuthenticationStatusController = async (req, res) => {
    res.status(200).send(req.authenticated)
}

module.exports = { adminLoginController, getAdminController, adminRegisterController, adminLogoutController, adminRemoveController, adminAuthenticationStatusController };