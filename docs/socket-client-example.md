Client Socket.io example (browser)

This example shows how a browser client should connect to the server, join a room and send/receive messages.

Requirements:
- Make sure the server is running and socket.io server is initialized with CORS allowing your origin (http://localhost:5173)
- In the browser you can use the socket.io client from CDN or install `socket.io-client`.

CDN usage (paste into browser console or a static HTML):

<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
  // create socket and connect
  const socket = io('http://localhost:7777', { withCredentials: true })

  const userId = 'USER123'
  const targetUserId = 'USER456'
  const firstName = 'Rahul'

  // listen for the server's join acknowledgement
  socket.on('joinAck', (data) => {
    console.log('Join acknowledged', data)
    // safe to enable message UI now
  })

  // listen for incoming messages
  socket.on('receiveMessage', ({ firstName, text }) => {
    console.log('Incoming:', firstName, text)
  })

  // join a chat room and provide an optional callback
  socket.emit('joinChat', { firstName, userId, targetUserId })

  // send a message to the room
  function sendMessage(text) {
    socket.emit('sendMessage', { firstName, userId, targetUserId, text })
  }
</script>

Node / React (npm install socket.io-client)

import { io } from 'socket.io-client'

const socket = io('http://localhost:7777', { withCredentials: true })

socket.on('connect', () => console.log('connected', socket.id))

socket.on('joinAck', (data) => console.log('joinAck', data))
socket.on('receiveMessage', ({ firstName, text }) => console.log('msg', firstName, text))

function join(userId, targetUserId, firstName) {
  socket.emit('joinChat', { userId, targetUserId, firstName })
}

function sendMessage(userId, targetUserId, firstName, text) {
  socket.emit('sendMessage', { userId, targetUserId, firstName, text })
}
