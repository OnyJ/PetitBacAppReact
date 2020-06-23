import React from "react";
import { Button } from 'antd';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserLogout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    fetchUserLogout();
    dispatch(logoutSuccess());
    dispatch({type: 'RESET'})

  };
  return (
    <ul>
      <li>
      <div className="App">
        <Button type="primary"><Link to="/">Home</Link></Button>
      </div>
      </li>
      <li>
        <Link to="/create_game">Créer une partie</Link>
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
