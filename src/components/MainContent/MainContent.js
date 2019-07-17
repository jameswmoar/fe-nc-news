import React from 'react';
import Articles from '../Articles/Articles';
import Topics from '../Topics/Topics';
import style from './MainContent.module.css'

const MainContent = ({user_id, slug, user}) => {
  return (
    <div className={style.content}>
      <Articles user={user} topic={slug} user_id={user_id}/>
      <Topics />
    </div>
  );
};

export default MainContent;