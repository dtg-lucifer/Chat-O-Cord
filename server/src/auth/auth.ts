import { ValidateUserCredentials } from "src/utils/types";

export interface IAuthService {
    validateUser(validateUserCredentials: ValidateUserCredentials);
}