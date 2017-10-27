const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'david@example.com',
    text: 'Hey. This is David.'
  });
});

socket.on('newMessage', function(msg) {
  console.log(msg);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});