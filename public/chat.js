//Make connection

// const socket = io.connect('https://limitless-reef-90330.herokuapp.com')
const socket = io.connect('http://localhost:5000')

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      button = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback')
      gifSearch = document.getElementById('gifsearch')
      fileUpload = document.getElementById('file-upload')

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

gifSearch.addEventListener('click', function(){

})


// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = ''
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})