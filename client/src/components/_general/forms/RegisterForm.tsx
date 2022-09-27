import React from "react";
import {
    InputContainer,
    InputField,
    InputLabel,
    Button,
    SignInLink,
    WRAPPER,
} from "../../_styled/AuthenticationPage";
import styles from "../../../styles/AuthenticationPage/RegisterPage.module.scss";
import { useForm } from "react-hook-form";
import { RegisterFormInputs } from "../../../types/ComponentProps/RegsiterForm";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="email" {...register("email", {required: "Email is required!"})}>Email</InputLabel>
                    <InputField type="email" name="email" id="email"/>
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="fname" {...register("fname", { required: "First name is required!"})}>First Name</InputLabel>
                    <InputField type="text" name="fname" id="fname" />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="lname" {...register("lname", { required: "Last name is required!"})}>Last Name</InputLabel>
                    <InputField type="text" name="lname" id="lname" />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="passw" {...register("passw", { required: "Without password huh???"})}>Password</InputLabel>
                    <InputField type="password" name="passw" id="passw" />
                </InputContainer>
            </div>

            {/* @onClick it will fetch the details from our own api at => "api/v1/auth/register" */}
            <Button type="submit">Create Account</Button>

            <div className={styles.login__link}>
                Already have an account?
                <SignInLink to="/signin">Log in.</SignInLink>
            </div>
            <WRAPPER>
                jhdfjhfjfefifi
            </WRAPPER>
        </form>
    );
};

export default RegisterForm;
