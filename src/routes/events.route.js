const express = require("express")
const {addNewEventController , editEventController , deleteEventController , getEventsController , getNumbersController , addAttendeeController , deleteAttendeeController , getParticipantsController} = require("../controller/event.controller")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Events")
})

router.post("/new", addNewEventController)

router.post("/edit",editEventController)

router.delete("/delete/:id", deleteEventController)

router.post("/addAttendee/:id",addAttendeeController)   //user id send in body

router.delete("/deleteAttendee/:id",deleteAttendeeController)   //user id send in body

router.get("/get",getEventsController)

router.get("/getNumbers/:id",getNumbersController)        // sends the number of participants of each categ .

router.get("/getParticipants/:id",getParticipantsController)       //sends the list of participants as attended and non-attended sections



module.exports = router
