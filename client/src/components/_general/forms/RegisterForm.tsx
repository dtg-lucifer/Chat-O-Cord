import React from "react";
import {
    InputContainer,
    InputField,
    InputLabel,
    RegisterButton,
    SignInLink
} from "../../_styled/AuthenticationPage";
import styles from "../../../styles/AuthenticationPage/RegisterPage.module.scss";

const RegisterForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel>Email</InputLabel>
                    <InputField />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel>First Name</InputLabel>
                    <InputField />
                </InputContainer>
                <InputContainer>
                    <InputLabel>Last Name</InputLabel>
                    <InputField />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel>Password</InputLabel>
                    <InputField type="password" />
                </InputContainer>
            </div>
            <RegisterButton to="api/v1/auth/register">Create Account</RegisterButton>
            <div className={styles.login__link}>
                Already have an account?<SignInLink to="/signin">Log in.</SignInLink>
            </div>
        </form>
    );
};

export default RegisterForm;
