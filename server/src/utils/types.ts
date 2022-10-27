export interface CreateUserDetails {
    email: string
    firstName: string
    lastName: string
    password: string
}

export interface ValidateUserCredentials {
    email: string
    password: string
}

export interface FindUserParams {
    _id?: number;
    email?: string;
    // password?: string;
}