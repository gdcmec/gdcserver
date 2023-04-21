const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { validateAdminToken } = require("./middlewares/admins.middleware")
require("dotenv").config()

const port = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(express.json())
//body parser
app.use(express.urlencoded({ extended: true }))

const corsOptions ={
    origin:['http://localhost:3001','http://localhost:5173' , 'http://127.0.0.1:5173' , "https://gdcdashboard.onrender.com" , "https://gdcmec.netlify.app" , "https://gdcdashboard.netlify.app" , "https://gdcmec.onrender.com"], 
    credentials:true,            //access-control-allow-credentials:true
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/cms", require("./routes/cms.route"))
app.use("/sheets", validateAdminToken, require("./routes/sheets.route"))

app.get("/", (req, res) => {
  res.send("GDC Server")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
