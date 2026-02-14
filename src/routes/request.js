const express = require('express')
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')

const sendEmail = require("../utils/sendEmail")   

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type:" + status })
        }


        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User not found" })
        }

        // If there is an existing ConnectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [                                                     //logical OR in mongo db
                { fromUserId, toUserId },                         //If manish sent connection request to elon or vice-versa 
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        })
        // findOne returns a single document or null — check for existence directly
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection Request Already Exists!!" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();

        // Send email notification to the toUser about the new connection request
        const emailRes= await sendEmail.run('A new connection request from ' + req.user.firstName, req.user.firstName + " is " + status + " in " + toUser.firstName + ' '+toUser.lastName);
       

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        })
        
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const { status, requestId } = req.params;
        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!!" })
        }

    // requestId param is the connection request's _id, not the fromUserId — query by _id
    const connectionRequest = await ConnectionRequest.findOne({ _id: requestId, toUserId: loggedInUser._id, status: "interested" }).populate("fromUserId", ["firstName", "lastName"]);
        console.log(connectionRequest);
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        connectionRequest.status = status;
        // _id: requestId, toUserId: loggedInUser._id,
        const data = await connectionRequest.save();
        res.json({ message: "Connection request " + status, data })
        // Validate the status
        // Manish => Elon
        // Is Elon logged in user == toUserID
        // status = interested 
        // Request Id should be valid

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }


})

module.exports = requestRouter;