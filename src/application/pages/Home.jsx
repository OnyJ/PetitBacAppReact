import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateGame } from "../../game/CreateGame/pages/CreateGame";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CurrentGame from "../../game/CurrentGame/pages/CurrentGame";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [gameIsReady, setGameIsReady] = useState();
  const [gameId, setGameId] = useState("");
  const [launchCreateGame, setLaunchCreateGame] = useState(false);
  // GetProfile(currentUser.id);

  const loggedOutDisplay = () => {
    const emojiShocked = "\u{1f628} ";
    const emojiFinger = "\u{1f449} ";
    return (
      <>
        <center>
          <p class="h5 mb-5">"Un Jeu du Petit Bac sur tous vos appareils !"</p>
          <p class="h3 mb-4">
            Vous n'êtes pas encore connecté au jeu {emojiShocked}
          </p>
          <div>
            {emojiFinger}
            <Link to="/login">
              <button class="btn btn-warning btn-lg">Login</button>
            </Link>
          </div>
          <br />
          <div>
            {emojiFinger}
            <Link to="/signup">
              <button class="btn btn-warning btn-lg">Signup</button>
            </Link>
          </div>
        </center>
      </>
    );
  };

  const loggedInDisplay = () => {
    console.log(gameIsReady);
    console.log(gameId);

    const isComputerScreen = () => {
      return window.screen.availWidth > 375;
    };

    return (
      <>
        <div className="menu-header-div">
          <div className="menu-title-div row">
            <Link to="/">
              <img
                src={require("../assets/images/home3.png")}
                alt="home_logo"
                width="50px"
                height="50px"
              />
            </Link>
            {isComputerScreen() ? (
              <h1 className="ml-3">Menu</h1>
            ) : (
              <h1 className="username">Pseudo</h1>
            )}
          </div>
          {isComputerScreen() && <h2 className="username pl-5">Pseudo</h2>}
        </div>

        <center class="menu-buttons-div">
          <button
            onClick={() => setLaunchCreateGame(true)}
            className="btn btn-warning btn-lg"
          >
            Créer une Partie
          </button>
          {launchCreateGame && (
            <CreateGame
              isGameReady={(isReady) => setGameIsReady(isReady)}
              gameIdForHome={(gameId) => setGameId(gameId)}
            />
          )}
          {gameIsReady == true && <CurrentGame gameId={gameId} />}
          <br />
          <button className="btn btn-warning btn-lg">
            Rejoindre une Partie
          </button>
        </center>
      </>
    );
  };

  return (
    <>
      <section class="container">
        {/* {currentUser == null && <div>{loggedOutDisplay()}</div>} */}
        {!currentUser && <div>{loggedInDisplay()}</div>}
      </section>

      {/* {gameIsReady == true && } */}
    </>
  );
};

export default Home;
