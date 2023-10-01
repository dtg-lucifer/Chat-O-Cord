import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
