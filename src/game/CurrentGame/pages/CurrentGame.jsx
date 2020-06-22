// Will display in order each step of the game
// 1. GameGrid
// 2. GamerMarking
// 3. GameFinished

import React from "react";
import GameGrid from "../components/GameGrid";

const CurrentGame = ({gameId}) => {
  return (
    <>
      <GameGrid gameId={gameId}/>
    </>
  );
};

export default CurrentGame;