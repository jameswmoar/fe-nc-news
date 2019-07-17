import React, { Component } from "react";
import up from "../../images/thumbs-up.png";
import down from "../../images/thumbs-down.png";
import styles from "./Votes.module.css";
import { patchArticle, patchComment } from "../../utils/axios-requests";

class Votes extends Component {
  state = {
    countModifier: 0
  };

  render() {
    return (
      <aside className={styles.votes}>
        <button className={styles.button} onClick={() => this.handleClick(1)} disabled={this.state.countModifier === 1}>
          <img src={up} alt="Vote up" className={styles.thumb} />
        </button>
        {this.props.score}
        <button className={styles.button} onClick={() => this.handleClick(-1)} disabled={this.state.countModifier === -1}>
          <img src={down} alt="Vote down" className={styles.thumb} />
        </button>
      </aside>
    );
  }

  handleClick = increment => {
    if (this.props.article_id) {
      patchArticle(increment, this.props.article_id).then(article => {
        this.props.handleVote(article);
      });
      this.setState(state => {
        return {countModifier: state.countModifier += increment}
      });
    } else if (this.props.comment_id) {
      patchComment(increment, this.props.comment_id).then(comment => {
        this.props.handleVote(comment);
      });
    }
  };
}

export default Votes;
