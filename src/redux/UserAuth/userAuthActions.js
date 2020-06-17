import * as actionTypes from './userAuthTypes';

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS, 
        token, 
        user, 
        status,
        isLoading,
    }
}

export const loginFail = (response) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        status,
        isLoading,
    }
}

export const loginLoading = () => {
    return {
        type: actionTypes.LOGIN_LOADING, 
        status,
        isLoading,
    }
}
