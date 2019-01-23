import React, { Component } from 'react';
import './questionPanel.css';
import { connect } from 'react-redux';

class QuestionPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>Question {this.props.numQuestion}/{this.props.totalQuestions}</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        numQuestion: state.updateModelReducer.numQuestion,
        totalQuestions: state.updateModelReducer.totalQuestions
    }
};

export default connect(mapStateToProps)(QuestionPanel);