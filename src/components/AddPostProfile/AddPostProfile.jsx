import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./AddPostProfile.module.css";
import { Post } from "../Post";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const AddPostProfile = () => {
  const location = useLocation();
  const isAddPost = location.pathname.includes("/post");
  const id = localStorage.getItem("id");

  const [userData, setUserData] = useState(null);

  const getUserData = async (id) => {
    try {
      const userDocRef = doc(db, "users", id);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("User data:", userData);
        setUserData(userData); // Update userData state
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData(id);
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <h1>Share your thoughts with the world</h1>
      {userData && <Post id ={id} isAddPost={isAddPost} userData={userData} />}
    </div>
  );
};

export { AddPostProfile };
