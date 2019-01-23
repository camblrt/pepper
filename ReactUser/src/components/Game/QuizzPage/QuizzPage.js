import React, { Component } from 'react';
import '../QuizzPage/quizzPage.css';
import QuestionPanel from '../../Game/QuestionPanel/QuestionPanel';
import AnswerPanel from '../AnswerPanel/AnswerPanel';
import { connect } from 'react-redux';
import Comm from '../../../services/Comm';

let compteurQuestion = 1;
class QuizzPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            elapsed: 30000
        }
        this.timer = setInterval(() => {
            this.setState({
                elapsed: this.state.elapsed - 1000
            });
        }, 1000);  
        this.comm = new Comm();
        console.log("Compteur questions:");
        console.log(compteurQuestion);
    }

    displayScore(score){
        console.log(score);
    }
    
    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(0);
        if(seconds === "0"){
            if(compteurQuestion == this.props.totalQuestions){
                clearInterval(this.timer);
                this.props.history.push("/score");
                compteurQuestion = 1;
            }
            else{
                clearInterval(this.timer);
                this.props.history.push("/getReady");
                compteurQuestion = compteurQuestion + 1;
            }
        }
        
        return (
            <div className="QuizzPage">
                <section className="question-bar">
                    <div className="question-bar__title-wrap">
                        <h2>À toi de jouer {localStorage.getItem('usernameUser')}</h2>
                    </div>
                </section>
                <div className="question-panel"><h1><QuestionPanel></QuestionPanel></h1></div>
                <AnswerPanel seconds={seconds}></AnswerPanel>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        numQuestion: state.updateModelReducer.numQuestion,
        totalQuestions: state.updateModelReducer.totalQuestions
    }
};

export default connect(mapStateToProps) (QuizzPage);