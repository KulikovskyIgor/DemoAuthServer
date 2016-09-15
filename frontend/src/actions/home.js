import * as AppActions from '../actions/app';
import * as AppConstants from '../constants/app';

export function CHECK_ONLINE(){
    return (dispatch, getState) => {
        const { app: {token}} = getState();
        fetch(`online`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(AppActions.SET_USER_STATUS(AppConstants.USER_STATUS_ONLINE));
                    setTimeout(() => dispatch(AppActions.SET_USER_STATUS()), 3000);
                }else{
                    throw new Error(response.status);
                }
            })
            .catch(error => {
                dispatch(AppActions.SET_USER_STATUS(AppConstants.USER_STATUS_OFFLINE));
                setTimeout(() => dispatch(AppActions.SET_USER_STATUS()), 3000);
            }
        );
    }
}

export function LOGOUT(){
    return (dispatch, getState) => {
        const { app: {token}} = getState();
        fetch(`logout`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(AppActions.CLEAR());
                }else{
                    throw new Error(response.status);
                }
            })
            .catch(error => {
                    dispatch(AppActions.CLEAR());
                }
            );
    }
}