import React, { Component } from "react";
import { getArticle } from "../../utils/axios-requests";
import styles from "./Article.module.css";
import { formatDate } from "../../utils/utils";
import { Link } from "@reach/router";
import Comments from "../Comments/Comments";
import Votes from "../Votes/Votes";

class Article extends Component {
  state = {
    article: {}
  };

  render() {
    const { article } = this.state;
    return (
      <main className={styles.article}>
        <section className={styles.heading}>
         <Votes score={article.votes} article_id={article.article_id} handleVote={this.handleVote}/>
          <main className={styles.contents}>
            <div className={styles.subtext}>
              <h5><Link to={`/topics/${article.topic}/articles`}>
             {article.topic}</Link></h5>{"\u00A0"}
              <h5><Link to={`/users/${article.author}`}>{article.author}</Link></h5> {"\u00A0"}
              <h5>{formatDate(article.created_at)}</h5>
           </div>
            <h3 className={styles.title}>{article.title}</h3>
          </main>
        </section>
        <p className={styles.body}>{article.body}</p>
      <section>
        <Comments id={this.props.id} user={this.props.user}/>
      </section>
      </main>
    );
  }

  componentDidMount() {
    getArticle(this.props.id).then(article => {
      this.setState({
        article
      });
    });
  }

  handleVote = votedArticle => {
    this.setState({
      article: votedArticle
    })
  };
}

export default Article;
