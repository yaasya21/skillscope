import React from "react";
import {useNavigate} from "react-router-dom"
import { Logo } from "./components/Logo";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
//import {useLocation} from "react-router-dom"
//import {ArrowButton} from "./components/ArrowButton"
const Header = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id");
  const isLogged = localStorage.getItem("id");
  
  const handleSignOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo_wrap}>
        <Logo />
      </div>
      {isLogged ? (
        <div className={styles.button_wrap}>
          <NavLink className={styles.button_in} to={`profile/${id}`}>
            PROFILE
          </NavLink>
          <NavLink
            className={styles.button_in} onClick={handleSignOut}>
            SIGN OUT
          </NavLink>
          </div>
      ) : (
        <div className={styles.button_wrap}>
          <NavLink className={styles.button_in} to="/signin">
            SIGN IN
          </NavLink>
          <NavLink className={styles.button_in} to="/signup">
            SIGN UP
          </NavLink>
        </div>
      )}
    </header>
  );
};
export { Header };
