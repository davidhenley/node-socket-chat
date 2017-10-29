const socket = io();

const messageList = document.getElementById('message-list');
const messageForm = document.getElementById('message-form');
const messageText = document.getElementById('message-text');
const locationBtn = document.getElementById('send-location-btn');

if (!navigator.geolocation) {
  locationBtn.style.display = 'none';
}

function onFormSubmit(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    { from: 'User', text: messageText.value },
    function() {
      messageText.value = '';
      messageText.focus();
    }
  );
}

function onReceiveMessage(msg) {
  const item = document.createElement('li');
  const formattedTime = new Date(msg.createdAt).toLocaleTimeString();
  item.textContent = `${msg.from} ${formattedTime}: ${msg.text}`;
  messageList.appendChild(item);
}

function onReceiveLocationMessage(msg) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const formattedTime = new Date(msg.createdAt).toLocaleTimeString();
  link.setAttribute('href', msg.url);
  link.setAttribute('target', '_blank');
  link.innerHTML = 'My current location';
  item.textContent = `${msg.from} ${formattedTime}: `;
  item.appendChild(link);
  messageList.appendChild(item);
}

function onSendLocation() {
  locationBtn.textContent = 'Sending Location';
  locationBtn.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function() {
      locationBtn.textContent = 'Send Location';
      locationBtn.removeAttribute('disabled');
      messageText.focus();
    });
  }, function(err) {
    alert('You must allow this app to view your current location.');
    locationBtn.textContent = 'Send Location';
    locationBtn.removeAttribute('disabled');
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