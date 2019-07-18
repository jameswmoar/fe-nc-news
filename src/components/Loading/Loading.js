import React from 'react';
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <main className={styles.loading}>
    <div className={styles.loader} />
      Loading...
    </main>
  );
};

export default Loading;