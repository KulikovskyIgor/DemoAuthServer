import { combineReducers } from 'redux';
import AppReducer from './app';
import LoginReducer from './login';
import RegistrationReducer from './registration';

const reducers = {
    app: AppReducer,
    login: LoginReducer,
    registration: RegistrationReducer
};
module.exports = combineReducers(reducers);
