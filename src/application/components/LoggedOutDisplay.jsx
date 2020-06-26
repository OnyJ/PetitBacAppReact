import React from "react";
import { Link } from "react-router-dom";

const LoggedOutDisplay = () => {
  const emojiShocked = "\u{1f628} ";
  const emojiFinger = "\u{1f449} ";

  return (
    <>
      <div className="container">
        <center className="menu-logged-out h-100">
          <p className="h5 mb-5">
            "Un Jeu du Petit Bac sur tous vos appareils !"
          </p>
          <p className="h3 mb-5">
            Vous n'êtes pas encore connecté au jeu {emojiShocked}
          </p>
          <div className="menu-logged-out-buttons">
            <div>
              {emojiFinger}
              <Link to="/login">
                <button className="btn btn-warning btn-lg text-dark">
                  Connexion
                </button>
              </Link>
            </div>
            <div>
              {emojiFinger}
              <Link to="/signup">
                <button className="btn btn-warning btn-lg text-dark">
                  Inscription
                </button>
              </Link>
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default LoggedOutDisplay;
