import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSaltSync();
  return await bcrypt.hash(rawPassword, salt);
}

export async function compareHashedPassword(
  rawPass: string,
  hashedPass: string,
): Promise<boolean> {
  return await bcrypt.compare(rawPass, hashedPass);
}
