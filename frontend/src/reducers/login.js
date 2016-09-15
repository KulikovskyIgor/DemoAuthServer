import * as LoginConstants from '../constants/login';

const initSate = {
    username: null,
    password: null,
    error: null
};

export default function (state = initSate, action) {
    switch (action.type) {
        case LoginConstants.LOGIN_SET_USERNAME:
            return Object.assign({}, state, {
                username: action.data
            });
        case LoginConstants.LOGIN_SET_PASSWORD:
            return Object.assign({}, state, {
                password: action.data
            });
        case LoginConstants.LOGIN_SET_ERROR:
            return Object.assign({}, state, {
                error: action.data
            });
        case LoginConstants.LOGIN_CLEAR:
            return initSate;
        default:
            return state;
    }
}