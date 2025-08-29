const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all the pending connection request for the loggedIn user 

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    const loggedInUser = req.user;
    try {
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", 'age']); //fetch fromUserId first,lastName , second params is filter

        res.json({ "message": "Data fetched successfully", data: connectionRequests })
    } catch (err) {
        req.statusCode(400).send("ERROR: " + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {
        // Manish => Elon =>accepted
        //     Elon =>Mark = >accepted
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id, status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id, status: "accepted"
                },
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })
        res.json({ data: data })
    } catch (err) {
        res.statusCode(400).send("ERROR: ", err.message)
    }
})
module.exports = userRouter;