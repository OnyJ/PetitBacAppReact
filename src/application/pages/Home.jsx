// Installed
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Pages and components
import CurrentGame from "../../game/CurrentGame/pages/CurrentGame";
import CreateGame from "../../game/CreateGame/pages/CreateGame";
import LoggedOutDisplay from "../components/LoggedOutDisplay";

// Assets and stylesheets
import "bootstrap/dist/css/bootstrap.css";
import imgHistory from "../assets/images/history-parchment.png";
import imgFriends from "../assets/images/friends.png";
import imgHome from "../assets/images/home-yellow.png";
import imgLevel from "../assets/images/star.png";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [gameIsReady, setGameIsReady] = useState();
  const [gameId, setGameId] = useState("");
  const [launchCreateGame, setLaunchCreateGame] = useState(false);

  console.log("wss://api-petitbac.herokuapp.com/cable");

  const loggedInDisplay = () => {
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
              <h1 className="ml-3 text-light pt-1">Menu</h1>
            </div>
          </div>

          <div className="pr-3 text-right">
            {isComputerScreen() && (
              <>
                <h2 className="h1">{currentUser.username}</h2>
                <p className="h3">
                  <img
                    src={imgLevel}
                    alt="star_logo"
                    width="38px"
                    height="38px"
                    className="mr-2"
                  />
                  Niveau {currentUser.level}{" "}
                </p>
              </>
            )}
          </div>
        </div>
        {!isComputerScreen() && (
          <div className="text-right">
            <h2 className="h3 mt-2">{currentUser.username}</h2>
            <p className="h5">
              <img
                src={imgLevel}
                alt="star_logo"
                width="30px"
                height="30px"
                className="mr-2"
              />
              Niveau {currentUser.level}
            </p>
          </div>
        )}

        {isComputerScreen() && <div className="mt-5"></div>}
        <div
          className={
            isComputerScreen() ? "row" : "d-flex justify-content-around"
          }
        >
          <Link to="/friends">
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
          <Link to="/history">
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
            <Link to="/join_a_game">
              <button className="btn btn-warning btn-lg text-dark">
                Rejoindre une Partie
              </button>
            </Link>
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
