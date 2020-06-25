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

const GameMarking = () => {

  let location = useLocation();
  const [id, setId] = useState(location.state.gameId)
  const currentUser = useSelector(state => state.auth.currentUser)
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState([])
  
  console.log(id)

  const dispatch = useDispatch()
  const osef = useSelector(state => state.score)

  useEffect(() => {
    const fetchResponses = () => {
    const api_url = process.env.REACT_APP_BASE_URL
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
    setAnswer(tmp)
    console.log(tmp)
     
  }
  fetchResponses();


  }, [])


  // const submitScore = (answer) => {
  //   setIsReady(true)
  //   let tmp = 0
  //   for (const [key, value] of Object.entries(answer)) {
  //     if (value === true) {
  //       tmp += 1
  //     }
  //   }
  //   setScore(tmp)
  //   sendGlobalScore(tmp + osef.score) 
  // }

  // const sendGlobalScore = (score) => {
  //   dispatch({type: 'ADD_SCORE', score: score})
  // }
  console.log(answer.filter(ans => ans.user_id != currentUser.id))
 

  return (
    <>

      <ul>
        {answer.filter(ans => ans.user_id != currentUser.id).map(rep=> (
          <li key={rep.id}> 
            {rep.category_id} : {rep.content}
          </li>
        ))}
    </ul>

    {/* {(Object.keys(results).length && !isReady) && 
    <div>
      <h1>GameMarking</h1>
      <ul style={{listStyle: "none"}}>
        {Object.keys(results).map(result => 
          <li>
            {results[result]}
            <button onClick={() => setAnswer({...answer, [results[result]]: true})}>V</button>
            <button onClick={() => setAnswer({...answer, [results[result]]: false})}>X</button>
          </li>
          )}          
      </ul>
      <button onClick={() =>submitScore(answer)}>Valider réponses</button>
    </div>
    } */}

   {/* {isReady && 
      <GameFinished data={score}/>

   } */}

    
    </>
  )
}

export default GameMarking;