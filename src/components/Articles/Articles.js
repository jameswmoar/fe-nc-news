import React, { Component } from "react";
import { getArticles } from "../../utils/axios-requests";
import styles from "./Articles.module.css";
import ArticlesCard from "../ArticlesCard/ArticlesCard";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

class Articles extends Component {
  state = {
    articles: null,
    err: null,
    isLoading: true
  };

  render() {
    const { articles, err, isLoading } = this.state;
    if (err) return <ErrorPage />;
    else if (isLoading) return <Loading />;
    else {
      return (
        <section className={styles.articles}>
          <div className={styles.content}>
            {articles.map(article => {
              return (
                <ArticlesCard
                  key={article.article_id}
                  handleVote={this.handleVote}
                  article={article}
                />
              );
            })}
          </div>
          )
        </section>
      );
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const didTopicChange = prevProps.topic !== this.props.topic;
    const didUserChange = prevProps.user_id !== this.props.user_id;
    const didSortChange = prevProps.sort !== this.props.sort;
    const didOrderChange = prevProps.order !== this.props.order;

    if (didTopicChange || didUserChange || didSortChange || didOrderChange) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    getArticles(this.props)
      .then(articles => {
        this.setState({
          articles,
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

  handleVote = votedArticle => {
    const newArticles = this.state.articles.map(article => {
      if (article.article_id === votedArticle.article_id) {
        return votedArticle;
      }
      return article;
    });
    this.setState({
      articles: newArticles
    });
  };
}

export default Articles;
