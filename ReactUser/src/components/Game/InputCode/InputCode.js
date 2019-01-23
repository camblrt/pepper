import React, { Component } from 'react';
import logo from '../../../lib/users-icon.png';
import Comm from '../../../services/Comm';
import TimerPanel from '../TimerPanel/TimerPanel'

class InputCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeValue: '',
            inputCodeResult: false,
            timer: 30000
        };

        this.comm = new Comm();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callbackLoadInputCode = this.callbackLoadInputCode.bind(this);
        this.callbackInputResult = this.callbackInputResult.bind(this);

        this.callbackLoadInputCode();
    }

    handleChange(event) {
        this.setState({codeValue: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.comm.sendCodeToNodeUser(this.state.codeValue, this.callbackInputResult);
    }

    callbackLoadInputCode = () => {
        this.timer = setInterval(() => {
            this.setState({
                timer: this.state.timer - 1000
            });
        }, 1000);
    }
    
    callbackInputResult = (inputCodeResult) => {
        if(inputCodeResult === "inputCodeSuccess"){
            this.setState({
                inputCodeResult: true
            })
            document.getElementById("resultCode").innerHTML = "Bien joué, le jeu va bientôt commencer.";
        }
        else if(inputCodeResult === "inputCodeFailure"){
            this.setState({
                inputCodeResult: false 
            })
            document.getElementById("resultCode").innerHTML = "Tu as fais une erreur, essayes de nouveau.";
        }
        else if(inputCodeResult === "GameInProgressError"){
            document.getElementById("timerInputCode").innerHTML = "Trop tard...";
        }
    }

    render() {
        var elapsed = Math.round(this.state.timer / 100);
        var seconds = (elapsed / 10).toFixed(0);
        if(seconds <= 0){
            clearInterval(this.timerInputCode);        
            console.log("inputCodeTimerUser finished");
            if(this.state.inputCodeResult === true){
                this.props.history.push("/getReady");
            }
            else{
                document.getElementById("timerInputCode").innerHTML = "Trop tard...";
            }
        }
        return (
            <div className="HomePage">
                <img src={logo} className="Main-logo" alt="logo" />
                <h4 className="l1-txt2  txt-center">
                    Salut <strong>{localStorage.getItem('usernameUser')}</strong>, rejoins Pepper
                </h4>
                <h3 className="l1-txt2 txt-center">
                    avec le CODE de JEU:
                </h3> 
                <h2 id='timerInputCode'><TimerPanel seconds={seconds}></TimerPanel></h2>
                {this.state.inputCodeResult || seconds==0? "" : <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.codeValue} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>}
                <h3 className="l1-txt2" id="resultCode"></h3>
            </div>
        );
    }
}
export default InputCode;