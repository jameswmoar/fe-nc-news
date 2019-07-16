import React, { Component } from "react";
import { getTopics } from "../../utils/axios-requests";
import styles from "./Topics.module.css";
import { Link } from '@reach/router'

class Topics extends Component {
  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    return (
      <aside className={styles.topics}>
        <h2> View Topics </h2>
          {topics.map(topic => {
            return (
              <li key={topic.slug} className={styles.topic}>
                <Link to="/topics/:slug/articles">{topic.description}</Link>
              </li>
            );
          })}
      </aside>
    );
  }

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  }
}

export default Topics;
