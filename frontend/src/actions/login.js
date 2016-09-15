import * as LoginConstants from '../constants/login';
import * as AppActions from '../actions/app';
import {getAsUriParameters} from '../utils/helpers';

export function SET_USERNAME(data) {
    return {
        type: LoginConstants.LOGIN_SET_USERNAME,
        data
    }
}

export function SET_PASSWORD(data) {
    return {
        type: LoginConstants.LOGIN_SET_PASSWORD,
        data
    }
}

export function SET_ERROR(data) {
    return {
        type: LoginConstants.LOGIN_SET_ERROR,
        data
    }
}

export function CLEAR() {
    return {
        type: LoginConstants.LOGIN_CLEAR
    }
}

export function LOGIN(username, password) {
    return (dispatch, getStore) => {
        return fetch(`/login`, {
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
                    dispatch(AppActions.SET_USER(data));
                }
            })
            .catch(ex => {
                dispatch(SET_ERROR(ex.message))
            });
    }
}