const express = require("express")
const router = express.Router()
const {addNewMemberController , editMemberController , getDetailsController, deleteMemberController , getMembersController , getSectionMembersController} = require("../controller/members.controller")
const { validateAdminToken } = require("../middlewares/admins.middleware")
router.get("/", (req, res) => {
    res.send("Members")
})

router.get("/getSections", getSectionMembersController)

router.post("/new",validateAdminToken, addNewMemberController)

router.post("/edit",validateAdminToken, editMemberController)

router.delete("/delete/:id", validateAdminToken,deleteMemberController)

router.get("/get",validateAdminToken,getMembersController)

router.get("/:id",validateAdminToken, getDetailsController)

module.exports = router
