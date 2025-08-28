const express = require('express')
const { userAuth } = require("../middlewares/auth");
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { validateEditProfileData } = require('../utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator')
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;


        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName} Profile updated successfully`,
            data: loggedInUser
        })
    } catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})

profileRouter.patch('/profile/password', async (req, res) => {
    try {
        const { emailId, password, newPassword } = req.body
        const user = await User.findOne({ emailId: emailId })
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid Credential");
        }

        // Hash new password
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Enter strong password!");
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash
        await user.save()
        res.send("Password updated successfully");
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})

module.exports = profileRouter