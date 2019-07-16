import React from 'react';
import Articles from '../Articles/Articles';
import Topics from '../Topics/Topics';
import style from './Content.module.css'

const Content = ({user}) => {
  return (
    <div className={style.content}>
      <Articles user={user}/>
      <Topics />
    </div>
  );
};

export default Content;