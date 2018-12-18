//Make connection

const socket = io.connect('http://localhost:5000')

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      button = document.getElementById('send'),
      output = document.getElementById('output');

// Emit events
button.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  })
  message.value = ""
})

// Listen for events
socket.on('chat', function(data){
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})