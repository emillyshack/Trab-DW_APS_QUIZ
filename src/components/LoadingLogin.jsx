import styles from "./LoadingLogin.module.css";
import loading from "../assets/images/loadingLogin.gif";

function LoadingLogin() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.text}>Loading...</h1>
        <img src={loading} alt="Loading" className={styles.gif} />
      </div>
    </div>
  );
}

export default LoadingLogin;
