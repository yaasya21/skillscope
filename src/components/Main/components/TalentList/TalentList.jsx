import React, { useState } from "react";
import styles from "./TalentList.module.css";
import { TalentCard } from "./components/TalentCard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const TalentList = ({ talentDataList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const talentsPerPage = 6;

  const indexOfLastTalent = currentPage * talentsPerPage;
  const indexOfFirstTalent = indexOfLastTalent - talentsPerPage;
  const currentTalents = talentDataList.slice(
    indexOfFirstTalent,
    indexOfLastTalent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(talentDataList.length / talentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.wrapper}>
      {currentTalents.map((talentData, index) => {
        return (
          <React.Fragment key={index}>
            {index % 3 === 0 && (
              <div className={styles.row}>
                {currentTalents
                  .slice(index, index + 3)
                  .map((talentData, index) => (
                    <div key={index} className={styles.talentCardContainer}>
                      <TalentCard talentData={talentData} />
                    </div>
                  ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className={styles.paginationButton}
          >
            <ChevronLeft sx={{ fontSize: 16 }} />
          </button>
        )}
        <p style={{ margin: "0 10px" }}>Page {currentPage}</p>
        {talentDataList.length > indexOfLastTalent && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className={styles.paginationButton}
          >
            <ChevronRight sx={{ fontSize: 16 }} />
          </button>
        )}
      </div>
    </div>
  );
};

export { TalentList };
