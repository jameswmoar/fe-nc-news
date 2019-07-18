import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-james.herokuapp.com/api"
});

export const getArticles = ({ topic, user_id, sort, order }, p) => {
  return request
    .get("/articles", {
      params: {
        topic,
        author: user_id,
        sort_by: sort,
        order,
        p
      }
    })
    .then(({ data }) => data);
};

export const getArticle = id => {
  return request.get(`/articles/${id}`).then(({ data }) => data.article);
};

export const postArticle = article => {
  return request.post("/articles", article).then(({ data }) => data.article);
};

export const deleteArticle = id => {
  return request.delete(`/articles/${id}`);
};

export const getTopics = () => {
  return request.get("/topics").then(({ data }) => data.topics);
};

export const getComments = ({ id, sort, order }, p) => {
  return request
    .get(`/articles/${id}/comments`, {
      params: {
        sort_by: sort,
        order,
        p
      }
    })
    .then(({ data }) => data);
};

export const postComment = (comment, id) => {
  return request.post(`/articles/${id}/comments`, comment).then(({ data }) => {
    return data.comment;
  });
};

export const deleteComment = id => {
  return request.delete(`/comments/${id}`);
};

export const patchVote = (type, increment, id) => {
  return request.patch(`${type}/${id}`, { inc_votes: increment });
};
