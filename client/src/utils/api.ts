import axios, { AxiosRequestConfig } from "axios"
import { CreateUserParams } from "../types/Utils/Authentication"

const { REACT_APP_API_BASE_URL } = process.env
const axiosConfig: AxiosRequestConfig = { withCredentials: true }

export const RegisterUser =  async (data: CreateUserParams) => {
    axios.post(`${REACT_APP_API_BASE_URL}/auth/register`, data, axiosConfig)
}