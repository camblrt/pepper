import './timerPanel.css';
const React = require('react')


class TimerPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return <div className="timer">{this.props.seconds}</div>;
  }
}
export default TimerPanel;
