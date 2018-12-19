"use strict";

const CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

//import libraries
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');

//import internal dependencies
const testRoute = require("./app/routes/test.route.js");

//app starter
const app = express();
const server = http.createServer(app);

//use external modules
app.use(bodyParser.urlencoded({ extended: true }));

//use local routes
app.use(testRoute);

//use static routes
app.use("/", express.static(path.join(__dirname, "/public")));

//start server
server.listen(CONFIG.port);
