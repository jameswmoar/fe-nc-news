import React, { Component } from "react";
import {getArticles} from "../../utils/axios-requests";
import styles from "./Articles.module.css";
import up from '../../images/thumbs-up.png';
import down from '../../images/thumbs-down.png';
import {Link} from '@reach/router'

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    return (
      <section className={styles.content}>
        <ul>
          {articles.map(article => {
            const date = new Date(article.created_at);
            return (
              <li key={article.article_id} className={styles.article}>
                <aside className={styles.votes}>
                  <img src={up} alt="Vote up" className={styles.thumb}/>
                  <img src={down} alt="Vote down"className={styles.thumb}/>
                 </aside>
                 
                <main className={styles.contents}>
                  <div className={styles.subtext}>
                    <Link to='/topics/:slug/articles'>
                    <h5>{article.topic}</h5>
                    </Link>
                    <Link to='/users/:userid'>
                    <h5>{article.author}</h5>
                    </Link>
                    <h5>
                      Posted on {date.getDate()}/{date.getMonth()}/
                      {date.getFullYear()} at {date.getHours()}:
                      {date.getMinutes()}
                    </h5>
                  </div>
                  <Link to='/article/:id'>
                  <h3 className={styles.title}>{article.title}</h3>
                  
                </Link>
                </main>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getArticles().then(articles => {
      this.setState({
        articles
      });
    });
  }
}

export default Articles;
