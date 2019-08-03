import React from "react";
import Articles from "../Articles/Articles";
import styles from "./MainContent.module.css";
import Sidebar from "../Sidebar/Sidebar";

const MainContent = ({user_id, slug, user, setSort, sort, order}) => {
    return (
      <main className={styles.articles_topics}>
        <Articles
          sort={sort}
          order={order}
          setSort={setSort}
          user={user}
          topic={slug}
          user_id={user_id}
        />
        <Sidebar setSort={setSort} />
      </main>
    );
  }

export default MainContent;
