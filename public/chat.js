//Make connection

const socket = io.connect(`https://limitless-reef-90330.herokuapp.com:${process.env.PORT}`)

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      button = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback')

// Emit events
button.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  })
  message.value = ""
})

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})


// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = ''
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})