import * as actionTypes from './userAuthTypes';

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,  
        user: response,
        isLogged: true,
    }
}

export const loginFail = (response) => {
    return {
        type: actionTypes.LOGIN_FAIL,
    }
}

export const loginLoading = () => {
    return {
        type: actionTypes.LOGIN_LOADING, 
    }
}

export const registerSuccess = (response) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
    }
}

export const registerFail = (response) => {
    return {
        type: actionTypes.REGISTER_FAIL,
    }
}

export const registerLoading = () => {
    return {
        type: actionTypes.REGISTER_LOADING, 
    }
}


export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS, 
    }
}
