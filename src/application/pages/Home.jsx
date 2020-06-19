import React, { useEffect, useState } from "react";
import { GetProfile } from "../../authentication/fetchUserAuth";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Home = () => {
  // const [currentUser, setCurrentUser] = useState(
  // JSON.parse(Cookies.get("user"))
  // );
  const currentUser = useSelector((state) => state.auth.currentUser);

  // console.log(Cookies.get("user"));
  console.log(currentUser);
  // useEffect(() => {
  // GetProfile(currentUser.id);
  // }, []);

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
