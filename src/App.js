import React from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { Router } from "@reach/router";
import Article from "./components/Article/Article";
import MainContent from "./components/MainContent/MainContent";
import ErrorPage from "./components/ErrorPage/ErrorPage";

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
          <MainContent path="/" user={user} />
          <MainContent path="/topics/:slug/articles" user={user} />
          <MainContent path="/users/:user_id" />
          <Article path='/articles/:id' user={user}/>
          <ErrorPage path="/*"/>
        </Router>
      </div>
    );
  }
}

export default App;
