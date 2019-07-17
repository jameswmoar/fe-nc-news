import React, { Component } from "react";
import up from "../../images/thumbs-up.png";
import down from "../../images/thumbs-down.png";
import styles from "./Votes.module.css";
import { patchVote } from "../../utils/axios-requests";

class Votes extends Component {
  state = {
    countModifier: 0
  };

  render() {
    return (
      <aside className={styles.votes}>
        <button
          className={styles.button}
          onClick={() => this.handleClick(1)}
          disabled={this.state.countModifier === 1}
        >
          <img src={up} alt="Vote up" className={styles.thumb} />
        </button>
        {this.props.score + this.state.countModifier}
        <button
          className={styles.button}
          onClick={() => this.handleClick(-1)}
          disabled={this.state.countModifier === -1}
        >
          <img src={down} alt="Vote down" className={styles.thumb} />
        </button>
      </aside>
    );
  }

  handleClick = increment => {
    const { type, id } = this.props;
    patchVote(type, increment, id);
    this.setState(state => {
      return { countModifier: (state.countModifier += increment) };
    })
  };
}

export default Votes;
