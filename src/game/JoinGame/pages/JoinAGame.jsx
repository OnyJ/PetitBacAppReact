import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const JoinAGame = () => {
  const [gameId, setGameId] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);

  const game = {
    pathname: "/waiting_room",
    testId: gameId,
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <div className="container text-center">
          <div className="join-a-game h-75">
            <center className="">
              <form className="card border-secondary p-4">
                <h2 className="pb-2">Numéro de la partie :</h2>
                <input
                  type="number"
                  value={gameId}
                  required
                  onChange={(e) => setGameId(e.target.value)}
                  className="m-3"
                ></input>
                <Link to={game}>
                  <button
                    type="submit"
                    className="m-2 btn btn-warning btn-lg text-dark"
                  >
                    Rejoindre la partie
                  </button>
                </Link>
              </form>
            </center>
          </div>
          <div className="row mt-5">
            <div className="col">
              <Link to="/" className="btn btn-warning btn-lg text-dark">
                Retour
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinAGame;
