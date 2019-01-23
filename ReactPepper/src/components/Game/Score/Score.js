import React, { Component } from 'react';
import trophy from '../../../lib/trophy.png';
import { connect } from 'react-redux';
import './scorePage.css'

class Score extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        let displayScores = [];
        for(let i = 1; i < Object.keys(this.props.scores).length + 1; i++){
            if(this.props.scores[i].username!==undefined){
                displayScores.push(<div><li className="list-group-item list-group-item-secondary mb-1 mt-1"><h5><strong>{i}</strong> - {this.props.scores[i].username} : {this.props.scores[i].score}</h5></li></div>);            	
                console.log(displayScores);
            }       
        }
        
        return (
            <div className="ScorePage">
                <img src={trophy} className="score-logo" alt="trophy"/>
                <h3 className="l1-txt1 txt-center">
                    La partie est finie.
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Félicitation! Les scores sont:  
                </h4>
                <ul className="list-group">
                    {displayScores}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        scores: state.updateModelReducer.scores
    }
};
export default connect(mapStateToProps) (Score);