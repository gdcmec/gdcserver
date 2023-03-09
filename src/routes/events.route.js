const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Events")
})

router.post("/event/new", (req, res) => {
  res.send("New event")
})

router.post("/event/edit", (req, res) => {
  res.send("Edit event")
})

router.post("/event/delete", (req, res) => {
  res.send("Delete event")
})

module.exports = router
