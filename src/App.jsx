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
import WaitingRoom from "./game/CreateGame/pages/WaitingRoom";
import CurrentGame from "./game/CurrentGame/pages/CurrentGame";
import JoinAGame from "./game/JoinGame/pages/JoinAGame";
import GameMarking from "./game/CurrentGame/pages/GameMarking";

import "./App.scss";

const App = () => {
  return (
    <>
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
            <Route path="/waiting_room">
              <WaitingRoom/>
            </Route>
            <Route path="/join_a_game">
              <JoinAGame/>
            </Route>
            <Route path="/game_marking">
              <GameMarking/>
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
