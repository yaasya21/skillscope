import React, { useState, useEffect } from "react";
import styles from "./ProfileMain.module.css";
import { Divider } from "@mui/material";
import { UserInfo } from "./components/UserInfo";
import { AddPostButton } from "./components/AddPostButton";
import { Post } from "../../../Post";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../../db/firebase";

const ProfileMain = ({ userData, idLocal, idUser, role }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("creatorId", "==", idLocal)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [idLocal]);
  return (
    <div className={styles.wrapper}>
      <UserInfo userData={userData} />
      <AddPostButton idLocal={idLocal} idUser={idUser} role={role} />
      {Object.keys(posts).length !== 0 && <Divider sx={{ my: 3 }} />}
      {posts.map((post) => (
        <Post key={post.id} postData={post} userData={userData} />
      ))}
    </div>
  );
};

export { ProfileMain };
