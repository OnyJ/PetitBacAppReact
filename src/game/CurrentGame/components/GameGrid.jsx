// First part of a game
// We see the random chosen Letter
// Everyone is filling the categories form
// There is a "Stop" button for the first player who finishes
import React, { useEffect, useState } from "react";
import { fetchGame } from "../fetchCurrentGame";
import { createPortal } from "react-dom";

const GameGrid = (gameId) => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(gameId);
  console.log(id.gameId)
  console.log(gameId.gameId + 'from gameGrid')

  useEffect(() => {
    async function fetchGame() {
      const API_URL = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${API_URL}/games/${id.gameId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const categoriesObject = await response.json();
      console.log(categoriesObject)
      setCategories(categoriesObject[1]);
    }
    fetchGame();
  }, [id]);

  console.log(categories)

  const showInputs = () => {};
  return (
    <>
      <h1>Game Grid</h1>
      <form>
        {categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <input type="text" label="" />
            <br />
          </div>
        ))}
        <input type="submit" value="STOP" />
      </form>
    </>
  );
};

export default GameGrid;
