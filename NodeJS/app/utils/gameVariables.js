"use strict";

const Timer = require("../models/timer");
const Constants = require("./constants");


let GameVariables = {
    isGameRunning: false,
    isGameStarted: false,
    idToTokenMap: {},
    usersInGame: [],
    timer: new Timer(Constants.START_GAME_TIMER),
    inputCode: 0,
    joinGamePossible: true,
    questions: {},
    currentQuestionNb: 1,
    nextQuestionNb: 1,
    scores: {},
    QidToTokenListMap: {},
    hasUserAnsweredQuestionMap: {},
    userJoinedGame: {},
    TokenToNameMap: {},
    quizzID:0,
    currentState: Constants.STATES.IDLE,
    all: getAll
};

function getAll()  {
    return {
        "isGameRunning": GameVariables.isGameRunning,
        "inputCode": GameVariables.inputCode,
        "currentQuestionNb": GameVariables.currentQuestionNb,
        "usersInGame": GameVariables.usersInGame,
        "scores": GameVariables.scores,
        "QidToTokenListMap": GameVariables.QidToTokenListMap,
        "TokenToNameMap": GameVariables.TokenToNameMap
    }
}

module.exports = GameVariables;
