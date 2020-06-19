import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    Logout();
    dispatch(logoutSuccess);
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </ul>
  );
};

export default Navbar;
