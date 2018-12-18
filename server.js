'use strict'
const express = require('express')
const socket = require('socket.io')

//App setup
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// Static files
app.use(express.static('public'))

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id)

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data)
        io.sockets.emit('chat', data)
    })

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })

})