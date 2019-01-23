import React, { Component } from 'react';
import logo from '../../../lib/pepper-head.png';

class InputCode extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render() {

        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h1 className="l1-txt2  txt-center">
                    Rejoins Pepper pour jouer
                </h1>
                <h2 className="l1-txt2 txt-center">
                    avec ce CODE de JEU:
                </h2> 
                <div id="inputCode" className="code"></div>
            </div>
        );
    }
}
export default InputCode;