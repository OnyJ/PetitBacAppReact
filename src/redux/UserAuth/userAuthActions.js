import * as actionTypes from './userAuthTypes';

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,  
        email: response.email, 
        password: response.password,
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
