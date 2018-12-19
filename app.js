"use strict";

const CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/public")));

server.listen(CONFIG.port);
