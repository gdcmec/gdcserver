const {getUsersController , addUserController , deleteUserController , getUserEventsController, editUserController} = require('../controller/users.controller');

const router = require('express').Router();

router.get('/get', getUsersController);

router.post('/new', addUserController)

router.delete('/delete/:id', deleteUserController)

router.get('/get-events/:id', getUserEventsController)

router.post('/edit', editUserController)


module.exports = router;