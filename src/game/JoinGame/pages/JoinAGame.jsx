import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JoinAGame = () => {
  const [gameId, setGameId] = useState("");

  const game = {
    pathname: "/waiting_room",
    testId: gameId,
  };

  return (
    <>
      <div className="container text-center">
        <div className="join-a-game h-75">
          <center className="">
            <form className="card border-secondary p-4">
              <input
                type="number"
                value={gameId}
                required
                onChange={(e) => setGameId(e.target.value)}
              ></input>
              <Link to={game}>
                <button
                  type="submit"
                  className="btn btn-warning btn-lg text-dark"
                >
                  Rejoindre la partie
                </button>
              </Link>
            </form>
          </center>
        </div>
      </div>
    </>
  );
};

export default JoinAGame;
