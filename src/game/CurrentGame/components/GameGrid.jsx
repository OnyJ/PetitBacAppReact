// First part of a game
// We see the random chosen Letter
// Everyone is filling the categories form
// There is a "Stop" button for the first player who finishes
import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { fetchGame } from "../fetchCurrentGame";
import { createPortal } from "react-dom";
import Cookies from 'js-cookie'

const GameGrid = (gameId) => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(gameId);
  const auth = useSelector(state => state.auth)
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

  const showInputs = (e) => {
    e.preventDefault()
    let data = {stop: true, user_id: auth.currentUser.id}
    categories.map((category) => (
      data[category.name] = e.target.elements.namedItem(category.name).value
      
    ))
    console.log(data)
  };
  
  return (
    <>
      <h1>Game Grid</h1>
      <form onSubmit={showInputs}>
        {categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <input type="text" name={category.name} />
            <br />
          </div>
        ))}
        <input type="submit" value="STOP" />
      </form>
    </>
  );
};

export default GameGrid;
