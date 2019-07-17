import React, { Component } from "react";
import { getComments, deleteComment } from "../../utils/axios-requests";
// import styles from "./Comments.module.css";
import CommentAdder from "../CommentAdder/CommentAdder";
import CommentsCard from "../CommentsCard/CommentsCard";

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
              <CommentsCard key={comment.comment_id} comment={comment} user={user} handleVote={this.handleVote}/>
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
