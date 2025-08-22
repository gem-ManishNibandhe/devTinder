const express = require('express')

const app = express() // create new we server 

//request handler



app.use('/test', (req, res) => {
    res.send("Hello from the server")
})

app.use('/hello', (req, res) => {
    res.send("Hello Hello Hello")
})

app.use('/', (req, res) => {
    res.send("Hello from the dashboard")
})


// after create listen to some port 
app.listen(7777, () => {
    console.log("server is successfully listning on port 7777 ...")
})
