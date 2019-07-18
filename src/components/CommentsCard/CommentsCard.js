import React from 'react';
import styles from "./CommentsCard.module.css";
import Votes from "../Votes/Votes";
import { formatDate } from "../../utils/utils";
import { Link } from "@reach/router";
import bin from "../../images/bin.png";

const CommentsCard = ({comment, user, handleDelete}) => {
  return (
      <li className={styles.comment}>
                <Votes
                  type="comments"
                  score={comment.votes}
                  id={comment.comment_id}
                />
                <main className={styles.contents}>
                  <div className={styles.subtext}>
                    <h5>
                      <Link to={`/users/${comment.author}`}>
                        {comment.author}
                      </Link>{" "}
                      {"\u00A0"}{" "}
                    </h5>
                    <h5>{formatDate(comment.created_at)}</h5>
                    {comment.author === user ? (
                      <button
                        className={styles.binButton}
                        onClick={() => handleDelete(comment.comment_id)}
                      >
                        <img
                          className={styles.bin}
                          src={bin}
                          alt="delete comment"
                        />
                      </button>
                    ) : null}
                  </div>
                  <p className={styles.body}>
                  {comment.body}
                  </p>
                </main>
              </li>
  );
};

export default CommentsCard;