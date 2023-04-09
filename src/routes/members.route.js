const express = require("express")
const router = express.Router()
const {addNewMemberController , editMemberController , getDetailsController, deleteMemberController , getMembersController} = require("../controller/members.controller")
router.get("/", (req, res) => {
    res.send("Members")
})

router.post("/new", addNewMemberController)

router.post("/edit", editMemberController)

router.delete("/delete/:id", deleteMemberController)

router.get("/get", getMembersController)

router.get("/:id", getDetailsController)

module.exports = router
