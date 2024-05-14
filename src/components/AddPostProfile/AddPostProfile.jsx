import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddPostProfile.module.css";
import { Post } from "../Post";
import { getUserById} from "../../db/service/getUserById";

const AddPostProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idUser = location.pathname.split("/profile/")[1].split("/")[0];
  const isAddPost = location.pathname.includes("/post");
  const id = localStorage.getItem("id");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const userData = await getUserById(id);
        setUserData(userData);
      } else {
        navigate("/signin");
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    if (id !== idUser) {
      navigate(`/profile/${id}/post`);
    }
  }, [id, idUser, navigate]);

  return (
    <div className={styles.wrapper}>
      <h1>Share your thoughts with the world</h1>
      {userData && <Post id={id} isAddPost={isAddPost} userData={userData} />}
    </div>
  );
};

export { AddPostProfile };
