import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserRegister, fetchUserLogin } from "../fetchUserAuth";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [username, setUsername] = useState("");
  const registerUser = (e) => {
    e.preventDefault();
    fetchUserRegister(email, password, password_confirmation, username);
    // fetchUserLogin(email, password);
    return <Redirect to="/" />;
  };

  return (
    <>
      <div className="contain-authentication-form">
        {!isRegistered && (
          <Form onSubmit={registerUser} className="authentication-form">
            <h1>Inscription</h1>
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

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Pseudo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pseudo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirmation du mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="1234"
                value={password_confirmation}
                onChange={(e) => setPassword_confirmation(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="warning text-dark">
              S'inscrire !
            </Button>
          </Form>
        )}
        {/* {isRegistered && <Redirect to="/" />} */}
      </div>
    </>
  );
};

export default Signup;
