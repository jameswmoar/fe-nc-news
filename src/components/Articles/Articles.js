import React, { Component } from "react";
import { getArticles } from "../../utils/axios-requests";
import styles from "./Articles.module.css";
import ArticlesCard from "../ArticlesCard/ArticlesCard";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import Pagination from "../Pagination/Pagination";

class Articles extends Component {
  state = {
    articles: null,
    err: null,
    isLoading: true,
    page: 1,
    total_count: 0
  };

  render() {
    const { articles, err, isLoading, total_count, page } = this.state;
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
          <Pagination
            handlePageChange={this.handlePageChange}
            totalCount={total_count}
            page={page}
          />
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
    const didPageChange = prevState.p !== this.state.p;

    if (
      didTopicChange ||
      didUserChange ||
      didSortChange ||
      didOrderChange ||
      didPageChange
    ) {
      this.fetchArticles();
    }
  }

  fetchArticles = (page=1) => {
    getArticles(this.props, page)
      .then(({ articles, total_count }) => {
        this.setState({
          articles,
          isLoading: false,
          total_count,
          page
        });
      })
      .catch(err => {
        this.setState({
          err,
          isLoading: false
        });
      });
  };

  handlePageChange = (page) => {
    this.fetchArticles(page)
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
