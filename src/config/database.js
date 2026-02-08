//logic to connect to database
// to  connect to db ,schema's to node we will be using mongoose library 

const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://manunibandhe5:CdNr7PKC7M0ykYAJ@namsatenode.ojkd1u0.mongodb.net/devTinder');  //connect to cluster...and if its with/devTinder then it will create/establish devTinder db if not present
    console.log('MongoDB connected');
}
 
module.exports = connectDB;

