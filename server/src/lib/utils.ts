import { AES } from "crypto-js"

export const hashPassword = async (password: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(password);
		}, 1000);
	});

}