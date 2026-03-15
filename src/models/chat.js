const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: true 
        }, //user id of the sender
    text: { 
        type: String, 
        required: true 
    },
    
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true }], //array of user ids who are part of the chat
    messages: [messageSchema]
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = {Chat}