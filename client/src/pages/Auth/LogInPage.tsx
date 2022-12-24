import styles from "../../styles/AuthenticationPage/SignInPage.module.scss";
import svgSrc from "../../assets/authenticationBG.svg";
import sideSvg from "../../assets/loginSvg.svg";
import {
  InputContainer,
  InputLabel,
  InputField,
  Button,
  SignInLink,
} from "../../components/_styled/AuthenticationPage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../types/ComponentProps/Authentication";
import { LoginUser } from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import { useState } from "react";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [loading, setLoading] = useState<boolean>(false)
  const { success, error } = useToast({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    try {
      const { data: response } = await LoginUser(data);
      if(response) setLoading(false)
      success("Successfully logged in")
      navigate("/conversations");
    } catch (err) {
      if(err) setLoading(false)
      error("Oops, something is wrong!")
    }
  };

  return (
    <div className={styles.main__wrapper}>
      <div className={styles.innerWrapper}>
        <img src={sideSvg} alt="login-svg" />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.login__heading}>
            <strong><span>Hey,</span> welcome back.</strong>
          </div>
          <div className={styles.innerFormContainer}>
            <div className={styles.field__wrapper}>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField
                  type="email"
                  id="email"
                  autoFocus
                  bottomLine={true}
                  {...register("email", {
                    required: "Email is required!",
                  })}
                />
              </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="passw">Password</InputLabel>
                <InputField
                  type="password"
                  id="passw"
                  bottomLine={true}
                  {...register("password", {
                    required: "Without password huh???",
                    minLength: 8,
                  })}
                />
              </InputContainer>
            </div>

            <Button disabled={loading} type="submit">Log In</Button>

            <div className={styles.login__link}>
              <span>Need an account?</span>
              <SignInLink to="/auth/register">Create account.</SignInLink>
            </div>
          </div>
        </form>
      </div>
      <img src={svgSrc} alt="backrgound-img" />
    </div>
  );
};

export default LogInPage;
