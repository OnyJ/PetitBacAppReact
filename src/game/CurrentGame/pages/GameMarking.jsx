// The GameGrid part is finished.
// Someone clicked on the stop button
// Each line is an answer from another player.
// There are checkboxes to say if the answer is a word corresponding to the category or not.
import React, {useState, useEffect, useReducer} from 'react';
import uniqid from 'uniqid'
import history from '../../../history'
import {Link} from 'react-router-dom'
//import GameFinished from '../components/GameFinished'
import scoreReducer from '../../../scoreReducer'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";
import actionCable from 'actioncable';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';

const GameMarking = () => {

  let location = useLocation();
  const [id, setId] = useState(location.state.gameId)
  const currentUser = useSelector(state => state.auth.currentUser)
  const [channel, setChannel] = useState(null);
  const [responseSent, setResponseSent] = useState(false)
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [playerResponseLeft, setPlayerResponseLeft] = useState(location.state.players)
  const [count, setCount] = useState(0)
  const api_url = process.env.REACT_APP_BASE_URL
  const cable = actionCable.createConsumer('ws://localhost:3000/cable');
  console.log(location.state.players)
  
  const dispatch = useDispatch()
  const osef = useSelector(state => state.score)

  console.log(playerResponseLeft)
  console.log(count)

 


 useEffect(() => {
        const sub = cable.subscriptions.create({ channel :'MarkingChannel', game_id: id,  user_id: currentUser.id, validator: location.state.players},{
            initialized() {
              setChannel(this)              
            },
            received(data) {  
                        
              
                if (data['stop'])
                    alert('cassez vous tous mtn')
                else {
                  console.log(data)
                }
                // setSubmitted(true)
                // console.log(data)
                
                //this.perform('stop', {...data, count: data['osef'] + count})
        
            }, 
          }) 
        
      }, []);


  useEffect(() => {
    /*const fetchResponses = () => {
    let tmp = []
    fetch(`${api_url}responses`, {
      method: 'get',  
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(responses => {console.log(responses);
      responses.map(obj => {
      if (obj.game_id == id) {
        tmp.push(obj)
        console.log(obj)
      }
     })
    })
    setAnswer( tmp )
    console.log(tmp)
     
  }
  fetchResponses();*/
    
  }, [])
  
    useEffect( () => {
    async function fetchData() {
      let tmp = []
      const response = await fetch(`${api_url}responses`)
      const array = await response.json()
      array.map(obj => {
      if (obj.user_id != currentUser.id && obj.game_id == id) {
        tmp.push(obj)
      }
     })
      setAnswer(tmp)
    }
    fetchData();
    
  },[])
  
  useEffect( () => {
    async function fetchData() {
      const response = await fetch(`${api_url}games/${id}`)
      const array = await response.json()
      setCategories(array[1])
    }
    fetchData();
    
  },[])

  // const sendGlobalScore = (score) => {
  //   dispatch({type: 'ADD_SCORE', score: score})
  // }
  console.log(answer)

  const handleclick = () => {

    let tmp = []
    let score = 0
    answer.map(response => {
     score = 0 
     document.getElementsByName("inlineRadioOptions" + response.id )[0].checked ?
     (score = 1) : (score = -1)
     tmp.push({...response, score: score}) 
    })
    setAnswer(tmp)
    setResponseSent(true)
    setSubmitted(true)
    channel.perform('received', {answers: tmp})
  }
  console.log(answer)
  return (
    <>
     <ActionCableProvider cable={cable}>

        <div className="container">
          <div className="row">
            {categories.map(category => (
            <div className="col-3">
              <div className="card">
                <div className="card-header card-title">
                  <h6 className="text-dark">{category.name}</h6>
                </div>
                <div className="card-body text-dark">
                  <ul>
                      {answer.filter(ans => ans.category_id == category.id).map(rep=> (
                        <li key={rep.id}> 
                          {rep.content} : 
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name={"inlineRadioOptions" + rep.id} id={"inlineRadio1" + rep.id}  value={true} defaultCheched/>
                            <label class="form-check-label text-dark" for={"inlineRadio1"+rep.id}>true</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name={"inlineRadioOptions" + rep.id} id={"inlineRadio2" + rep.id} value={false} />
                            <label class="form-check-label text-dark" for={"inlineRadio2"+rep.id}>false</label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="card-footer">
                  
                </div>
                
              </div>
            </div>
              ))}
          </div>
          {!responseSent && 
            <button onClick={handleclick}>Send correction</button>
          }
        </div>  
      </ActionCableProvider>
    </>
  )
}

export default GameMarking;