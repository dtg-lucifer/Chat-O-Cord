import * as bcrypt from "bcrypt";

export async function hashPassword(rawPassword: string) {
    const salt = await bcrypt.genSaltSync()
    return await bcrypt.hash(rawPassword, salt)
}