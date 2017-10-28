const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Send welcome message to user on connection
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App!',
    createdAt: new Date().getTime()
  });

  // Send message to everyone else on connection
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined!',
    createdAt: new Date().getTime()
  });

  // Listen for messages from user
  socket.on('createMessage', (msg) => {
    // Send that message to everyone connected
    io.emit('newMessage', {
      ...msg,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});