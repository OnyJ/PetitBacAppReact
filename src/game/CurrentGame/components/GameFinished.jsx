// Display the winner
// Buttons : Score, Replay, Leave
import React, {useState} from 'react';
import history from '../../../history'
import {Link} from 'react-router-dom'
import GameScore from './GameScore';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useSelector } from 'react-redux';


const GameFinished = ({data}) => {
  
  const finalScore = useSelector(state => state.score.score)

  const [score, setScore] = useState(data)
  const [goToScore, setGoToScore] = useState(false)


    const playAgain = () => {
      history.push('/login')
    }

  return(
    <>
      
        {!goToScore &&
        <div>
          <p> le score est de : {score}</p>
          <Link to="/create_game"><button>Rejouer</button></Link>
          <button onClick={() => setGoToScore(true)}>Voir les scores finaux</button>
          </div>
        }
        {goToScore &&
          <GameScore score={finalScore}></GameScore>
        }
       
    </>
  )
}

export default GameFinished