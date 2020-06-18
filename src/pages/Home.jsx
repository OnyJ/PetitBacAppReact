import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserRegister, UserLogin } from "../API/userAuth";
import { GetProfile } from "../API/userAuth";
import Cookies from "js-cookie";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("user"))
  );
  console.log(Cookies.get("user"));
  console.log(currentUser.id);
  useEffect(() => {
    GetProfile(currentUser.id);
  }, []);

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
