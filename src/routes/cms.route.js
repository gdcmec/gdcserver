const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("CMS")
})

router.use("/events", require("./events.route"))
router.use("/members", require("./members.route"))
router.use("/users", require("./users.route"))
router.use("/admins", require("./admins.route"))
router.use("/static", require("./static.route"))

module.exports = router
