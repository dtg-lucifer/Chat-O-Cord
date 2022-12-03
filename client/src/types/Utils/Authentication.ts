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

export interface UseAuthProps {
    name?: string
    children?: React.ReactNode
}