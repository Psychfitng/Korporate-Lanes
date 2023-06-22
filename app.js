const express = require("express");
require("dotenv").config();
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
  process.env.MONGO_URL;
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

// const dbURI = 'mongodb://localhost:27017/korporatelanes'

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app);
socket.init(server)

//routes

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(8000, ()=>{
  console.log("Server is running on port 8080 !!!");
})
app.use('/api', organizationRoutes);
app.use('/api', laneRoutes);
app.use('/api', userRoutes);

