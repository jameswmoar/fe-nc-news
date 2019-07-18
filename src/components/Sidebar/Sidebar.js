import React from "react";
import Topics from "../Topics/Topics";
import Sorter from "../Sorter/Sorter";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setSort }) => {
  return (
    <aside className={styles.sidebar_content}>
      <Sorter setSort={setSort} type="article" />
      <Topics />
    </aside>
  );
};

export default Sidebar;
