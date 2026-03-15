const socketio = require('socket.io')
const { Chat } = require('../models/chat')
const ConnectionRequestModel = require('../models/connectionRequest')
const inilitizeSocket = (server) => {
    
    const io = socketio(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on('connection', (socket) => {

        socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join('-'); //create a unique id for the chat room by sorting the user ids and joining them with a separator
            socket.join(roomId)
        })

        socket.on('sendMessage', async ({ firstName, lastName, userId, targetUserId, text }) => {
            // Save the message to the database
            try {
                const roomId = [userId, targetUserId].sort().join('-');

                //also check if both userId and targetUserId are friends before allowing them to chat. This is a security measure to prevent unauthorized chats between non-friends.

                // check if both userId and targetUserId are friends before allowing them to chat
                const connectionRequest = await ConnectionRequestModel.findOne({
                    $or: [
                        { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
                        { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
                    ],
                });

                if (!connectionRequest) {
                    console.log("Users are not friends. Message not sent.");
                    return; // exit without saving or emitting the message
                }

                // find existing chat between participants
                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] }, // both userId and targetUserId present
                });

                if (!chat) {
                    // If no chat document exists for these participants, create a new one
                    chat = new Chat({ participants: [userId, targetUserId], messages: [] });
                }

                // add the new message and save
                chat.messages.push({ senderId: userId, text });
                await chat.save();

                // emit the message to everyone in the room (including sender)
                io.to(roomId).emit('receiveMessage', { firstName, lastName, text });
            } catch(err) { 
                console.error('Error saving message to database: ', err);
            }
    
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected with id ' + socket.id);
        });
    })
}

module.exports = inilitizeSocket