import React, { Component } from 'react';
import logo from '../../lib/users-icon.png';
import Comm from '../../services/Comm';
import './homePage.css';
import { updateNumeroQuestions } from '../../actions/index';
import { connect } from 'react-redux';

class HomePageUser extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.comm = new Comm();

        this.startGame = this.startGame.bind(this);
        this.nextNumeroQuestion = this.nextNumeroQuestion.bind(this);
        

        this.comm.socketConnexionUser(this.startGame, this.inputCode, this.nextNumeroQuestion, this.gameFinished, this.callbackTooLate);

    }

    nextNumeroQuestion = (numQuestion) => {
        this.props.dispatch(updateNumeroQuestions(numQuestion.questionNumber, numQuestion.totalQuestion));
    }

    startGame = () => {
        this.props.history.push("/startGame");
        console.log("startGame");
    }

    inputCode = () => {
        this.props.history.push("/inputCode");
        console.log("inputCode");
    }


    callbackTooLate = () => {
        this.props.history.push("/tooLate");
    }

    gameFinished = () => {
        this.props.history.push("/");
    }

    render() {

        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h3 className="l1-txt1 txt-center">
                    Tu veux jouer avec le robot Pepper?
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Viens sur le stand de CPE.
                </h4>                
           </div>
        );
    }
}

export default connect()(HomePageUser);