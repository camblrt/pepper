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
            <div>{this.props.questionMap[this.props.numQuestion].question}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questionMap: state.updateModelReducer.questionMap,
        numQuestion: state.updateModelReducer.numQuestion
    }
};

export default connect(mapStateToProps)(QuestionPanel);