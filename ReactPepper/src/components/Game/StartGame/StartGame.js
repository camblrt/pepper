import React, { Component } from 'react';
import logo from '../../../lib/pepper-head.png';

class StartGame extends Component {
    constructor(props){
        super(props);
        this.state = {}
  }

    render() {

        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h1 className="l1-txt1 txt-center">
                    Tenez-vous prêts!
                </h1>
                <h2 className="l1-txt2 txt-center">
                    Pepper prépare le prochain jeu...
                </h2> 
            </div>
        );
    }
}


export default StartGame;