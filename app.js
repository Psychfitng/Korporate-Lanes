const express = require('express');
const organizationRoutes = require('./routes/OrganizationRoute')
const laneRoutes = require('./routes/LaneRoute');
const userRoutes = require('./routes/UserRoutes');
const app = express();
const cors = require("cors");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const mongoose = require('mongoose');

const swaggerOption = {
  swaggerDefinition: (swaggerJSDoc.Options = {
      info: {
          title: "Koporate Lanes-API",
          description: "API documentation",
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

//database connection

const dbURI = 'mongodb+srv://irespond:insidelife@cluster0.rbh1c.mongodb.net/koporate?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(3000);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch((err) => console.log(err));


//routes

app.use(organizationRoutes);
app.use(laneRoutes);
app.use(userRoutes);

