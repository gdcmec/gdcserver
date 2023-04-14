
const {
    getAboutController ,
    getTechStackController ,
    AddTechStackController ,
    editTechStackController ,
    deleteTechStackController ,
    editAboutController,
    getStaticController
} = require('../controller/static.controller');

const router = require('express').Router();

router.get('/get',getStaticController )
router.get('/about', getAboutController);
router.get('/techstack', getTechStackController);
router.post('/newTech', AddTechStackController);
router.post('/editTech', editTechStackController);
router.delete('/deleteTech/:id', deleteTechStackController);
router.post('/editAbout', editAboutController);

module.exports = router;


