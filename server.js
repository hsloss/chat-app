'use strict'
const express = require('express')
const app = express()
require('dotenv').config()
const socket = require('socket.io')
const mongoose = require('mongoose')

//Connect to app (local or hosted)
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//Connect database
const dbURL = 'mongodb://user:Password123@ds111618.mlab.com:11618/chat-app'
mongoose.connect(dbURL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('db connected')
})

//Create model/schema
const messageSchema = new mongoose.Schema({
    handle: String,
    message: String
  })
  
const Message = mongoose.model('Message', messageSchema)

// Static files
app.use(express.static('public'))

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id)

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
        const newMessage = new Message(data)
        console.log(newMessage)
        newMessage.save()
    })

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })

})