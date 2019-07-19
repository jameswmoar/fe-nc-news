import React, { Component } from "react";
import styles from "./CommentAdder.module.css";
import { postComment } from "../../utils/axios-requests";

class CommentAdder extends Component {
  state = {
    input: ""
  };

  render() {
    const { input } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h3>Got something to say?</h3>
        <textarea
          required
          rows="5"
          placeholder="Enter Comment"
          value={input}
          onChange={this.handleChange}
          className={styles.input}
        />
        <button>Post Comment</button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const newComment = { body: this.state.input, username: this.props.user };
    postComment(newComment, this.props.id).then(comment => {
      this.props.addComment(comment);
    });
    this.setState({
      input: ""
    });
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };
}

export default CommentAdder;
