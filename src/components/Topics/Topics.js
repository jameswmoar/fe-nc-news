import React, { Component } from "react";
import { getTopics } from "../../utils/axios-requests";
import styles from "./Topics.module.css";
import { Link } from "@reach/router";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import add from "../../images/add.png";

class Topics extends Component {
  state = {
    topics: null,
    isLoading: true,
    err: null
  };

  render() {
    const { topics, err, isLoading } = this.state;
    if (err) return <ErrorPage err={err} />;
    else if (isLoading) return <Loading />;
    else {
      return (
        <main className={styles.topics}>
          <section className={styles.heading}>
            <h2> View By Topics </h2> {"\u00A0"}
          </section>
          {topics.map(topic => {
            return (
              <li key={topic.slug} className={styles.topic}>
                <Link className={styles.link} to={`/topics/${topic.slug}/articles`}>
                  {topic.description}
                </Link>
              </li>
            );
          })}
        <Link to={"/topics/new_topic"}>
        <img src={add} alt="add topic" className={styles.add_img} />
      </Link>
        </main>
      );
    }
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
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
  };
}

export default Topics;
