import { combineReducers } from 'redux';
import updateModelReducer from './updateModelReducer';

const globalReducer = combineReducers({
    updateModelReducer: updateModelReducer
});

export default globalReducer;