import React from "react";
import styles from "./TalentCard.module.css";
import { Button, Avatar } from "@mui/material";
import { Place } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TalentCard = ({ talentData }) => {
  const navigate = useNavigate();

  const handleVisit = () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      navigate(`/profile/${talentData.id}`);
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.background}>
        <Avatar
          src={talentData.avatar ? talentData.avatar : "/broken-image.jpg"}
          sx={{ width: 60, height: 60, mt: 7 }}
          style={{
            border: "2px solid rgba(215, 227, 224, 0.5)",
          }}
        ></Avatar>
      </div>
      <div className={styles.content}>
        <div
          className={styles.name}
        >{`${talentData.name} ${talentData.surname}`}</div>
        <div className={styles.location}>
          <Place color="success" sx={{ fontSize: 16 }} /> {talentData.location}{" "}
        </div>
        <div className={styles.post}>{talentData.status}</div>
      </div>
      <Button
        variant="contained"
        size="medium"
        type="submit"
        color="success"
        style={{
          width: "100%",
          height: "40px",
          border: "none",
        }}
        onClick={handleVisit}
      >
        VISIT
      </Button>
    </div>
  );
};

export { TalentCard };
