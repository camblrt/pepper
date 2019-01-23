import React, { Component } from 'react';
import logo from '../../../lib/users-icon.png';
import Comm from '../../../services/Comm';

class Score extends Component {
    constructor(props){
        super(props);
        this.state = {
            score:0
        }
        this.comm = new Comm();
        this.comm.triggerNodeEndOfGame(this.displayScore);
    }

    displayScore = (score) => {
        this.setState({
            score:score
        });
    }

    render() {        
        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h3 className="l1-txt1 txt-center">
                    La partie est finie.
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Ton score est: 
                </h4>
                 
                <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary mb-1 mt-1"><h5>{localStorage.getItem('usernameUser')} : {this.state.score}</h5></li>
                </ul>
            </div>
        );
    }
}

export default Score;