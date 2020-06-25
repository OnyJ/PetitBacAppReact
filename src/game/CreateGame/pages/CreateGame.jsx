// new file
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { SelectCategories } from "../components/SelectCategories";
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import ScoreContext from '../../../ScoreContext'
import { Button, Form } from "react-bootstrap";

 const CreateGame = () => {

  const currentUser = useSelector(state => state.auth.currentUser)
  const auth = useSelector(state => state.auth)
  const [maxPlayer, setMaxPlayer] = useState('')
  const [categories, setCategories] = useState([])
  const [testCateg, setTestCateg] = useState([])
  const [gameId, setGameId] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isSent, setIsSent] = useState(false)



    const create = async (e) => {
        e.preventDefault()
        setCategories( document.getElementsByClassName("categories")[0].innerText.split("\n") )
         CreateAGame(currentUser, maxPlayer)
         console.log(testCateg)
         console.log(gameId)

    }

    const CreateAGame = (currentUser, maxGuests) => {
      const api_url = process.env.REACT_APP_BASE_URL;
      console.log(maxPlayer, currentUser, categories)
      const data = {
        game: {
          creator_id: currentUser.id,
          winner_id: null,
          max_guests: maxGuests
        }
      }

      fetch(`${api_url}games`, {
        method: 'post',
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(response => setGameId(response.id))

    }

    const createJoinCategGame = (gameId, categId) => {

        const api_url = process.env.REACT_APP_BASE_URL;

        const dataCategGames = {
          join_category_game: {
            game_id: gameId ,
            category_id: categId
          }
        }
        fetch(`${api_url}join_category_games`, {
          method: 'post',
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
          },
          body: JSON.stringify(dataCategGames)
        })
        .then((response) => {
          if (response.ok === true) {
            setIsReady(true)
            return response.json()
          }
          return response
        })
       }

      testCateg.forEach(categ => {
        console.log(gameId)
        console.log(categ.id)
        createJoinCategGame(gameId, categ.id)
        console.log(isReady)
        })

        const testPass = {
          pathname: '/current_game',
          testId: gameId
        }
        return (
          <>
            <div className="container">
              <div className="create-game">
                <p>
                  Mesdames et messieurs (surtout messieurs de l'équipe) Les éléments
                  sont centrés car ils sont dans center du composant parent. Normalement
                  ça s'aligne à gauche.
                </p>
                <p>
                  Et le Menu + pseudo + bouton [Créer une partie] disparaîtrons d'ici
                  peu
                </p>
                <h1>Création de partie</h1>
                <form onSubmit={create}>
                  <input
                    type="number"
                    value={maxPlayer}
                    onChange={(e) => setMaxPlayer(e.target.value)}
                    placeholder="Nombre max de joueurs"
                    className="max-players form-control"
                  ></input>
                  <div className="row">
                    <SelectCategories
                      tg={(selectCategories) => setTestCateg(selectCategories)}
                    />
                  </div>
                  <center>
                    <Button variant="warning" type="submit">
                      Jouer
                    </Button>
                  </center>
                </form>
              </div>
              {isReady &&
                <Link to={testPass}>current game</Link>
              }
            </div>
          </>
        );


}

export default CreateGame

