import LogInForm from "../../components/_general/forms/LogInForm";
import styles from "../../styles/AuthenticationPage/SignInPage.module.scss";
import BG from "../../assets/loginFormBg.svg";

const LogInPage = () => {
  return (
    <div className={styles.main__wrapper}>
      <div className={styles.secondery__wrapper}>
        <LogInForm />
        <div>
          <strong>Welcome back!</strong>
        </div>
      </div>
      <img src={BG} />
    </div>
  );
};

export default LogInPage;
