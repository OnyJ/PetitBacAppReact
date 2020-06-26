import React from "react";
import { useSelector } from "react-redux";
import "../../App.scss";
import Cookies from "js-cookie";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth);
  return ( <>
    <h1>Profile pages</h1>
    <p>Bienvenue {currentUser.username}</p>
  </>)
};

export default Profile;
