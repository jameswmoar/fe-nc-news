import React, { Component } from "react";
import { getComments, deleteComment } from "../../utils/axios-requests";
import styles from "./Comments.module.css";
import CommentAdder from "../CommentAdder/CommentAdder";
import CommentsCard from "../CommentsCard/CommentsCard";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

class Comments extends Component {
  state = {
    comments: null,
    err: null,
    isLoading: true
  };

  render() {
    const { comments, err, isLoading } = this.state;
    const { id, user } = this.props;
    if (err) return <ErrorPage />;
    else if (isLoading) return <Loading />;
    else {
      return (
        <>
          <CommentAdder id={id} user={user} addComment={this.addComment} />
          <h1 className={styles.comments_heading}>Comments</h1>
          <div>
            {comments.map(comment => {
              return (
                <CommentsCard
                  key={comment.comment_id}
                  comment={comment}
                  user={user}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </div>
        </>
      );
    }
  }

  componentDidMount() {
    getComments(this.props.id).then(comments => {
      this.setState({
        comments,
        isLoading: false
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
