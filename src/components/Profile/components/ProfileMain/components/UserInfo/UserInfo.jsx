import React from "react";
import { Status } from "../Status";
import styles from "./UserInfo.module.css";
import { Place } from "@mui/icons-material";

const UserInfo = ({ userData }) => {
  const role = localStorage.getItem("role");
  return (
    <div className={styles.info}>
      <div className={styles.generalInfo}>
        <div
          className={styles.name}
        >{`${userData.name} ${userData.surname}`}</div>
        <div className={styles.location}>
          <span>{userData.location}</span> <Place color="secondary" />
        </div>
      </div>
      {userData.status && role === "talent" && (
        <div className={styles.status}>
          <Status status={userData.status} />
        </div>
      )}
    </div>
  );
};

export { UserInfo };
