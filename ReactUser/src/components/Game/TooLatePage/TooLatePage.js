import React, { Component } from 'react';
import logo from '../../../lib/users-icon.png';
import '../../HomePage/homePage.css';
import { connect } from 'react-redux';

class TooLatePage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h3 className="l1-txt1 txt-center">
                    Tu es arrivé trop tard pour jouer...
                </h3>
                <h4 className="l1-txt2 txt-center">
                    Reviens pour la prochaine partie.
                </h4>                
           </div>
        );
    }
}

export default connect()(TooLatePage);