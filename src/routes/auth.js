const express = require('express');
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const { userAuth } = require("../middlewares/auth");
const { validateSignUpData } = require('../utils/validation')
const bcrypt = require('bcrypt');
const { TokenExpiredError } = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        //Validation of data 
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body
        //Encrypt the password  npm i bcrypt
        const passwordHash = await bcrypt.hash(password, 10)
        // Creating a new instance of the user model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });
        //Will save to database and returns a promise

        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT token
            const token = await user.getJWT();  //offload work to schema methods 
            //Add the token to cookie and send the resp[onse back to the user 
            res.cookie("token", token, { expires: new Date(Date.now() + 4 * 90600000) });
            res.send("Login Successful!!!")
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})
module.exports = authRouter