const users = [];
let io;

function init(server) {
  io = require('socket.io')(server, {
    cors: {
      origin: ["http://localhost:3000", "https://www.irespond.africa"],
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', onConnection);
}

function onConnection(socket) {
  console.log('Client connected');

  socket.on('join_room', JoinRoom);
  socket.on('send_message', SendMessage);
  socket.on('message', Message);
  socket.on('newUser', onNewUser);
  socket.on('disconnect', onSocketDisconnect);
}

function JoinRoom(data) {
  console.log(data);

  const { room, user } = data;
  socket.join(room);

  const message = `Hi ${user}! Welcome to the ${room} lane`;
  socket.emit('join_message', message);
  socket.broadcast.to(room).emit('message', {
    room,
    user: 'irespond bot',
    message: `${user} has joined ${room} lane`,
  });
}

function SendMessage(data) {
  socket.to(data.room).emit('message', data);
}

function Message(data) {
  io.emit('messageResponse', data);
}

function onNewUser(data) {
  users.push(data);
  socket.emit('newUserResponse', users);
}

function onSocketDisconnect() {
  io.emit('message', {
    room: '',
    user: 'irespond bot',
    message: 'someone left the lane',
    time: Date.now(),
  });

  users = users.filter((user) => user.socketID !== socket.id);
  io.emit('newUserResponse', users);

  socket.disconnect();
}

module.exports = { init };