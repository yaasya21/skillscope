import React from "react";
import styles from "./ProfileSide.module.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

const ProfileSide = ({ userData, idLocal, idUser, role }) => {
  return (
    <div className={styles.sidebar}>
      <Avatar
        src={userData.avatar ? userData.avatar : "/broken-image.jpg"}
        sx={{ width: 200, height: 200 }}
        style={{
          border: "4px solid rgba(215, 227, 224, 0.5)",
          transform: "translateY(-25%)",
        }}
      ></Avatar>
      {idLocal === idUser && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<EditNoteIcon />}
            sx={{
              borderRadius: 3,
              width: 120,
              height: 45,
              marginRight: 2,
              marginTop: 5,
            }}
            component={Link}
            to={`/profile/${idLocal}/edit`}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<AttachMoneyIcon />}
            sx={{
              borderRadius: 3,
              width: role === "sponsor" ? 155 : 215,
              height: 45,
              marginTop: 4,
            }}
            component={Link}
            to={`/profile/${idLocal}/coins`}
          >
            {role === "sponsor" ? "BUY COINS" : "WITHDRAW COINS"}
          </Button>
        </div>
      )}
    </div>
  );
};

export { ProfileSide };
