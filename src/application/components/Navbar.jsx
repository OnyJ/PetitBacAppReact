import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserLogout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";

const Navbar = () => {
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
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <div className="nav-item dropdown my-2 my-lg-0">
          <a
            className="nav-link dropdown-toggle text-light"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Compte
          </a>
          <div
            className="dropdown-menu "
            aria-labelledby="navbarDropdownMenuLink"
          >
            <a className="dropdown-item" href="#">
              Profil
            </a>
            <a className="dropdown-item" onClick={logout} href="#">
              Deconnexion
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
