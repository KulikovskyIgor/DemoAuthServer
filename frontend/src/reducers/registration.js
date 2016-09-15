import * as RegistrationConstants from '../constants/registration';

const initSate = {
    username: null,
    password: null,
    error: null,
    isRegistered: false
};

export default function (state = initSate, action) {
    switch (action.type) {
        case RegistrationConstants.REGISTRATION_SET_USERNAME:
            return Object.assign({}, state, {
                username: action.data
            });
        case RegistrationConstants.REGISTRATION_SET_PASSWORD:
            return Object.assign({}, state, {
                password: action.data
            });
        case RegistrationConstants.REGISTRATION_SET_ERROR:
            return Object.assign({}, state, {
                error: action.data
            });
        case RegistrationConstants.REGISTRATION_SET_REGISTERED:
            return Object.assign({}, state, {
                isRegistered: true
            });
        case RegistrationConstants.REGISTRATION_CLEAR:
            return initSate;
        default:
            return state;
    }
}