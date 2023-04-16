const express = require("express")
const {addNewEventController , editEventController , deleteEventController , getEventHeadersController,getEventDetailsController , getNumbersController , addAttendeeController , deleteAttendeeController , getParticipantsController} = require("../controller/events.controller")
const { validateAdminToken } = require("../middlewares/admins.middleware")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Events")
})

router.get("/getHeaders",getEventHeadersController)    //sends the headers of all events
router.post("/new",validateAdminToken, addNewEventController)

router.post("/edit",validateAdminToken,editEventController)

router.delete("/delete/:id", validateAdminToken,deleteEventController)

router.post("/addAttendee/:id",validateAdminToken,addAttendeeController)   //user id send in body

router.post("/deleteAttendee/:id",validateAdminToken,deleteAttendeeController)   //user id send in body

router.get("/get/:id",validateAdminToken,getEventDetailsController)


router.get("/getNumbers/:id",validateAdminToken,getNumbersController)        // sends the number of participants of each categ .

router.get("/getParticipants/:id",validateAdminToken,getParticipantsController)       //sends the list of participants as attended and non-attended sections



module.exports = router
