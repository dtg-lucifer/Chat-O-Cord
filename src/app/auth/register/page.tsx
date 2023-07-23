"use client";

import { useForm } from "react-hook-form";
import { MdAlternateEmail, MdFingerprint } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { registerUserAction } from "~/app/_actions";
import styles from "~/app/auth/register/register.module.scss";
import { RegisterData, registerSchema } from "~/types/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const submitHandler = async (data: RegisterData) => {
    console.log(data);
    await registerUserAction(data);
  };

  return (
    <main className={styles.mainBG}>
      <div className={styles.modal}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <span>Hey,{" "}</span>
            <div>Start Your Journey</div>
          </div>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit(submitHandler)} className="text-white">
            <div className={styles.name__container}>
              <div className={styles.form__group}>
                <label htmlFor="firstname">First Name</label>
                <div
                  style={{
                    // @ts-ignore
                    "--input-color": errors.firstName
                      ? "var(--clr-danger)"
                      : "none",
                  }}
                  className={styles.input__container}
                >
                  <FaUser />
                  <input
                    type="text"
                    id="firstname"
                    className={`flex-1 ${styles.input} ${
                      errors.firstName && errors.firstName.type === "required"
                        ? `${styles.invalid__input}`
                        : ""
                    }`}
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                </div>
              </div>
              <div className={styles.form__group}>
                <label htmlFor="lastname">Last Name</label>
                <div
                  style={{
                    // @ts-ignore
                    "--input-color": errors.lastName
                      ? "var(--clr-danger)"
                      : "none",
                  }}
                  className={styles.input__container}
                >
                  <FaUser />
                  <input
                    type="text"
                    id="lastname"
                    className={`flex-1 ${styles.input} ${
                      errors.lastName && errors.lastName.type === "required"
                        ? `${styles.invalid__input}`
                        : ""
                    }`}
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                </div>
              </div>
            </div>
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
                  {...register("email")}
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
                  "--input-color": errors.password
                    ? "var(--clr-danger)"
                    : "none",
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
                  {...register("password")}
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
              <label htmlFor="confPassword">Confirm Password</label>
              <div
                style={{
                  // @ts-ignore
                  "--input-color": errors.confPassword
                    ? "var(--clr-danger)"
                    : "none",
                }}
                className={styles.input__container}
              >
                <MdFingerprint />
                <input
                  type="password"
                  id="confPassword"
                  className={`flex-1 ${styles.input} ${
                    errors.confPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm password"
                  {...register("confPassword")}
                />
              </div>
              {errors.confPassword && (
                <div className={styles.invalid__feedback}>
                  {errors.confPassword.message}
                </div>
              )}
            </div>
            <div className={styles.form__group}>
              <button type="submit" className={`${styles.btn} login__btn`}>
                Create Account
              </button>
            </div>
          </form>
          <div className="mb-4">
            <span>
              Already have an account?
              <Link className="ml-2 text-blue-400" href={"/auth/login"}>
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;