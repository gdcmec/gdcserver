const express = require("express")
const { validateAdminToken } = require("../middlewares/admins.middleware")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("CMS")
})

router.use("/events", require("./events.route"))
router.use("/members", require("./members.route"))
router.use("/users", validateAdminToken ,require("./users.route"))
router.use("/admins", require("./admins.route"))
router.use("/static", require("./static.route"))

module.exports = router
