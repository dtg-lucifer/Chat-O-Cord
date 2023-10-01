import { RegisterData } from "~/types/authentication";
import axios from "axios";
import { axiosConfig } from "~/util/axiosConfig";
import { User } from "@prisma/client";

export const registerUser = async (data: RegisterData) => {
  return await axios.post<Partial<Omit<User, "password">>>(
    "/auth/register",
    data,
    {
      ...axiosConfig,
      params: {
        ...axiosConfig.params,
        redirect: "/",
      },
    },
  );
};
