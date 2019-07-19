import React from "react";
import styles from "./ErrorPage.module.css";

const ErrorPage = props => {
  if (props.err) {
    console.log(props.err.response)
    const {data, status} = props.err.response
    return (
      data.msg === "Page not found - insufficient articles" ?
    <div className={styles.error_page}>
      <h2>No articles exist under this topic!</h2>
      <h3>Why not create one?</h3>
    </div> :
    <div className={styles.error_page}>
      <h2>Oops! Something went wrong...</h2>
      <h3>{`${status}: ${data.msg}`}</h3>
    </div>
  );
} else {
  return (
    <div className={styles.error_page}>
      <h2>Oops! Something went wrong...</h2>
      <h3>404 - Page not found!</h3>
    </div>
  )
}
};

export default ErrorPage;
