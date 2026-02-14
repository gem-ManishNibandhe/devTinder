//logic to connect to database
// to  connect to db ,schema's to node we will be using mongoose library 

const mongoose = require('mongoose');

const connectDB = async () => { 
    await mongoose.connect(
        process.env.DB_CONNECTION_SECRET);  //connect to cluster...and if its with/devTinder then it will create/establish devTinder db if not present
   
}
 
module.exports = connectDB;

