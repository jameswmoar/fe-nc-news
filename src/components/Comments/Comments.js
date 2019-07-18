import React, { Component } from "react";
import { getComments, deleteComment } from "../../utils/axios-requests";
import styles from "./Comments.module.css";
import CommentAdder from "../CommentAdder/CommentAdder";
import CommentsCard from "../CommentsCard/CommentsCard";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import Sorter from "../Sorter/Sorter";

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
          {user ? 
          <CommentAdder id={id} user={user} addComment={this.addComment} /> : null
          }
          <h1 className={styles.comments_heading}>
          Comments
          </h1>
          
          <section className={styles.sorter}> <Sorter setSort={this.props.setSort}/></section>

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
    this.fetchComments()
  }

  componentDidUpdate(prevProps, prevState) {
    const didTopicChange = prevProps.topic !== this.props.topic;
    const didUserChange = prevProps.user_id !== this.props.user_id;
    const didSortChange = prevProps.sort !== this.props.sort;
    const didOrderChange = prevProps.order !== this.props.order;
    const didPageChange = prevState.p !== this.state.p;

    if (
      didTopicChange ||
      didUserChange ||
      didSortChange ||
      didOrderChange ||
      didPageChange
    ) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    getComments(this.props).then(comments => {
      this.setState({
        comments,
        isLoading: false
      });
    });
  };

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
