import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Home/HomePage.module.css";

const Homepage: React.FC = () => {
  return (
    <div className={styles.postsWrapper}>
      {/* Ana Başlık */}
      <h1 className={styles.postsHeader}>Homepage</h1>
      <div className={styles.mainAreaContainer}>
        {/* Users Kartı */}
        <div className={styles.postCard}>
          <h2 className={styles.postTitle}>Users</h2>
          <p className={styles.postUser}>
            Kullanıcı listesini görmek için tıkla
          </p>
          <div className={styles.actions}>
            <Link to="/users">
              <button className={styles.navigateButton}>
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text">Go Users</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Posts Kartı */}
        <div className={styles.postCard}>
          <h2 className={styles.postTitle}>Posts</h2>
          <p className={styles.postUser}>Gönderi listesini görmek için tıkla</p>
          <div className={styles.actions}>
            <Link to="/posts">
              <button className={styles.navigateButton}>
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text">Go Posts</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
