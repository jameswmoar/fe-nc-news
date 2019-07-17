import React, { Component } from "react";
import { getArticles } from "../../utils/axios-requests";
import styles from "./Articles.module.css";
import { Link } from "@reach/router";
import { formatDate } from "../../utils/utils";
import Votes from "../Votes/Votes";

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
                <li key={article.article_id} className={styles.articlebox}>
                  <Votes
                    score={article.votes}
                    article_id={article.article_id}
                    handleVote={this.handleVote}
                  />
                  <main className={styles.article}>
                    <div className={styles.subtext}>
                      <h5>
                        <Link to={`/topics/${article.topic}/articles`}>
                          {article.topic}
                        </Link>
                      </h5>{" "}
                      {"\u00A0"}{" "}
                      <h5>
                        <Link to={`/users/${article.author}`}>
                          {article.author}
                        </Link>
                      </h5>{" "}
                      {"\u00A0"} <h5>{formatDate(article.created_at)}</h5>
                    </div>
                    <Link to={`/articles/${article.article_id}`}>
                      <h3 className={styles.title}>{article.title}</h3>
                    </Link>
                  </main>
                </li>
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
