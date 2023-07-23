"use server";

import { loginUser, registerUser } from "~/lib/authentication/auth";
import { LoginData, RegisterData } from "~/types/authentication";

export async function loginUserAction(userData: LoginData) {
  return await loginUser(userData);
}

export async function registerUserAction(userData: RegisterData) {
  return await registerUser(userData);
}