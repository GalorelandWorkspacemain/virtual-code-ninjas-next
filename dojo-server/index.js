const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', socket => {
  console.log('connected', socket.id);

  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { id: socket.id, username });
  });

  socket.on('code-change', ({ roomId, code }) => {
    socket.to(roomId).emit('code-update', { code, from: socket.id });
  });

  socket.on('cursor-update', ({ roomId, cursor }) => {
    socket.to(roomId).emit('cursor-update', { cursor, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });
});

server.listen(4000, () => console.log('Dojo server listening on 4000'));
