import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../App.scss";
import Cookies from "js-cookie";
import {Link} from 'react-router-dom'
import { Button } from "react-bootstrap";

// Assets
import imgProfile from "../../application/assets/images/login.png";
import imgMedal from "../../application/assets/images/medal.png";
import imgMedal2 from "../../application/assets/images/medal2.png";
import imgMedal3 from "../../application/assets/images/medal3.png";
import imgMedal4 from "../../application/assets/images/medal4.png";


const Profile = () => {
  const [launchCreateGame, setLaunchCreateGame] = useState(false);
  const currentUser = useSelector(state => state.auth.currentUser)


  return ( <>
      <div class="container card border-primary">
          <div className="create-game pt-2">
            <div className="title-div bg-secondary card mb-3">
              <div className="pt-3"></div>
            <div className="row">
            <img
                  src={imgProfile}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"/>
            <h1 className="ml-3 text-light h2">
                    Profil de <br />
                    {currentUser.username}
            </h1>
            <div className="container md-4">
              <p><br />Badges à obtenir (achievements) :<br /></p>
                <img
                  src={imgMedal}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"/>
                  <img
                  src={imgMedal2}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"/>
                  <img
                  src={imgMedal3}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"/>
                  <img
                  src={imgMedal4}
                  alt="create_game_logo"
                  width="50px"
                  height="50px"
                  className="ml-4 mt-1"/>

              <h5><br />Votre email :<br />-> {currentUser.email} </h5>
              <h5><br />Votre mot de passe :<br />-> *************</h5>
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col">
                  <Link
                    to="create_game"
                    className="btn btn-warning btn-lg text-dark"
                    >
                      Créer une Partie
                  </Link>
                </div>
                <div class="col order-1">
                  <Link
                    to='/join_a_game'
                    className="btn btn-warning btn-lg text-dark"
                    >
                      Rejoindre une Partie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
};

export default Profile;
