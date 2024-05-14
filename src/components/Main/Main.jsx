import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import { TalentList } from "./components/TalentList";
import { getTalents } from "../../db/service/getTalents";

const Main = () => {
  const [talentDataList, setTalentDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTalentData = await getTalents();
      setTalentDataList(fetchedTalentData);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <TalentList talentDataList={talentDataList} />
    </div>
  );
};

export { Main };
