import React, { Component } from 'react';
import { getTopics } from "../../utils/axios-requests";

class ArticleAdder extends Component {

  state= {
    topics: null,
    topic: '',
    title: '',
    body: ''
  }

  render() {
    return (
      <div>
        <h2>
          Post an Article
        </h2>
        <form>
          <label>Article Title:<input></input></label>
          <select>
            <option></option>
          </select>
        </form>
      </div>
    );
  }

  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({
          topics,
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

}

export default ArticleAdder;