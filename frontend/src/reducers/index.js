import { combineReducers } from 'redux';
import AppReducer from './app';
import LoginReducer from './login';

const reducers = {
    app: AppReducer,
    login: LoginReducer
};
module.exports = combineReducers(reducers);
