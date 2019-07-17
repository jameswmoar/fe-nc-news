import React, { Component } from "react";
import { getArticles } from "../../utils/axios-requests";
import styles from "./Articles.module.css";
import ArticlesCard from "../ArticlesCard/ArticlesCard";

class Articles extends Component {
  state = {
    articles: null
  };

  render() {
    const { articles } = this.state;
    return (
      <section>
        {articles ? (
          <ul className={styles.content}>
            {articles.map(article => {
              return (
                <ArticlesCard key={article.article_id} handleVote={this.handleVote} article={article}/>
              );
            })}
          </ul>
        ) : null}
      </section>
    );
  }

  componentDidMount() {
    getArticles(this.props).then(articles => {
      this.setState({
        articles
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic || prevProps.user_id !== this.props.user_id) {
      getArticles(this.props).then(articles => {
        this.setState({
          articles
        });
      });
    }
  }

  handleVote = votedArticle => {
    const newArticles = this.state.articles.map(article => {
      if (article.article_id === votedArticle.article_id) {
        return votedArticle;
      }
      return article;
    });
    this.setState({
      articles: newArticles
    })
  };
}

export default Articles;
