import React from "react";
import styles from "./ProfileSide.module.css";
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'


const ProfileSide = ({ userData, userId }) => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id");


  return (
    <div className={styles.sidebar}>
      <Avatar
  src={userData.image ? userData.image : "/broken-image.jpg"}
  sx={{ width: 200, height: 200 }}
  style={{
    border: "4px solid rgba(215, 227, 224, 0.5)",
    transform: "translateY(-25%)"
  }}
></Avatar>

<Button
  variant="contained"
  size="large"
  startIcon={<EditNoteIcon />}
  sx={{ borderRadius: 3, width: 120, height: 45 }}
  component={Link} to={`/profile/${id}/edit`}
>
  EDIT
</Button>
    </div>
  );
};

export { ProfileSide };