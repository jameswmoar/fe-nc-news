import React, { Component } from "react";
import { getArticle, deleteArticle } from "../../utils/axios-requests";
import styles from "./Article.module.css";
import { formatDate } from "../../utils/utils";
import { Link, navigate } from "@reach/router";
import Comments from "../Comments/Comments";
import Votes from "../Votes/Votes";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import bin from "../../images/bin.png";

class Article extends Component {
  state = {
    article: null,
    isLoading: true,
    err: null
  };

  render() {
    const { isLoading, err } = this.state;
    if (err) return <ErrorPage err={err}/>;
    else if (isLoading) return <Loading />;
    else {
      const {
        votes,
        article_id,
        topic,
        author,
        created_at,
        title,
        body
      } = this.state.article;
      const { user } = this.props;
      return (
        <main className={styles.article}>
          <section className={styles.article_heading}>
            <Votes type="articles" score={votes} id={article_id} />
            <main className={styles.heading_contents}>
              <div className={styles.subtext}>
                <h5>
                  <Link className={styles.link} to={`/topics/${topic}/articles`}>{topic}</Link>
                </h5>
                {"\u00A0"}
                <h5>
                  <Link className={styles.link} to={`/users/${author}`}>{author}</Link>
                </h5>{" "}
                {"\u00A0"}
                <h5>{formatDate(created_at)}</h5>
                {author === user ? (
                  <button
                    className={styles.binButton}
                    onClick={() => this.handleDelete(article_id)}
                  >
                    <img
                      className={styles.bin}
                      src={bin}
                      alt="delete comment"
                    />
                  </button>
                ) : null}
              </div>
              <h3 className={styles.title}>{title}</h3>
            </main>
          </section>
          <p className={styles.body}>{body}</p>
          <section>
            <Comments
              setSort={this.props.setSort}
              id={this.props.id}
              user={this.props.user}
              sort={this.props.sort}
              order={this.props.order}
              handleDelete={this.handleDelete}
            />
          </section>
        </main>
      );
    }
  }

  componentDidMount() {
    getArticle(this.props.id)
      .then(article => {
        this.setState({
          article,
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

  handleDelete = id => {
    deleteArticle(id).then(() => {
      navigate("/");
    });
  };
}

export default Article;
