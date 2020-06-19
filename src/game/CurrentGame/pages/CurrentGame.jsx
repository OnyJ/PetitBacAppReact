// Will display in order each step of the game
// 1. GameGrid
// 2. GamerMarking
// 3. GameFinished

import React from "react";
import GameGrid from "../components/GameGrid";

const CurrentGame = () => {
  return (
    <>
      <h1>CurrentGame</h1>
      <GameGrid />
    </>
  );
};

export default CurrentGame;
