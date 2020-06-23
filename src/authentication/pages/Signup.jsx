import React, { useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserRegister } from "../fetchUserAuth";
import { Button, Form } from 'react-bootstrap';

const Signup = () => {
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [username, setUsername] = useState("");
  const test = (e) => {
    e.preventDefault();
    fetchUserRegister(email, password, password_confirmation, username);
  };

  return (
    <>
      <h1>Sign up</h1>
      <div>
        {!isRegistered && (
          <Form onSubmit={test} className="container">
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

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control type="password"
              placeholder="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              required />
            </Form.Group>
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        )}
        {isRegistered && <p>Inscription réussie</p>}
      </div>
    </>
  );
};

export default Signup;
