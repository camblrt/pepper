import React, { Component } from 'react';
import logo from '../../lib/pepper-head.png';
import './homePage.css';
import { updateQuestions, updateNumeroQuestions, updateScores } from '../../actions';
import Comm from '../../services/Comm'
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.comm = new Comm();

        this.comm.socketConnexionPepper(this.startGame, this.inputCode, this.loadQuestionsMap, this.nextNumeroQuestion, this.displayScore, this.gameFinished);
        
        this.startGame = this.startGame.bind(this);
        this.inputCode = this.inputCode.bind(this);
        this.loadQuestionsMap = this.loadQuestionsMap.bind(this);
        this.nextNumeroQuestion = this.nextNumeroQuestion.bind(this);
        this.displayScore = this.displayScore.bind(this);

  }

    startGame = (timerDetails) => {
        this.props.history.push("/startGame");
        var dateStartGame = timerDetails.timerDetails.timestamp + timerDetails.timerDetails.duration;
        
        this.timerStartGamePepper = setInterval(() => {
            var date = new Date();
            var currentDate = date.getTime()
            var dateStartGameSec = (Math.round(dateStartGame / 100)/ 10).toFixed(0);
            var currentDateSec = (Math.round(currentDate / 100)/ 10).toFixed(0);
            if(currentDateSec === dateStartGameSec){
                this.props.history.push("/inputCode");
                clearInterval(this.timerStartGamePepper);            
            }
        }, 1);           
    }

    inputCode = (timerDetails) => {
        this.props.history.push("/inputCode");
        var dateInputCode = timerDetails.timerDetails.timestamp + timerDetails.timerDetails.duration;
        document.getElementById("inputCode").innerHTML = timerDetails.inputCode;
        this.timerInputCode = setInterval(() => {
            var date = new Date();
            var currentDate = date.getTime()
            var dateInputCodeSec = (Math.round(dateInputCode / 100)/ 10).toFixed(0);
            var currentDateSec = (Math.round(currentDate / 100)/ 10).toFixed(0);
            if(currentDateSec === dateInputCodeSec){
                clearInterval(this.timerInputCode);
            }
        }, 1);   
    }

    loadQuestionsMap = (data) =>  {
        this.props.dispatch(updateQuestions(data));
    }

    nextNumeroQuestion = (numQuestion) => {
        this.props.dispatch(updateNumeroQuestions(numQuestion.questionNumber));
        this.props.history.push("/getReady");
    }

    displayScore = (scores) => {
        this.props.dispatch(updateScores(scores));
        this.props.history.push('/score');
    }

    gameFinished = () => {
        this.props.history.push("/0924toiwdhg2TOKAREV223578098765redcvbnkiuytrew34567uyhgbnmk");
    }
    render() {
        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h3 className="l1-txt1 txt-center">
                    Bonjour, je m'appelle Pepper!
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Tu veux jouer avec moi?
                </h4>
            </div>
        );
    }
}


export default connect()(HomePage);