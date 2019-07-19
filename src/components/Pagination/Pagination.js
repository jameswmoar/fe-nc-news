import React from "react";
import styles from "./Pagination.module.css";
import next from "../../images/next-page.png";
import prev from "../../images/prev-page.png";

const Pagination = ({ totalCount, handlePageChange, page }) => {
  const totalPages = Math.ceil(totalCount / 10);

  return totalPages ? (
    <section className={styles.page_nav}>
      <button
        onClick={() => handlePageChange(page - 1)}
        className={page===1 ? styles.hidden_nav_button : styles.visible_nav_button}
      >
        <img src={prev} alt="previous" className={styles.arrow} />
      </button>
      <div className={styles.numbers}>
        {Array(totalPages)
          .fill()
          .map((num, index) => {
            return (
              <button
                onClick={() => handlePageChange(index + 1)}
                key={index}
                className={page === index + 1 ? styles.active_page_num : styles.inactive_page_num}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
      <button
        onClick={() => handlePageChange(page + 1)}
        className={page===totalPages? styles.hidden_nav_button : styles.visible_nav_button}
      >
        <img src={next} alt="next" className={styles.arrow} />
      </button>
    </section>
  ) : null;
};

export default Pagination;
