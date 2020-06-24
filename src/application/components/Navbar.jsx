import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserLogout } from "../../authentication/fetchUserAuth";
import { logoutSuccess } from "../../authentication/redux/userAuthActions";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const logout = () => {
    fetchUserLogout();
    dispatch(logoutSuccess());
    dispatch({ type: "RESET" });
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
      <span className="navbar-brand">
        <Link to="/">Petit Bac</Link>
      </span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      {currentUser && (
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <div class="nav-item dropdown my-2 my-lg-0">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Compte
            </a>
            <div
              class="dropdown-menu "
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a class="dropdown-item" href="#">
                Profil
              </a>
              <a class="dropdown-item" onClick={logout} href="#">
                Deconnexion
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
