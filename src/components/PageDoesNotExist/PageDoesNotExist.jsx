import React from "react";
import styles from "./PageDoesNotExist.module.css";

const PageDoesNotExist = () => {
  return (
    <div className={styles.background}>
      <img src={require("./img/404error.avif")} alt="Page Not Found" />
    </div>
  );
};

export { PageDoesNotExist };
