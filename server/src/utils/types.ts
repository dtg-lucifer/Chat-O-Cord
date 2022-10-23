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