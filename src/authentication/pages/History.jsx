import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../App.scss";
import { Link, Redirect } from "react-router-dom";

// Assets
import imgHistory from "../../application/assets/images/review.png";
import imgScore from "../../application/assets/images/scoreboard.png";
import imgGame from "../../application/assets/images/vr-gaming.png";

const History = () => {
  const [launchCreateGame, setLaunchCreateGame] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const finalScore = useSelector((state) => state.score.score);

  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <div class="container card border-primary">
          <div className="create-game pt-2">
            <div className="title-div bg-secondary card mb-3">
              <div className="pt-3"></div>
              <div className="row">
                <img
                  src={imgHistory}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"
                />
                <h1 className="ml-3 text-light h2">
                  Historique de <br />
                  parties
                </h1>
                <div className="container md-4">
                  <div className="row">
                    <div className="col">
                      <p>
                        <br />
                        Score total des parties :
                        <br />
                        <img
                          src={imgScore}
                          alt="create_game_logo"
                          width="50px"
                          height="50px"
                          className="ml-4 mt-1"
                        />
                        {finalScore}
                      </p>
                      <br />
                    </div>
                    <div className="row">
                      <div class="col order-1">
                        <p>
                          <br />
                          Nombre total de partie(s) :
                          <br />
                          <img
                            src={imgGame}
                            alt="create_game_logo"
                            width="50px"
                            height="50px"
                            className="ml-4 mt-1"
                          />
                          {finalScore}
                        </p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <Link to="/" className="btn btn-warning btn-lg text-dark">
                    Retour
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default History;
