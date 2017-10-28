const socket = io();

const messageList = document.getElementById('message-list');
const messageForm = document.getElementById('message-form');
const messageText = document.getElementById('message-text');

messageText.focus();

function onFormSubmit(e) {
  e.preventDefault();
  socket.emit('createMessage', { from: 'User', text: messageText.value });
  messageText.value = '';
}

function onReceiveMessage(msg) {
  const item = document.createElement('li');
  item.appendChild(document.createTextNode(`${msg.from}: ${msg.text}`));
  messageList.appendChild(item);
}

function onConnect() {
  console.log('Connected to server');
}

function onDisconnect() {
  console.log('Disconnected from server');
}

socket.on('connect', onConnect);
socket.on('disconnect', onDisconnect);
socket.on('newMessage', onReceiveMessage);
messageForm.addEventListener('submit', onFormSubmit);