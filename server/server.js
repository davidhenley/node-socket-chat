const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Send welcome message to user on connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  // Send message to everyone else on connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  // Listen for messages from user
  socket.on('createMessage', ({ from, text }, cb) => {
    // Send that message to everyone connected
    io.emit('newMessage', generateMessage(from, text));
    cb('This is from the server!');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});