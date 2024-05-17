import React from "react";
import styles from "./Footer.module.css";
import { Logo } from "../Header/components/Logo";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/profile");

  if (isProfilePage) {
    return null;
  }
  
  return (
    <footer className={styles.footer_wrap}>
      <div className={styles.footer_column}>
        <Logo />
        <p className={styles.moto}>Scoup out your skills</p>
        <p className={styles.main_text}>@Copyright</p>
      </div>
    </footer>
  );
};

export { Footer };
