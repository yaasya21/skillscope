import React, { useState, useEffect } from "react";
import styles from "./ProfileMain.module.css";
import { Divider } from "@mui/material";
import { UserInfo } from "./components/UserInfo";
import { AddPostButton } from "./components/AddPostButton";
import { Post } from "../../../Post";
import { getPosts } from "../../../../db/service/getPosts";

const ProfileMain = ({ userData, idLocal, idUser, role }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts(idLocal);
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
        <Post
          key={post.id}
          id={idUser}
          postId={post.id}
          idLocal={idLocal}
          postData={post}
          userData={userData}
        />
      ))}
    </div>
  );
};

export { ProfileMain };
