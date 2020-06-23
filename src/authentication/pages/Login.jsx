import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLogin } from "../fetchUserAuth";
import { loginSuccess } from "../redux/userAuthActions";
import Cookies from "js-cookie";
import { Button, Form } from 'react-bootstrap';
import '../../App.scss';

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const user = fetchUserLogin(email, password);
    user.then(function (result) {
      dispatch(loginSuccess(result));
      Cookies.set("token", result.token);
      Cookies.set("user", result.user);
    });
    user.catch((error) => console.log(error));
  };

  return (
    <>
      <h1> Login </h1>
      <div>
        {!isLogged && (
          <Form onSubmit={login} className="container">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            </Form.Group>
            <Button type="submit" variant="warning">
              Submit
            </Button>
          </Form>
        )}
        {isLogged && <p>Connexion réussie</p>}
      </div>
    </>
  );
};

export default Login;
