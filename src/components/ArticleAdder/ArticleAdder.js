import React, { Component } from "react";
import { getTopics, postArticle } from "../../utils/axios-requests";
import Loading from "../Loading/Loading";
import {navigate} from '@reach/router'
import styles from './ArticleAdder.module.css'

class ArticleAdder extends Component {
  state = {
    topics: null,
    title: "",
    selectedTopic: "",
    body: "",
    isLoading: true
  };

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section className={styles.articleAdder}>
        <h2 className={styles.postTitle}>Post an Article</h2>
        <form onSubmit={this.handleSubmit} className={styles.input_form}>
          <input className={styles.input_item}
            placeholder="Enter article Title"
            name="title"
            required
            onChange={this.handleChange}
          />

          <select className={styles.input_item}defaultValue="Select Topic" name="selectedTopic"onChange={this.handleChange}>
            <option disabled>
              Select Topic
            </option>
            {topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}  >
                  {topic.description}
                </option>
              );
            })}
          </select>
          <textarea className={styles.input_item}
            placeholder="Enter article text"
            rows="5"
            required
            name="body"
            onChange={this.handleChange}
          ></textarea>
          <button className={styles.input_item}>Submit Article</button>
        </form>
      </section>
    );
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

  handleSubmit = e => {
    e.preventDefault();
    const {title, selectedTopic, body} = this.state
    const newArticle = {title, body, topic: selectedTopic, author: this.props.user}
    postArticle(newArticle).then(article => {
      navigate(`/articles/${article.article_id}`)
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export default ArticleAdder;
