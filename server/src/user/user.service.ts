import { db } from "../lib/db.server";
import { LoginData } from "../lib/types";
import { comparePasswords, hashPassword } from "../lib/utils";
import { CreateUserDetails } from "./dto/user.dto";

export async function createUser(data: CreateUserDetails) {
  const existingUser = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(data.password);

  const newUser = await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
      profilePic: "",
      userName: `@${data.firstName.toLowerCase()}_${data.lastName.toLowerCase()}`,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      userName: true,
      profilePic: true,
      joinedOn: true,
      createdConversations: true,
      joinedConversations: true,
    },
  });

  return newUser;
}

export async function validateUser(data: LoginData) {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      createdConversations: true,
      joinedConversations: true,
    },
  });

  if (!user) throw new Error("User does not exist");

  const isPasswordCorrect = await comparePasswords(
    data.password,
    user.password
  );

  if (!isPasswordCorrect) throw new Error("Invalid password");

  return user;
}

export async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      userName: true,
      profilePic: true,
      joinedOn: true,
      createdConversations: true,
      joinedConversations: true,
    },
  });

  return user;
}

export async function setUserActiveStatusToggle(id: string, status: boolean) {
  await db.user.update({
    where: {
      id,
    },
    data: {
      online: status,
    },
  });
}

export async function searchUsers(userName: string) {
  if (userName.trim() === "" || userName.trim() === "@")
    throw new Error("You cannot search without any characters");

  return await db.user.findMany({
    where: {
      userName: { contains: userName.toLowerCase() },
    },
    select: {
      id: true,
      userName: true,
      email: true,
      firstName: true,
      lastName: true,
      profilePic: true,
      online: true,
    },
  });
}
