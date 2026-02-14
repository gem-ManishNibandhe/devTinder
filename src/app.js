
const express = require('express')
const connectDB = require("./config/database")
const app = express() // create new we server 
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const cors = require('cors')
require('dotenv').config()  // load env vars from .env file into process.env


// allow only the frontend origin (no trailing slash) and allow credentials (cookies)
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json())  // middleware to read json data into js format . Difining here will work for all apis


app.use(cookieParser())
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request') 

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);




// Always first create DB coonection and then run the port . Never run port and then connect db
connectDB().then(() => {
    console.log("Database connection established....")
    // after create listen to some port 
    app.listen(process.env.PORT, () => {
        console.log("server is successfully listning on port " + process.env.PORT + " ...")
    })
}).catch(err => {
    console.log("Database can't be connected!!....")
})

