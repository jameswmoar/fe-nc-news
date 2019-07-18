import React from "react";
import styles from "./Sorter.module.css";

const Sorter = ({ setSort, type }) => {
  return (
    <section className={styles.sorter}>
      Sort by{" "}
      <select onChange={setSort}>
        <option value="created_at,desc">Newest</option>
        <option value="created_at,asc">Oldest</option>
        <option value="votes,desc">Most popular</option>
        <option value="votes,asc">Most Controversial</option>
        {type === "article" ? (
          <option value="comment_count,desc">Most Discussed</option>
        ) : null}
      </select>
    </section>
  );
};

export default Sorter;
