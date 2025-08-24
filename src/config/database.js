//logic to connect to database
// to  connect to db ,schema's to node we will be using mongoose library 

const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://manunibandhe5:0P37iUdJybIVGCnf@namsatenode.ojkd1u0.mongodb.net/devTinder');
}

module.exports = connectDB;

