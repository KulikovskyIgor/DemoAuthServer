import * as RegistrationConstants from '../constants/registration';
import * as AppActions from '../actions/app';
import {getAsUriParameters} from '../utils/helpers';

export function SET_USERNAME(data) {
    return {
        type: RegistrationConstants.REGISTRATION_SET_USERNAME,
        data
    }
}

export function SET_PASSWORD(data) {
    return {
        type: RegistrationConstants.REGISTRATION_SET_PASSWORD,
        data
    }
}

export function SET_ERROR(data) {
    return {
        type: RegistrationConstants.REGISTRATION_SET_ERROR,
        data
    }
}

export function SET_REGISTERED() {
    return {
        type: RegistrationConstants.REGISTRATION_SET_REGISTERED
    }
}

export function CLEAR() {
    return {
        type: RegistrationConstants.REGISTRATION_CLEAR
    }
}

export function REGISTER(username, password) {
    return (dispatch, getStore) => {
        return fetch(`/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getAsUriParameters({
                username,
                password
            })
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                if(data.error){
                    throw new Error(data.error);
                }else{
                    dispatch(SET_REGISTERED());
                }
            })
            .catch(ex => {
                dispatch(SET_ERROR(ex.message))
            });
    }
}