import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {UserRegister,  UserLogin} from '../API/userAuth'
import {GetProfile} from '../API/userAuth'

const Home = () => {

    // UserLogin()
    const currentUser = useSelector(state => state.auth)
    console.log(currentUser)
    console.log(currentUser.token)
    console.log(currentUser.currentUser)
    GetProfile()
    
    return(
    <>
    {currentUser.currentUser == null &&
    <h1> HOME LALALA</h1>
    }
    {currentUser.currentUser &&
    <div>
         <h1> HOME LALALA</h1>
        <p>{currentUser.currentUser.email}</p>
    </div>
    }
    </>
    )
}

export default Home;