import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth);
  return <></>;
};

export default Profile;