const { generateMessage, generateLocationMessage } = require('../utils/message');

module.exports = (socket, io) => {
  console.log('New user connected');

  // Send welcome message to user on connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  // Send message to everyone else on connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  // Listen for messages from user
  socket.on('createMessage', ({ from, text }) => {
    // Send that message to everyone connected
    io.emit('newMessage', generateMessage(from, text));
  });

  // Listen for location from user
  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    // Send that location to everyone connected
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
}