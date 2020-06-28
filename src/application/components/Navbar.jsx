// Installed
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// Pages and Components
import { fetchUserLogout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";
import { Profile } from "../../authentication/pages/Profile";
// Assets
import imgLogout from "../assets/images/logout-power-white.png";
import imgSettings from "../assets/images/settings-white.png";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory()

  const logout = () => {
    fetchUserLogout();
    dispatch(logoutSuccess());
    dispatch({ type: "RESET" });
    history.push('/login')
    alert('vous êtes bien déconnecté')

  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom bg-primary">
      <span className="navbar-brand">
        <Link to="/">Petit Bac</Link>
      </span>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>

      {currentUser && (
        <>
          <Link to="/profile">
            <img
              src={imgSettings}
              alt="settings_icon"
              width="30px"
              height="30px"
            />
          </Link>
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
