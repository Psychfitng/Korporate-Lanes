// const { Server } = require('socket.io');

// const cors = require("cors");

// let io;

// module.exports = {
//   init: httpServer => {
//     io = new Server(httpServer, {
//         cors: {
//           origin: "http://localhost:3000",
//           methods: ["GET", "POST"]
//         }
//         });
//     return io;
//   },
//   getIO: () => {
//     if (!io) {
//       throw new Error('Socket.io not initialized!');
//     }
//     return io;
//   }
// };