import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Avatar, IconButton } from "@mui/material";
import styles from "./Post.module.css";
import { useForm } from "react-hook-form";
import { registerOptions } from "../../shared/validationRules";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase";
import { addCoin } from "../../db/service/addCoin";
import { addPost } from "../../db/service/addPost";

const Post = ({ id, postId, idLocal, isAddPost, userData, postData }) => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const role = localStorage.getItem("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [coins, setCoins] = useState(postData?.coins || 0);

  useEffect(() => {
    if (!isAddPost) {
      const postDocRef = doc(db, "posts", postData.id);
      const unsubscribe = onSnapshot(postDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const updatedCoins = docSnapshot.data().coins;
          setCoins(updatedCoins);
        }
      });

      return () => unsubscribe();
    }
  });

  const handleAddCoin = async () => {
    await addCoin(idLocal, postId, id);
  };

  const onSubmit = async (data) => {
    await addPost(data, formattedDate, id);
    navigate(`/profile/${id}`);
  };

  if (isAddPost) {
    return (
      <div className={styles.addpost_container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.post_header}>
            <input
              type="text"
              name="header"
              placeholder="Header"
              {...register("header", registerOptions.header)}
              style={{
                width: "50%",
                borderRadius: "5px",
                padding: "2px",
              }}
            />
          </div>
          <div className={styles.post_description}>
            <textarea
              name="description"
              placeholder="Description"
              {...register("description", registerOptions.description)}
              style={{
                resize: "none",
                textAlign: "center",
                padding: "4px",
                width: "100%",
                height: "100%",
              }}
            />
            {errors.header && (
              <p className={styles.error}>{errors.header.message}</p>
            )}
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div>
          <div className={styles.author_container}>
            <div className={styles.namedate_container}>
              <Avatar
                src={userData.avatar ? userData.avatar : "/broken-image.jpg"}
                sx={{ width: 40, height: 40, mr: 1 }}
                style={{
                  border: "2px solid rgba(215, 227, 224, 0.5)",
                }}
              ></Avatar>
              <div>
                <div
                  className={styles.author_name}
                >{`${userData.name} ${userData.surname}`}</div>
              </div>
            </div>
            <div>
              {" "}
              <Button
                variant="contained"
                size="medium"
                color="error"
                sx={{ mr: 2 }}
                component={Link}
                to={`/profile/${id}`}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                color="success"
              >
                SAVE
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.post_container}>
        <div className={styles.post_header}>{postData.header}</div>
        <div className={styles.post_description}>{postData.description}</div>
        <div className={styles.author_container}>
          <div className={styles.namedate_container}>
            <Avatar
              src={userData.avatar ? userData.avatar : "/broken-image.jpg"}
              sx={{ width: 40, height: 40, mr: 1 }}
              style={{
                border: "2px solid rgba(215, 227, 224, 0.5)",
              }}
            ></Avatar>
            <div>
              <div
                className={styles.author_name}
              >{`${userData.name} ${userData.surname}`}</div>
              <div className={styles.post_date}>{postData.date}</div>
            </div>
          </div>
          <div className={styles.counter}>
            {coins}
            <IconButton disabled={role !== "sponsor"} onClick={handleAddCoin}>
              <img
                className={styles.coin}
                src={require("./img/coin.png")}
                alt="coin"
              />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
};

export { Post };
