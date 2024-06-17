import bcrypt from "bcryptjs";

const saltRounds: number = Number(process.env.SALT_ROUND || "10");

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};
