// load environment variables from .env (project root or src/.env)
// dotenv is only for local development; in production set env vars in the host/container
try {
    const path = require('path')
    const dotenv = require('dotenv')
    const rootEnv = path.resolve(process.cwd(), '.env')
    const srcEnv = path.resolve(process.cwd(), 'src', '.env')

    let result = dotenv.config({ path: rootEnv })
    if (result.error) {
        result = dotenv.config({ path: srcEnv })
        if (!result.error) console.log('Loaded environment from', srcEnv)
    } else {
        console.log('Loaded environment from', rootEnv)
    }
} catch (e) {
    // ignore if dotenv isn't installed or file not present
}  //. code to get env variables from .env file and set in process.env. This is only for local development. In production, env vars should be set in the hosting environment (e.g., via Docker, cloud provider settings, etc.)




const express = require('express')
const connectDB = require("./config/database")
const app = express() // create new we server 
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const cors = require('cors')



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
    app.listen(7777, () => {
        console.log("server is successfully listning on port 7777 ...")
    })
}).catch(err => {
    console.log("Database can't be connected!!....")
})

