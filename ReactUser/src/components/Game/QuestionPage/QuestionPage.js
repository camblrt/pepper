import React, { Component } from 'react';
import '../QuestionPage/questionPage.css';
import TimerPanel from '../../Game/TimerPanel/TimerPanel';

class QuestionPageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            elapsed:5000,
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
        if(seconds==3){
            document.getElementById("title").innerHTML = "Prêts...";
        }
        if(seconds==1){
            document.getElementById("title").innerHTML = "Partez!";
        }
        if(seconds == 0){
            this.props.history.push("/quizz");
        }
        return (
            <div className="QuestionPageUser">
                <section className="question-bar">
                    <div className="question-bar__title-wrap">
                        <h2><TimerPanel seconds={seconds}></TimerPanel></h2>
                        <h1 id="title" className="mt-2">À vos marques...</h1>
                    </div>
                </section>
            </div>
        );
    }
}

export default QuestionPageUser;