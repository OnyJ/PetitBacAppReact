import React from "react";
import { Button } from 'antd';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./application/pages/Home";
import Login from "./authentication/pages/Login";
import Signup from "./authentication/pages/Signup";
import Navbar from "./application/components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGame from "./game/CreateGame/pages/CreateGame";
import CurrentGame from "./game/CurrentGame/pages/CurrentGame";

import "./App.scss";
const App = () => {
  return (
    <>
      <h1>This is a simple react app!</h1>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/create_game">
              <CreateGame />
            </Route>
            <Route path="/current_game">
              <CurrentGame/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    </>
  );
};

export default App;
