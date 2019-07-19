import React, { Component } from "react";
import { getComments, deleteComment } from "../../utils/axios-requests";
import styles from "./Comments.module.css";
import CommentAdder from "../CommentAdder/CommentAdder";
import CommentsCard from "../CommentsCard/CommentsCard";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import Sorter from "../Sorter/Sorter";
import Pagination from "../Pagination/Pagination";

class Comments extends Component {
  state = {
    comments: null,
    err: null,
    isLoading: true,
    page: 1,
    total_count: 0
  };

  render() {
    const { comments, err, isLoading, page, total_count } = this.state;
    const { id, user } = this.props;
    if (err) return <ErrorPage err={err}/>;
    else if (isLoading) return <Loading />;
    else {
      return (
        <>
          {user ? (
            <CommentAdder id={id} user={user} addComment={this.addComment} />
          ) : null}
          <h1 className={styles.comments_heading}>Comments</h1>
{comments.length > 0 ?
          <section className={styles.sorter}>
             <Sorter setSort={this.props.setSort} className={styles.sorting}/> 
          </section>
: <section className={styles.no_comments}>No comments yet. Be the first!</section>}
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
          <Pagination
            handlePageChange={this.handlePageChange}
            totalCount={total_count}
            page={page}
          />
        </>
      );
    }
  }

  componentDidMount() {
    this.fetchComments();
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

  fetchComments = (page = 1) => {
    getComments(this.props, page).then(({ comments, total_count }) => {
      this.setState({
        comments,
        isLoading: false,
        total_count,
        page
      });
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

  addComment = newComment => {
    const updatedComments = [newComment, ...this.state.comments];
    this.setState({
      comments: updatedComments
    });
  };

  handlePageChange = page => {
    this.fetchComments(page);
  };
}

export default Comments;
