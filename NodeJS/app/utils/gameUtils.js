"use strict";

const Constants = require("../utils/constants");
const Utils = require("../utils/utils");
const Twitter = require("../models/twitter");

let Var = require("../utils/gameVariables");


class GameUtils {
    /***************** INPUT CODE ********************/
    static GenerateAndSendInputCode() {
        Utils.pokePepper("Entrez le code");

        Var.inputCode = this._generateInputCode();
        Var.joinGamePossible = true;

        this.sendToSocket(Constants.PEPPER_ROOM, "inputCode", {
            timerDetails: Var.timer.whereAmI(),
            inputCode: Var.inputCode
        });

        this.sendToSocket(Constants.USERS_ROOM, "awaitingInputCode", {
            timerDetails: Var.timer.whereAmI()
        });
    }

    /***************** NEXT QUESTION ********************/
    static emitNextQuestion (Qnumber, Qid) {
        Utils.pokePepper("Question suivante");

        Var.QidToTokenListMap[Qnumber] = [];

        GameUtils.sendToSocket(Constants.PEPPER_ROOM, "nextQuestion", {
            timerDetails: Var.timer.whereAmI(),
            questionNumber: Qnumber,
            questionID: Qid
        });

        GameUtils.sendToSocket(Constants.USERS_ROOM, "nextQuestion", {
            timerDetails: Var.timer.whereAmI(),
            questionNumber: Qnumber,
            totalQuestion: Object.keys(Var.questions).length - 1
        });
    }

    /************** Process Quizz ****************/
    static questionsLoop (cb) {
        if(Var.isGameRunning) {
            if (Var.nextQuestionNb === 1) {
                this._sendQuestionThenAdvise(cb)
            } else {
                Var.timer.reset(Constants.QUESTION_TIMER);
                Var.timer.start(function () {
                    Var.currentQuestionNb++;
                    Var.hasUserAnsweredQuestionMap = {};
                    GameUtils._sendQuestionThenAdvise(cb);
                });
            }
        } else {console.log("\n\n\nGame interrupted!\n\n\n")}
    }

    /**
     * emit question then determine id quizz is done or proceed to next question
     */
    static _sendQuestionThenAdvise (cb) {
        if(Var.isGameRunning) {
            console.log("Question " + Var.currentQuestionNb + " in progress");
            this.emitNextQuestion(
                Var.currentQuestionNb,
                Var.questions[Var.currentQuestionNb].id
            );
            Var.nextQuestionNb = Var.currentQuestionNb + 1;
            if (Var.nextQuestionNb < (Object.keys(Var.questions).length)) {
                this.questionsLoop(cb);
            } else {
                Var.timer.reset(Constants.QUESTION_TIMER); //timer last question
                Var.timer.start(function () {
                    GameUtils._sendScores(cb);
                });
            }
        } else {console.log("\n\n\nGame interrupted!\n\n\n")}
    }

    /**
     * send scores to each individual and global to Pepper
     */
    static _sendScores (cb) {
        Utils.pokePepper("Voici les scores");

        Var.currentState = Constants.STATES.SCORE;
        let tempScores = this._computeScores();
        this.sendToSocket(Constants.PEPPER_ROOM, "scores", tempScores);
        console.log("sending scores to pepper: " + JSON.stringify(tempScores));

        Var.timer.reset(Constants.RESULTS_TIMER);
        Var.timer.start(function () {
            cb();
        });
    }

    /****************** RESPONSE HANDLING ***************/
    static process_response(token, response) {
        let currentQ = Var.questions[Var.currentQuestionNb];
        if(currentQ.goodanswer === response) {
            Var.scores[token] += 1;
            Var.QidToTokenListMap[Var.currentQuestionNb].push(token);
            return true
        }
        return false
    }

    /**
     * Add ranking to scores
     */
    static _computeScores () {
        let tempNameMap = {}, scores = {}, points = [];
        Object.keys(Var.scores).forEach(function (token) {
            points.push(Var.scores[token]);
            tempNameMap[Var.TokenToNameMap[token]] = Var.scores[token];
        });
        points.sort();

        points.forEach(function (point) {
            let who = GameUtils.getKeyFromValue(tempNameMap, point);
            scores[Object.keys(tempNameMap).length] = {
                username: who,
                score: point
            };
            delete tempNameMap[who];
        });

        Twitter.sendSimpleTweet("Félicitation à " + scores["1"].username + " #CPELyon");
        Utils.pokePepper("Félicitation à " + scores["1"].username);
        return scores;
    }

    /** Generates random 5-digit integer */
    static _generateInputCode () {
        return Math.floor(Math.random() * 100000);
    }

    /**
     * Reverse dictionary search, find the key for a given value
     */
    static getKeyFromValue(dict, value) {
        return Object.keys(dict).find(key => dict[key] === value);
    }

    /**
     * Emitting to given rooms the given event with the given arguments
     *
     * @param rooms - either /pepper or /users or both
     * @param event - exple "nextQuestion"
     * @param arg - argument to be given with the event through the socket
     */
    static sendToSocket(rooms, event, arg) {
        if(rooms === "ALL") {
            rooms = [Constants.PEPPER_ROOM, Constants.USERS_ROOM];
        } else { rooms = [rooms] }

        for(let nb in rooms) {
            if (rooms.hasOwnProperty(nb)) {
                global.socketIO.of(rooms[nb]).emit(event, arg);
            }
        }
    }
}

module.exports = GameUtils;
