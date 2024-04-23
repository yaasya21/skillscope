import React from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "./components/Logo";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
//import {useLocation} from "react-router-dom"
//import {ArrowButton} from "./components/ArrowButton"
const Header = () => {
  let id = localStorage.getItem("id");
  const isLogged = localStorage.getItem("id");
  // const isTalentsPage = location.pathname === "/talents"
  // const isProofsPage = location.pathname === "/proofs"
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
            className={styles.button_in}
            // to={`${Endpoints.POST_TALENT_SIGNIN}`}
          >
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
