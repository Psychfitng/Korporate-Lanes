const express = require("express");
const organizationRoutes = require("./routes/OrganizationRoute");
const laneRoutes = require("./routes/LaneRoute");
const userRoutes = require("./routes/UserRoutes");
const app = express();
const moment = require("moment");

const cors = require("cors");

const { Server } = require("socket.io");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const mongoose = require("mongoose");

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
  apis: ["app.js", "./routes/*.js"],
};

let users = [];

const swaggerDocs = swaggerJSDoc(swaggerOption);

//middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.irespond.africa"],
  })
);

const formatMessage = (room, author, message, time) => {
  return {
    room,
    author,
    message,
    time: moment().format("h:mm a"),
  };
};

//database connection

const dbURI =
  "mongodb+srv://irespond:insidelife@cluster0.rbh1c.mongodb.net/koporate?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(8080);
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000", "https://www.irespond.africa"],
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      socket.on("join_room", ({ username, room }) => {
        users[socket.id] = { id: socket.id, username, room };

        io.emit("roomData", Object.values(users));

        socket.join(room);
        socket.emit(
          "join_message",
          `Hi ${username}! Welcome to the ${room} lane`
        );

        socket.broadcast
          .to(room)
          .emit(
            "message",
            formatMessage(
              `${room}`,
              "irespond bot",
              `${username} has joined ${room} lane`
            )
          );
      });

      io.emit("roomData", Object.values(users));

      socket.on("disconnect", () => {
        if (users[socket.id]) {
          io.emit(
            "message",
            formatMessage(
              ``,
              "irespond bot",
              `${users[socket.id]?.username} left the lane`
            )
          );
        }

        delete users[socket.id];

        io.emit("roomData", Object.values(users));
      });

      socket.on("send_message", (data) => {
        socket.to(data.room).emit("message", data);
      });

      socket.on("send_private_message", (data) => {
        // get sender information from connectedUsers object

        const sender = users[data.id];

        socket.to(sender.id).emit("message", data);
      });
    });
  })
  .catch((err) => console.log(err));

//routes

app.use(organizationRoutes);
app.use(laneRoutes);
app.use(userRoutes);
