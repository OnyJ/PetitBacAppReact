import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchGetProfile } from "../../authentication/fetchUserAuth";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  // GetProfile(currentUser.id);

  return (
    <>
      {currentUser == null && <h1> HOME LALALA</h1>}
      {currentUser && (
        <div>
          <h1> HOME LALALA</h1>
          <p>{currentUser.email}</p>
        </div>
      )}
      <button>
        <Link to="/current_game">See current Game</Link>
      </button>
    </>
  );
};

export default Home;
