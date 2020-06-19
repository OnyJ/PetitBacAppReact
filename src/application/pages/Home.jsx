import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateGame } from "../../game/CreateGame/pages/CreateGame";

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
    </>
  );
};

export default Home;
