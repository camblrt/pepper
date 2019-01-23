"use strict";


const Constants = {
    TIMER_LENGTH: Object.freeze({
        "five_min": 5*60*1000,
        "one_min": 60*1000,
        "ten_sec": 10*1000,
        "five_sec": 5*1000,
        "thirty_sec": 30*1000,
        "thirtyish_sec": 35*1000
    }),
    PEPPER_ROOM: "/pepper",
    USERS_ROOM: "/users",
    DEFAULT_QUESTION_NUMBER: 3,
    STATES: {IDLE: 0, LAUNCHING: 1, INPUT: 2, QUESTION: 3, SCORE: 4}
};
Constants.START_GAME_TIMER = Constants.TIMER_LENGTH.ten_sec;
Constants.INPUT_CODE_TIMER = Constants.TIMER_LENGTH.thirty_sec;
Constants.QUESTION_TIMER = Constants.TIMER_LENGTH.thirtyish_sec;
Constants.RESULTS_TIMER = Constants.TIMER_LENGTH.one_min;

Constants.ANIMALS = [
    "Perroquet", "Épervier", "Caracal", "Castor", "Caribou", "Chamois", "Faucon", "Gibbon",
    "Écureuil", "Dauphin", "Faisan", "Lamantin", "Lama", "Pélican", "Phacochère", "Suricate",
    "Toucan", "Tortue", "Yack", "Tamanoir", "Poulpe", "Piton", "Ragondin", "Renard", "Mulot"
];
Constants.BEHAVIOR = [
    "assoifé", "apeuré", "désemparé", "affamé", "égaré", "étourdi",
    "sauvage", "voyageur", "sauteur", "colporteur", "raquetteur", "joyeux", "curieux",
    "gourmand", "futé", "endormi", "réveur", "coquin", "débordé", "dégouté", "malicieux",
    "hystérique", "nerveux", "crasseux", "généreux", "ponctuel", "hypocrite", "timide",
    "troublé", "intrépide", "combatif", "prétentieux", "anxieux", "argenté", "pourpre"
];

module.exports = Constants;
