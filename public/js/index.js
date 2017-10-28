const socket = io();

const messageList = document.getElementById('message-list');
const messageForm = document.getElementById('message-form');
const messageText = document.getElementById('message-text');
const locationBtn = document.getElementById('send-location-btn');

if (!navigator.geolocation) {
  locationBtn.style.display = 'none';
}

window.onload = function() {
  messageText.focus();
}

function onFormSubmit(e) {
  e.preventDefault();
  socket.emit('createMessage', { from: 'User', text: messageText.value });
  messageText.value = '';
}

function onReceiveMessage(msg) {
  const item = document.createElement('li');
  item.textContent = `${msg.from}: ${msg.text}`;
  messageList.appendChild(item);
}

function onReceiveLocationMessage(msg) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.setAttribute('href', msg.url);
  link.setAttribute('target', '_blank');
  link.innerHTML = 'My current location';
  item.textContent = `${msg.from}: `;
  item.appendChild(link);
  messageList.appendChild(item);
}

function onSendLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err) {
    alert('You must allow this app to view your current location.');
  });
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
socket.on('newLocationMessage', onReceiveLocationMessage);
messageForm.addEventListener('submit', onFormSubmit);
locationBtn.addEventListener('click', onSendLocation);