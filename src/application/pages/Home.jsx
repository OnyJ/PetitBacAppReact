import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateGame } from "../../game/CreateGame/pages/CreateGame";
import { Link } from "react-router-dom";
import CurrentGame from '../../game/CurrentGame/pages/CurrentGame'


const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [gameIsReady, setGameIsReady] = useState()
  const [gameId, setGameId] = useState('')
  // GetProfile(currentUser.id);
  console.log(gameIsReady)
  console.log(gameId)

  return (
    <>
      {currentUser == null && <h1> HOME LALALA</h1>}
      {currentUser && (
        <div>
          <h1> HOME LALALA</h1>
        </div>
      )}
      <CreateGame isGameReady={isReady => setGameIsReady(isReady)} gameIdForHome={gameId => setGameId(gameId)}/>

      {gameIsReady == true &&
      <div>
      
      <CurrentGame gameId={gameId}/>
    
    </div>
      
      }

     
    </>
  );
};

export default Home;
