const express = require('express')
const connectDB = require("./config/database")
const app = express() // create new we server 
const User = require('./models/user')


app.post('/signup', async (req, res) => {
    // Creating a new instance of the user model
    const user = new User({
        firstName: "Virat",
        lastName: "Kolhi",
        emailId: "ViratKolhi@gmail.com",
        password: "1234567"
    })
    //Will save to database and returns a promise
    try {
        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})


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

