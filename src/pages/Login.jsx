import React from 'react';
import {UserLogin} from '../API/userAuth'

const Login = () => {
    UserLogin();
    return(
    <>
    <h1> Login </h1>

    </>
    )
}

export default Login;