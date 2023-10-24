import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail, MdFingerprint } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../../../types/authentication";
import styles from "./index.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../../lib/api";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["login__user", data.data.id], data);
      console.log("Login successful", data);
      navigate("/conversations");
    },
    onError: (error) => {
      console.log("Login failed", error);
    },
  });

  const submitHandler = async (data: LoginData) => mutate(data);

  return (
    <main className={styles.mainBg}>
      -
      <div className={styles.modal}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <strong>
              <span>Hey,</span>Welcome Back
            </strong>
          </div>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit(submitHandler)} className="text-white">
            <div className={styles.form__group}>
              <label htmlFor="email">Email</label>
              <div
                style={{
                  // @ts-ignore
                  "--input-color": errors.email ? "var(--clr-danger)" : "none",
                }}
                className={styles.input__container}
              >
                <MdAlternateEmail />
                <input
                  type="email"
                  id="email"
                  className={`flex-1 ${styles.input} ${
                    errors.email && errors.email.type === "required"
                      ? `${styles.invalid__input}`
                      : ""
                  }`}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
              </div>
              {
                // @ts-ignore
                errors.email && (
                  <div className={styles.invalid__feedback}>
                    {errors.email.message}
                  </div>
                )
              }
            </div>
            <div className={styles.form__group}>
              <label htmlFor="password">Password</label>
              <div
                style={{
                  // @ts-ignore
                  "--input-color": errors.email ? "var(--clr-danger)" : "none",
                }}
                className={styles.input__container}
              >
                <MdFingerprint />
                <input
                  type="password"
                  id="password"
                  className={`flex-1 ${styles.input} ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
              </div>
              {
                // @ts-ignore
                errors.password && (
                  <div className={styles.invalid__feedback}>
                    {errors.password.message}
                  </div>
                )
              }
            </div>
            <div className={styles.form__group}>
              <button type="submit" className={`${styles.btn} login__btn`}>
                Login
              </button>
            </div>
          </form>
          <div className={styles.other__options__container}>
            <div>Or ,</div>
            <div className={styles.options}>
              <span>
                <FcGoogle />
              </span>
              <span>
                <FaGithub />
              </span>
            </div>
            <div>
              Don{"'"}t Have An Account?{" "}
              <Link className="text-blue-600" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
