import React, { Component } from 'react';
import './answerPanel.css';
import { connect } from 'react-redux';

class AnswerPanel extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className="AnswerPanelPepper">
                <div className="row btn-answer-container">
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-danger btn-block btn-answer">
                            <i class="fas fa-star fa-lg mr-2"></i>
                            {this.props.questionMap[this.props.numQuestion].answer1}
                            {this.props.displayAnswer ? this.props.questionMap[this.props.numQuestion].goodanswer==="answer1" ? <i className="fas fa-check fa-lg ml-2"></i> : <i className="fas fa-times fa-lg ml-2"></i> : null}
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-primary btn-block btn-answer">
                            <i class="fas fa-circle fa-lg mr-2"></i>
                            {this.props.questionMap[this.props.numQuestion].answer2}
                            {this.props.displayAnswer ? this.props.questionMap[this.props.numQuestion].goodanswer==="answer2" ? <i className="fas fa-check fa-lg ml-2"></i> : <i className="fas fa-times fa-lg ml-2"></i> : null}
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-warning btn-block btn-answer">
                            <i class="fas fa-square fa-lg mr-2"></i>
                            {this.props.questionMap[this.props.numQuestion].answer3}
                            {this.props.displayAnswer ? this.props.questionMap[this.props.numQuestion].goodanswer==="answer3" ? <i className="fas fa-check fa-lg ml-2"></i> : <i className="fas fa-times fa-lg ml-2"></i> : null}   
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-success btn-block btn-answer">
                            <i class="fas fa-heart fa-lg mr-2"></i>   
                            {this.props.questionMap[this.props.numQuestion].answer4}
                            {this.props.displayAnswer ? this.props.questionMap[this.props.numQuestion].goodanswer==="answer4" ? <i className="fas fa-check fa-lg ml-2"></i> : <i className="fas fa-times fa-lg ml-2"></i> : null}   
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questionMap: state.updateModelReducer.questionMap,
        numQuestion: state.updateModelReducer.numQuestion
    }
};

export default connect(mapStateToProps)(AnswerPanel);