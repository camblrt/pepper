"use strict";

const CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

const express = require("express");
const session = require('express-session');
const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');

//import internal dependencies
const defaultRoute = require("./app/routes/default.route.js");
const gameRoute = require("./app/routes/game.route.js");
const IOController = require("./app/controllers/io.controller.js");

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

global.socketIO = io;
IOController.listen(io);

app.use(session({
    secret:'H4RD2FINDSECRET',
    resave : true,
    saveUninitialized : true
}));
app.use(bodyParser.urlencoded({ extended: true }));

//use local routes
app.use(defaultRoute);
app.use(gameRoute);

//use static routes
app.use("/0924toiwdhg2TOKAREV223578098765redcvbnkiuytrew34567uyhgbnmk", express.static(path.join(__dirname, "/buildPepper")));
app.use("/static", express.static(path.join(__dirname, "/buildPepper/static")));

app.use("/", express.static(path.join(__dirname, "/buildUser")));

//start server
server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
