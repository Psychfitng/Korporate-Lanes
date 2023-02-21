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

const swaggerDocs = swaggerJSDoc(swaggerOption);

//middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());


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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
      });
    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.on("disconnect", () =>{
        io.emit("message",formatMessage('', 'irespond bot', 'someone left the lane', `time: ${Date.now}`) )
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
      
    });
  })
  .catch((err) => console.log(err));


//routes

app.use(organizationRoutes);
app.use(laneRoutes);
app.use(userRoutes);

