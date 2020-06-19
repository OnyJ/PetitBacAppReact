import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectCategories } from "../../game/CreateGame/components/SelectCategories";

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
      <SelectCategories />
    </>
  );
};

export default Home;
