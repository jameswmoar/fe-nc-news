import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-james.herokuapp.com/api"
});

export const getArticles = () => {
  return request.get("/articles").then(({ data }) => data.articles);
};

export const getTopics = () => {
  return request.get("/topics").then(({ data }) => data.topics);
};


