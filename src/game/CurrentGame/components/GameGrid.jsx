// First part of a game
// We see the random chosen Letter
// Everyone is filling the categories form
// There is a "Stop" button for the first player who finishes
import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { fetchGame } from "../fetchCurrentGame";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import GameMarking from './GameMarking';
import Cookies from 'js-cookie'
import { Button, Form } from 'react-bootstrap';


const GameGrid = ({gameId}) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({})
  const [id, setId] = useState(gameId);
  const auth = useSelector(state => state.auth)
  const [test, setTest] = useState(false)
  const history = useHistory();
  const letter = ["A...", "B...", "C...", "D...", "E...", "F...", "G...", "H...", "I...", "J...", "K...", "L...", "M...", "N...", "O...", "P...", "Q...", "R...", "S...", "T...", "U...", "V...", "W...", "X...", "Y...", "Z..."]
  const randomLetter = letter[Math.floor(Math.random()*letter.length)];
  console.log(id)


  useEffect(() => {
    const fetchGame = () => {
      setCategories([])
      const API_URL = process.env.REACT_APP_BASE_URL;
      fetch(`${API_URL}games/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => setCategories(response[1]))

    }
    fetchGame();
  }, []);

  console.log(categories)

  const showInputs = (e) => {
    e.preventDefault()
    setTest(true)
    setData({stop: true, user_id: auth.currentUser.id})
    let tmp = {}
    categories.map((category) => (
      tmp[category.name] = e.target.elements.namedItem(category.name).value
    ))
    setData({...data, ...tmp})
    console.log(data)

  };

  return (
    <>
    {!test &&

    <div className="container">
      <h1>Grille de jeu</h1>
      <p>Lettre : {randomLetter}</p>
      <form onSubmit={showInputs}>
        {categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <input className="form-control" type="text" name={category.name} placeholder={randomLetter} autocomplete="off" />
            <br />
          </div>
        ))}
        <Button variant="warning" type="submit">
              Stop
        </Button>
      </form>
    </div>
    }
        {test &&
        <GameMarking dataResults={data}/>}

    </>
  );
};

export default GameGrid;
