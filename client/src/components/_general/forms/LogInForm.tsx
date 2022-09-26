import React from "react";
import {
    InputContainer,
    InputField,
    InputLabel,
    Button,
    SignInLink
} from "../../_styled/AuthenticationPage";
import styles from "../../../styles/AuthenticationPage/RegisterPage.module.scss";

const LogInForm = () => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <InputField type="email" name="email" id="email" autoFocus />
                </InputContainer>
            </div>
            <div className={styles.field__wrapper}>
                <InputContainer>
                    <InputLabel htmlFor="passw">Password</InputLabel>
                    <InputField type="password" name="passw" id="passw" />
                </InputContainer>
            </div>

            {/* @onClick it will fetch the details from our own api at => "api/v1/auth/login" */} 
            <Button type="submit">Log In</Button>

            <div className={styles.login__link}>
                Need an account?<SignInLink to="/signin">Create account.</SignInLink>
            </div>
        </form>
    );
};

export default LogInForm;
