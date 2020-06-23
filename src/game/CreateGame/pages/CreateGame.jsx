// new file
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { SelectCategories } from "../components/SelectCategories";
import Cookies from 'js-cookie'
import { Button, Form } from 'react-bootstrap';



export const CreateGame = ({isGameReady, gameIdForHome}) => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const auth = useSelector(state => state.auth)
  const [maxPlayer, setMaxPlayer] = useState('')
  const [categories, setCategories] = useState([])
  const [testCateg, setTestCateg] = useState([])
  const [gameId, setGameId] = useState('')
  const [isReady, setIsReady] = useState(false)

  // console.log(testCateg[0].id)
  console.log(gameId)

  // const osef = (value) => {
  //   console.log('caca')
  //   setTest(value)
  // }

    useEffect(()=>{
      if (categories.length)
        CreateAGame(currentUser, maxPlayer);
    },[categories])

    const create = (e) => {
        e.preventDefault()
        setCategories( document.getElementsByClassName("categories")[0].innerText.split("\n") )
        const api_url = process.env.REACT_APP_BASE_URL
         console.log(categories)
        // const data = {
        //   join_category_games: {
        //     category_id: category_id,
        //     game_id: game_id
        //   }
        // }
        // fetch(`${api_url}join_category_games`, {
        //   method: 'post',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body:

        // })

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

      fetch(`${api_url}games`, {
        method: 'get',
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${Cookies.get("token")}`
        },
      })
      .then(response => response.json())
      .then(response => setGameId(response[response.length -1].id))

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


        if (testCateg != '') {
          console.log(testCateg )
          testCateg.forEach(categ => {
          createJoinCategGame(gameId, categ.id)
          console.log(isReady)
          })
          isGameReady(isReady)
          gameIdForHome(gameId)
        }








    return(
    <>
    <div className="container">
      <div className="row">
      <h1>Nombre total de joueurs :</h1>
      <form onSubmit={create}>
        <p><input type='number' value={maxPlayer} onChange={(e) => setMaxPlayer(e.target.value)} placeholder="max player" className="form-control"></input></p>
        <SelectCategories tg={selectCategories => setTestCateg(selectCategories)}/>
        <Button variant="warning" type="submit">
              Envoyer
        </Button>
      </form>
    </div>
    </div>
    </>
  )
}

