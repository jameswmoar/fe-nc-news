import React, { Component } from "react";
import { getComments, deleteComment } from "../../utils/axios-requests";
import styles from "./Comments.module.css";
import Votes from "../Votes/Votes";
import { formatDate } from "../../utils/utils";
import { Link } from "@reach/router";
import CommentAdder from "../CommentAdder/CommentAdder";
import bin from "../../images/bin.png";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    const { comments } = this.state;
    const { id, user } = this.props;
    return (
      <>
        <CommentAdder id={id} user={user} addComment={this.addComment} />
        <h1>Comments</h1>
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id} className={styles.comment}>
                <Votes
                  score={comment.votes}
                  comment_id={comment.comment_id}
                  handleVote={this.handleVote}
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
                        onClick={() => this.handleDelete(comment.comment_id)}
                      >
                        <img
                          className={styles.bin}
                          src={bin}
                          alt="delete comment"
                        />
                      </button>
                    ) : null}
                  </div>
                  {comment.body}
                </main>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  componentDidMount() {
    getComments(this.props.id).then(comments => {
      this.setState({
        comments
      });
    });
  }

  addComment = newComment => {
    const updatedComments = [newComment, ...this.state.comments];
    this.setState({
      comments: updatedComments
    });
  };

  handleDelete = id => {
    deleteComment(id);
    const newComments = this.state.comments.filter(
      comment => comment.comment_id !== id
    );

    this.setState({
      comments: newComments
    });
  };

  handleVote = votedComment => {
    const newComments = this.state.comments.map(comment => {
      if (comment.comment_id === votedComment.comment_id) {
        return votedComment;
      }
      return comment;
    });
    this.setState({
      comments: newComments
    });
  };
}

export default Comments;
