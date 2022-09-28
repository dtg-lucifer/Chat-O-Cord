export interface RegisterFormInputs {
    email: string
    fname: string
    lname: string
    passw: string
}

export interface RegsiterFormErrors {
    email?: object
    fname?: object
    lname?: object
    passw?: object
}