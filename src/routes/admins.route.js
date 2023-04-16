const { adminLoginController, adminRegisterController, adminRemoveController, adminLogoutController, getAdminController, adminAuthenticationStatusController } = require('../controller/admins.controller');
const { validateAdminToken } = require('../middlewares/admins.middleware')

const router = require('express').Router();

router.get('/is-authenticated', validateAdminToken, adminAuthenticationStatusController)

router.get('/get-admin', validateAdminToken, getAdminController)

router.post('/register',validateAdminToken, adminRegisterController)

router.post('/login', adminLoginController)

router.delete('/logout', validateAdminToken, adminLogoutController)

router.delete('/remove', validateAdminToken, adminRemoveController)

module.exports = router;