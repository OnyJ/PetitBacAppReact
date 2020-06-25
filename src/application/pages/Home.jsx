// Installed
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Pages and components
import CurrentGame from "../../game/CurrentGame/pages/CurrentGame";
import CreateGame from "../../game/CreateGame/pages/CreateGame";
import LoggedOutDisplay from "../components/LoggedOutDisplay";

import "bootstrap/dist/css/bootstrap.css";
import imgHistory from "../assets/images/history-parchment.png";
import imgFriends from "../assets/images/friends.png";
import imgHome from "../assets/images/home-yellow.png";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [gameIsReady, setGameIsReady] = useState();
  const [gameId, setGameId] = useState("");
  const [launchCreateGame, setLaunchCreateGame] = useState(false);
  // GetProfile(currentUser.id);

  const loggedInDisplay = () => {
    console.log(gameIsReady);
    console.log(gameId);

    const isComputerScreen = () => {
      return window.screen.availWidth > 375;
    };

    return (
      <>
        <div className="menu-header-div pt-4">
          <div className="title-div bg-secondary card pt-3">
            <div className="row">
              <Link to="/">
                <img
                  src={imgHome}
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
                src={imgFriends}
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
                src={imgHistory}
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
        {currentUser == null && <div>{LoggedOutDisplay()}</div>}
        {currentUser && <div>{loggedInDisplay()}</div>}
      </section>
    </>
  );
};

export default Home;
