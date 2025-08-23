const express = require('express')

const app = express() // create new we server 

//request handler

//this will only handle GET call to /user
app.get("/user", (req, res, next) => {
    next();
    res.send({ firstName: 'Manish', lastName: 'Nibandhe' })
}, (req, res) => {
    console.log("Handling the route user 2!!")
    res.send("2nd Response")
})


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




// after create listen to some port 
app.listen(7777, () => {
    console.log("server is successfully listning on port 7777 ...")
})
