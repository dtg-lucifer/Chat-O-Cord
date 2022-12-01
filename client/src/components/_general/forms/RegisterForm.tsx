import {
  InputContainer,
  InputField,
  InputLabel,
  Button,
  SignInLink,
} from "../../_styled/AuthenticationPage";
import styles from "../../../styles/AuthenticationPage/RegisterPage.module.scss";
import { useForm } from "react-hook-form";
import { RegisterUser } from "../../../utils/api";
import { CreateUserParams } from "../../../types/Utils/Authentication";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>();

  /* 
    @it will be needed when we use only typical submit finctions where we have to worry about the events 
    but in React_Hook_Form it habdles the events for us

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    */

  console.log("Register form ", errors);

  const onSubmit = async (data: CreateUserParams) => {
    console.log(data);
    try {
      await RegisterUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field__wrapper}>
        <InputContainer>
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField
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
        <InputContainer>
          <InputLabel htmlFor="fname">First Name</InputLabel>
          <InputField
            type="text"
            id="fname"
            {...register("firstName", {
              required: "First name is required!",
            })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lname">Last Name</InputLabel>
          <InputField
            type="text"
            id="lname"
            {...register("lastName", {
              required: "Last name is required!",
            })}
          />
        </InputContainer>
      </div>
      <div className={styles.field__wrapper}>
        <InputContainer>
          <InputLabel htmlFor="passw">Password</InputLabel>
          <InputField
            type="password"
            id="passw"
            {...register("password", {
              required: "Without password huh???",
              minLength: 8,
            })}
          />
        </InputContainer>
      </div>

      {/* @onClick it will fetch the details from our own api at => "api/v1/auth/register"*/}
      <Button type="submit">Create Account</Button>

      <div className={styles.login__link}>
        Already have an account?
        <SignInLink to="/auth/login">Log in.</SignInLink>
      </div>
    </form>
  );
};

export default RegisterForm;
