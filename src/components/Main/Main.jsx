import React, { useState, useEffect } from "react"
import styles from "./Main.module.css"
import { TalentList } from "./components/TalentList";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase"; // Import your Firebase configuration

const Main = () => {
    const [talentDataList, setTalentDataList] = useState([]);
  
    useEffect(() => {
      const fetchTalentData = async () => {
        const q = query(collection(db, "users"), where("role", "==", "talent"));
        const querySnapshot = await getDocs(q);
        const fetchedTalentData = [];
        querySnapshot.forEach((doc) => {
          fetchedTalentData.push({ id: doc.id, ...doc.data() });
        });
        setTalentDataList(fetchedTalentData);
      };
  
      fetchTalentData();
    }, []);
  
    return (
        <div className={styles.wrapper}>
            <TalentList talentDataList={talentDataList} />
        </div>
    );
  };
  
  export { Main };