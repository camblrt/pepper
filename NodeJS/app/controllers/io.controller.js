"use strict";

const Var = require("../utils/gameVariables");
const Utils = require("../utils/utils");
const Constants = require("../utils/constants");
const GameUtils = require("../utils/gameUtils");


class IOController {

    static listen (io) {
        let pepper_room = io.of("/pepper");
        let users_room = io.of("/users");

        /***********************       PEPPER     ***********************/
        pepper_room.on("connection", function(socket){
            console.log("Pepper connected @ " + socket.id);
        });

        /***********************       USERS     ***********************/
        users_room.on("connection", function (socket) {
            socket.on("data_comm", function (id, token, username) {
                if (!Var.isGameStarted) {
                    if (!token) {
                        token = Utils.generateUUID();
                        username = Utils.generateName();

                        socket.emit("token", {token: token, username: username});
                        console.log(username + " was created @ " + id);
                    } else {
                        let oldID = GameUtils.getKeyFromValue(Var.idToTokenMap, token);
                        delete Var.idToTokenMap[oldID];
                        console.log(username + " re-connected @ " + id);
                    }
                    Var.TokenToNameMap[token] = username;
                    Var.idToTokenMap[id] = token;
                    Var.userJoinedGame[token] = false;

                    if (Var.currentState === Constants.STATES.LAUNCHING) {
                        socket.emit("startGameTimer", {timerDetails: Var.timer.whereAmI()})
                    }
                } else {socket.emit("tooLate")}
            });

            /**
             * INPUT CODE HANDLING
             */
            socket.on("inputCode", function (token, code) {
                let status = "Err";
                if(Var.joinGamePossible && !Var.userJoinedGame[token]) {
                    if (parseInt(code) === Var.inputCode) {
                        Var.usersInGame.push(token);
                        Var.userJoinedGame[token] = true;
                        Var.scores[token] = 0;
                        status = "inputCodeSuccess";
                    } else {
                        status = "inputCodeFailure";
                    }
                } else {status = "GameInProgressError"}

                console.log("emitting " + status + " to " + Var.TokenToNameMap[token]);
                socket.emit("inputCodeResult", status); //implicit `.to(currentUserId)`
            });

            /**
             * QUESTIONS HANDLING
             */
            socket.on("responseUser", function (token, idResponse) {
                let username = Var.TokenToNameMap[token];
                if(Var.usersInGame.indexOf(token) > -1) {
                    if (!Var.hasUserAnsweredQuestionMap[token]) {
                        let isRight = GameUtils.process_response(token, idResponse);
                        Var.hasUserAnsweredQuestionMap[token] = true;
                        socket.emit("QuestionCorrection", isRight);
                    } else {
                        console.log(
                            username + " has already answered question "
                            + Var.currentQuestionNb + " and is spamming now. FU man"
                    )}
                } else {console.log(username + " is trying to play but did not check in")}
            });

            /**
             * INDIVIDUAL SCORES
             */
            socket.on("score?", function (token) {
                socket.emit("score", Var.scores[token]);
            });

            socket.emit("connection");
        });
    }
}

module.exports = IOController;
