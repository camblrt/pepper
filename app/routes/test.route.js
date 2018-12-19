"use strict";

const express = require("express");
const router = express.Router();
module.exports = router;


router.route("/test")
    .get(function(req, res) {
        console.log("GET /test");
        res.send("Pompelop, /GET OK")
    })
    .post(function(req, res) {
        console.log("POST /test");
        res.send("Popopo, /POST OK");
    });
