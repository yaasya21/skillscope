import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";

const Status = ({ status }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (status) {
      if (status.length >= 200) {
        setIsTruncated(true);
      }
    }
  }, [status]);

  let truncatedText = isTruncated ? `${status.slice(0, 200)}...` : status;

  return (
    <div className={styles.status} onClick={handleClick}>
      {isClicked ? status : truncatedText}
    </div>
  );
};

export { Status };
