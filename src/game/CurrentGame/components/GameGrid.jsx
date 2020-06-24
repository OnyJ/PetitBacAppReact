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
import {useHistory} from 'react-router-dom'


const GameGrid = ({gameId}) => {
  let history = useHistory();
  const currentUser = useSelector(state => state.auth.currentUser)
  const [categories, setCategories] = useState([]);
  const [channel, setChannel] = useState(null);
  const [answers, setAnswers] = useState({})
  const [id, setId] = useState(gameId);
  const auth = useSelector(state => state.auth)
  const [test, setTest] = useState(false) 
  const cable = actionCable.createConsumer('ws://localhost:3000/cable');
  
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
                console.log(tmp)
                this.perform('received', tmp)
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
    const test = document.getElementsByClassName('form-control')
    let tmp = {}
      for (let item of test) {
        tmp[item.name] = item.value 
      }
  
    //e.preventDefault()
    if (response['stop']) {
      console.log(response)
      console.log(answers)
      channel.perform('received',  answers)
    }
  };


  const handleClick = () => {
    channel.perform('stopping', { stop: true})
    
  }

  



  return (
    <ActionCableProvider cable={cable}>
      {/* <ActionCableConsumer
      channel={{channel:'GameChannel', game_id: gameId}}
      onReceived={handleReceivedAnswers}> */}
      {!test &&
      
      <div className="container">
        <h1>Grille de jeu</h1>
        <form>
          {categories.map((category) => (
            <div key={category.id}>
              <span>{category.name}</span>
              <input className="form-control" type="text" name={category.name}/>
              <br />
            </div>
          ))}
          <Button onClick={(handleClick)} variant="warning">
                Stop
          </Button>
        </form>
      </div>
      }
          {/* {test && 
          <GameMarking dataResults={data}/>} */}

      {/* </ActionCableConsumer> */}
    </ActionCableProvider>

  );
};

export default GameGrid;
// onChange={(e) => setAnswers({...answers, [e.target.name]: e.target.value})}