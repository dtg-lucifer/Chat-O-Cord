import { RegisterData } from "../types/authentication";
import axios from "axios";
import { User } from "../types/conversation";

export const registerUser = async (data: RegisterData) => {
  return await axios.post<Partial<Omit<User, "password">>>(
    `${process.env.REACT_APP_PUBLIC_API_URL}/auth/register`,
    data,
    {
      withCredentials: true,
      params: {
        redirect: "/",
      },
    }
  );
};
