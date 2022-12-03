import {
    InputContainer,
    InputField,
    InputLabel,
    Button,
    SignInLink,
} from "../../_styled/AuthenticationPage";
import styles from "../../../styles/AuthenticationPage/RegisterPage.module.scss";
import { useForm } from "react-hook-form";
import { LoginData } from "../../../types/ComponentProps/Authentication";
import { LoginUser } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const navigate = useNavigate()

    /* 

    @it will be needed when we use only typical submit finctions where we have to worry about the events 
    but in React_Hook_Form it habdles the events for us

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    */

    console.log(errors);
    const onSubmit = async (data: LoginData) => {
        console.log(data);
        try{
            await LoginUser(data)
            navigate("/conversations")
        } catch(err) {
            console.log(err)
        }
    }

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

            {/* @onClick it will fetch the details from our own api at => "api/v1/auth/login" */}
            <Button type="submit">Log In</Button>

            <div className={styles.login__link}>
                Need an account?
                <SignInLink to="/auth/register">Create account.</SignInLink>
            </div>
        </form>
    );
};

export default LogInForm;
