import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../App.scss";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// Assets
import imgFriends from "../../application/assets/images/friendship.png";
import imgFriends2 from "../../application/assets/images/friends.png";
import imgGame from "../../application/assets/images/vr-gaming.png";
import imgMedal3 from "../../application/assets/images/medal3.png";
import imgMedal4 from "../../application/assets/images/medal4.png";

const Friends = () => {
  const [launchCreateGame, setLaunchCreateGame] = useState(false);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const finalScore = useSelector((state) => state.score.score);
  const api_url = process.env.REACT_APP_BASE_URL
  
  useEffect(() => {
    async function fetchData() {
      let tmp = [];
      const response = await fetch(`${api_url}users`, {
        method: 'get', 
        headers: {
          "Content-Type":"application/json", 
          Authorization: `Bearer ${Cookies.get("token")}`
        },
      });
      console.log(response)
      const array = await response.json();
      
      array.map((obj) => {
        if (obj.username.includes(username)) {
          tmp.push(obj);
        }
      });
      setUsers(tmp)
      console.log(tmp)
    }
    fetchData();
  },[username])
  
  const CreateAFriendship = (currentUser, friend) => {
      const data = {
        friendship: {
          user_id: currentUser.id, 
          friend_id: friend.id
        }
      }  
      
      fetch(`${api_url}friendships`, {
        method: 'post', 
        headers: {
          "Content-Type":"application/json", 
          Authorization: `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(response => console.log(response)) 
      
    }
  
  
  const findUserByUsername = (username) => {
    
  }

  return (
    <>
      <div class="container card border-primary">
        <div className="create-game pt-2 mb-5">
          <div className="title-div bg-secondary card mb-3">
            <div className="pt-3"></div>
            <div className="row">
              <img
                src={imgFriends}
                alt="create_game_logo"
                width="50px"
                height="50px"
                className="ml-4 mt-1"
              />
              <h1 className="ml-3 text-light h2">
                Amis <br />
              </h1>
            </div>
            <div className="md-4">
              <div className="row  mt-5">
                <div className="col">
                  <p>
                    <br />
                    Mes amis :
                  </p>
                </div>
                <div className="row">
                  <div class="col order-1">
                    <img
                      src={imgFriends2}
                      alt="create_game_logo"
                      width="50px"
                      height="50px"
                      className="ml-4 mt-1"
                    />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center className="w-100 mt-5">
          <p className="h2">Vous n'avez pas d'amis pour le moment :)</p>
        </center>

          <div class="form-group">
            <label for="exampleInputEmail1">Rechercher des amis:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <ul>
            {users.slice(0,1).map((user,i) => ( 
              <div>
                <li key={i}>{user.username}</li>
                <button onClick={() => CreateAFriendship(currentUser,user)} className="btn btn-warning btn-lg text-dark">Ajouter</button>
              </div>
              
            ))
            }
          </ul>

        
        <div>
          <Link to="/" className="btn btn-warning btn-lg text-dark">
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Friends;
