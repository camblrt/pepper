var io = require('socket.io-client');

class Comm {
    constructor() {
        this.comm = {};
        this.comm.io = {};
        this.socket = "";
    }

    socketConnexionUser(callbackStartGame, callbackLoadInputCode, callbackNextQuestion, gameFinished, callbackTooLate){
        const socket = io("/users");

        localStorage.clear('tokenUser');
        localStorage.clear('usernameUser');
        
        socket.on("token", function(userInfo){
            console.log(userInfo.token);
            console.log(userInfo.username);
            localStorage.setItem('tokenUser', userInfo.token);
            localStorage.setItem('usernameUser', userInfo.username);
        })

        socket.on("connection", function () {
            let tokenId;
            let userName;
            if(localStorage.getItem('tokenUser')!=null){
                tokenId = localStorage.getItem('tokenUser');
                userName = localStorage.getItem('usernameUser');
            }
            else{
                tokenId = false;
                userName = "";
            }
            socket.emit("data_comm", socket.id, tokenId, userName);

            socket.on('tooLate', function(){
                console.log("awaiting input code");
                
                if(callbackTooLate != null){
                    callbackTooLate();
                }
            });

            console.log("connection User");
        });

        socket.on('startGameTimer', function(){
            console.log("Start Game");
            if(callbackStartGame!=null){
                callbackStartGame();
            }
        });

        socket.on('awaitingInputCode', function(){
            console.log("awaiting input code");

            if(callbackLoadInputCode != null){
                callbackLoadInputCode();
            }
        });

        socket.on("nextQuestion", function (numQuestion) {
            console.log("nextQuestion socket received: ");
            console.log(numQuestion);
            if(callbackNextQuestion!=null){
                callbackNextQuestion(numQuestion);
            }
        });

        socket.on("gameFinished", function(){
            console.log("Game finished")
            gameFinished();
        })
    }  
    
    awaitingInputCode(callbackLoadInputCode){
        const socket = io("/users");
        
        socket.on('awaitingInputCode', function(timerDetailsInputCode){
            var size = Object.keys(timerDetailsInputCode).length;
            let loadTimerDetailsInputCode = "";
            console.log("awaiting input code");
            
            console.log(timerDetailsInputCode);
            if(size > 0 ){
                loadTimerDetailsInputCode = timerDetailsInputCode;
                if(callbackLoadInputCode != null){
                    callbackLoadInputCode(loadTimerDetailsInputCode);
                }
            }
            else{
                console.log("timerDetailsInputCode not received");
            }
            
        });
    }

    sendCodeToNodeUser(inputCode, callbackInputResult){
        const socket = io("/users");

        socket.emit('inputCode', localStorage.getItem('tokenUser'), inputCode);

        socket.on('inputCodeResult', function(inputCodeResult){
            console.log("inputCodeResult");
            callbackInputResult(inputCodeResult);
        });
    }

    sendAnswerToNodeUser(answer){
        const socket = io("/users");

        console.log(answer);
        socket.emit('responseUser', localStorage.getItem('tokenUser'), answer);

        socket.on('QuestionCorrection', function(answerResult){
            console.log(answerResult);
        });
    }

    triggerNodeEndOfGame(displayScore){
        const socket = io("/users");

        socket.emit('score?', localStorage.getItem('tokenUser'));

        socket.on('score', function(score){
            console.log(score);
            if(displayScore != null){
                console.log(score);
                displayScore(score);
            }
            
        })
    }    
}

export default Comm;