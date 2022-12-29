import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  InputContainer,
  InputLabel,
  InputField,
  Button,
  SignInLink,
} from "../../components/_styled/AuthenticationPage";
import styles from "../../styles/AuthenticationPage/RegisterPage.module.scss";
import { CreateUserParams } from "../../types/Utils/Authentication";
import { RegisterUser } from "../../utils/api";
import imgSrc from "../../assets/registerSvg.svg";
import bg from "../../assets/authenticationBG.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useToast } from "../../utils/hooks/useToast";

const AuthenticationPage = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm<CreateUserParams>();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const onSubmit = async (data: CreateUserParams) => {
    try {
      const res = await RegisterUser(data);
      success("Successfully registered your account!")
      navigate("/conversations");
    } catch (err) {
      error("Oops.. Something went wrong")
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner__wrapper}>
        <img src={imgSrc} alt="" />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.register__heading}>
            <strong>
              <span>Hey,</span> wanna join us?
            </strong>
          </div>
          <div className={styles.innerForm__wrapper}>
            <div className={styles.field__wrapper}>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField
                  bottomLine={true}
                  type="email"
                  id="email"
                  autoFocus
                  {...register("email", {
                    required: "Email is required!",
                  })}
                />
              </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="fname">First Name</InputLabel>
                <InputField
                  bottomLine={true}
                  type="text"
                  id="fname"
                  {...register("firstName", {
                    required: "First name is required!",
                  })}
                />
              </InputContainer>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="lname">Last Name</InputLabel>
                <InputField
                  bottomLine={true}
                  type="text"
                  id="lname"
                  {...register("lastName", {
                    required: "Last name is required!",
                  })}
                />
              </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
              <InputContainer backGroundcolor="transparent">
                <InputLabel htmlFor="passw">Password</InputLabel>
                <InputField
                  bottomLine={true}
                  type="password"
                  id="passw"
                  {...register("password", {
                    required: "Without password huh???",
                    minLength: 8,
                  })}
                />
              </InputContainer>
            </div>
            <Button type="submit">Create Account</Button>
            <div className={styles.login__link}>
              Already have an account?
              <SignInLink to="/auth/login">
                Log in.
                <MdOutlineKeyboardArrowRight />
              </SignInLink>
            </div>
          </div>
        </form>
      </div>
      <img src={bg} alt="" />
    </div>
  );
};

export default AuthenticationPage;
