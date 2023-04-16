
const {
    getAboutController ,
    getTechStackController ,
    AddTechStackController ,
    editTechStackController ,
    deleteTechStackController ,
    editAboutController,
    getStaticController
} = require('../controller/static.controller');
const { validateAdminToken } = require('../middlewares/admins.middleware');

const router = require('express').Router();

router.get('/get',getStaticController )
router.get('/about', getAboutController);
router.get('/techstack', getTechStackController);
router.post('/newTech',validateAdminToken, AddTechStackController);
router.post('/editTech',validateAdminToken,editTechStackController);
router.delete('/deleteTech/:id',validateAdminToken, deleteTechStackController);
router.post('/editAbout',validateAdminToken, editAboutController);

module.exports = router;


