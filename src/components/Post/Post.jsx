import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Avatar, IconButton } from "@mui/material";
import styles from "./Post.module.css";
import { useForm } from "react-hook-form";
import { registerOptions } from "../../shared/validationRules";
import { collection, addDoc, doc, onSnapshot, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../../db/firebase";

const Post = ({ id, postId, idLocal, isAddPost, userData, postData }) => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const role = localStorage.getItem("role")

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
    try {
      const userDocRef = doc(db, "users", idLocal);
      const postDocRef = doc(db, "posts", postId);
      const sponsorDocRef = doc(db, "users", id);
  
      const sponsorDocSnapshot = await getDoc(sponsorDocRef);
      const sponsorCoins = sponsorDocSnapshot.data().coins;
  
      if (sponsorCoins >= 1) {
        await Promise.all([
          updateDoc(userDocRef, { coins: increment(1) }),
          updateDoc(postDocRef, { coins: increment(1) }),
          updateDoc(sponsorDocRef, { coins: increment(-1) }),
        ]);
      } else {
        alert("Insufficient coins!");
      }
    } catch (error) {
      console.error("Error adding coin:", error);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        creatorId: id,
        header: data.header,
        description: data.description,
        date: formattedDate,
        coins: 0,
      });
      console.log("Data added to Firestore successfully!");
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
    }
  };

  if (isAddPost) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.post_container}>
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
              rows={4}
              cols={98}
              style={{ resize: "none", textAlign: "center", padding: "4px" }}
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
        </div>
      </form>
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
      <img className={styles.coin} src={require("./img/coin.png")}/>
    </IconButton>
        </div>
        </div>
      </div>
    );
  }
};

export { Post };
