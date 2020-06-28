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
      <div className='container text-center' >
        <div style={{paddingTop : '300px'}}>
          <input type="number" value={gameId} required onChange={(e) => setGameId(e.target.value)}>
          </input>
          <Link to={game}><button className='btn btn-warning btn-lg text-dark' >Rejoindre la partie</button></Link>
          </div>
      </div>
    </>
  )
}

export default JoinAGame;
