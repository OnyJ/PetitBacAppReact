import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLogin } from "../fetchUserAuth";
import { loginSuccess } from "../redux/userAuthActions";
import Cookies from "js-cookie";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../../App.scss";

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
      <div className="contain-authentication-form">
        {!isLogged && (
          <div className="authentication-form">
            <Form onSubmit={login}>
              <h1> Connexion </h1>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  Votre email ne sera pas divulgué.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="1234"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="warning">
                Allez !
              </Button>
            </Form>
          </div>
        )}
      </div>
      {isLogged && <Redirect to="/" />}
    </>
  );
};

export default Login;
