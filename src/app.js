const express = require('express')

const app = express() // create new we server 
const { adminAuth, userAuth } = require("./middlewares/auth")

//request handler

//Handle Auth middleware for only GET requests GET , POST
// app.use('/admin', adminAuth)


//handling authorization with middleware  . Here for /admin/getAllData we do not need to use auth code as it checked above 

// app.get('/admin/getAllData', (req, res) => {
//     res.send("All data")
// })

//this will only handle GET call to /user
// app.get("/user", userAuth, (req, res, next) => {
//     res.send({ firstName: 'Manish', lastName: 'Nibandhe' })
// }, (req, res) => {
//     console.log("Handling the route user 2!!")   //middleware
//     res.send("2nd Response")
// })

//use of middleware


// query params   /user?userId=101
// app.get('/user', (req, res) => {     // check the sequencing 
//     console.log(req.query)
//     res.send({ firstName: 'Manish', lastName: 'Nibandhe' })
// })

// dynamic routes  : /user/101/username
// app.get('/user/:userId/:username', (req, res) => {
//     console.log(req.params)
//     res.send({ firstName: 'Manish', lastName: 'Nibandhe' })
// })

app.use("/", (err, req, res, next) => {
    if (err) {
        //Log your errors
        res.status(500).send("something went wrong")
    }
})

app.get('/getUserdata', (req, res) => {
    try {
        throw new Error("asf")
        res.send("User Data Sent")
    } catch (err) {
        res.status(500).send("Something  went wrong contact support team")
    }


})




// after create listen to some port 
app.listen(7777, () => {
    console.log("server is successfully listning on port 7777 ...")
})
