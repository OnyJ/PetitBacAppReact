import React, { useState } from "react";
import { useSelector } from "react-redux";
import GameGrid from "../components/GameGrid";
import { useLocation, Redirect } from "react-router-dom";

const CurrentGame = () => {
  let location = useLocation();
  const [categories, setCategories] = useState(location.state.categories);
  const [gameId, setGameId] = useState(location.state.gameId);
  const [players, setPlayers] = useState(location.state.players);
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log(gameId, players);
  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <div className="container">
          <div className="row">
            <GameGrid gameId={gameId} players={players} />
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentGame;
