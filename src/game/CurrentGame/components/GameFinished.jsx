// Display the winner
// Buttons : Score, Replay, Leave
import React, {useState} from 'react';
import history from '../../../history'

const GameFinished = ({data}) => {
  const [score, setScore] = useState(data)

    const playAgain = () => {
      history.push('/login')
    }

  return(
    <>
      <div>
        <p> le score est de : {score}</p>
        <button onClick={history.push('/signup')}>Rejouer</button>
        <button>Voir les scores finaux</button>
      </div>
    </>
  )
}

export default GameFinished