import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    </>
  );
};

export default Home;
