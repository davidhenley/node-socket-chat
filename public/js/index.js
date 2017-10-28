const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(msg) {
  console.log(msg);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

const messageForm = document.getElementById('message-form');
const messageText = document.getElementById('message');

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', { from: 'User', text: messageText.value });
  messageText.value = '';
});