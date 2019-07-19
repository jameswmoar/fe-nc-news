import React from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { Router } from "@reach/router";
import Article from "./components/Article/Article";
import MainContent from "./components/MainContent/MainContent";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ArticleAdder from "./components/ArticleAdder/ArticleAdder";
import TopicAdder from "./components/TopicAdder/TopicAdder";

class App extends React.Component {
  state = {
    user: "grumpy19",
    sort: "created_at",
    order: "desc"
  };

  render() {
    const { user, sort, order } = this.state;

    return (
      <div className={styles.body}>
        <Nav user={user} />
        <Router>
          <MainContent path="/" user={user} sort={sort} order={order} setSort={this.setSort}/>
          <MainContent path="/topics/:slug/articles" user={user}sort={sort} order={order} setSort={this.setSort} />
          <MainContent path="/users/:user_id" setSort={this.setSort} sort={sort} order={order}/>
          <Article path="/articles/:id" user={user} setSort={this.setSort} sort={sort} order={order}/>
          <ArticleAdder path="/users/:user_id/post_article" user={user}/>
          <TopicAdder path='/topics/new_topic'/>
          <ErrorPage path="/*"/>
        </Router>
      </div>
    );
  }

  setSort = e => {
    const { value } = e.target;
    const sort = value.split(",")[0];
    const order = value.split(",")[1];
    this.setState({
      sort,
      order
    });
  };
}

export default App;
