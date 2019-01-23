import React, { Component } from 'react';
import logo from '../../../lib/users-icon.png';

class StartGame extends Component {
    constructor(props){
        super(props);
        this.state = {}
  }

    render() {

        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h3 className="l1-txt1 txt-center">
                    Tiens-toi prêt!
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Pepper prépare le prochain jeu...
                </h4> 
            </div>
        );
    }
}


export default StartGame;