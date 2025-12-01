import facebookIcon from "../assets/images/facebook-icon.png";
import googleIcon from "../assets/images/google-icon.png";
import styles from "./SigninWith.module.css";

function SinginWith() {
  return (
    <div className={`${styles["container-siginin-with"]}`}>
      <div
        className={`${styles["login-google"]} ${styles["singin-with"]}`}
        title="Entrar com o Google"
      >
        <img
          src={googleIcon}
          alt="Google Icon"
          className={`${styles["icon"]} ${styles["google-icon"]}`}
        />
        <h2>Entrar com o Google</h2>
      </div>
      <div
        className={`${styles["login-facebook"]} ${styles["singin-with"]}`}
        title="Entrar com o Facebook"
      >
        <img
          src={facebookIcon}
          alt="Facebook Icon"
          className={`${styles["icon"]} ${styles["facebook-icon"]}`}
        />
        <h2>Entrar com o Facebook</h2>
      </div>
    </div>
  );
}

export default SinginWith;
