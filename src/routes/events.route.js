const express = require("express")
const addNewEventController = require("../controllers/AddEventController")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Events")
})

router.post("/event/new", addNewEventController)

router.post("/event/edit", (req, res) => {
  res.send("Edit event")
})

router.post("/event/delete", (req, res) => {
  res.send("Delete event")
})

module.exports = router
