import React, { Component } from "react";
import { getTopics } from "../../utils/axios-requests";
import styles from "./Topics.module.css";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: null
  };

  render() {
    const { topics } = this.state;
    return (
      <aside>
        {topics ? (
          <main className={styles.topics}>
            <h2> View By Topics </h2>
            {topics.map(topic => {
              return (
                <li key={topic.slug} className={styles.topic}>
                  <Link to={`/topics/${topic.slug}/articles`}>
                    {topic.description}
                  </Link>
                </li>
              );
            })}
          </main>
        ) : (
          <h3>Content loading...</h3>
        )}
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
