const express = require('express');
const organizationRoutes = require('./routes/OrganizationRoute')
const laneRoutes = require('./routes/LaneRoute');
const userRoutes = require('./routes/UserRoutes');
const app = express();

const cors = require("cors");

const { Server } = require('socket.io');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const mongoose = require('mongoose');

const swaggerOption = {
  swaggerDefinition: (swaggerJSDoc.Options = {
      info: {
          title: "Koporate Lanes-API",
          description: "API documentation for iRespond Koporate",
          contact: {
              name: "Bolaji Adams",
          },
          servers: ["http://localhost:3000/"],
      },
  }),
  apis: ["app.js", "./routes/*.js"]
};

let users = [];

const swaggerDocs = swaggerJSDoc(swaggerOption);

//middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors( {
  origin: ["http://localhost:3000", "https://www.irespond.africa"]
}));


const formatMessage = (room, author, message, time) => {
  return {
    room,
    author,
    message,
    time,
  };
};

//database connection

const dbURI = 'mongodb+srv://irespond:insidelife@cluster0.rbh1c.mongodb.net/koporate?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(8080);
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000", "https://www.irespond.africa"],
        methods: ["GET", "POST"]
      }
      });
    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.on("disconnect", () =>{
        io.emit("message",formatMessage('', 'irespond bot', 'someone left the lane', `time: ${Date.now}`) );

        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        io.emit('newUserResponse', users);
        socket.disconnect();
      });

      socket.on("join_room", (data) => {
        // console.log(data)
        socket.join(data.room);
        // console.log(`User with ID: ${socket.id} joined room ${data}`);
        socket.emit(
          "join_message",
          `Hi ${data.user}! Welcome to the ${data.room} lane`
        );
        socket.broadcast
          .to(data.room)
          .emit(
            "message",
            formatMessage(
              `${data.room}`,
              "irespond bot",
              `${data.user} has joined ${data.room} lane`
            )
          );
      });
    
      socket.on("send_message", (data) => {
        socket.to(data.room).emit("message", data);
      });

      socket.on('message', (data) => {
        io.emit('messageResponse', data);
      });
    
      socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        socket.emit('newUserResponse', users);
      });
    
      
    });
  })
  .catch((err) => console.log(err));


//routes

app.use(organizationRoutes);
app.use(laneRoutes);
app.use(userRoutes);

