import character from "../assets/NotFoundCharacter.gif";
import styles from "../css/notfound.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.NotFoundContainer}>
      <div>
        <h1>404 - Page Not Found</h1>
      </div>
      <div>
        <img src={character} />
      </div>
    </div>
  );
};

export default NotFoundPage;
