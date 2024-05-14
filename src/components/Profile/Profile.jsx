import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { ProfileSide } from "./components/ProfileSide";
import { ProfileMain } from "./components/ProfileMain";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "../../db/service/getUserById";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace("/profile/", "");
  const idUser = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(id);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (!idUser) {
      navigate("/signin");
    }
  }, [idUser, navigate]);

  return (
    <>
      {userData && (
        <>
          <div className={styles.plug}></div>
          <div className={styles.wrapper}>
            {userData && (
              <>
                <ProfileSide
                  userData={userData}
                  idLocal={id}
                  idUser={idUser}
                  role={role}
                />
                <ProfileMain
                  userData={userData}
                  idLocal={id}
                  idUser={idUser}
                  role={role}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export { Profile };
