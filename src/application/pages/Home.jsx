import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CurrentGame from "../../game/CurrentGame/pages/CurrentGame";
import CreateGame from "../../game/CreateGame/pages/CreateGame";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
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
        <center className="menu-logged-out">
          <p className="h5 mb-5">
            "Un Jeu du Petit Bac sur tous vos appareils !"
          </p>
          <p className="h3 mb-5">
            Vous n'êtes pas encore connecté au jeu {emojiShocked}
          </p>
          <div className="menu-logged-out-buttons">
            <div>
              {emojiFinger}
              <Link to="/login">
                <button className="btn btn-warning btn-lg">Connexion</button>
              </Link>
            </div>
            <div>
              {emojiFinger}
              <Link to="/signup">
                <button className="btn btn-warning btn-lg">Inscription</button>
              </Link>
            </div>
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
        <div className="menu-header-div pt-4">
          <div className="menu-title-div bg-secondary card pt-3">
            <div className="row">
              <Link to="/">
                <img
                  src={require("../assets/images/home-yellow.png")}
                  alt="home_logo"
                  width="50px"
                  height="50px"
                  className="ml-4"
                />
              </Link>
              <h1 className="ml-3 text-light pt-2">Menu</h1>
            </div>
          </div>

          <div className="menu-user-div pr-3 text-right">
            {isComputerScreen() ? (
              <>
                <h2 className="h1">currentUser.username</h2>
                <p className="h3">Niveau currentUser.level</p>
              </>
            ) : (
              <>
                <h2 className="h4">aacurrentUser.username</h2>
                <p className="">Niveau currentUser.level</p>
              </>
            )}
          </div>
        </div>

        {isComputerScreen() && <div className="mt-5"></div>}
        <div className="menu-navbar">
          <Link to="/">
            <button type="button" class="btn btn-secondary m-3">
              <img
                className="menu-icon"
                src={require("../assets/images/friends.png")}
                alt="friends_icon"
                width="47px"
                height="47px"
              />
              <p>Amis</p>
            </button>
          </Link>
          <Link to="/">
            <button type="button" class="btn btn-secondary m-3">
              <img
                className="menu-icon"
                src={require("../assets/images/history-parchment.png")}
                alt="history_icon"
                width="47px"
                height="47px"
              />
              <p>Historique</p>
            </button>
          </Link>
        </div>

        <center className="menu-buttons-div">
          <div>
            <button
              onClick={() => setLaunchCreateGame(true)}
              className="btn btn-warning btn-lg text-dark"
            >
              Créer une Partie
            </button>
            {launchCreateGame && (
              <CreateGame
                isGameReady={(isReady) => setGameIsReady(isReady)}
                gameIdForHome={(gameId) => setGameId(gameId)}
              />
            )}
            {/* From front_detailing branch */}
            {launchCreateGame && <Redirect to="/create_game" />}
            {/*  */}
            {/* Maybe comment next line */}
            {gameIsReady === true && <CurrentGame gameId={gameId} />}
            <br />
            <button className="btn btn-warning btn-lg text-dark">
              Rejoindre une Partie
            </button>
          </div>
        </center>
      </>
    );
  };

  return (
    <>
      <section className="container card border-primary">
        {currentUser == null && <div>{loggedOutDisplay()}</div>}
        {currentUser && <div>{loggedInDisplay()}</div>}
      </section>

      {/* {gameIsReady == true && } */}
    </>
  );
};

export default Home;
