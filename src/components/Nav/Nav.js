import React from "react";
import styles from "./Nav.module.css";
import create from "../../images/create.png";
import profile from "../../images/profile.png";
import { Link } from "@reach/router";

const Nav = ({ user }) => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}><Link to='/' className={styles.ncnews}>NC News</Link></h1>
      <h2 className={styles.rightportion}>
        <img className={styles.smallImage} src={create} alt="create article" />
        <div className={styles.user}>
          <h3>{user ? user : "Not logged in"}</h3>
          <img className={styles.smallImage} src={profile} alt="profile" />
        </div>
      </h2>
    </nav>
  );
};

export default Nav;
