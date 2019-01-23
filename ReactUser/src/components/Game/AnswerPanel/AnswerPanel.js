import React, { Component } from 'react';
import './answerPanel.css';
import Comm from '../../../services/Comm';

class AnswerPanel extends Component {
    constructor(props){
        super(props);
        this.state = { 
            clicked: false,
            answer: "",
            timesup: false
        }

        this.comm = new Comm();
    }


    sendAnswer(answer){
        this.comm.sendAnswerToNodeUser(answer);
        this.setState({
            clicked: true,
            answer: answer
        })
    }

    render() {
        var timesup = false;
        if(this.props.seconds <= 10){
            timesup = true;
        }
        return (
            <div className="AnswerPanel">
                <div className="row btn-answer-container">
                    <div className="col-6">
                        {(timesup || this.state.clicked)?
                        <button disabled type="button" className={this.state.answer !== 'answer1'?"btn btn-danger btn-lg btn-block btn-answer":"btn btn-outline-danger btn-block btn-answer"}>
                            <i class="fas fa-star fa-sm"></i>
                        </button>
                        : 
                        <button type="button" onClick={() => this.sendAnswer('answer1')} className="btn btn-danger btn-lg btn-block btn-answer">
                            <i class="fas fa-star fa-sm"></i>
                        </button>
                        }
                    </div>
                    <div className="col-6">
                        {(timesup || this.state.clicked)?
                            <button disabled type="button" className={this.state.answer !== 'answer2'? "btn btn-primary btn-lg btn-block btn-answer": "btn btn-outline-primary btn-block btn-answer" } >
                                <i class="fas fa-circle fa-sm"></i>
                            </button>
                            : 
                            <button type="button" onClick={() => this.sendAnswer('answer2')} className="btn btn-primary btn-lg btn-block btn-answer">
                                <i class="fas fa-circle fa-sm"></i>
                            </button>
                        }
                    </div>
                    <div className="col-6">
                        {(timesup || this.state.clicked) ?
                            <button disabled type="button" className={this.state.answer !== 'answer3'? "btn btn-warning btn-lg btn-block btn-answer": "btn btn-outline-warning btn-block btn-answer" }>
                                <i class="fas fa-square fa-sm"></i>
                            </button>
                            : 
                            <button type="button" onClick={() => this.sendAnswer('answer3')} className="btn btn-warning btn-lg btn-block btn-answer">
                                <i class="fas fa-square fa-sm"></i>
                            </button>
                        }
                    </div>
                    <div className="col-6">
                        {(timesup || this.state.clicked) ?
                            <button disabled type="button" className={this.state.answer !== 'answer4'? "btn btn-success btn-lg btn-block btn-answer": "btn btn-outline-success btn-block btn-answer" }>
                                <i class="fas fa-heart fa-sm"></i>
                            </button>
                            : 
                            <button type="button" onClick={() => this.sendAnswer('answer4')} className="btn btn-success btn-lg btn-block btn-answer">
                                <i class="fas fa-heart fa-sm"></i>
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default (AnswerPanel);