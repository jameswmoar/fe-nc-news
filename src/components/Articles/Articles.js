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
    total_count: null
  };

  render() {
    const { articles, err, isLoading, total_count, page } = this.state;
    if (err) return <ErrorPage err={err} />;
    else if (isLoading) return <Loading />;
    else {
      return total_count === 0 ? (
        <div className={styles.no_articles}>
          <h2>No articles exist in this topic yet!</h2>
          <h3>Why not create one?</h3>
        </div>
      ) : (
        <section className={styles.articles}>
          <div className={styles.content}>
            {articles.map(article => {
              return (
                <ArticlesCard
                  user={this.props.user}
                  key={article.article_id}
                  article={article}
                />
              );
            })}
          <Pagination
            handlePageChange={this.handlePageChange}
            totalCount={total_count}
            page={page}
            />
            </div>
        </section>
      );
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

  fetchArticles = (page = 1) => {
    getArticles(this.props, page)
      .then(({ articles, total_count }) => {
        window.scrollTo(0, 0);
        this.setState({
          err: null,
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

  handlePageChange = page => {
    this.fetchArticles(page);
  };
}

export default Articles;
