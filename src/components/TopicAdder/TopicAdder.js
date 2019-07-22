import React, { Component } from "react";
import styles from "./TopicAdder.module.css";
import { navigate } from "@reach/router";
import { postTopic } from "../../utils/axios-requests";
import ErrorPage from "../ErrorPage/ErrorPage";

class TopicAdder extends Component {
  state = {
    slug: "",
    description: "",
    err: null
  };

  render() {
    const {err} = this.state
    return (
      err ? <ErrorPage err={err} /> :
      <section className={styles.topicAdder}>
        <h2 className={styles.postTitle}>Create a New Topic</h2>
        <form onSubmit={this.handleSubmit} className={styles.input_form}>
          <input
            className={styles.input_item}
            name="slug"
            placeholder="Enter summary of new topic - may not contain spaces"
            required
            onChange={this.handleChange}
          />
          <input
            className={styles.input_item}
            placeholder="Enter description of new topic"
            name="description"
            required
            onChange={this.handleChange}
          />
          <button className={styles.input_item}>Add Topic</button>
        </form>
      </section>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const { slug, description } = this.state;
    const newTopic = {
      slug,
      description
    };
    postTopic(newTopic).then(topic => {
      (navigate('/'))
    }).catch(err => {
      this.setState({
        err
      })
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export default TopicAdder;
