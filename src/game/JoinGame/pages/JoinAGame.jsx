import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
// Assets
import imgCreategame from "../../../application/assets/images/creategame-palette.png";
import imgFriends from "../../../application/assets/images/friends.png";
import imgWaiting from "../../../application/assets/images/waiting-sofa.png";
import imgAdd from "../../../application/assets/images/add-green.png";
import imgJoin from "../../../application/assets/images/join.png";

const JoinAGame = () => {
  const [gameId, setGameId] = useState('')
  const game = {
    pathname: '/waiting_room',
    testId: gameId
  }

  return(
    <>
    <div className="container">
      <div className="create-game pt-2">
        <div className="title-div bg-secondary card mb-3">
          <div className="pt-3"></div>
            <div className="row">
              <img
                src={imgJoin}
                alt="create_game_logo"
                width="50px"
                height="50px"
                className="ml-4 mt-1"
              />
              <h1 className="ml-3 text-light h2">
                Rejoindre <br />
                une partie
              </h1>
            </div>
          </div>
        </div>
        <p>Insérez votre numéro de partie : </p>
        <input
          type="number"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="(ex : 345)"
          className="max-players form-control md-3"
        ></input>
        <br/>
        <Link to={game}><button class="btn-lg btn-outline-success">Rejoindre</button></Link>
    </div>
    </>
  )
}

export default JoinAGame;
