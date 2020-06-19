import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from "../API/userAuth";
import { loginSuccess } from "../redux/UserAuth/userAuthActions";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const user = UserLogin(email, password);
    user.then(function (result) {
      dispatch(loginSuccess(result));
      Cookies.set("token", result.token);
      Cookies.set("user", result.user);
      console.log(Cookies.get("token"));
      console.log(Cookies.get("user"));
      
    });
    // const obj = {email, password}
    
  };

    console.log(auth)
  return (
    <>
      <h1> Login </h1>
      <div>
        {!isLogged && (
          <form onSubmit={login}>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value="Envoyer" />
          </form>
        )}
        {isLogged && <p>Tu es inscrit</p>}
      </div>
    </>
  );
};

export default Login;
