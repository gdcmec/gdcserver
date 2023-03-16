const express = require('express');
const router = express.Router();
const {
  addNewMemberController,
  editMemberController,
  deleteMemberController,
  getMembersController,
} = require('../controller/members.controller');
router.get('/', (req, res) => {
  res.send('Members');
});

router.post('/new', addNewMemberController);

router.post('/edit', editMemberController);

router.post('/delete', deleteMemberController);

router.get('/get', getMembersController);

module.exports = router;
