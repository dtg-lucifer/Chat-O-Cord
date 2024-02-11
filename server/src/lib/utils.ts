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

export const bufferToSrc = () => {
  return (blob: Buffer, mimeType: string) => {
    if (!blob) {
      return null;
    }

    const uint8Array = new Uint8Array(blob);
    const binaryString = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = Buffer.from(binaryString, "binary").toString("base64");

    return `data:${mimeType};base64,${base64String}`;
  };
};
