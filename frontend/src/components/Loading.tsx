import loading from "../assets/loading.gif";
import styles from "../css/loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={loading} />
    </div>
  );
};

export default Loading;
