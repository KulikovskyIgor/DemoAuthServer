import * as AppConstants from '../constants/app';

export function SET_USER(data){
    return {
        type: AppConstants.SET_USER,
        data
    }
}

export function SET_TOKEN(data){
    return {
        type: AppConstants.SET_TOKEN,
        data
    }
}

export function SET_USER_STATUS(data){
    return {
        type: AppConstants.SET_USER_STATUS,
        data
    }
}

export function CLEAR(){
    return {
        type: AppConstants.CLEAR
    }
}