import { LoginData, RegisterData } from "~/types/authentication";
import prisma from "../prisma";

export async function loginUser(userData: LoginData) {
  const { email, password } = userData;
  return
}

export async function registerUser(userData: RegisterData) {
  return 
}