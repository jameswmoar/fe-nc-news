import React from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { Router } from "@reach/router";
import Article from "./components/Article/Article";
import Content from "./components/content/Content";

class App extends React.Component {
  state = {
    user: "grumpy19"
  };

  render() {
    const { user } = this.state;

    return (
      <div className={styles.body}>
        <Nav user={user} />
        <Router>
          <Content path="/" user={user} />
          <Content path="/topics/:slug/articles" user={user} />
          <Article path='/article/:id' />
        </Router>
      </div>
    );
  }
}

export default App;
