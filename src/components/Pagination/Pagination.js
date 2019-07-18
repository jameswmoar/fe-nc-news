import React from "react";
import styles from "./Pagination.module.css";
import next from "../../images/next-page.png";
import prev from "../../images/prev-page.png";

const Pagination = ({ totalCount, handlePageChange, page }) => {
  console.log(page)
  const totalPages = Math.ceil(totalCount / 10);
  return (
    <section className={styles.page_nav}>
      <button onClick={() => handlePageChange(page - 1)}className={styles.nav_button} hidden={page === 1}>
        <img src={prev} alt="previous" className={styles.arrow} />
      </button>
      <div className={styles.numbers}>
        {Array(totalPages)
          .fill()
          .map((num, index) => {
            return (
              <button onClick={() => handlePageChange(index + 1)} key={index} className={styles.page_num}>
              {index + 1}
              </button>
              )
          })}
      </div>
      <button onClick={() => handlePageChange(page + 1)} className={styles.nav_button} hidden={page === totalPages}>
        <img src={next} alt="next" className={styles.arrow} />
      </button>
    </section>
  );
};

export default Pagination;
