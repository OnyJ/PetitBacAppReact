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
import GameMarking from '../pages/GameMarking';
import Cookies from 'js-cookie'
import { Button, Form } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'


const GameGrid = ({gameId, players}) => {
  const history = useHistory();
  const currentUser = useSelector(state => state.auth.currentUser)
  const [nbPlayers, setNbPlayers] = useState(players)
  const [categories, setCategories] = useState([]);
  const [channel, setChannel] = useState(null);
  const [answers, setAnswers] = useState({})
  const [id, setId] = useState(gameId);
  const auth = useSelector(state => state.auth)

  const [test, setTest] = useState(false) 

  const letter = ["A...", "B...", "C...", "D...", "E...", "F...", "G...", "H...", "I...", "J...", "K...", "L...", "M...", "N...", "O...", "P...", "Q...", "R...", "S...", "T...", "U...", "V...", "W...", "X...", "Y...", "Z..."]
  const randomLetter = letter[Math.floor(Math.random()*letter.length)];

  const cable = actionCable.createConsumer(process.env.REACT_APP_CABLE);
  console.log(typeof players, typeof nbPlayers, typeof gameId)
  useEffect(() => {
        const sub = cable.subscriptions.create({ channel :'GameChannel', game_id: gameId,  user_id: currentUser.id},{
            initialized() {
              setChannel(this)              
            },
            connected() {

            },
            received(data) {
             
               if (data['stop']) {
                const test = document.getElementsByClassName('form-control')
                let tmp = {}
                  for (let item of test) {
                    tmp[item.name] = item.value 
                  }
                console.log(data)
                this.perform('received', {answers: tmp, stop: false})
                
              } else {
                console.log(data)
                setTimeout(() => history.push('/game_marking', {
                gameId:id,
                players: nbPlayers
                 }), 1000 )
              }
              
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

  const handleReceivedAnswers = (response) => {
    
  
    //e.preventDefault()
    if (response['stop']) {
      console.log(response)
      console.log(answers)
      channel.perform('received',  answers)
    }
  };


  const handleClick = () => {
    console.log(answers)
    channel.perform('stopping', { stop: true})

    
  }

  return (

    <ActionCableProvider cable={cable}>

      {!test &&
      
      <div className="container">
        <h1>Grille de jeu</h1>
        <p>Lettre : {randomLetter}</p>
        <form>
          {categories.map((category) => (
            <div key={category.id}>
              <span>{category.name}</span>
              <input className="form-control" type="text" onChange={(e) => setAnswers({...answers, [category.name]: e.target.value})} name={category.name} value={answers[category.name]} autocomplete="off" />
              <br />
            </div>
          ))}
          <Button onClick={(handleClick)} variant="warning">
                Stop
          </Button>
        </form>
      </div>
      }
    </ActionCableProvider>

  );
};

export default GameGrid;
