// The GameGrid part is finished.
// Someone clicked on the stop button
// Each line is an answer from another player.
// There are checkboxes to say if the answer is a word corresponding to the category or not.
import React, {useState, useEffect, useReducer} from 'react';
import uniqid from 'uniqid'
import history from '../../../history'
import {Link} from 'react-router-dom'
import GameFinished from './GameFinished'
import scoreReducer from '../../../scoreReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from "react-bootstrap";


const GameMarking = ({dataResults}) => {

  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState({})
  const [isReady, setIsReady] = useState(false)

  const dispatch = useDispatch()
  const osef = useSelector(state => state.score)
  console.log(dataResults)

  console.log(answer)
  useEffect(() => {
    setResults(...results, dataResults)

  }, [])

  const submitScore = (answer) => {
    setIsReady(true)
    let tmp = 0
    for (const [key, value] of Object.entries(answer)) {
      console.log(`${key}: ${value}`);
      if (value === true) {
        tmp += 1
        console.log('+1')
      }
    }
    setScore(tmp)
    sendGlobalScore(tmp + osef.score)
  }

  const sendGlobalScore = (score) => {
    dispatch({type: 'ADD_SCORE', score: score})
  }

  console.log(score)

  console.log(answer)

  return (
    <>
    <div className="container">
      {(Object.keys(results).length && !isReady) &&
      <div>
        <h1>Correction :</h1>
        <ul style={{listStyle: "none"}}>
          {Object.keys(results).map(result =>
            <li>
              <div className="row">
                <div class="col">
                  <p>{result} : {results[result]}</p>

                </div>
                <div class="col order-1">
                  <Button variant="btn btn-sm btn-success" onClick={() => setAnswer({...answer, [results[result]]: true})}>V</Button>
                  <Button variant="btn btn-sm btn-danger" onClick={() => setAnswer({...answer, [results[result]]: false})}>X</Button>
                </div>
              </div>
            </li>
            )}
        </ul>
        <Button variant="btn btn-md btn-warning" onClick={() =>submitScore(answer)}>Valider réponses</Button>
      </div>
      }

     {isReady &&
        <GameFinished data={score}/>

     }

    </div>
    </>
  )
}

export default GameMarking;
