// Installed
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Pages and Components
import { fetchUserLogout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";

// Assets
import imgLogout from "../assets/images/logout-power-white.png";
import imgSettings from "../assets/images/settings-white.png";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const logout = () => {
    fetchUserLogout();
    dispatch(logoutSuccess());
    dispatch({ type: "RESET" });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom bg-primary">
      <span className="navbar-brand">
        <Link to="/">Petit Bac</Link>
      </span>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>

      {currentUser && (
        <>
          <a href="#">
            <img
              src={imgSettings}
              alt="settings_icon"
              width="30px"
              height="30px"
            />
          </a>
          <div className="ml-3"></div>
          <a onClick={logout} href="#">
            <img src={imgLogout} alt="logout_icon" width="30px" height="30px" />
          </a>
        </>
      )}
    </nav>
  );
};

export default Navbar;
