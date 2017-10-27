const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});