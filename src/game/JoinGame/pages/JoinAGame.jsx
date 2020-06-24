import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

const JoinAGame = () => {
  const [gameId, setGameId] = useState('')

  const game = {
    pathname: '/waiting_room', 
    testId: gameId
  }

  return(
    <>
      <div>
   
          <input type="number" value={gameId} onChange={(e) => setGameId(e.target.value)}>
          </input>
          <Link to={game}><button>Game</button></Link>

      </div>
    </>
  )
}

export default JoinAGame; 