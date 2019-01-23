import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import React from 'react';
import globalReducer from '../../reducers/index';
import Comm from '../../services/Comm';

import HomePageUser from '../HomePage/HomePage';
import QuestionPageUser from '../Game/QuestionPage/QuestionPage';
import QuizzPageUser from '../Game/QuizzPage/QuizzPage';
import StartGameUser from '../Game/StartGame/StartGame';
import InputCodeUser from '../Game/InputCode/InputCode';
import Score from '../Game/Score/Score'
import TooLatePage from '../Game/TooLatePage/TooLatePage';

const store = createStore(globalReducer);
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.comm = new Comm()

    store.subscribe(() => {
      this.setState({ 
          numeroQuest: store.getState().updateModelReducer.numQuestion,
          totalQuestion: store.getState().updateModelReducer.totalQuestion
      });
    });
  }

  callbackErr(msg) {
    console.error('Network Failure ?');
    console.error(msg);
  }

  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={HomePageUser}/>
          <Route path='/startGame' component={StartGameUser}/>
          <Route path='/inputCode' component={InputCodeUser}/>
          <Route path='/tooLate' component={TooLatePage}/>
          <Route path='/getReady' component={QuestionPageUser}/>
          <Route path='/quizz' component={QuizzPageUser}/>
          <Route path='/score' component={Score}/>
        </Switch>
     </Provider>
    )
  }
}
export default Main