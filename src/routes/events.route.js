const express = require("express")
const {addNewEventController , editEventController , deleteEventController} = require("../controller/event.controller")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Events")
})

router.post("/new", addNewEventController)

router.post("/edit",editEventController)

router.post("/delete", deleteEventController)

module.exports = router
