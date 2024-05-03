import React from "react";
import styles from "./Logo.module.css";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/talents" className={styles.logo}>
      <p>SkillScope</p>
    </NavLink>
  );
};

export { Logo };
