import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import React from 'react';
import globalReducer from '../../reducers/index';
import Comm from '../../services/Comm';

import HomePagePepper from '../HomePage/HomePage';
import QuestionPagePepper from '../Game/QuestionPage/QuestionPage';
import QuizzPagePepper from '../Game/QuizzPage/QuizzPage';
import StartGamePepper from '../Game/StartGame/StartGame';
import InputCodePepper from '../Game/InputCode/InputCode';
import Score from '../Game/Score/Score';

const store = createStore(globalReducer);
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.comm = new Comm()

    store.subscribe(() => {
      this.setState({ 
          presentation: store.getState().updateModelReducer.presentation,
          numeroQuest: store.getState().updateModelReducer.numQuestion,
          scores: store.getState().updateModelReducer.scores
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/0924toiwdhg2TOKAREV223578098765redcvbnkiuytrew34567uyhgbnmk' component={HomePagePepper}/>
          <Route path='/startGame' component={StartGamePepper}/>
          <Route path='/inputCode' component={InputCodePepper}/>
          <Route path='/getReady' component={QuestionPagePepper}/>
          <Route path='/quizz' component={QuizzPagePepper}/>
          <Route path='/score' component={Score}></Route>
        </Switch>
     </Provider>
    )
  }
}
export default Main