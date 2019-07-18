import React, { Component } from "react";
import { getArticle } from "../../utils/axios-requests";
import styles from "./Article.module.css";
import { formatDate } from "../../utils/utils";
import { Link } from "@reach/router";
import Comments from "../Comments/Comments";
import Votes from "../Votes/Votes";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

class Article extends Component {
  state = {
    article: null,
    isLoading: true,
    err: null
  };

  render() {
    const { article, isLoading, err } = this.state;
    if (err) return <ErrorPage />;
    else if (isLoading) return <Loading />;
    else {
      return (
        <main className={styles.article}>
          <section className={styles.article_heading}>
            <Votes
              type="articles"
              score={article.votes}
              id={article.article_id}
            />
            <main className={styles.heading_contents}>
              <div className={styles.subtext}>
                <h5>
                  <Link to={`/topics/${article.topic}/articles`}>
                    {article.topic}
                  </Link>
                </h5>
                {"\u00A0"}
                <h5>
                  <Link to={`/users/${article.author}`}>{article.author}</Link>
                </h5>{" "}
                {"\u00A0"}
                <h5>{formatDate(article.created_at)}</h5>
              </div>
              <h3 className={styles.title}>{article.title}</h3>
            </main>
          </section>
          <p className={styles.body}>{article.body}</p>
          <section>
            <Comments id={this.props.id} user={this.props.user} />
          </section>
        </main>
      );
    }
  }

  componentDidMount() {
    getArticle(this.props.id).then(article => {
      this.setState({
        article,
        isLoading: false
      });
    }).catch(err => {
      this.setState({
        err,
        isLoading: false
      })
    })
  }

  handleVote = votedArticle => {
    this.setState({
      article: votedArticle
    });
  };
}

export default Article;
