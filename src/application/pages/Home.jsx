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

    return (
      <div>
        <h1>Logged in home</h1>
        <p>Home Logo</p>
        <p>User pseudo</p>

        <button
          onClick={() => setLaunchCreateGame(true)}
          class="btn btn-warning btn-lg"
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
      </div>
    );
  };

  return (
    <>
      <section class="container">
        {currentUser == null && <div>{loggedOutDisplay()}</div>}
        {currentUser && <div>{loggedInDisplay()}</div>}
      </section>

      {/* {gameIsReady == true && } */}
    </>
  );
};

export default Home;
