import { db } from "../lib/db.server";
import { CreateUserDetails } from "./dto/user.dto";

export async function createUser(data: CreateUserDetails) {
	const existingUser = await db.user.findUnique({
		where: {
			email: data.email
		}
	});

	if (existingUser) {
		throw new Error("User already exists");
	}

	const newUser = await db.user.create({
		data: {
			...data,
			profilePic: "",
			userName: `@${data.firstName}_${data.lastName}`,
		}
	});

	return newUser;
}