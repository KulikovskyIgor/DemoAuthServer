import * as AppConstants from '../constants/app.js';

const initSate = {
    user: null,
    token: null
};

export default function App(state = initSate, action) {
    switch (action.type) {
        case AppConstants.SET_USER:
            return Object.assign({}, state, {
                user: action.data
            });
        case AppConstants.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.data
            });
        case AppConstants.CLEAR:
            return initSate;
        default:
            return state;
    }
}