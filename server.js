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

//Static file setup
app.use(express.static('public'))

//Socket setup

const io = socket(server)

io.on('connection',function(socket){
  console.log('made socket connection', socket.id)

  socket.on('chat', function(data){
  io.sockets.emit('chat', data)
  })
})
