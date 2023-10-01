import { db } from "../lib/db.server";
import { hashPassword } from "../lib/utils";
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
            userName: `@${data.firstName}_${data.lastName}`,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            userName: true,
            profilePic: true,
        },
    });

    return newUser;
}
