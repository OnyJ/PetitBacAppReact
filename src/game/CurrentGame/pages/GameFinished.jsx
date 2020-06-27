// Display the winner
// Buttons : Score, Replay, Leave
import React, {useState} from 'react';
import history from '../../../history'
import {Link, useLocation} from 'react-router-dom'
//import GameScore from '../components/GameScore';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';


const GameFinished = ({data}) => {

  const location = useLocation()
  const dispatch = useDispatch();
  const finalScore = useSelector(state => state.score.score)
  const currentUser = useSelector(state => state.auth.currentUser)
  const [gameId, setGameId] = useState(location.state.gameId)
  const [responses, setResponses] = useState([])
  const [score, setScore] = useState(data)
  const [goToScore, setGoToScore] = useState(false)
  const api_url = process.env.REACT_APP_BASE_URL

  console.log(responses, gameId, currentUser.id)
 
  useEffect(() => {
    const fetchScore = () => {
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
      .then(response => setResponses(response.filter(res => res.game_id == gameId && res.user_id === currentUser.id)))
        //
    }
    fetchScore();

  }, [])
   

  const scoreCalc = () => {
    console.log(responses)
    let score = 0
    responses.forEach(res => {
      if (res.status === true){
        score += 1
      }
    })
    //sendGlobalScore(score)
    return score
  }
  console.log(finalScore)
 
  const sendGlobalScore = (score) => {
    dispatch({type: 'ADD_SCORE', score: score})
  }

  return(
    <>
    <ul style={{listStyle: 'none'}}>
        {responses.map(res => (
          <li key={res.id}>{res.content}: {res.status === true ? 'vrai' : 'faux'}</li>
        ))}
    </ul>  

    <p>ton score pour cette partie est de {scoreCalc()}</p>
    <div>
      <Link to='/create_game'><button className='btn btn-warning btn-lg text-dark center mr-5'> REJOUER</button></Link>
      <Link to='/'><button className='btn btn-warning btn-lg text-dark center ml-5'> VOIR LES SCORES FINAUX</button></Link>
    </div>
      {/* <div className="container">
          {!goToScore &&
            <div className="row">
              <div class="col">
                <p>{score} bonnes réponses pour un total de {score} points</p>
              </div>
              <div class="col order-1">
                <Link to="/create_game"><Button variant="btn btn-md btn-warning">Rejouer</Button></Link>
              </div>
              <div class="col order-2">
                <Button variant="btn btn-md btn-warning" onClick={() => setGoToScore(true)}>Voir les scores finaux</Button>
              </div>
            </div>
          }
          {goToScore &&
            <GameScore score={finalScore}></GameScore>
          }
        </div> */}
    </>
  )
}

export default GameFinished
