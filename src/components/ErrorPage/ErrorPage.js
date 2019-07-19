import React from "react";
import styles from "./ErrorPage.module.css";

const ErrorPage = props => {
  if (props.err) {
    const { data, status } = props.err.response;
    return (
      <div className={styles.error_page}>
        <h2>Oops! Something went wrong...</h2>
        <h3>{`${status}: ${data.msg}`}</h3>
      </div>
    );
  } else {
    return (
      <div className={styles.error_page}>
        <h2>Oops! Something went wrong...</h2>
        <h3>404: Page not found!</h3>
      </div>
    );
  }
};

export default ErrorPage;
