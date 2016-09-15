import * as AppConstants from '../constants/app';

export function SET_USER(data){
    return {
        type: AppConstants.SET_USER,
        data
    }
}

export function CLEAR(){
    return {
        type: AppConstants.CLEAR
    }
}