import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {UserLogin} from '../API/userAuth'
import { loginSuccess } from '../redux/UserAuth/userAuthActions';

const Login = () => {
  
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.auth.isLogged)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
      
      e.preventDefault()
      UserLogin(email, password)
      const obj = {email, password}
      dispatch(loginSuccess(obj))
    }


    return(
    <>
    <h1> Login </h1>
    <div>
    {!isLogged &&
      <form onSubmit={login}>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Envoyer" />
      </form>
    }
    {isLogged &&
      <p>Tu es inscris</p>
    }
    </div>
    </>
    )
}

export default Login;