import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./components/Logo";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import {doc, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";

const Header = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const isLogged = localStorage.getItem("id");
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (!id) {
      return;
    }
  
    const userDocRef = doc(db, "users", id);
  
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setCoins(userData.coins);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleSignOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/talents");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo_wrap}>
        <div className={styles.logo}>
          <Logo />
        </div>
        {isLogged && (
          <div className={styles.coins}>
            <span>Coins: {coins} </span>
          </div>
        )}
      </div>
      {isLogged ? (
        <div className={styles.button_wrap}>
          <NavLink className={styles.button_in} to={`profile/${id}`}>
            PROFILE
          </NavLink>
          <NavLink
            className={styles.button_in}
            onClick={handleSignOut}
            to="/talents"
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
