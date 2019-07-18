import React from 'react';
import styles from './ErrorPage.module.css'

const ErrorPage = (err) => {
  return (
    <div className={styles.error_page}>
      <h2>Oops! Something went wrong...</h2>
      <h3>{err.message}</h3>
    </div>
  );
};

export default ErrorPage;