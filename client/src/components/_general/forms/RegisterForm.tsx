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
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <InputField type="email" name="email" id="email" autoFocus />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="fname">First Name</InputLabel>
                    <InputField type="text" name="fname" id="fname" />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="lname">Last Name</InputLabel>
                    <InputField type="text" name="lname" id="lname" />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="passw">Password</InputLabel>
                    <InputField type="password" name="passw" id="passw" />
                </InputContainer>
            </div>

            {/* @onClick it will fetch the details from our own api at => "api/v1/auth/register" */} 
            <RegisterButton to={"/"}>Create Account</RegisterButton>

            <div className={styles.login__link}>
                Already have an account?<SignInLink to="/signin">Log in.</SignInLink>
            </div>
        </form>
    );
};

export default RegisterForm;
