import { CreateUserDetails, FindUserParams } from "src/utils/types";
import { User as UserEntity } from "src/utils/typeorm";

export interface IUserService {
    createUser(userDetails: CreateUserDetails): Promise<UserEntity>;
    findUser(findUser: FindUserParams): Promise<UserEntity>;
    saveUser(user: UserEntity): Promise<UserEntity>
}

export interface User {
    _id: string
    email: string
    firstName: string
    lastName: string
    userName: string
}