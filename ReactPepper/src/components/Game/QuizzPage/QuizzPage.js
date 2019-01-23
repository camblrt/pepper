import React, { Component } from 'react';
import '../QuizzPage/quizzPage.css';
import AnswerPanel from '../AnswerPanel/AnswerPanel';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import TimerPanel from '../TimerPanel/TimerPanel';

class QuizzPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            elapsed: 20000,
            displayAnswer:false
        }
        this.timer = setInterval(() => {
            this.setState({
                elapsed: this.state.elapsed - 1000
            });
        }, 1000);
    }
    
    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(0);
        if(seconds === "0"){
            clearInterval(this.timer);
            this.state.displayAnswer=true;
            document.getElementById("displayAnswer").innerHTML = "La réponse est: ";
        }

        return (
            <div className="QuizzPage">
                <section className="question-bar">
                    <div className="question-bar__title-wrap">
                        <h2 className="mt-2" id="displayAnswer"><TimerPanel seconds={seconds}></TimerPanel></h2>
                    </div>
                </section>
                <div className="question-panel"><h1><QuestionPanel></QuestionPanel></h1></div>
                <AnswerPanel displayAnswer={this.state.displayAnswer}></AnswerPanel>
            </div>
        );
    }
}

export default QuizzPage;