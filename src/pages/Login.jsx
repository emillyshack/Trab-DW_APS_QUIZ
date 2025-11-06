import styles from "./Login.module.css";

function Login() {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["container-login"]}`}>
        <div className={`${styles["login-dados"]}`}>
          <h1>Login</h1>
          <input type="email" name="email" id="input-email" />
          <input type="password" name="senha" id="input-senha" />
          <div className={`${styles["linha-ou"]}`}>
            <hr />
            <p>ou</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
