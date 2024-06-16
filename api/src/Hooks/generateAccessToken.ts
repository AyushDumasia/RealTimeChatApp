import jwt from "jsonwebtoken";

export const generateAccessToken = (user: {
  username: string;
  email: string;
  id: object;
}): string => {
  return jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN!,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );
};
