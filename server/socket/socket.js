const { generateMessage, generateLocationMessage } = require('../utils/message');

module.exports = (socket, io) => {
  console.log('New user connected');

  // Send welcome message to user on connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  // Send message to everyone else on connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  // Listen for messages from user
  socket.on('createMessage', ({ from, text }, callback) => {
    // Send that message to everyone connected
    io.emit('newMessage', generateMessage(from, text));
    // Respond to acknowledge receipt
    if (callback) callback();
  });

  // Listen for location from user
  socket.on('createLocationMessage', ({ latitude, longitude }, callback) => {
    // Send that location to everyone connected
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
    // Respond to acknowledge receipt
    if (callback) callback();
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
}