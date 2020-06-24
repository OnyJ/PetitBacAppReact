// First part of a game
// We see the random chosen Letter
// Everyone is filling the categories form
// There is a "Stop" button for the first player who finishes
import React, { useEffect, useState } from "react";
import actionCable from 'actioncable';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import {useSelector} from 'react-redux'
import { fetchGame } from "../fetchCurrentGame";
import { createPortal } from "react-dom";
import GameMarking from './GameMarking';
import Cookies from 'js-cookie'
import { Button, Form } from 'react-bootstrap';


const GameGrid = ({gameId}) => {
  const [categories, setCategories] = useState([]);
  const [channel, setChannel] = useState(null);
  const [data, setData] = useState({})
  const [id, setId] = useState(gameId);
  const auth = useSelector(state => state.auth)
  const [test, setTest] = useState(false) 
  const cable = actionCable.createConsumer('ws://localhost:3000/cable');
  
  useEffect(() => {
        const sub = cable.subscriptions.create({ channel :'GameChannel', game_id: gameId},{
            initialized() {
              setChannel(this)              
            },
            connected() {

            },
            received(data) {
              if (data['stop'])
                alert("stop")
            }
            
          })
          
      }, []);
  
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

  const showInputs = (e) => {
    e.preventDefault()
    //setTest(true)
    //setData({stop: true, user_id: auth.currentUser.id})
    let tmp = {}
    categories.map((category) => (
      tmp[category.name] = e.target.elements.namedItem(category.name).value
    ))
    setData({...data, ...tmp})
    channel.perform('received', {...tmp, stop: true})
  };

  return (
    <>
    {!test &&
    
    <div className="container">
      <h1>Grille de jeu</h1>
      <form onSubmit={showInputs}>
        {categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <input className="form-control" type="text" name={category.name} />
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
