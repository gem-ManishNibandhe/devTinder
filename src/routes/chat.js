const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { Chat } = require('../models/chat');
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    const {targetUserId} = req.params;
    const userId=req.user._id;
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] }, // both userId and targetUserId present
        }).populate({
            path: 'messages.senderId',
            select: 'firstName lastName' // only select firstName and lastName of the sender    
            
        });

        if (!chat) {
            // If no chat document exists for these participants, create a new one
            chat = new Chat({ participants: [userId, targetUserId], messages: [] });
            await chat.save();
        }

        res.json({ chatId: chat._id, messages: chat.messages });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
});

module.exports = chatRouter;