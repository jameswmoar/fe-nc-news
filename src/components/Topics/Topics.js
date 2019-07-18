import React, { Component } from "react";
import { getTopics } from "../../utils/axios-requests";
import styles from "./Topics.module.css";
import { Link } from "@reach/router";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

class Topics extends Component {
  state = {
    topics: null,
    isLoading: true,
    err: null
  };

  render() {
    const { topics, err, isLoading } = this.state;
    if (err) return <ErrorPage />;
    else if (isLoading) return <Loading />;
    else {
      return (
        <aside>
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
        </aside>
      );
    }
  }

  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({
          topics,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          err,
          isLoading: false
        });
      });
  }
}

export default Topics;
