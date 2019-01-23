"use strict";

const express = require("express");
const Game = require("../models/game");
let Var = require("../utils/gameVariables");

const router = express.Router();
module.exports = router;


router.route("/StartGameTimer")
    .post(function(req, res) {
        console.log("POST /StartGameTimer");
        if(!Var.isGameRunning) {
            res.write("Game started");
            Game.start();
        } else {
            res.write("GAME ALREADY RUNNING YOU SNEAKY BASTARD!");
            console.log("GAME ALREADY RUNNING")
        }
        res.end();
    });

router.route("/ResetGame")
    .post(function(req, res) {
        console.log("GET /ResetGame");
        if(Var.isGameRunning) {
            res.write("Game reset");
            Game.reset();
        } else {res.write("No running game to reset")}
        res.end();
    });

router.route("/GetGameVariables")
    .get(function(req, res) {
        console.log("GET /GetGameVariables");
        let vars = Var.all();
        res.write(JSON.stringify(vars));
        console.log(vars);
        res.end();
    });
