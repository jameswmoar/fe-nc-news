import React from "react";
import styles from "./ArticlesCard.module.css";
import { Link } from "@reach/router";
import { formatDate } from "../../utils/utils";
import Votes from "../Votes/Votes";

const ArticlesCard = ({ article, handleVote }) => {
  const { votes, article_id, topic, author, created_at, title } = article;
  return (
    <li className={styles.articlebox}>
      <Votes type="comments" score={votes} id={article_id} />
      <main className={styles.article}>
        <div className={styles.subtext}>
          <h5>
            <Link to={`/topics/${topic}/articles`}>{topic}</Link>
          </h5>{" "}
          {"\u00A0"}{" "}
          <h5>
            <Link to={`/users/${author}`}>{author}</Link>
          </h5>{" "}
          {"\u00A0"} <h5>{formatDate(created_at)}</h5>
        </div>
        <Link to={`/articles/${article_id}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
      </main>
    </li>
  );
};

export default ArticlesCard;
