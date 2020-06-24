// Display the winner
// Buttons : Score, Replay, Leave
import React, {useState} from 'react';
import history from '../../../history'
import {Link} from 'react-router-dom'
import GameScore from './GameScore';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';


const GameFinished = ({data}) => {

  const finalScore = useSelector(state => state.score.score)

  const [score, setScore] = useState(data)
  const [goToScore, setGoToScore] = useState(false)


    const playAgain = () => {
      history.push('/login')
    }

  return(
    <>
      <div className="container">
          {!goToScore &&
            <div className="row">
              <div class="col">
                <p> Votre score est de : {score} points</p>
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
        </div>
    </>
  )
}

export default GameFinished
