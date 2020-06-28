// Installed

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

// Pages and components
import { SelectCategories } from "../components/SelectCategories";
// Assets
import imgCreategame from "../../../application/assets/images/creategame-palette.png";
import imgFriends from "../../../application/assets/images/friends.png";
import imgWaiting from "../../../application/assets/images/waiting-sofa.png";
import imgAdd from "../../../application/assets/images/add-green.png";

 const CreateGame = () => {

  const currentUser = useSelector(state => state.auth.currentUser)
  const auth = useSelector(state => state.auth)
  const [maxPlayer, setMaxPlayer] = useState('')
  const [categories, setCategories] = useState([])
  const [testCateg, setTestCateg] = useState([])
  const [gameId, setGameId] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [compteur, setCompteur] = useState([])
  const letter = [
    "A...",
    "B...",
    "C...",
    "D...",
    "E...",
    "F...",
    "G...",
    "H...",
    "I...",
    "J...",
    "K...",
    "L...",
    "M...",
    "N...",
    "O...",
    "P...",
    "Q...",
    "R...",
    "S...",
    "T...",
    "U...",
    "V...",
    "W...",
    "X...",
    "Y...",
    "Z...",
  ];
  console.log(compteur)
  const history = useHistory()
  
  
 

    const create = async (e) => {
        e.preventDefault()
        setCategories( document.getElementsByClassName("categories")[0].innerText.split("\n") )
         CreateAGame(currentUser, maxPlayer, letter)
    }  
    
    const CreateAGame = (currentUser, maxGuests) => {
      const api_url = process.env.REACT_APP_BASE_URL;
      const data = {
        game: {
          creator_id: currentUser.id, 
          winner_id: null,
          max_guests: maxGuests,
          letter: letter[Math.floor(Math.random() * letter.length)]
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
            setCompteur([...compteur, 'osef'])
            setIsReady(true)
            
            return response.json()  
          }
          return response
        })

       }

      const testPass = {
        pathname: '/waiting_room', 
        testId: gameId, 
        categories: testCateg
      }
     const categAction = () => {
      testCateg.forEach(categ => { 
        createJoinCategGame(gameId, categ.id)
        })
        
     }
        
      categAction()
          
      const isComputerScreen = () => {
        return window.screen.availWidth > 375;
      };

  return (
    <>
      {currentUser == null ? (
        <>
          {alert("Compte déconnecté")}
          <Redirect to="/" />
        </>
      ) : (
        <section class="container card border-primary">
          <div className="create-game pt-2">
            <div className="title-div bg-secondary card mb-3">
              {isComputerScreen() ? (
                <div className="pt-3"></div>
              ) : (
                <div className="pt-1"></div>
              )}
              <div className="row">
                <img
                  src={imgCreategame}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className={isComputerScreen() ? "ml-4 mt-1" : "ml-4"}
                />
                {isComputerScreen() ? (
                  <h1 className="ml-3 text-light h2">
                    Création <br />
                    de partie
                  </h1>
                ) : (
                  <h1 className="ml-3 text-light h3">
                    Création <br />
                    de partie
                  </h1>
                )}
              </div>
            </div>
            <form onSubmit={create}>
              {/* Tabs display */}
              <ul class="nav nav-tabs md-tabs" id="tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active show"
                    id="home-tab-ex"
                    data-toggle="tab"
                    href="#tab-guests"
                    role="tab"
                    aria-controls="tab-guests"
                    aria-selected="true"
                  >
                    <span class="badge badge-pill badge-dark mr-3">1</span>
                    <span className="pt-3">Invités</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="profile-tab-ex"
                    data-toggle="tab"
                    href="#tab-categories"
                    role="tab"
                    aria-controls="tab-categories"
                    aria-selected="false"
                  >
                    <span class="badge badge-pill badge-dark mr-3">2</span>
                    <span className="pt-3">Categories</span>
                  </a>
                </li>
              </ul>
              {/* End of Tabs display */}

              {/* Content display */}
              <div class="tab-content pt-3">
                <div
                  class="tab-pane fade active show"
                  id="tab-guests"
                  role="tabpanel"
                  aria-labelledby="home-tab-ex"
                >
                  {isComputerScreen() && <h2>Invités</h2>}
                  <input
                    type="number"
                    value={maxPlayer}
                    onChange={(e) => setMaxPlayer(e.target.value)}
                    placeholder="Nombre max de joueurs"
                    className="max-players form-control"
                  ></input>
                  {/* {isComputerScreen() && <div className="mb-3"></div>} */}
                  <div className="guests-main-div row">
                    <div className="guests-child-div">
                      <div className="row pl-3">
                        <p className="h3 pt-3">Mes amis</p>
                        <span className="w-50 ml-5 text-right">
                          <img
                            className="menu-icon m-2"
                            src={imgFriends}
                            alt="friends_icon"
                            width="47px"
                            height="47px"
                          />
                        </span>
                      </div>
                      <div className="card border-secondary">
                        <div className="ml-2 row">
                          {/* Loop friends list right here */}

                          <button type="button" class="btn btn-outline-success">
                            <div className="row">
                              <img
                                className="menu-icon m-2"
                                src={imgAdd}
                                alt="add_friend_icon"
                                width="25px"
                                height="25px"
                              />
                              <span className="pt-2"> Robin</span>
                            </div>
                          </button>
                          <button type="button" class="btn btn-outline-success">
                            <div className="row">
                              <img
                                className="menu-icon m-2"
                                src={imgAdd}
                                alt="add_friend_icon"
                                width="25px"
                                height="25px"
                              />
                              <span className="pt-2"> dumbledore</span>
                            </div>
                          </button>
                          <button type="button" class="btn btn-outline-success">
                            <div className="row">
                              <img
                                className="menu-icon m-2"
                                src={imgAdd}
                                alt="add_friend_icon"
                                width="25px"
                                height="25px"
                              />
                              <span className="pt-2"> harry</span>
                            </div>
                          </button>                      
                        </div>
                      </div>
                    </div>
                    <div className="guests-child-div">
                      <div className="row pl-3">
                        <p className="h3 pt-3">Salle d'attente</p>
                        <span className="w-50 text-right">
                          <img
                            className="menu-icon m-2"
                            src={imgWaiting}
                            alt="waiting_icon"
                            width="47px"
                            height="47px"
                          />
                        </span>
                      </div>
                      <div className="card border-secondary">
                        {/* Loop invited friends right here */}

                        <div className="m-2">
                          <span class="badge badge-pill badge-success">Ok</span>
                          <span> Alfred</span>
                        </div>
                        <div className="m-2">
                          <span class="badge badge-pill badge-success">Ok</span>
                          <span> Jean Philippe</span>
                        </div>
                        <div className="m-2">
                          <span class="badge badge-pill badge-success">Ok</span>
                          <span> OsefJoseph</span>
                        </div>
                        <div className="m-2">
                          <span class="badge badge-pill badge-success">Ok</span>
                          <span> RegardeEnMobileÇaScrollBien</span>
                        </div>
                        <div className="m-2">
                          <span class="badge badge-pill badge-success">Ok</span>
                          <span> BgDu22</span>
                        </div>

                        {/* End of invited friends loop */}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="tab-categories"
                  role="tabpanel"
                  aria-labelledby="profile-tab-ex"
                >   {/* End of friends loop */}
                  <div className="row">
                    <SelectCategories
                      tg={(selectCategories) => setTestCateg(selectCategories)}
                    />
                  </div>
                </div>
              </div>
              {/* End of content display */}

              <center>
                {/* A conditionnal button possibility : */}
                {/* Render [a gray button type=""] if !selectionComplete */}
                {/* Render [a yellow button type="submit"] if selectionComplete */}
                <Button
                  variant="warning text-dark play-button mt-5"
                  type="submit"
                >
                  Jouer
                </Button>
              </center>
            </form>
          </div>
        </section>
      )}
      {isReady && 
        <Redirect to={{
          pathname: '/waiting_room',
          testId: gameId, 
          categ: categories

        }}/>
    }
    </>
  );
};

export default CreateGame;
