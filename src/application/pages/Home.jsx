import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateGame } from "../../game/CreateGame/pages/CreateGame";
import { Link } from "react-router-dom";


const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  // GetProfile(currentUser.id);

  return (
    <>
      {currentUser == null && <h1> HOME LALALA</h1>}
      {currentUser && (
        <div>
          <h1> HOME LALALA</h1>
        </div>
      )}
      <CreateGame />

      <button>
        <Link to="/current_game">See current Game</Link>
      </button>
    </>
  );
};

export default Home;
