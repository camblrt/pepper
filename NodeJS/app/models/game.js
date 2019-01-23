"use strict";

const GameUtils = require("../utils/gameUtils");
const Utils = require("../utils/utils");
const Constants = require("../utils/constants");

let Var = require("../utils/gameVariables");


class Game {

    /**
     * On press by admin (appli) the game process is started
     * Step1: emit big game timer (default is 5min)
     */
    static start () {
        if (!Var.isGameRunning){
            Var.isGameRunning = true;
            Var.currentState = Constants.STATES.LAUNCHING;
            Var.timer.start(function () {
                Var.isGameStarted = true;
                Game._inputCode();
            });

            GameUtils.sendToSocket("ALL", "startGameTimer", {
                timerDetails: Var.timer.whereAmI()
            });
        }
    }

    static reset () {
        Var.isGameRunning = false;
        Var.isGameStarted = false;
        Var.inputCode = 0;
        Var.quizzID = 0;
        Var.currentQuestionNb = 1;
        Var.nextQuestionNb = 1;
        Var.questions = {};
        Var.usersInGame = [];
        Var.hasUserAnsweredQuestionMap = {};
        Var.currentState = Constants.STATES.IDLE;
        Var.scores = {};
        Var.QidToTokenListMap = {};
        Var.TokenToNameMap = {};
        Var.timer.reset(Constants.START_GAME_TIMER);
        Object.keys(Var.userJoinedGame).forEach(function (key) {
            Var.userJoinedGame[key] = false
        });
    }

    /**
     * Step2: generate and send to pepper the input code
     * @private
     */
    static _inputCode () {
        Var.currentState = Constants.STATES.INPUT;
        Utils.listDirFilesInCallback (function (content) {
            Var.questions = content.questions;
            GameUtils.sendToSocket(
                Constants.PEPPER_ROOM,
                "loadQuestions",
                Var.questions
            );
        });

        Var.timer.reset(Constants.INPUT_CODE_TIMER);
        Var.timer.start(function () {
            Game._startQuestions();
        });
        GameUtils.GenerateAndSendInputCode();
    }

    /**
     * Step3: start Questions and loop
     * @private
     */
    static _startQuestions () {
        Var.currentState = Constants.STATES.QUESTION;
        Var.joinGamePossible = false;
        if (Var.usersInGame.length > 0) {
            GameUtils.questionsLoop(function () {
                Var.currentState = Constants.STATES.IDLE;
                GameUtils.sendToSocket("ALL", "gameFinished", {});
                console.log("values before reset");
                console.log(Var.all());
                Game.reset();
            });
        } else {console.log("\n\n\nGame aborted, too few players\n\n\n")}
    }

    /**
     * Step4: send scores -> GameUtils.js
     */
}

module.exports = Game;
