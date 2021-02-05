const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('dotenv').config();

const server = express();
const port = 4000;

server.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    credentials: false,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
}

server.use(cors(corsOptions));

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

routes(server);

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGOALTLAS_KEY, {dbName: 'Cluster0', useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
  //.connect('mongodb://localhost:27017/loanie')
  .then(function() {
    console.log('Database connected successfully to Mongolab');
  })
  .catch(function(err) {
    console.log('DB connection failed..', err.message);
  });
