"use strict";

const express = require("express");
const Utils = require("../utils/utils");
const fs = require("fs");
const path = require("path");
const twitter = require("../models/twitter");

const router = express.Router();
module.exports = router;

const contentDir = JSON.parse(process.env.CONFIG).contentDirectory;


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.route("/json")
    .get(function(req, res) {
        console.log("GET /json");
        Utils.listDirFilesInRes(contentDir, res);
    });

router.route("/movement")
    .post(function(req, res) {
        console.log("POST /movement");
        res.write("Movement received\n");

        let jsonObject = JSON.stringify(req.body);
        let filePath = path.join(contentDir, "movement.json");
        fs.writeFile(filePath, JSON.stringify(jsonObject), "utf8", function (err) {
            if (err) {res.end("Shit happened"); console.log("shit Happened");}

            res.end("File successfully saved!");
        });
    })
    .get(function(req, res) {
        fs.readFile(path.join(contentDir, "movement.json"), function (err, data) {
            if (err) {return console.log(err);}

            res.json(JSON.parse(data));
            res.end();
        })
    });

router.route("/twitter")
    .get(function(req,res){
        console.log("GET /twitter");
        twitter.sendSimpleTweet("Hello Hello")
    });
