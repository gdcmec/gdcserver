const {getUsersController , addUsersController , deleteUserController , getUserEventsController, editUserController} = require('../controllers/users.controller');

const router = require('express').Router();

router.get('/get/:id', getUsersController);

router.post('/new', addUsersController)

router.delete('/delete/:id', deleteUserController)

router.get('get-events/:id', getUserEventsController)

router.post('/edit', editUserController)




module.exports = router;