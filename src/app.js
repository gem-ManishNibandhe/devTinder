const express = require('express')
const connectDB = require("./config/database")
const app = express() // create new we server 
const User = require('./models/user')


app.use(express.json())  // middleware to read json data into js format . Difining here will work for all apis

app.post('/signup', async (req, res) => {
    // Creating a new instance of the user model
    const user = new User(req.body)

    //Will save to database and returns a promise
    try {
        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

//Get user by email

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.findOne({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Feed API - GET/feed - get all the user from the db
app.get('/feed', async (req, res) => {
    // const userEmail = req.body.emailId;

    try {
        const users = await User.find({});   // will get all the documents from the db
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Delete user from DB
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)

        res.send("User Deleted Successfully")
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// 
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body

    const ALLOWED_UPDATES = [
        "photoUrl", "about", "gender", "age", "skills"
    ]

    console.log(data)


    try {
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not Allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { "returnDocument": 'before', runValidators: true, }) //returnDocument will return old data before the update
        console.log(user)
        res.send("User Data upadted successfully")
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message)
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

