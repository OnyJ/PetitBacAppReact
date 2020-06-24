 
import React, { useEffect, useState } from "react";
import actionCable from 'actioncable';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import {useSelector} from 'react-redux'
import useSelection from "antd/lib/table/hooks/useSelection";
import {useLocation, Link, useHistory} from "react-router-dom";


const WaitingRoom = () => {
  const currentUser = useSelector(state => state.auth.currentUser)
  let location = useLocation();
  let history = useHistory();
  const [gameId, setGameId] = useState(location.testId)
  const [categories, setCategories] = useState(location.categories)
  const [channel, setChannel] = useState(null);
  //const [test, setTest] = useState("rien");
  const [data, setData] = useState("kedal");
  const [stop, setStop] = useState(false);
  const [start, setStart] = useState(false)
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState('');
  const cable = actionCable.createConsumer('ws://localhost:3000/cable');
  
  useEffect(() => {
        const sub = cable.subscriptions.create({ channel :'RoomChannel', game_id: gameId, user_id: currentUser.id},{
            initialized() {
              setChannel(this)              
              console.log('subscriptions', currentUser)
            },
            connected() {
              console.log('test')
              this.perform('received', {game_id: gameId})
            },
            received(data) {
              
              if (!Array.isArray(data)) { 
                history.push('/current_game',{
                  categories: categories, 
                  gameId:gameId
                })
              }
              else { 
                setPlayers(data)
                setAdmin(data[0])
              }
            }
            
          })
          
      }, []);

      // useEffect(() => {
      //   if (channel)
      //   channel.perform('received', {game_id: gameId})
      // }, [])
      
      console.log(players)
  
  /*useEffect(() => {
    
    if (stop) {
      
      alert("STOP !")
    }
      
  }, [stop]);*/
  

  return (
    <>
    
    <ActionCableProvider cable={cable} >
      {admin &&
        <p> Admin: {admin.username}</p>
      }
      {players &&
        <ul>
          {players.slice(1).map((player, i) => (
            <li key={i}>{player.username} has join the game</li>
          ))}
        </ul>
      }

      {currentUser.id == admin.id && 
       <button onClick={()=> channel.perform('starting',{start: true})}>Let's play</button>
      }
     
    </ActionCableProvider>
    
    </>
  );
};
export default WaitingRoom;