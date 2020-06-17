import React from 'react';
import {UserRegister} from '../API/userAuth'

const Signup = () => {
    UserRegister();
    return(
    <>
    <h1> Signup </h1>
    </>
    )
}

export default Signup;