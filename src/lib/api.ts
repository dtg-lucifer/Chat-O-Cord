import { RegisterData } from "~/types/authentication";
import axios from "axios";
import { axiosConfig } from "~/util/axiosConfig";

export const registerUser = async (data: RegisterData) => {
  return await axios.post(
	"/auth/register",
	data,
	axiosConfig
  )
};
