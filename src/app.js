const express = require('express')
const connectDB = require("./config/database")
const app = express() // create new we server 
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')


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
    app.listen(7777, () => {
        console.log("server is successfully listning on port 7777 ...")
    })
}).catch(err => {
    console.log("Database can't be connected!!....")
})

