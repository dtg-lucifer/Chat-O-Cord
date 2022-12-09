export interface CreateUserParams {
    email: string
    firstName: string
    lastName: string
    password: string
}

export interface LoginUserParams {
    readonly email: string
    readonly password: string
}

export interface User {
    readonly _id: number
    readonly email: string
    readonly firstName: string
    readonly lastName: string
    readonly userName: string
}