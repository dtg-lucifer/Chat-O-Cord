import { CreateUserDetails } from "src/utils/types";

export interface IUserService {
    createUser(userDetails: CreateUserDetails);
}

export interface User {
    _id: string
    email: string
    firstName: string
    lastName: string
    userName: string
}