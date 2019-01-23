import React, { Component } from 'react';
import '../QuestionPage/questionPage.css';
import QuestionPanel from '../../Game/QuestionPanel/QuestionPanel';
import TimerPanel from '../../Game/TimerPanel/TimerPanel';
import { connect } from 'react-redux';

class QuestionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            elapsed:5000,
        }
        this.timerQuestionPage = setInterval(() => {
            this.setState({
                elapsed: this.state.elapsed - 1000
            });
        }, 1000);
    }
    
    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(0);
        if(seconds === '0'){
            clearInterval(this.timerQuestionPage);
            this.props.history.push("/quizz")
        }
        
        return (
            <div className="QuestionPagePepper">
                <section className="title-QuestionPagePepper text-center"><h3>Question {this.props.numQuestion}/{Object.keys(this.props.questionMap).length-1}</h3></section>
                <section className="question-bar">
                    <div className="question-bar__title-wrap">
                        <h1><QuestionPanel className="question-bar__title"></QuestionPanel></h1>
                    </div>
                </section>
                <h2><TimerPanel seconds={seconds}></TimerPanel></h2>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        questionMap: state.updateModelReducer.questionMap,
        numQuestion: state.updateModelReducer.numQuestion
    }
};

export default connect(mapStateToProps)(QuestionPage);
