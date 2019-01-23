var io = require('socket.io-client');

class Comm {
    constructor() {
        this.comm = {};
        this.comm.io = {};
        this.socket = "";
    }

    toString() {
        return '';
    }

    socketConnexionPepper(callbackStartGame, callbackLoadInputCode, callbackLoadQuestions, callbackNextQuestion, displayScore, gameFinished) {
        const socket = io("/pepper");

        socket.on("connection", function () {
            socket.emit("data_comm", socket.id);
            console.log("connection Pepper");
        });

        socket.on('startGameTimer', function(timerDetails){
            var size = Object.keys(timerDetails).length;
            let loadTimerDetails = "";
            console.log("Start Game")
            if(size > 0){
                loadTimerDetails = timerDetails;
            }
            if(callbackStartGame!=null){
                callbackStartGame(loadTimerDetails);
            }
        });

        socket.on('inputCode', function(timerDetails){
            var size = Object.keys(timerDetails).length;
            let loadTimerDetails = "";
            console.log("Input Code");
            if(size > 0 ){
                loadTimerDetails = timerDetails;
            }
            if(callbackLoadInputCode != null){
                callbackLoadInputCode(loadTimerDetails);
            }
        });

        socket.on('loadQuestions', function (data) {
            var size = Object.keys(data).length;
            console.log("Load questions")
            let loadQuestions = "";
            if (size > 0) {
                loadQuestions = data;
            }
            if(callbackLoadQuestions!=null){
                callbackLoadQuestions(loadQuestions);
            }
        });

        socket.on("nextQuestion", function (numQuestion) {
            console.log("nextQuestion socket received: ");
            console.log(numQuestion);
            if(callbackNextQuestion!=null){
                callbackNextQuestion(numQuestion);
            }
        });
        
        socket.on("scores", function(scores){   
            var size = Object.keys(scores).length;
            let scoresToDisplay = "";
            console.log("Scores")
            for(let i = 1; i < size+1; i ++){
                console.log(scores[i]);
            }

            if(size > 0){
                scoresToDisplay = scores;
            }
            if(displayScore!=null){
                displayScore(scoresToDisplay);
                console.log(scoresToDisplay);
            }
        });

        socket.on("gameFinished", function(){
            gameFinished();
            console.log("Game finished");
        })
    }
}

export default Comm;