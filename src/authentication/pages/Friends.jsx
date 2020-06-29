import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../App.scss";
import { Link, Redirect } from "react-router-dom";

// Assets
import imgFriends from "../../application/assets/images/friendship.png";
import imgFriends2 from "../../application/assets/images/friends.png";

const Friends = () => {
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
          <div className="create-game pt-2 mb-5">
            <div className="title-div bg-secondary card mb-3">
              <div className="pt-3"></div>
              <div className="row">
                <img
                  src={imgFriends}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"
                />
                <h1 className="ml-3 text-light h2">
                  Amis <br />
                </h1>
              </div>
              <div className="md-4">
                <div className="row  mt-5">
                  <div className="col">
                    <p>
                      <br />
                      Mes amis :
                    </p>
                  </div>
                  <div className="row">
                    <div class="col order-1">
                      <img
                        src={imgFriends2}
                        alt="create_game_logo"
                        width="50px"
                        height="50px"
                        className="ml-4 mt-1"
                      />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <center className="w-100 mt-5">
            <p className="h2">Vous n'avez pas d'amis pour le moment :)</p>
          </center>
          <div>
            <Link to="/" className="btn btn-warning btn-lg text-dark">
              Retour
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Friends;
