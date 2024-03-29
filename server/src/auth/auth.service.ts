import { LoginData, RegisterData } from "../lib/types";
import { createUser, validateUser } from "../user/user.service";

export async function registerUser(data: Omit<RegisterData, "confPassword">) {
  return await createUser(data);
}

export async function loginUser(data: LoginData) {
  return await validateUser(data);
}
