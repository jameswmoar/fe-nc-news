import React from 'react';
import Articles from '../Articles/Articles';
import styles from './MainContent.module.css'
import Sidebar from '../Sidebar/Sidebar';

class MainContent extends React.Component {

state = {
  sort: 'created_at',
  order: 'desc'
}

  render() {
    const {user_id, slug, user} = this.props
    const {sort, order} = this.state
    return (
      <main className={styles.articles_topics}>
      <Articles sort={sort} order={order} setSort={this.setSort} user={user} topic={slug} user_id={user_id}/>
      <Sidebar setSort={this.setSort}/>
    </main>
  );
}

setSort = (e) => {
  const {value} = e.target
  const sort = value.split(',')[0]
  const order = value.split(',')[1] 
  this.setState({
    sort,
    order
  })
}

};

export default MainContent;