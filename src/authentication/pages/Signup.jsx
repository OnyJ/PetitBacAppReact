import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserRegister } from "../fetchUserAuth";

const Signup = () => {
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [username, setUsername] = useState("");
  console.log(isRegistered);

  const test = (e) => {
    e.preventDefault();
    UserRegister(email, password, password_confirmation, username);
  };

  return (
    <>
      <h1>Sign up</h1>
      <div>
        {!isRegistered && (
          <form onSubmit={test}>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              required
            />
            <input type="submit" value="Envoyer" />
          </form>
        )}
        {isRegistered && <p>Inscription réussie</p>}
      </div>
    </>
  );
};

export default Signup;
