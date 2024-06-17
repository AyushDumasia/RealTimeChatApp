import jwt from "jsonwebtoken";

export const generateAccessToken = (user: {
  username: string;
  phone: string;
  id: object;
}): string => {
  return jwt.sign(
    {
      user: {
        username: user.username,
        phone: user.phone,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN!,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );
};
